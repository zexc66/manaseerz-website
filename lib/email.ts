/**
 * Lead delivery via Resend (https://resend.com).
 *
 * Uses fetch directly against Resend's REST API so we add zero runtime
 * dependencies. To go live, set these env vars (see .env.example):
 *   RESEND_API_KEY  — Resend API key
 *   RESEND_FROM     — verified sender, e.g. "Manaseerz Electric <leads@manaseerz.com>"
 *   CONTACT_EMAIL   — inbox that receives leads, e.g. "info@manaseerz.com"
 *
 * When RESEND_API_KEY is absent (e.g. local dev), submissions are logged to
 * the server console and reported as delivered, so the end-to-end flow still
 * works for testing. A clear `dev` flag is returned so callers/tests can tell.
 */

export interface LeadEmail {
  subject: string;
  /** Plain-text body. */
  text: string;
  /** Optional HTML body (escaped by caller). */
  html?: string;
  /** Optional Reply-To header (the lead's email). */
  replyTo?: string;
}

export interface SendResult {
  ok: boolean;
  dev?: boolean;
  error?: string;
}

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

export async function sendLeadEmail(lead: LeadEmail): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || 'Manaseerz Electric <onboarding@resend.dev>';
  const to = process.env.CONTACT_EMAIL || 'info@manaseerz.com';

  // No key configured → dev fallback. Never fail the UX for a missing secret.
  if (!apiKey) {
    console.warn(
      '[email] RESEND_API_KEY not set — logging lead to console instead of sending. ' +
        'Set it (plus RESEND_FROM / CONTACT_EMAIL) to deliver real emails.'
    );
    console.log('[email] LEAD (dev fallback)\n' + lead.text);
    return { ok: true, dev: true };
  }

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: lead.replyTo,
        subject: lead.subject,
        text: lead.text,
        html: lead.html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      console.error('[email] Resend API error', res.status, detail);
      return { ok: false, error: 'delivery_failed' };
    }

    return { ok: true };
  } catch (err) {
    // Never leak internal error details to the client.
    console.error('[email] sendLeadEmail exception', err);
    return { ok: false, error: 'delivery_exception' };
  }
}

/** Escape user-controlled text for safe interpolation into HTML email bodies. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
