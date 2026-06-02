'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface CardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick?: () => void;
    href?: string;
    external?: boolean;
  };
  variant?: 'default' | 'elevated' | 'outlined' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
  hoverEffect?: 'lift' | 'glow' | 'border' | 'none';
}

export function Card({
  title,
  description,
  icon,
  action,
  variant = 'default',
  size = 'md',
  className,
  children,
  hoverEffect = 'lift',
}: CardProps) {
  const cardVariants = {
    default: cn(
      'bg-[var(--color-surface-900)]/50',
      'border border-[var(--color-surface-800)]'
    ),
    elevated: cn(
      'bg-[var(--color-surface-900)]/80',
      'border border-[var(--color-surface-700)]',
      'shadow-[var(--shadow-xl)]'
    ),
    outlined: cn(
      'bg-transparent',
      'border-2 border-[var(--color-surface-700)]'
    ),
    minimal: cn(
      'bg-transparent',
      'border-0'
    ),
  };

  const sizeStyles = {
    sm: cn('p-6'),
    md: cn('p-8'),
    lg: cn('p-12'),
  };

  const hoverStyles = {
    lift: cn(
      'hover:-translate-y-1',
      'hover:shadow-[var(--shadow-2xl)]'
    ),
    glow: cn(
      'hover:border-[var(--color-gold-500)]',
      'hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]'
    ),
    border: cn(
      'hover:border-[var(--color-gold-500)]'
    ),
    none: cn(),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={hoverEffect !== 'none' ? { y: -4 } : {}}
      className={cn(
        'rounded-2xl transition-all duration-300',
        cardVariants[variant],
        sizeStyles[size],
        hoverStyles[hoverEffect],
        className
      )}
    >
      <div className="flex flex-col h-full gap-6">
        {icon && (
          <div className="flex items-start justify-between">
            <div className={cn(
              'flex items-center justify-center rounded-xl',
              'bg-[var(--color-gold-500)]/10',
              'border border-[var(--color-gold-500)]/20',
              'p-4'
            )}>
              <div className={cn(
                'text-[var(--color-gold-500)]',
                size === 'sm' ? 'h-6 w-6' : size === 'md' ? 'h-8 w-8' : 'h-10 w-10'
              )}>
                {icon}
              </div>
            </div>
            {action && (
              <button
                onClick={action.onClick}
                className={cn(
                  'flex items-center gap-2 text-sm font-medium',
                  'text-[var(--color-text-muted)]',
                  'hover:text-[var(--color-gold-500)]',
                  'transition-colors'
                )}
              >
                {action.external && <ExternalLink className="h-4 w-4" />}
                {!action.external && <ArrowRight className="h-4 w-4" />}
              </button>
            )}
          </div>
        )}

        <div className={cn('flex-1', !icon && 'mt-0')}>
          <h3 className={cn(
            'font-display font-semibold text-[var(--color-text-primary)]',
            'group-hover:text-[var(--color-gold-500)]',
            'transition-colors',
            size === 'sm' ? 'text-lg' : size === 'md' ? 'text-xl' : 'text-2xl'
          )}>
            {title}
          </h3>
          
          <p className={cn(
            'text-[var(--color-text-secondary)]',
            'leading-relaxed mt-3',
            size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg'
          )}>
            {description}
          </p>
        </div>

        {children && (
          <div className="mt-auto">
            {children}
          </div>
        )}

        {action && !icon && (
          <button
            onClick={action.onClick}
            className={cn(
              'mt-6 flex items-center gap-2 text-sm font-medium',
              'text-[var(--color-text-primary)]',
              'group-hover:text-[var(--color-gold-500)]',
              'transition-colors'
            )}
          >
            {action.label}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </motion.div>
  );
}