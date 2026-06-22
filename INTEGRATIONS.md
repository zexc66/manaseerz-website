# Manaseerz Electric — External Integrations Setup Guide

This guide covers integrations that require third-party accounts or API keys.
All client-side UI components are already built — these are the **missing backend pieces**.

---

## 1. AI Voice Receptionist (24/7 Call Answering)

**Service:** Retell AI (recommended) or Vapi.ai
**Why:** Service businesses miss 60-80% of inbound calls during jobs. AI recovers 28-30%.

### Setup
1. Sign up at https://retellai.com (free trial, ~$0.10/call after)
2. Create an agent with this prompt:
   ```
   You are the receptionist for Manaseerz Electric, a licensed electrical
   contractor serving the Dallas-Fort Worth metroplex. Services: EV chargers
   ($300-800), chandeliers ($150-500), smart switches ($100-400), panel
   upgrades ($1500-3000), renovations ($500-3000). Hours: Mon-Sat 7AM-7PM.
   Emergency service 24/7. Phone: (682) 451-5951.

   Your job: qualify the caller, book into the calendar, text a confirmation.
   For emergencies (burning smell, sparks, no power), warm-transfer to
   (682) 451-5951 immediately.

   Be warm, professional, Texas-friendly. Never quote prices below our
   ranges. Always confirm the DFW city they're in.
   ```
3. Connect to your phone number (port or new number)
4. Connect to Google Calendar for booking
5. Set webhook to POST transcripts to: `https://manaseerz-web.vercel.app/api/call-log`

### Cost
- ~$0.10/minute per call
- ~$30/month for phone number
- ROI: 1 recovered job/month pays for it

---

## 2. SMS Appointment Reminders + Review Requests

**Service:** Twilio (recommended)
**Why:** Review velocity is #1 local SEO ranking factor. Automated reminders cut no-shows.

### Setup
1. Sign up at https://twilio.com (free trial, then ~$0.0079/SMS)
2. Buy a DFW number: $1.15/month
3. Add to `.env.local`:
   ```
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=xxxxxxxxxxxx
   TWILIO_PHONE_NUMBER=+1XXXXXXXXXX
   ```
4. Create the API route at `app/api/sms/route.ts`:
   ```typescript
   import twilio from 'twilio';
   const client = twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!);

   export async function POST(req: Request) {
     const { to, message } = await req.json();
     const result = await client.messages.create({
       body: message,
       from: process.env.TWILIO_PHONE_NUMBER!,
       to,
     });
     return Response.json({ sid: result.sid });
   }
   ```
5. Automations to build (use Vercel Cron):
   - **24hr before appointment**: "Reminder: Manaseerz Electric tomorrow at [time]..."
   - **1hr after invoice paid**: "Thanks for choosing us! Review us: [Google link]"
   - **5 min after abandoned quote**: "Saw you checking EV pricing — any questions?"

### Vercel Cron
Add to `vercel.json`:
```json
{
  "crons": [
    { "path": "/api/cron/reminders", "schedule": "0 9 * * *" },
    { "path": "/api/cron/reviews", "schedule": "0 10 * * *" }
  ]
}
```

---

## 3. Live TDLR License Verification (Real API)

**Service:** TDLR Texas License Search (no API key — public data)
**Why:** Texas-specific trust moat. No DFW competitor does this.

### Setup
1. Find your license number at https://www.tdlr.texas.gov/LicenseSearch/
2. The UI is built in `components/interactive/license-verification.tsx`
3. Replace the mock in `verify()` with a real fetch:

```typescript
// Option A: Scrape TDLR search results (works, fragile)
const verify = async () => {
  setExpanded(true);
  setLoading(true);
  try {
    const res = await fetch(`/api/verify-license?number=${LICENSE_NUMBER}`);
    const data = await res.json();
    setVerification(data);
  } catch {
    // Fallback to known-good cached data
    setVerification(DEFAULT_LICENSE);
  }
  setLoading(false);
};

// Option B: Use licenseapi.dev ($19/mo, cleaner data)
// Option C: Manual monthly check + cached result (free, less real-time)
```

4. Create `app/api/verify-license/route.ts` to proxy the TDLR search

---

## 4. Gemini Vision for AI Photo Quote

**Service:** Google Gemini API (gemini-1.5-pro or gemini-2.0-flash)
**Why:** Turn the mock PhotoQuoteStub into a real working AI quote

### Setup
1. Get API key at https://aistudio.google.com/apikey (free tier: 15 req/min)
2. Add to `.env.local`:
   ```
   GEMINI_API_KEY=AIzaxxxxxxxxxxxx
   ```
3. Create `app/api/photo-quote/route.ts`:
   ```typescript
   import { GoogleGenerativeAI } from '@google/generative-ai';

   const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

   export async function POST(req: Request) {
     const formData = await req.formData();
     const image = formData.get('image') as File;
     const buffer = Buffer.from(await image.arrayBuffer());
     const base64 = buffer.toString('base64');

     const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
     const result = await model.generateContent([
       { text: `You are a master electrician in DFW Texas. Analyze this photo.
         Return JSON with: detectedService (string), estimatedRange {low, high},
         confidence ('low'|'medium'|'high'), observations (array of strings),
         nextStep (string). DFW 2026 pricing. Be conservative.` },
       { inlineData: { mimeType: image.type, data: base64 } },
     ]);

     return Response.json(JSON.parse(result.response.text()));
   }
   ```
4. Install: `npm install @google/generative-ai`
5. In `photo-quote-stub.tsx`, replace the mock `analyze()` with the real fetch
   (the integration point is clearly marked with comments in the file)

### Cost
- Free tier: 15 requests/min, 1500/day — plenty for a service business
- Paid: $0.0025/image after free tier
- ROI: Closes prospects who would have bounced at "we'll call you back"

---

## 5. Google Business Profile Automation

**Why:** GBP posts + review responses = strongest local ranking signal

### Setup
1. Claim/verify your GBP at https://business.google.com
2. Use the GBP API (free) via Vercel Cron:
   - Weekly post: storm readiness, seasonal load, EV demand
   - Auto-respond to reviews within 1hr using this template:
     ```
     "Thanks [Name]! Glad the [service] in your [city] home went smoothly.
     Call us anytime for [related service] — Manaseerz Electric"
     ```
3. Categories (CRITICAL):
   - **Primary:** Electrician (NOT Contractor)
   - **Additional:** EV charging station installer, Lighting contractor

---

## Priority Order

| # | Integration | Time | Cost | ROI |
|---|-------------|------|------|-----|
| 1 | Twilio SMS reminders | 2 hrs | $5/mo | High |
| 2 | GBP review automation | 1 hr | Free | High |
| 3 | Real TDLR verification | 1 hr | Free | High |
| 4 | Gemini Vision quote | 3 hrs | Free tier | Medium |
| 5 | Retell AI voice | 2 hrs | $30+/mo | High |

All UI is built. Each integration is ~1-3 hours of backend work + testing.
