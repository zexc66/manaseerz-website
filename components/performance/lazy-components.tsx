'use client';

import { lazy, Suspense } from 'react';
import { LoadingSkeleton } from '@/components/loading-skeleton';

// Lazy load heavy components
export const LazyPortfolio = lazy(() =>
  import('@/components/portfolio').then((mod) => ({
    default: mod.Portfolio,
  }))
);

export const LazyTestimonials = lazy(() =>
  import('@/components/testimonials').then((mod) => ({
    default: mod.Testimonials,
  }))
);

export const LazyChatbot = lazy(() =>
  import('@/components/chatbot').then((mod) => ({
    default: mod.Chatbot,
  }))
);

export const LazyFAQ = lazy(() =>
  import('@/components/faq').then((mod) => ({
    default: mod.FAQ,
  }))
);

export const LazyAboutSection = lazy(() =>
  import('@/components/about-section').then((mod) => ({
    default: mod.AboutSection,
  }))
);

export const LazyEnhancedContactForm = lazy(() =>
  import('@/components/enhanced-contact-form').then((mod) => ({
    default: mod.EnhancedContactForm,
  }))
);

// Suspense wrapper with loading skeleton
export function LazyWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      {children}
    </Suspense>
  );
}