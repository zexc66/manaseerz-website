'use client';

import { trackCTAClick } from '@/lib/analytics';

// WhatsApp business number for Manaseerz Electric.
// (682) 451-5951 -> +1 country code -> E.164 without the "+" for wa.me.
const WHATSAPP_NUMBER = '16824515951';
const WHATSAPP_MESSAGE =
  "Hi Manaseerz Electric! I'd like to get a quote / ask about your services.";

/**
 * Floating WhatsApp contact button.
 *
 * Placement: bottom-LEFT. The bottom-right is already occupied by the chatbot
 * launcher (and, on mobile, the phone CTA), so the left side keeps the buttons
 * from colliding and balances the viewport.
 *
 * Accessibility: real <a> (keyboard-focusable, opens in a new tab), descriptive
 * aria-label, and the attention pulse is a CSS animation so the site-wide
 * prefers-reduced-motion rule disables it automatically.
 */
export function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackCTAClick('WhatsApp Float', 'Floating Button')}
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 left-5 z-[var(--z-sticky)] flex items-center"
    >
      {/* Pulse ring (CSS animation, auto-disabled under prefers-reduced-motion) */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 -z-10 h-14 w-14 rounded-full bg-[#25D366] opacity-60 whatsapp-pulse"
      />
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_8px_24px_rgba(37,211,102,0.45)] transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
        <WhatsAppIcon className="h-7 w-7 text-white" />
      </span>
      {/* Tooltip — desktop only */}
      <span className="pointer-events-none ml-3 hidden whitespace-nowrap rounded-lg border border-[var(--color-surface-800)] bg-[var(--color-surface-900)]/95 px-3 py-2 text-sm font-medium text-[var(--color-text-primary)] opacity-0 shadow-lg backdrop-blur transition-opacity duration-300 group-hover:opacity-100 lg:block">
        Chat with us
      </span>
    </a>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  // Official WhatsApp glyph.
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M16.003 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.257.59 4.46 1.71 6.402L3.2 28.8l6.55-1.717a12.72 12.72 0 0 0 6.253 1.592h.005c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.332-6.635-3.75-9.052A12.71 12.71 0 0 0 16.003 3.2zm0 23.04h-.004a10.6 10.6 0 0 1-5.4-1.48l-.387-.23-4.02 1.054 1.073-3.92-.252-.4a10.58 10.58 0 0 1-1.62-5.644c0-5.85 4.76-10.61 10.61-10.61 2.835 0 5.497 1.105 7.5 3.11a10.51 10.51 0 0 1 3.103 7.5c0 5.85-4.76 10.61-10.61 10.61zm5.82-7.93c-.32-.16-1.887-.93-2.177-1.037-.292-.107-.504-.16-.715.16-.21.32-.82 1.037-1.005 1.248-.185.21-.37.237-.685.08-.32-.16-1.35-.498-2.57-1.586-.95-.847-1.59-1.893-1.775-2.213-.185-.32-.02-.493.14-.652.144-.143.32-.37.48-.555.16-.185.21-.32.317-.53.106-.213.053-.398-.027-.558-.08-.16-.715-1.723-.98-2.358-.258-.62-.52-.535-.715-.545l-.61-.01c-.21 0-.555.08-.846.4-.29.32-1.11 1.085-1.11 2.645 0 1.56 1.137 3.066 1.295 3.28.16.21 2.234 3.41 5.41 4.78.756.326 1.346.522 1.806.668.76.24 1.45.207 1.996.126.61-.09 1.887-.77 2.153-1.514.266-.743.266-1.38.186-1.513-.08-.133-.29-.213-.61-.373z" />
    </svg>
  );
}
