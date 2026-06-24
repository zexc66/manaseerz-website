'use client';

import { Chatbot } from './chatbot';
import { WhatsAppButton } from './whatsapp-button';
import { BackToTop } from './back-to-top';
import { ScrollProgress } from './scroll-progress';

/**
 * The floating UI layer rendered once in the root layout so every route gets
 * the chatbot, WhatsApp button, and back-to-top control consistently — instead
 * of each page mounting (and possibly duplicating) them.
 *
 * Toaster is intentionally NOT included here: it holds page-scoped listener
 * state, so it must stay mounted once per route (in each page shell) to avoid
 * double-rendering toasts.
 */
export function FloatingWidgets() {
  return (
    <>
      <ScrollProgress />
      <Chatbot />
      <WhatsAppButton />
      <BackToTop />
    </>
  );
}
