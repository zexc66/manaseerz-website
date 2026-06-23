'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

/**
 * Floating "back to top" button.
 *
 * Appears once the user has scrolled past ~1.5 viewports, placed bottom-CENTER
 * so it never collides with the WhatsApp (bottom-left) or chatbot (bottom-right)
 * buttons. The fade/scale transitions are auto-disabled under
 * prefers-reduced-motion (global rule in globals.css).
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 1.5);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-5 left-1/2 z-[var(--z-sticky)] -translate-x-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-gold-primary)]/30 bg-[var(--color-surface-900)]/90 text-[var(--color-gold-primary)] shadow-lg backdrop-blur transition-colors hover:border-[var(--color-gold-primary)] hover:bg-[var(--color-gold-primary)] hover:text-[var(--color-black-pure)]"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
