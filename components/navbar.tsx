'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X } from '@/lib/icons';
import { useState, useEffect } from 'react';
import { smoothScroll, cn } from '@/lib/utils';
import { Logo } from '@/components/logo';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['services', 'portfolio', 'reviews', 'about', 'contact'];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Projects', href: '#portfolio', id: 'portfolio' },
    { label: 'Reviews', href: '#reviews', id: 'reviews' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed z-[var(--z-sticky)] transition-all duration-500',
          isScrolled
            ? 'top-2 left-2 right-2 lg:top-3 lg:left-4 lg:right-4'
            : 'top-0 left-0 right-0'
        )}
      >
        <div
          className={cn(
            'mx-auto transition-all duration-500',
            isScrolled
              ? 'max-w-6xl rounded-2xl bg-[var(--color-black-rich)]/80 backdrop-blur-xl border border-[var(--color-surface-700)]/60 shadow-2xl'
              : 'max-w-7xl bg-transparent'
          )}
        >
          <div className="flex h-16 lg:h-18 items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Logo */}
            <button
              onClick={() => smoothScroll('main-content')}
              className="cursor-pointer transition-opacity hover:opacity-80"
              aria-label="Go to top"
            >
              <Logo size="md" showText={true} />
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      smoothScroll(link.href.slice(1));
                    }}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'relative cursor-pointer px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg',
                      isActive
                        ? 'text-[var(--color-gold-primary)]'
                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-lg bg-[var(--color-gold-primary)]/10 border border-[var(--color-gold-primary)]/20"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-2">
              <a
                href="tel:6824515951"
                className="flex items-center gap-2 cursor-pointer px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-200 rounded-lg"
              >
                <Phone className="h-4 w-4" />
                <span className="hidden xl:inline">(682) 451-5951</span>
              </a>
              <a
                href="/book-appointment"
                className="cursor-pointer px-5 py-2.5 rounded-lg bg-[var(--color-gold-primary)] text-[var(--color-black-pure)] text-sm font-semibold hover:bg-[var(--color-gold-light)] transition-colors duration-200"
              >
                Book Appointment
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden cursor-pointer rounded-lg p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-[var(--color-text-primary)] hover:bg-[var(--color-surface-800)] transition-colors duration-200"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[var(--z-sticky)] bg-[var(--color-black-pure)]/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-20 left-2 right-2 z-[1001] lg:hidden rounded-2xl border border-[var(--color-surface-700)] bg-[var(--color-black-rich)] shadow-2xl overflow-hidden"
            >
              <div className="p-3">
                {navLinks.map((link, index) => {
                  const isActive = activeSection === link.id;
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + index * 0.05 }}
                      onClick={(e) => {
                        e.preventDefault();
                        smoothScroll(link.href.slice(1));
                        setIsMobileMenuOpen(false);
                      }}
                      className={cn(
                        'flex items-center justify-between cursor-pointer rounded-xl px-4 min-h-[52px] text-base font-medium transition-colors duration-200',
                        isActive
                          ? 'text-[var(--color-gold-primary)] bg-[var(--color-gold-primary)]/10'
                          : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-800)] hover:text-[var(--color-text-primary)]'
                      )}
                    >
                      {link.label}
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold-primary)]" />
                      )}
                    </motion.a>
                  );
                })}

                <div className="pt-3 mt-3 border-t border-[var(--color-surface-800)] space-y-2">
                  <a
                    href="tel:6824515951"
                    className="flex items-center gap-3 cursor-pointer rounded-xl px-4 min-h-[52px] font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-800)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
                  >
                    <span className="w-9 h-9 rounded-full bg-[var(--color-surface-800)] flex items-center justify-center">
                      <Phone className="h-4 w-4 text-[var(--color-gold-primary)]" />
                    </span>
                    <div>
                      <div className="text-xs text-[var(--color-text-muted)]">Call now</div>
                      <div className="text-sm text-[var(--color-text-primary)]">(682) 451-5951</div>
                    </div>
                  </a>
                  <a
                    href="/book-appointment"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center cursor-pointer rounded-xl bg-[var(--color-gold-primary)] px-6 min-h-[52px] font-semibold text-[var(--color-black-pure)] hover:bg-[var(--color-gold-light)] transition-colors duration-200"
                  >
                    Book Appointment
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Sticky Call Button */}
      <motion.a
        href="tel:6824515951"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.8, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-4 right-4 z-50 lg:hidden flex items-center gap-2 rounded-full px-5 h-14 shadow-2xl"
        style={{ backgroundColor: 'var(--color-gold-primary)' }}
        aria-label="Call now"
      >
        <Phone className="h-5 w-5" style={{ color: 'var(--color-black-pure)' }} />
        <span className="text-sm font-semibold" style={{ color: 'var(--color-black-pure)' }}>Call Now</span>
      </motion.a>
    </>
  );
}
