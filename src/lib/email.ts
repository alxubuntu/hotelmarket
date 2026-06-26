import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type EmailPayload = {
  to: string;
  from: string;
  subject: string;
  html: string;
};

/**
 * Send an email via Resend.
 * Configured via RESEND_API_KEY and CONTACT_EMAIL_TO env vars.
 */
export async function sendEmail(payload: EmailPayload): Promise<void> {
  const { error } = await resend.emails.send({
    from: payload.from,
    to: payload.to,
    subject: payload.subject,
    html: payload.html,
  });

  if (error) {
    throw new Error(`Email send failed: ${error.message}`);
  }
}

/**
 * Build the HTML content for a contact form submission.
 */
export function buildContactEmailHtml(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): string {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1e3a5f;">New Contact Form Submission</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #495057;">Name:</td>
          <td style="padding: 8px 0; color: #212529;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #495057;">Email:</td>
          <td style="padding: 8px 0; color: #212529;">${data.email}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #495057;">Subject:</td>
          <td style="padding: 8px 0; color: #212529;">${data.subject}</td>
        </tr>
      </table>
      <hr style="border: none; border-top: 1px solid #dee2e6; margin: 16px 0;" />
      <p style="color: #495057; line-height: 1.6;">${data.message}</p>
    </div>
  `;
}
