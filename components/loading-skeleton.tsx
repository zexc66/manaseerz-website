'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[var(--color-black-pure)] p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Navbar Skeleton */}
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-[var(--color-surface-800)] animate-pulse" />
            <div className="h-8 w-32 bg-[var(--color-surface-800)] animate-pulse rounded" />
          </div>
          <div className="hidden lg:flex gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-6 w-20 bg-[var(--color-surface-800)] animate-pulse rounded" />
            ))}
          </div>
        </div>

        {/* Hero Section Skeleton */}
        <div className="grid lg:grid-cols-2 gap-12 py-24">
          <div className="space-y-6">
            <div className="h-8 w-48 bg-[var(--color-surface-800)] animate-pulse rounded-full" />
            <div className="space-y-4">
              <div className="h-16 w-full bg-[var(--color-surface-800)] animate-pulse rounded" />
              <div className="h-16 w-3/4 bg-[var(--color-surface-800)] animate-pulse rounded" />
            </div>
            <div className="h-6 w-full bg-[var(--color-surface-800)] animate-pulse rounded" />
            <div className="h-6 w-2/3 bg-[var(--color-surface-800)] animate-pulse rounded" />
            <div className="flex gap-4">
              <div className="h-12 w-40 bg-[var(--color-surface-800)] animate-pulse rounded-lg" />
              <div className="h-12 w-40 bg-[var(--color-surface-800)] animate-pulse rounded-lg" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-40 bg-[var(--color-surface-800)] animate-pulse rounded-xl" />
            ))}
          </div>
        </div>

        {/* Services Section Skeleton */}
        <div className="py-24">
          <div className="text-center mb-12 space-y-4">
            <div className="h-12 w-96 mx-auto bg-[var(--color-surface-800)] animate-pulse rounded" />
            <div className="h-6 w-full max-w-2xl mx-auto bg-[var(--color-surface-800)] animate-pulse rounded" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-[var(--color-surface-800)] animate-pulse rounded-xl" />
            ))}
          </div>
        </div>

        {/* Testimonials Section Skeleton */}
        <div className="py-24">
          <div className="text-center mb-12 space-y-4">
            <div className="h-12 w-64 mx-auto bg-[var(--color-surface-800)] animate-pulse rounded" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-[var(--color-surface-800)] animate-pulse rounded-xl" />
            ))}
          </div>
        </div>

        {/* Contact Form Skeleton */}
        <div className="py-24">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="h-12 w-full bg-[var(--color-surface-800)] animate-pulse rounded" />
              <div className="h-6 w-2/3 bg-[var(--color-surface-800)] animate-pulse rounded" />
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-20 bg-[var(--color-surface-800)] animate-pulse rounded" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-12 w-1/2 bg-[var(--color-surface-800)] animate-pulse rounded" />
              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-16 bg-[var(--color-surface-800)] animate-pulse rounded" />
                ))}
              </div>
              <div className="h-16 w-full bg-[var(--color-surface-800)] animate-pulse rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="h-48 bg-[var(--color-surface-800)] animate-pulse rounded-t-2xl" />
      <div className="p-6 space-y-4">
        <div className="h-6 w-3/4 bg-[var(--color-surface-800)] animate-pulse rounded" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-[var(--color-surface-800)] animate-pulse rounded" />
          <div className="h-4 w-5/6 bg-[var(--color-surface-800)] animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
}

export function TextSkeleton({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={className}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-4 bg-[var(--color-surface-800)] animate-pulse rounded",
            i === lines - 1 ? "w-2/3" : "w-full"
          )}
        />
      ))}
    </div>
  );
}