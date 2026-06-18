'use client';

import { motion } from 'framer-motion';
import { Phone, Menu, X } from '@/lib/icons';
import { useState, useEffect } from 'react';
import { smoothScroll, cn } from '@/lib/utils';
import { Logo } from '@/components/logo';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#portfolio' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          'fixed top-0 left-0 right-0 z-[var(--z-sticky)] transition-all duration-300',
          isScrolled
            ? 'bg-[var(--color-black-rich)]/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        )}
      >
         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
           <div className="flex h-20 items-center justify-between">
             {/* Logo */}
             <Logo size="md" showText={true} />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
               {navLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScroll(link.href.slice(1));
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
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-[var(--color-surface-800)] bg-[var(--color-black-rich)]"
          >
            <div className="space-y-2 px-4 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScroll(link.href.slice(1));
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
      </motion.nav>

      {/* Mobile Sticky CTA */}
      <motion.a
        href="tel:6824515951"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-4 right-4 z-[var(--z-sticky)] lg:hidden rounded-full bg-[var(--color-gold-primary)] p-4 shadow-[var(--shadow-gold)]"
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