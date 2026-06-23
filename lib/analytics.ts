'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
  }
}

// Custom event tracking
export function trackEvent(eventName: string, properties?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties);
  }
}

// Page view tracking
export function trackPageView(page: string, title: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: title,
      page_path: page,
    });
  }
}

// Conversion tracking
export function trackConversion(type: 'form_submission' | 'phone_call' | 'quote_request', value?: string) {
  trackEvent('conversion', {
    conversion_type: type,
    value: value,
    timestamp: new Date().toISOString(),
  });
}

// CTA click tracking
export function trackCTAClick(buttonName: string, location: string) {
  trackEvent('cta_click', {
    button_name: buttonName,
    location: location,
  });
}

// Scroll depth tracking
export function trackScrollDepth(depth: number) {
  trackEvent('scroll_depth', {
    depth_percentage: depth,
    page: window.location.pathname,
  });
}

// Service view tracking
export function trackServiceView(serviceName: string) {
  trackEvent('service_view', {
    service_name: serviceName,
    timestamp: new Date().toISOString(),
  });
}

// Portfolio item view tracking
export function trackPortfolioView(projectTitle: string) {
  trackEvent('portfolio_view', {
    project_title: projectTitle,
    timestamp: new Date().toISOString(),
  });
}

// FAQ accordion tracking
export function trackFAQOpen(question: string) {
  trackEvent('faq_open', {
    question: question,
  });
}

// File upload tracking
export function trackFileUpload(fileType: string, fileSize: number) {
  trackEvent('file_upload', {
    file_type: fileType,
    file_size: fileSize,
  });
}

// Form field tracking
export function trackFormFieldFocus(fieldName: string) {
  trackEvent('form_field_focus', {
    field_name: fieldName,
  });
}

// Form validation error tracking
export function trackFormError(fieldName: string, errorMessage: string) {
  trackEvent('form_error', {
    field_name: fieldName,
    error_message: errorMessage,
  });
}

// Custom hook for scroll depth tracking
export function useScrollDepthTracking() {
  useEffect(() => {
    const checkpoints = [25, 50, 75, 90, 100];
    const reachedCheckpoints = new Set<number>();

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      checkpoints.forEach((checkpoint) => {
        if (scrollPercent >= checkpoint && !reachedCheckpoints.has(checkpoint)) {
          reachedCheckpoints.add(checkpoint);
          trackScrollDepth(checkpoint);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}

// Custom hook for page view tracking
export function usePageTracking(title: string) {
  useEffect(() => {
    trackPageView(window.location.pathname, title);
  }, [title]);
}

// Component to track time on page
export function useTimeOnPage() {
  useEffect(() => {
    const startTime = Date.now();

    return () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);
      trackEvent('time_on_page', {
        duration_seconds: timeOnPage,
        page: window.location.pathname,
      });
    };
  }, []);
}