'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  try {
    useReportWebVitals((metric) => {
      const { name, label, id, value } = metric;

      if (typeof window !== 'undefined' && (window as any).gtag) {
        try {
          (window as any).gtag('event', name, {
            event_category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
            event_label: id,
            value: Math.round(name === 'CLS' ? value * 1000 : value),
            non_interaction: true,
          });
        } catch {
          // Silently fail
        }
      }
    });
  } catch {
    // Silently fail if useReportWebVitals fails
  }

  return null;
}