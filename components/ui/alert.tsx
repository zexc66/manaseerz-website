'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';

interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  description: string;
  onClose?: () => void;
  className?: string;
}

export function Alert({
  variant = 'info',
  title,
  description,
  onClose,
  className,
}: AlertProps) {
  const variants = {
    info: cn(
      'bg-[var(--color-info-500)]/10',
      'border-[var(--color-info-500)]/30',
      'text-[var(--color-info-400)]'
    ),
    success: cn(
      'bg-[var(--color-success-500)]/10',
      'border-[var(--color-success-500)]/30',
      'text-[var(--color-success-400)]'
    ),
    warning: cn(
      'bg-[var(--color-warning-500)]/10',
      'border-[var(--color-warning-500)]/30',
      'text-[var(--color-warning-400)]'
    ),
    error: cn(
      'bg-[var(--color-error-500)]/10',
      'border-[var(--color-error-500)]/30',
      'text-[var(--color-error-400)]'
    ),
  };

  const icons = {
    info: Info,
    success: CheckCircle,
    warning: AlertCircle,
    error: XCircle,
  };

  const Icon = icons[variant];

  return (
    <div className={cn(
      'relative rounded-xl border p-4',
      'flex items-start gap-3',
      variants[variant],
      className
    )}>
      <div className="flex-shrink-0 mt-0.5">
        <Icon className="h-5 w-5" />
      </div>
      
      <div className="flex-1">
        {title && (
          <h4 className="font-semibold text-sm">
            {title}
          </h4>
        )}
        <p className="text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 rounded-lg p-1 hover:bg-black/5 transition-colors"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}