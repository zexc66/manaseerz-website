import { trackEvent } from './google-analytics';

export const Analytics = {
  // Page views
  trackPageView: (url: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'G-XXXXXXXXXX', {
        page_path: url,
      });
    }
  },

  // CTA clicks
  trackCTAClick: (cta: string, location: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'cta_click', {
        cta_text: cta,
        location: location,
      });
    }
  },

  // Form submissions
  trackFormSubmit: (formName: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'form_submit', {
        form_name: formName,
      });
    }
  },

  // Service clicks
  trackServiceClick: (serviceName: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'service_click', {
        service_name: serviceName,
      });
    }
  },

  // Testimonial views
  trackTestimonialView: (testimonialId: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'testimonial_view', {
        testimonial_id: testimonialId,
      });
    }
  },

  // Phone link clicks
  trackPhoneClick: () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'phone_click', {
        phone_number: '+12143987654',
      });
    }
  },

  // Email link clicks
  trackEmailClick: () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'email_click', {
        email_address: 'info@manaseerzelectric.com',
      });
    }
  },

  // Social media clicks
  trackSocialClick: (platform: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'social_click', {
        platform: platform,
      });
    }
  },

  // Custom event
  trackCustom: (eventName: string, params?: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, params);
    }
  },

  // Conversion tracking
  trackConversion: (value: number, currency: string = 'USD') => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        send_to: 'G-XXXXXXXXXX',
        value: value,
        currency: currency,
      });
    }
  },
};