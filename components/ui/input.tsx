'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
}

export function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  onRightIconClick,
  variant = 'default',
  size = 'md',
  className,
  type = 'text',
  id,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  const handleRightIconClick = () => {
    if (isPassword) {
      setShowPassword(!showPassword);
    } else if (onRightIconClick) {
      onRightIconClick();
    }
  };

  const getRightIcon = () => {
    if (isPassword) {
      return showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />;
    }
    return rightIcon;
  };

  const variantStyles = {
    default: cn(
      'bg-[var(--color-surface-800)]',
      'border-[var(--color-surface-700)]',
      'focus:border-[var(--color-gold-500)]'
    ),
    filled: cn(
      'bg-[var(--color-surface-700)]',
      'border-transparent',
      'focus:border-[var(--color-gold-500)]'
    ),
    outlined: cn(
      'bg-transparent',
      'border-[var(--color-surface-600)]',
      'focus:border-[var(--color-gold-500)]'
    ),
  };

  const sizeStyles = {
    sm: cn('px-3 py-2 text-sm'),
    md: cn('px-4 py-3 text-base'),
    lg: cn('px-5 py-4 text-lg'),
  };

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-[var(--color-text-primary)] mb-2"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
            {leftIcon}
          </div>
        )}
        
        <input
          id={id}
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          className={cn(
            'w-full rounded-lg border',
            'text-[var(--color-text-primary)]',
            'placeholder:text-[var(--color-text-muted)]',
            'focus:outline-none focus:ring-2',
            'focus:ring-[var(--color-gold-500)]/20',
            'transition-all duration-200',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-[var(--color-error-500)] focus:border-[var(--color-error-500)]',
            variantStyles[variant],
            sizeStyles[size],
            leftIcon && 'pl-10',
            (rightIcon || isPassword) && 'pr-10',
            className
          )}
          {...props}
        />
        
        {(rightIcon || isPassword) && (
          <button
            type="button"
            onClick={handleRightIconClick}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
            tabIndex={-1}
          >
            {getRightIcon()}
          </button>
        )}
      </div>

      {(error || helperText) && (
        <div className="mt-1">
          {error && (
            <p className="text-sm text-[var(--color-error-500)]">
              {error}
            </p>
          )}
          {!error && helperText && (
            <p className="text-sm text-[var(--color-text-muted)]">
              {helperText}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function TextArea({
  label,
  error,
  helperText,
  size = 'md',
  className,
  id,
  ...props
}: TextAreaProps) {
  const sizeStyles = {
    sm: cn('px-3 py-2 text-sm'),
    md: cn('px-4 py-3 text-base'),
    lg: cn('px-5 py-4 text-lg'),
  };

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-[var(--color-text-primary)] mb-2"
        >
          {label}
        </label>
      )}
      
      <textarea
        id={id}
        className={cn(
          'w-full rounded-lg border',
          'bg-[var(--color-surface-800)]',
          'border-[var(--color-surface-700)]',
          'text-[var(--color-text-primary)]',
          'placeholder:text-[var(--color-text-muted)]',
          'focus:outline-none focus:ring-2',
          'focus:border-[var(--color-gold-500)]',
          'focus:ring-[var(--color-gold-500)]/20',
          'transition-all duration-200',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'resize-none',
          error && 'border-[var(--color-error-500)] focus:border-[var(--color-error-500)]',
          sizeStyles[size],
          className
        )}
        {...props}
      />

      {(error || helperText) && (
        <div className="mt-1">
          {error && (
            <p className="text-sm text-[var(--color-error-500)]">
              {error}
            </p>
          )}
          {!error && helperText && (
            <p className="text-sm text-[var(--color-text-muted)]">
              {helperText}
            </p>
          )}
        </div>
      )}
    </div>
  );
}