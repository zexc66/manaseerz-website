'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { contactInfo } from '@/lib/data';

type ExitIntentModalProps = {
  /** Session storage key to prevent repeat shows */
  storageKey?: string;
  /** Seconds before showing on mobile scroll-up (no mouseleave on touch) */
  scrollThreshold?: number;
  /** Show again after X hours */
  cooldownHours?: number;
};

export function ExitIntentModal({
  storageKey = 'exit-intent-shown',
  scrollThreshold = 10,
  cooldownHours = 24,
}: ExitIntentModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const lastShown = sessionStorage.getItem(storageKey);
    if (lastShown) {
      const hoursSince = (Date.now() - parseInt(lastShown, 10)) / (1000 * 60 * 60);
      if (hoursSince < cooldownHours) {
        setHasShown(true);
        return;
      }
    }

    let isMobile = window.matchMedia('(max-width: 768px)').matches;

    const handleMouseLeave = (e: MouseEvent) => {
      if (hasShown || isMobile) return;
      if (e.clientY <= 0) {
        triggerModal();
      }
    };

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (hasShown || !isMobile) return;
      const currentY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const scrolled = (currentY / docHeight) * 100;
      if (currentY < lastScrollY && scrolled > scrollThreshold) {
        triggerModal();
      }
      lastScrollY = currentY;
    };

    const triggerModal = () => {
      if (hasShown) return;
      setIsOpen(true);
      setHasShown(true);
      sessionStorage.setItem(storageKey, Date.now().toString());
    };

    const checkMobile = () => {
      isMobile = window.matchMedia('(max-width: 768px)').matches;
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkMobile);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, [hasShown, storageKey, scrollThreshold, cooldownHours]);

  const close = () => setIsOpen(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-modal-title"
        >
          <div className="absolute inset-0 bg-[var(--color-black-pure)]/85 backdrop-blur-md" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-[var(--color-surface-900)] border border-[var(--color-gold-muted)]/40 rounded-2xl shadow-2xl overflow-hidden"
          >
            <button
              onClick={close}
              className="absolute top-4 right-4 p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[var(--color-gold-primary)] opacity-10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative p-6 sm:p-8">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[var(--color-gold-primary)]/15 border border-[var(--color-gold-primary)]/30 rounded-full mb-4">
                <Sparkles className="w-3 h-3 text-[var(--color-gold-primary)]" />
                <span className="text-[10px] uppercase tracking-wider text-[var(--color-gold-primary)] font-semibold">
                  Wait — Special Offer
                </span>
              </div>

              <h2 id="exit-modal-title" className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-3">
                Get a <span className="text-[var(--color-gold-primary)]">Free Diagnostic</span>
                <br />
                with your booking today
              </h2>

              <p className="text-[var(--color-text-secondary)] mb-6">
                Before you go: book any service this week and we&apos;ll include a free whole-home electrical safety diagnostic
                <span className="text-[var(--color-text-primary)] font-medium"> (a $150 value)</span> — at no extra cost.
              </p>

              <div className="flex flex-col gap-2">
                <a
                  href="/book-appointment"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[var(--color-gold-primary)] hover:bg-[var(--color-gold-light)] text-[var(--color-black-pure)] font-semibold rounded-lg transition-colors"
                >
                  Claim My Free Diagnostic
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] text-sm transition-colors"
                >
                  Or call {contactInfo.phone}
                </a>
              </div>

              <p className="text-[10px] text-[var(--color-text-muted)] mt-4 text-center">
                Limited to first-time bookings. Mention this offer when booking.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
