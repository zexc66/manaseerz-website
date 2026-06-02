'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
}: BadgeProps) {
  const variants = {
    default: cn(
      'bg-[var(--color-surface-700)]',
      'text-[var(--color-text-primary)]',
      'border-[var(--color-surface-600)]'
    ),
    success: cn(
      'bg-[var(--color-success-500)]/10',
      'text-[var(--color-success-400)]',
      'border-[var(--color-success-500)]/30'
    ),
    warning: cn(
      'bg-[var(--color-warning-500)]/10',
      'text-[var(--color-warning-400)]',
      'border-[var(--color-warning-500)]/30'
    ),
    error: cn(
      'bg-[var(--color-error-500)]/10',
      'text-[var(--color-error-400)]',
      'border-[var(--color-error-500)]/30'
    ),
    info: cn(
      'bg-[var(--color-info-500)]/10',
      'text-[var(--color-info-400)]',
      'border-[var(--color-info-500)]/30'
    ),
  };

  const sizes = {
    sm: cn('px-2 py-0.5 text-xs'),
    md: cn('px-3 py-1 text-sm'),
    lg: cn('px-4 py-1.5 text-base'),
  };

  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 rounded-full border font-medium',
      variants[variant],
      sizes[size],
      className
    )}>
      {children}
    </span>
  );
}

interface StepProps {
  number: number;
  title: string;
  description?: string;
  status?: 'pending' | 'in-progress' | 'completed';
  isLast?: boolean;
}

export function Step({
  number,
  title,
  description,
  status = 'pending',
  isLast = false,
}: StepProps) {
  return (
    <div className="relative flex gap-4 pb-8">
      {!isLast && (
        <div className="absolute left-4 top-8 w-0.5 -translate-x-1/2 h-full">
          <div className={cn(
            'h-full w-full',
            status === 'completed' ? 'bg-[var(--color-gold-500)]' : 'bg-[var(--color-surface-700)]'
          )} />
        </div>
      )}
      
      <div className={cn(
        'flex h-8 w-8 items-center justify-center rounded-full shrink-0 border-2',
        status === 'completed' && 'bg-[var(--color-gold-500)] border-[var(--color-gold-500)] text-[var(--color-black-pure)]',
        status === 'in-progress' && 'bg-[var(--color-surface-800)] border-[var(--color-gold-500)] text-[var(--color-gold-500)]',
        status === 'pending' && 'bg-[var(--color-surface-800)] border-[var(--color-surface-700)] text-[var(--color-text-muted)]'
      )}>
        {status === 'completed' ? (
          <Check className="h-4 w-4" />
        ) : (
          <span className="text-sm font-medium">{number}</span>
        )}
      </div>
      
      <div className="flex-1">
        <h4 className={cn(
          'font-semibold text-sm',
          status === 'completed' && 'text-[var(--color-text-primary)]',
          status === 'in-progress' && 'text-[var(--color-text-primary)]',
          status === 'pending' && 'text-[var(--color-text-muted)]'
        )}>
          {title}
        </h4>
        {description && (
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}