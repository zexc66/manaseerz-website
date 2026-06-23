'use client';

import { useState, useEffect, type ReactNode } from 'react';

export function Deferred({
  children,
  delay = 2000,
  fallback = null,
}: {
  children: ReactNode;
  delay?: number;
  fallback?: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!mounted) return <>{fallback}</>;
  return <>{children}</>;
}
