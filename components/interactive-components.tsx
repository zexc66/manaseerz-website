'use client';

import React, { useEffect } from 'react';
import {
  trackPageView,
  useScrollDepthTracking,
  useTimeOnPage,
} from '@/lib/analytics';
import {
  SkipNavigation,
  useKeyboardNavigation,
  LiveRegion,
} from '@/components/accessibility';

// Main App Wrapper with Accessibility.
// (Other interactive showcase components — BeforeAfter, ServiceCalculator,
//  VideoBackground, Timeline, TrustBadges, StatsCounter, FloatingCTA — were
//  unused and have been removed for hygiene. Recoverable from git history.)
export function AppWrapper({ children }: { children: React.ReactNode }) {
  useScrollDepthTracking();
  useTimeOnPage();
  useKeyboardNavigation();

  useEffect(() => {
    trackPageView(window.location.pathname, 'Manaseerz Electric');
  }, []);

  return (
    <>
      <SkipNavigation />
      <main id="main-content">
        {children}
      </main>
      <LiveRegion message="" />
    </>
  );
}
