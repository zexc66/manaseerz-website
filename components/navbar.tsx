'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X } from '@/lib/icons';
import { useState, useEffect } from 'react';
import { smoothScroll, cn } from '@/lib/utils';

const BANNER_HEIGHT = 36; // px — kept in sync with the strip's h-9 below
const BANNER_KEY = 'manaseerz:emergency-banner-dismissed';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Emergency banner — dismissible, persisted so it stays closed across reloads.
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Read after mount so SSR/CSR markup match (no hydration mismatch).
    setShowBanner(!localStorage.getItem(BANNER_KEY));
  }, []);

  const dismissBanner = () => {
    try { localStorage.setItem(BANNER_KEY, '1'); } catch {}
    setShowBanner(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Emergency call banner — slim gold strip at the very top, dismissible.
          Highest-margin jobs for an electrician are emergencies, so the 24/7
          number is always one tap away. Sits above the navbar (higher z); when
          shown, the navbar is pushed down by the banner height. */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: BANNER_HEIGHT, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed top-0 left-0 right-0 z-[1085] overflow-hidden bg-[var(--color-gold-primary)] text-[var(--color-black-pure)]"
          >
            <div className="mx-auto flex h-9 max-w-7xl items-center justify-center gap-2 px-4 text-center text-xs font-semibold sm:text-sm">
              <a
                href="tel:6824515951"
                className="flex items-center gap-2 transition-opacity hover:opacity-80"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>24/7 Emergency Electrical Service · Call (682) 451-5951</span>
              </a>
              <button
                onClick={dismissBanner}
                aria-label="Dismiss emergency banner"
                className="absolute right-3 flex h-6 w-6 items-center justify-center rounded-full transition-colors hover:bg-black/10"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ top: showBanner ? BANNER_HEIGHT : 0 }}
        className={cn(
          'fixed left-0 right-0 z-[var(--z-sticky)] transition-all duration-300',
          isScrolled
            ? 'bg-[var(--color-black-rich)]/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-gold-primary)]">
                <Zap className="h-6 w-6 text-[var(--color-black-pure)]" />
              </div>
              <div>
                <h1 className="font-display text-xl font-bold text-[var(--color-text-primary)]">
                  MANASEERZ
                </h1>
                <p className="text-xs text-[var(--color-gold-primary)]">
                  ELECTRIC
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
               {navLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    if (link.href.startsWith('#')) {
                      e.preventDefault();
                      smoothScroll(link.href.slice(1));
                    }
                  }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1, duration: 0.5, ease: "easeOut" }}
                  whileHover={{ y: -2 }}
                  className="text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-gold-primary)]"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="hidden lg:flex items-center gap-3"
            >
              <a
                href="/book-appointment"
                className="px-4 py-2 rounded-lg border-2 border-[var(--color-gold-primary)] text-[var(--color-gold-primary)] font-medium transition-all hover:bg-[var(--color-gold-primary)] hover:text-[var(--color-black-pure)]"
              >
                Book Appointment
              </a>
              <a
                href="tel:6824515951"
                className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-gold-primary)]"
              >
                <Phone className="h-4 w-4" />
                (682) 451-5951
              </a>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden rounded-lg p-2 text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-surface-800)]"
              aria-label="Toggle menu"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden border-t border-[var(--color-surface-800)] bg-[var(--color-black-rich)]"
            >
            <div className="space-y-2 px-4 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    if (link.href.startsWith('#')) {
                      e.preventDefault();
                      smoothScroll(link.href.slice(1));
                    }
                    setIsMobileMenuOpen(false);
                  }}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-800)] hover:text-[var(--color-gold-primary)]"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-[var(--color-surface-800)] space-y-3">
                <a
                  href="tel:6824515951"
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-800)] hover:text-[var(--color-gold-primary)]"
                >
                  <Phone className="h-4 w-4" />
                  (682) 451-5951
                </a>
                <button
                  onClick={() => {
                    smoothScroll('contact');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full rounded-lg bg-[var(--color-gold-primary)] px-6 py-3 text-sm font-semibold text-[var(--color-black-pure)] transition-all hover:bg-[var(--color-gold-light)]"
                >
                  Get Free Quote
                </button>
              </div>
            </div>
          </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Sticky CTA — sits above the chatbot launcher
          (bottom-right) so the two no longer overlap. WhatsApp lives
          bottom-left, so the full mobile contact layout is balanced. */}
      <motion.a
        href="tel:6824515951"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 right-4 z-[var(--z-sticky)] lg:hidden rounded-full bg-[var(--color-gold-primary)] p-4 shadow-[var(--shadow-gold)]"
        aria-label="Call now"
      >
        <Phone className="h-6 w-6 text-[var(--color-black-pure)]" />
      </motion.a>
    </>
  );
}

function Zap({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}