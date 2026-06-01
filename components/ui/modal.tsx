'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  showCloseButton = true,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const sizeStyles = {
    sm: cn('max-w-md'),
    md: cn('max-w-lg'),
    lg: cn('max-w-2xl'),
    xl: cn('max-w-4xl'),
    full: cn('max-w-[95vw] max-h-[95vh]'),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[var(--z-modal-backdrop)] bg-[var(--color-black-pure)]/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{
                duration: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={cn(
                'relative w-full rounded-2xl',
                'bg-[var(--color-surface-900)]',
                'border border-[var(--color-surface-700)]',
                'shadow-[var(--shadow-2xl)]',
                'max-h-[90vh] overflow-hidden flex flex-col',
                sizeStyles[size]
              )}
            >
              {/* Header */}
              {(title || showCloseButton) && (
                <div className={cn(
                  'flex items-start justify-between',
                  'p-6',
                  'border-b border-[var(--color-surface-800)]'
                )}>
                  <div className="flex-1">
                    {title && (
                      <h2 className="font-display text-xl font-semibold text-[var(--color-text-primary)]">
                        {title}
                      </h2>
                    )}
                    {description && (
                      <p className="text-[var(--color-text-secondary)] mt-1">
                        {description}
                      </p>
                    )}
                  </div>
                  {showCloseButton && (
                    <button
                      onClick={onClose}
                      className={cn(
                        'flex items-center justify-center rounded-lg',
                        'p-2',
                        'text-[var(--color-text-muted)]',
                        'hover:bg-[var(--color-surface-800)]',
                        'hover:text-[var(--color-text-primary)]',
                        'transition-colors'
                      )}
                      aria-label="Close modal"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}