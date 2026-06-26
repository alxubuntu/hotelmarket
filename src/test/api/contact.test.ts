import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

// ── Mock email module ──────────────────────────────────────────────────────────
vi.mock('@/lib/email', () => ({
  sendEmail: vi.fn().mockResolvedValue(undefined),
  buildContactEmailHtml: vi.fn().mockReturnValue('<html></html>'),
}));

import { POST } from '@/app/api/contact/route';
import { sendEmail } from '@/lib/email';

// ── Unique IP counter to avoid rate limit cross-contamination ──────────────────
let ipCounter = 0;
function freshIp(): string {
  return `10.0.${Math.floor(ipCounter++ / 256)}.${ipCounter % 256}`;
}

// ── Helper: build a valid contact payload ──────────────────────────────────────
function validPayload(overrides?: Partial<{ name: string; email: string; subject: string; message: string }>) {
  return {
    name: 'Jane Doe',
    email: 'jane@example.com',
    subject: 'general',
    message: 'Hello, I have a question about your platform.',
    ...overrides,
  };
}

// ── Helper: create a NextRequest with optional IP header ───────────────────────
function makeRequest(body: unknown, ip?: string): NextRequest {
  const headers: Record<string, string> = {
    'content-type': 'application/json',
  };
  if (ip) {
    headers['x-forwarded-for'] = ip;
  }
  return new NextRequest('http://localhost:3000/api/contact', {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
}

// ── Zod Validation Tests ──────────────────────────────────────────────────────
describe('Contact API – Zod validation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 200 for a valid payload', async () => {
    const req = makeRequest(validPayload(), freshIp());
    const res = await POST(req);

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.status).toBe('success');
    expect(sendEmail).toHaveBeenCalledTimes(1);
  });

  it('returns 400 when required fields are missing', async () => {
    const req = makeRequest({}, freshIp());
    const res = await POST(req);

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.status).toBe('error');
    expect(json.errors.length).toBeGreaterThanOrEqual(1);
  });

  it('returns 400 for an invalid email', async () => {
    const req = makeRequest(validPayload({ email: 'not-an-email' }), freshIp());
    const res = await POST(req);

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.errors[0].field).toBe('email');
    expect(json.errors[0].message).toMatch(/valid email/i);
  });

  it('returns 400 for an invalid subject enum value', async () => {
    const req = makeRequest(validPayload({ subject: 'invalid-subject' }), freshIp());
    const res = await POST(req);

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.errors[0].field).toBe('subject');
  });

  it('returns 400 for a message that is too short', async () => {
    const req = makeRequest(validPayload({ message: 'short' }), freshIp());
    const res = await POST(req);

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.errors[0].field).toBe('message');
  });

  it('returns 400 for a name that is too short', async () => {
    const req = makeRequest(validPayload({ name: 'J' }), freshIp());
    const res = await POST(req);

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.errors[0].field).toBe('name');
  });
});

// ── Rate Limiter Tests ────────────────────────────────────────────────────────
describe('Contact API – Rate limiter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('allows requests within the rate limit (5 per minute)', async () => {
    const ip = freshIp();
    for (let i = 0; i < 5; i++) {
      const req = makeRequest(validPayload(), ip);
      const res = await POST(req);
      expect(res.status).toBe(200);
    }
  });

  it('blocks the 6th request with 429', async () => {
    const ip = freshIp();
    for (let i = 0; i < 5; i++) {
      await POST(makeRequest(validPayload(), ip));
    }
    const req = makeRequest(validPayload(), ip);
    const res = await POST(req);

    expect(res.status).toBe(429);
    const json = await res.json();
    expect(json.status).toBe('rate_limited');
    expect(json.retryAfter).toBeGreaterThan(0);
  });

  it('resets the counter after the window expires', async () => {
    const ip = freshIp();
    const originalNow = Date.now;
    const baseTime = originalNow();

    let now = baseTime;
    Date.now = () => now;
    for (let i = 0; i < 5; i++) {
      await POST(makeRequest(validPayload(), ip));
    }

    // Advance past the 60s window
    now = baseTime + 61_000;

    const req = makeRequest(validPayload(), ip);
    const res = await POST(req);
    expect(res.status).toBe(200);

    Date.now = originalNow;
  });
});

// ── API Handler Tests ──────────────────────────────────────────────────────────
describe('Contact API – Handler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 200 on success with correct email content', async () => {
    const req = makeRequest(validPayload(), freshIp());
    const res = await POST(req);

    expect(res.status).toBe(200);
    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: expect.stringContaining('General Inquiry'),
      }),
    );
  });

  it('returns 400 on validation error with structured errors', async () => {
    const req = makeRequest({ name: '', email: 'bad', subject: 'x', message: '' }, freshIp());
    const res = await POST(req);

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.status).toBe('error');
    expect(Array.isArray(json.errors)).toBe(true);
    expect(json.errors.length).toBeGreaterThanOrEqual(1);
    expect(json.errors[0]).toHaveProperty('field');
    expect(json.errors[0]).toHaveProperty('message');
  });

  it('returns 429 on rate limit with retryAfter', async () => {
    const ip = freshIp();
    for (let i = 0; i < 5; i++) {
      await POST(makeRequest(validPayload(), ip));
    }

    const req = makeRequest(validPayload(), ip);
    const res = await POST(req);

    expect(res.status).toBe(429);
    const json = await res.json();
    expect(json).toHaveProperty('retryAfter');
  });

  it('returns 500 when email sending fails', async () => {
    vi.mocked(sendEmail).mockRejectedValueOnce(new Error('Resend API down'));

    const req = makeRequest(validPayload(), freshIp());
    const res = await POST(req);

    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.status).toBe('error');
  });

  it('returns 400 when body is not valid JSON', async () => {
    const req = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': freshIp() },
      body: 'not json at all',
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.errors[0].field).toBe('body');
  });
});
