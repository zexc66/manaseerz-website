'use client';

import { useState, useEffect } from 'react';

/**
 * Skip Navigation Link
 * Allows keyboard users to skip navigation and go directly to main content
 */
export function SkipNavigation() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[var(--color-gold-primary)] focus:text-[var(--color-black-pure)] focus:rounded-lg focus:font-semibold focus:outline-none focus:ring-4 focus:ring-[var(--color-gold-primary)]/50 transition-all"
    >
      Skip to main content
    </a>
  );
}

/**
 * Focus Management Hook
 * Ensures proper focus management for modals and dialogs
 */
export function useFocusManagement(isOpen: boolean) {
  useEffect(() => {
    if (isOpen) {
      // Trap focus within modal
      const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusable = focusableElements[0] as HTMLElement;
      const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTab = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
              e.preventDefault();
              lastFocusable?.focus();
            }
          } else {
            if (document.activeElement === lastFocusable) {
              e.preventDefault();
              firstFocusable?.focus();
            }
          }
        }
      };

      document.addEventListener('keydown', handleTab);
      firstFocusable?.focus();

      return () => {
        document.removeEventListener('keydown', handleTab);
      };
    }
  }, [isOpen]);
}

/**
 * Keyboard Navigation Hook
 * Adds keyboard shortcuts for common actions
 */
export function useKeyboardNavigation() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Press '/' to focus search (if search exists)
      if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement;
        if (searchInput) {
          e.preventDefault();
          searchInput.focus();
        }
      }

      // Press 'Escape' to close modals
      if (e.key === 'Escape') {
        const modals = document.querySelectorAll('[role="dialog"]');
        modals.forEach((modal) => {
          const closeButton = modal.querySelector('[aria-label="Close"]') as HTMLElement;
          if (closeButton) {
            closeButton.click();
          }
        });
      }

      // Press 'M' to focus main content
      if (e.key === 'm' && !e.ctrlKey && !e.metaKey) {
        const main = document.getElementById('main-content');
        if (main) {
          e.preventDefault();
          main.focus();
        }
      }

      // Press 'H' to navigate to home
      if (e.key === 'h' && !e.ctrlKey && !e.metaKey) {
        const homeLink = document.querySelector('a[href="/"]') as HTMLAnchorElement;
        if (homeLink) {
          e.preventDefault();
          homeLink.click();
        }
      }

      // Press 'C' to navigate to contact
      if (e.key === 'c' && !e.ctrlKey && !e.metaKey) {
        const contactLink = document.querySelector('a[href="#contact"]') as HTMLAnchorElement;
        if (contactLink) {
          e.preventDefault();
          contactLink.click();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
}

/**
 * Accessible Button Component
 * Ensures buttons have proper ARIA attributes
 */
export function AccessibleButton({
  children,
  onClick,
  disabled = false,
  ariaLabel,
  ariaDescribedBy,
  className = '',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      className={className}
    >
      {children}
    </button>
  );
}

/**
 * Accessible Link Component
 * Ensures links have proper ARIA attributes
 */
export function AccessibleLink({
  children,
  href,
  ariaLabel,
  ariaDescribedBy,
  target,
  rel,
  className = '',
}: {
  children: React.ReactNode;
  href: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : rel}
      className={className}
    >
      {children}
    </a>
  );
}

/**
 * Accessible Modal Component
 * Provides proper ARIA attributes and focus management
 */
export function AccessibleModal({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  useFocusManagement(isOpen);

  useEffect(() => {
    // Prevent body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-[1060] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[var(--color-black-pure)]/95 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div className="relative bg-[var(--color-surface-900)] border border-[var(--color-surface-800)] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--color-surface-800)]">
          <h2 id="modal-title" className="text-2xl font-display font-semibold text-[var(--color-text-primary)]">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-lg hover:bg-[var(--color-surface-800)] transition-colors"
          >
            <svg className="h-6 w-6 text-[var(--color-text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Accessible Accordion Component
 * Properly implements ARIA accordion pattern
 */
export function AccessibleAccordion({
  items,
  allowMultiple = false,
}: {
  items: Array<{
    id: string;
    title: string;
    content: React.ReactNode;
  }>;
  allowMultiple?: boolean;
}) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const newOpen = new Set(prev);

      if (allowMultiple) {
        if (newOpen.has(id)) {
          newOpen.delete(id);
        } else {
          newOpen.add(id);
        }
      } else {
        if (newOpen.has(id)) {
          newOpen.delete(id);
        } else {
          newOpen.clear();
          newOpen.add(id);
        }
      }

      return newOpen;
    });
  };

  return (
    <div className="space-y-2">
      {items.map((item) => {
        const isOpen = openItems.has(item.id);

        return (
          <div key={item.id} className="border border-[var(--color-surface-800)] rounded-xl overflow-hidden">
            <button
              id={`accordion-header-${item.id}`}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
              onClick={() => toggleItem(item.id)}
              className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-[var(--color-surface-800)]/50 transition-colors"
            >
              <span className="text-lg font-semibold text-[var(--color-text-primary)]">
                {item.title}
              </span>
              <svg
                className={`h-5 w-5 text-[var(--color-gold-primary)] transition-transform ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div
              id={`accordion-content-${item.id}`}
              role="region"
              aria-labelledby={`accordion-header-${item.id}`}
              className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className="px-6 pb-4">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Screen Reader Only Text
 * Hides content visually but keeps it accessible to screen readers
 */
export function ScreenReaderOnly({ children }: { children: React.ReactNode }) {
  return <span className="sr-only">{children}</span>;
}

/**
 * Live Region for Announcements
 * Provides dynamic content updates to screen readers
 */
export function LiveRegion({
  message,
  priority = 'polite',
}: {
  message: string;
  priority?: 'polite' | 'assertive';
}) {
  return (
    <div
      role="status"
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );
}

/**
 * Accessible Form Label
 * Ensures proper label association
 */
export function AccessibleLabel({
  htmlFor,
  children,
  required = false,
  className = '',
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-[var(--color-text-primary)] mb-2 ${className}`}
    >
      {children}
      {required && <span className="text-[var(--color-gold-primary)] ml-1">*</span>}
    </label>
  );
}

/**
 * Accessible Input Component
 * Provides proper ARIA attributes and error handling
 */
export function AccessibleInput({
  id,
  type = 'text',
  label,
  error,
  required = false,
  className = '',
  ...props
}: {
  id: string;
  type?: string;
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <AccessibleLabel htmlFor={id} required={required}>
        {label}
      </AccessibleLabel>
      <input
        id={id}
        type={type}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
        required={required}
        className={`w-full px-4 py-3 rounded-lg bg-[var(--color-surface-800)] border border-[var(--color-surface-700)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:border-[var(--color-gold-primary)] focus:ring-2 focus:ring-[var(--color-gold-primary)]/20 transition-all outline-none ${error ? 'border-red-500 focus:border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}