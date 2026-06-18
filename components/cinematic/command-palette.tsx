'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Search, Phone, Mail, Calendar, ArrowRight, X } from 'lucide-react';

type Command = {
  id: string;
  label: string;
  hint?: string;
  icon: React.ReactNode;
  action: () => void;
  keywords?: string;
  group: 'navigate' | 'contact' | 'services';
};

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const reduceMotion = useReducedMotion();

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }
    setIsOpen(false);
  }, [reduceMotion]);

  const commands: Command[] = [
    {
      id: 'nav-hero',
      label: 'Go to Home',
      hint: 'Top of page',
      icon: <ArrowRight className="w-4 h-4" />,
      action: () => scrollToSection('hero'),
      group: 'navigate',
    },
    {
      id: 'nav-services',
      label: 'View Services',
      hint: 'EV, Chandeliers, Smart Home',
      icon: <ArrowRight className="w-4 h-4" />,
      action: () => scrollToSection('services'),
      keywords: 'ev charger chandelier smart home panel renovation',
      group: 'navigate',
    },
    {
      id: 'nav-quote',
      label: 'Get a Quote',
      hint: 'Instant pricing',
      icon: <Calendar className="w-4 h-4" />,
      action: () => scrollToSection('quote'),
      keywords: 'price cost estimate calculator',
      group: 'navigate',
    },
    {
      id: 'nav-portfolio',
      label: 'View Portfolio',
      hint: 'Recent projects',
      icon: <ArrowRight className="w-4 h-4" />,
      action: () => scrollToSection('portfolio'),
      keywords: 'work projects gallery',
      group: 'navigate',
    },
    {
      id: 'nav-reviews',
      label: 'Read Reviews',
      hint: 'Customer testimonials',
      icon: <ArrowRight className="w-4 h-4" />,
      action: () => scrollToSection('reviews'),
      keywords: 'testimonials feedback',
      group: 'navigate',
    },
    {
      id: 'nav-contact',
      label: 'Contact Us',
      hint: 'Send a message',
      icon: <Mail className="w-4 h-4" />,
      action: () => scrollToSection('contact'),
      keywords: 'email message form',
      group: 'contact',
    },
    {
      id: 'call',
      label: 'Call Now',
      hint: 'Direct phone call',
      icon: <Phone className="w-4 h-4" />,
      action: () => {
        window.location.href = 'tel:+14691234567';
        setIsOpen(false);
      },
      keywords: 'phone call contact',
      group: 'contact',
    },
  ];

  const filtered = commands.filter((cmd) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      cmd.label.toLowerCase().includes(q) ||
      cmd.hint?.toLowerCase().includes(q) ||
      cmd.keywords?.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const timer = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(timer);
    } else {
      setQuery('');
      setActiveIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      filtered[activeIndex]?.action();
    }
  };

  const grouped = filtered.reduce((acc, cmd) => {
    if (!acc[cmd.group]) acc[cmd.group] = [];
    acc[cmd.group].push(cmd);
    return acc;
  }, {} as Record<string, Command[]>);

  const groupLabels: Record<string, string> = {
    navigate: 'Navigate',
    services: 'Services',
    contact: 'Contact',
  };

  let runningIndex = -1;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs text-[var(--color-text-muted)] border border-[var(--color-surface-800)] rounded-md hover:border-[var(--color-gold-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
        aria-label="Open command palette"
      >
        <Search className="w-3.5 h-3.5" />
        <span>Search</span>
        <kbd className="ml-2 px-1.5 py-0.5 text-[10px] font-mono bg-[var(--color-surface-800)] rounded">
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4"
            onClick={() => setIsOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <div className="absolute inset-0 bg-[var(--color-black-pure)]/70 backdrop-blur-md" />

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.98, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl bg-[var(--color-surface-900)] border border-[var(--color-surface-800)] rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--color-surface-800)]">
                <Search className="w-4 h-4 text-[var(--color-text-muted)] flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none text-sm"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="max-h-[400px] overflow-y-auto py-2">
                {filtered.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-[var(--color-text-muted)]">
                    No results for &ldquo;{query}&rdquo;
                  </div>
                ) : (
                  Object.entries(grouped).map(([group, cmds]) => (
                    <div key={group} className="mb-2">
                      <div className="px-4 py-1 text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">
                        {groupLabels[group]}
                      </div>
                      {cmds.map((cmd) => {
                        runningIndex++;
                        const isActive = runningIndex === activeIndex;
                        const myIndex = runningIndex;
                        return (
                          <button
                            key={cmd.id}
                            onClick={cmd.action}
                            onMouseEnter={() => setActiveIndex(myIndex)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                              isActive
                                ? 'bg-[var(--color-surface-800)] text-[var(--color-text-primary)]'
                                : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-800)]/50'
                            }`}
                          >
                            <span className="text-[var(--color-gold-muted)]">{cmd.icon}</span>
                            <span className="flex-1 text-sm font-medium">{cmd.label}</span>
                            {cmd.hint && (
                              <span className="text-xs text-[var(--color-text-muted)]">
                                {cmd.hint}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              <div className="flex items-center justify-between px-4 py-2 border-t border-[var(--color-surface-800)] text-[10px] text-[var(--color-text-muted)]">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-[var(--color-surface-800)] rounded font-mono">↑↓</kbd>
                    Navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-[var(--color-surface-800)] rounded font-mono">↵</kbd>
                    Select
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-[var(--color-surface-800)] rounded font-mono">esc</kbd>
                    Close
                  </span>
                </div>
                <span className="text-[var(--color-gold-muted)]">Manaseerz Electric</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
