'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight, Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  icon,
  iconPosition = 'left',
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200',
        'focus-visible:outline-2 focus-visible:outline-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'disabled:pointer-events-none',
        fullWidth && 'w-full',
        loading && 'cursor-wait',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {!loading && icon && iconPosition === 'left' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {!loading && icon && iconPosition === 'right' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </button>
  );
}

const variantStyles = {
  primary: cn(
    'bg-gradient-to-r from-[var(--color-gold-500)] to-[var(--color-gold-600)]',
    'text-[var(--color-black-pure)]',
    'hover:from-[var(--color-gold-400)] hover:to-[var(--color-gold-500)]',
    'active:scale-[0.98]',
    'shadow-[var(--shadow-gold)]',
    'hover:shadow-[0_6px_25px_rgba(212,175,55,0.25)]',
    'focus-visible:outline-[var(--color-gold-500)]'
  ),
  secondary: cn(
    'bg-[var(--color-surface-800)]',
    'text-[var(--color-text-primary)]',
    'border border-[var(--color-surface-600)]',
    'hover:bg-[var(--color-surface-700)]',
    'hover:border-[var(--color-gold-500)]',
    'active:scale-[0.98]',
    'focus-visible:outline-[var(--color-gold-500)]'
  ),
  outline: cn(
    'bg-transparent',
    'text-[var(--color-text-primary)]',
    'border-2 border-[var(--color-surface-600)]',
    'hover:border-[var(--color-gold-500)]',
    'hover:text-[var(--color-gold-500)]',
    'active:scale-[0.98]',
    'focus-visible:outline-[var(--color-gold-500)]'
  ),
  ghost: cn(
    'bg-transparent',
    'text-[var(--color-text-primary)]',
    'hover:bg-[var(--color-surface-800)]',
    'active:scale-[0.98]',
    'focus-visible:outline-[var(--color-gold-500)]'
  ),
  link: cn(
    'bg-transparent',
    'text-[var(--color-gold-500)]',
    'hover:text-[var(--color-gold-400)]',
    'underline-offset-4',
    'hover:underline',
    'focus-visible:outline-[var(--color-gold-500)]'
  ),
};

const sizeStyles = {
  sm: cn(
    'px-4 py-2',
    'text-sm',
    'rounded-[var(--radius-md)]'
  ),
  md: cn(
    'px-6 py-3',
    'text-base',
    'rounded-[var(--radius-lg)]'
  ),
  lg: cn(
    'px-8 py-4',
    'text-lg',
    'rounded-[var(--radius-xl)]'
  ),
};