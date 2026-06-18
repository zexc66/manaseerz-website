'use client';

import { useEffect, useState, Suspense, type ReactNode } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/**
 * Premium Page Load Sequence
 * Apple-inspired staggered entrance choreography.
 * Honors prefers-reduced-motion.
 */
export function PageLoadChoreography({ children }: { children: ReactNode }) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setHasLoaded(true);
      return;
    }

    const timer = requestAnimationFrame(() => {
      setHasLoaded(true);
    });

    return () => cancelAnimationFrame(timer);
  }, [reduceMotion]);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: hasLoaded ? 1 : 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Premium Skeleton Loader - shimmer effect
 * Trillion-dollar loading state (Stripe/Linear quality)
 */
export function PremiumSkeleton({
  className = '',
  variant = 'text',
}: {
  className?: string;
  variant?: 'text' | 'circle' | 'rect';
}) {
  const baseStyles =
    variant === 'circle'
      ? 'rounded-full'
      : variant === 'rect'
        ? 'rounded-xl'
        : 'rounded-md';

  return (
    <div
      className={`relative overflow-hidden bg-[var(--color-surface-800)] ${baseStyles} ${className}`}
      style={{
        background:
          'linear-gradient(90deg, var(--color-surface-800) 0%, var(--color-surface-700) 50%, var(--color-surface-800) 100%)',
        backgroundSize: '200% 100%',
        animation: 'skeleton-shimmer 1.8s ease-in-out infinite',
      }}
      aria-hidden="true"
    >
      <style jsx>{`
        @keyframes skeleton-shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          div {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Suspense wrapper with premium skeleton fallback
 */
export function PremiumSuspense({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const defaultFallback = (
    <div className="space-y-6 py-12">
      <PremiumSkeleton className="h-8 w-64" />
      <PremiumSkeleton className="h-4 w-full max-w-2xl" />
      <PremiumSkeleton className="h-4 w-full max-w-xl" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <PremiumSkeleton className="h-48 w-full" variant="rect" />
        <PremiumSkeleton className="h-48 w-full" variant="rect" />
        <PremiumSkeleton className="h-48 w-full" variant="rect" />
      </div>
    </div>
  );

  return <Suspense fallback={fallback ?? defaultFallback}>{children}</Suspense>;
}

/**
 * Premium Focus Ring - accessibility-first
 * Visible focus indicator that doesn't compromise design
 */
export function PremiumFocusRing({
  children,
  as: Component = 'button',
  className = '',
  ...props
}: {
  children: ReactNode;
  as?: React.ElementType;
  className?: string;
  [key: string]: unknown;
}) {
  return (
    <Component
      className={`relative outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-black-pure)] rounded-md transition-all ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * Magnetic Button - Apple-style magnetic hover
 * Subtle 3D press effect with spring physics
 */
export function MagneticButton({
  children,
  className = '',
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <button onClick={onClick} className={className}>
        {children}
      </button>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 25,
      }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

/**
 * Smooth Scroll-to-Section with easing
 */
export function useSmoothScroll() {
  return (targetId: string) => {
    const element = document.getElementById(targetId);
    if (!element) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      element.scrollIntoView();
      return;
    }

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };
}

/**
 * Premium Empty State
 * What users see when there's no content
 */
export function PremiumEmptyState({
  title,
  description,
  icon,
  action,
}: {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      {icon && (
        <div className="mb-6 text-[var(--color-gold-muted)] opacity-60">{icon}</div>
      )}
      <h3 className="text-xl font-display font-medium text-[var(--color-text-primary)] mb-2">
        {title}
      </h3>
      <p className="text-[var(--color-text-secondary)] max-w-sm">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </motion.div>
  );
}

/**
 * Premium Loading Overlay
 * Full-screen loader for critical transitions
 */
export function PremiumLoadingOverlay({ isLoading }: { isLoading: boolean }) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-black-pure)]/80 backdrop-blur-sm"
          aria-live="polite"
          aria-busy="true"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-12 h-12">
              {!reduceMotion && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--color-gold-primary)] border-r-[var(--color-gold-primary)]"
                />
              )}
              {reduceMotion && (
                <div className="absolute inset-0 rounded-full border-2 border-[var(--color-gold-primary)]" />
              )}
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] font-body">
              Loading
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
