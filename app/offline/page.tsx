'use client';

import { useState } from 'react';

export default function OfflinePage() {
  const [isReloading, setIsReloading] = useState(false);

  const handleReload = () => {
    setIsReloading(true);
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--color-black-pure)]">
      <div className="text-center max-w-md px-6">
        <div className="mb-8">
          <div className="h-20 w-20 mx-auto rounded-full bg-[var(--color-gold-primary)]/10 flex items-center justify-center">
            <svg
              className="h-10 w-10 text-[var(--color-gold-primary)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
              />
            </svg>
          </div>
        </div>

        <h1 className="font-display font-bold text-4xl text-[var(--color-text-primary)] mb-4">
          You're Offline
        </h1>

        <p className="text-[var(--color-text-secondary)] mb-8 leading-relaxed">
          It looks like you're not connected to the internet. Please check your connection and try again.
        </p>

        <button
          onClick={handleReload}
          disabled={isReloading}
          className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-gold-primary)] text-[var(--color-black-pure)] font-medium rounded-sm hover:bg-[var(--color-gold-light)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          {isReloading ? 'Reloading...' : 'Reload Page'}
        </button>

        <div className="mt-12 pt-8 border-t border-[var(--color-surface-800)]">
          <p className="text-sm text-[var(--color-text-muted)]">
            Manaseerz Electrical Services
          </p>
          <p className="text-sm text-[var(--color-gold-primary)] mt-1">
            Serving DFW Metroplex
          </p>
        </div>
      </div>
    </div>
  );
}