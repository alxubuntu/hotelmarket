import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendEmail, buildContactEmailHtml } from '@/lib/email';

// ── Zod Schema ───────────────────────────────────────────────────────────────
const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be between 2 and 100 characters')
    .max(100, 'Name must be between 2 and 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.enum(['general', 'demo', 'partners'], {
    message: 'Please select a subject',
  }),
  message: z
    .string()
    .min(10, 'Message must be between 10 and 5000 characters')
    .max(5000, 'Message must be between 10 and 5000 characters'),
});

type ContactPayload = z.infer<typeof contactSchema>;

// ── In-Memory Rate Limiter ───────────────────────────────────────────────────
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 requests per window

const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) ?? [];

  // Remove expired timestamps
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= RATE_LIMIT_MAX) {
    const oldest = validTimestamps[0];
    const retryAfter = Math.ceil((RATE_LIMIT_WINDOW_MS - (now - oldest)) / 1000);
    rateLimitMap.set(ip, validTimestamps);
    return { allowed: false, retryAfter };
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return { allowed: true };
}

// ── Subject Labels ───────────────────────────────────────────────────────────
const subjectLabels: Record<string, string> = {
  general: 'General Inquiry',
  demo: 'Demo Request',
  partners: 'Partnership Inquiry',
};

// ── POST Handler ─────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  // Rate limit check
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const rateLimit = checkRateLimit(ip);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        status: 'rate_limited',
        retryAfter: rateLimit.retryAfter,
      },
      { status: 429 },
    );
  }

  // Parse body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { status: 'error', errors: [{ field: 'body', message: 'Invalid JSON' }] },
      { status: 400 },
    );
  }

  // Zod validation
  const result = contactSchema.safeParse(body);
  if (!result.success) {
    const errors = result.error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    return NextResponse.json({ status: 'error', errors }, { status: 400 });
  }

  const { name, email, subject, message } = result.data;

  // Send email
  try {
    const to = process.env.CONTACT_EMAIL_TO ?? 'hello@hotelmarketpro.com';
    await sendEmail({
      to,
      from: 'Hotel Market Pro <onboarding@resend.dev>',
      subject: `[${subjectLabels[subject]}] Contact from ${name}`,
      html: buildContactEmailHtml({ name, email, subject: subjectLabels[subject], message }),
    });

    return NextResponse.json({ status: 'success' }, { status: 200 });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      {
        status: 'error',
        errors: [{ field: 'email', message: 'Failed to send email. Please try again.' }],
      },
      { status: 500 },
    );
  }
}
