import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendLeadEmail, escapeHtml } from '@/lib/email';

// Re-validate the booking on the server — never trust the client.
const appointmentSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  phone: z
    .string()
    .trim()
    .min(7)
    .max(32)
    .regex(/^[\d\s()+\-.]{7,32}$/),
  address: z.string().trim().min(5).max(200),
  service: z.string().trim().min(1).max(80),
  // ISO date string (yyyy-mm-dd) from the booking calendar.
  date: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date'),
  time: z.string().trim().regex(/^\d{2}:\d{2}$/, 'Invalid time'),
  notes: z.string().trim().max(2000).optional().or(z.literal('')),
  company: z.string().max(100).optional(), // honeypot (accept any value, drop below)
});

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const parsed = appointmentSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'invalid_input', issues: parsed.error.issues },
      { status: 400 }
    );
  }

  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const d = parsed.data;
  const notes = d.notes?.trim() || '—';

  const text = [
    'New appointment booking from manaseerz.com',
    '',
    `Name:    ${d.name}`,
    `Email:   ${d.email}`,
    `Phone:   ${d.phone}`,
    `Address: ${d.address}`,
    `Service: ${d.service}`,
    `Date:    ${d.date}`,
    `Time:    ${d.time}`,
    '',
    'Notes:',
    notes,
  ].join('\n');

  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.5;color:#111">
      <h2 style="margin:0 0 12px">New appointment booking from manaseerz.com</h2>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse">
        ${row('Name', d.name)}${row('Email', d.email)}${row('Phone', d.phone)}
        ${row('Address', d.address)}${row('Service', d.service)}
        ${row('Date', d.date)}${row('Time', d.time)}
      </table>
      <h3 style="margin:16px 0 4px">Notes</h3>
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(notes)}</p>
    </div>`;

  const result = await sendLeadEmail({
    subject: `New booking — ${d.service} on ${d.date} at ${d.time} (${d.name})`,
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
