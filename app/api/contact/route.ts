import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendLeadEmail, escapeHtml } from '@/lib/email';

// Contact-form submissions are untrusted input — re-validate on the server.
const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  phone: z
    .string()
    .trim()
    .min(7)
    .max(32)
    // Accept common formats; normalize loosely server-side.
    .regex(/^[\d\s()+\-.]{7,32}$/),
  city: z.string().trim().min(1).max(80),
  service: z.string().trim().min(1).max(80),
  message: z.string().trim().min(10).max(2000),
  // File binaries aren't shipped (would need blob storage); names only, for
  // the owner's awareness. Bounded to the form's 5-file limit.
  fileNames: z.array(z.string().max(120)).max(5).optional(),
  // Honeypot: accept any value here (so it parses), then silently drop filled
  // submissions below. Validating with max(0) would 400 them and tip bots off.
  company: z.string().max(100).optional(),
});

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'invalid_input', issues: parsed.error.issues },
      { status: 400 }
    );
  }

  // Honeypot trip → pretend success (don't tell bots they were caught).
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const d = parsed.data;
  const fileList = d.fileNames && d.fileNames.length > 0 ? d.fileNames.join(', ') : 'none';

  const text = [
    'New quote request from manaseerz.com',
    '',
    `Name:    ${d.name}`,
    `Email:   ${d.email}`,
    `Phone:   ${d.phone}`,
    `City:    ${d.city}`,
    `Service: ${d.service}`,
    `Files:   ${fileList}`,
    '',
    'Message:',
    d.message,
  ].join('\n');

  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.5;color:#111">
      <h2 style="margin:0 0 12px">New quote request from manaseerz.com</h2>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse">
        ${row('Name', d.name)}${row('Email', d.email)}${row('Phone', d.phone)}
        ${row('City', d.city)}${row('Service', d.service)}${row('Files', fileList)}
      </table>
      <h3 style="margin:16px 0 4px">Message</h3>
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(d.message)}</p>
    </div>`;

  const result = await sendLeadEmail({
    subject: `New quote request — ${d.service} (${d.name})`,
    text,
    html,
    replyTo: d.email,
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 502 });
  }

  return NextResponse.json({ ok: true, dev: result.dev });
}

function row(label: string, value: string) {
  return `<tr><td style="padding:2px 12px 2px 0;color:#666;font-weight:600">${label}</td><td>${escapeHtml(
    value
  )}</td></tr>`;
}
