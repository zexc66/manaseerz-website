'use client';

import { useEffect, useLayoutEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// useLayoutEffect that's SSR-safe (no-op on the server, real on the client).
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const SESSION_KEY = 'manaseerz:preloader-seen';
const DURATION = 1200; // ms the preloader is visible before fading

/**
 * Branded intro preloader, shown once per browser session.
 *
 * Perf-safe by design:
 * - Content renders and paints behind it (this is a fixed overlay), so it does
 *   NOT delay LCP — the hero subtitle still fires LCP at ~0.8s behind the veil.
 * - sessionStorage + a useLayoutEffect check means returning users this session
 *   never see it paint (no flash on refresh).
 * - Total visible time ~1.2s; premium brands keep intros under 1.5s.
 * - Under prefers-reduced-motion the mark is static and the exit is instant.
 */
export function Preloader() {
  const [show, setShow] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  // useLayoutEffect runs before paint, so a returning user never sees the
  // preloader flash on refresh. (Guarded for SSR — Next runs layout on server.)
  useIsomorphicLayoutEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY)) {
        setShow(false);
        return;
      }
    } catch {
      /* private mode etc. — fall through and just show it */
    }

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);

    const t = setTimeout(() => {
      setShow(false);
      try {
        sessionStorage.setItem(SESSION_KEY, '1');
      } catch {
        /* ignore */
      }
    }, DURATION);
    return () => clearTimeout(t);
  }, []);
  // Drive a lightweight 0→100 counter (rAF) only while visible + motion allowed.
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!show || reduceMotion) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(100, ((now - start) / DURATION) * 100);
      setProgress(Math.round(p));
      if (p < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [show, reduceMotion]);

  const barWidth = reduceMotion ? 100 : progress;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 1.04, transition: { duration: 0.5, ease: 'easeInOut' } }
          }
          aria-hidden="true"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--color-black-pure)]"
        >
          {/* Ambient gold glow behind the mark — subtle, one-time */}
          <div className="pointer-events-none absolute h-[420px] w-[420px] rounded-full bg-[var(--color-gold-primary)] opacity-[0.06] blur-[120px]" />

          <div className="relative flex flex-col items-center">
            {/* Brand mark: gold ring with the Zap bolt (matches navbar logo) */}
            <motion.div
              initial={reduceMotion ? false : { scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative flex h-24 w-24 items-center justify-center rounded-full border border-[var(--color-gold-primary)]/30 bg-[var(--color-gold-primary)]/5"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-gold-primary)"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-11 w-11"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </motion.div>

            {/* Wordmark */}
            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4, ease: 'easeOut' }}
              className="mt-8 font-display text-2xl font-bold tracking-[0.2em] text-[var(--color-text-primary)]"
            >
              MANASEERZ
            </motion.h1>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="mt-1 text-xs font-medium tracking-[0.45em] text-[var(--color-gold-primary)]"
            >
              ELECTRIC
            </motion.p>

            {/* Progress bar + counter */}
            <div className="mt-10 flex w-56 items-center gap-3">
              <div className="relative h-px flex-1 overflow-hidden bg-[var(--color-surface-800)]">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-[var(--color-gold-primary)]"
                  style={{ width: `${barWidth}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>
              <span className="w-8 text-right font-display text-xs tabular-nums text-[var(--color-text-muted)]">
                {Math.round(barWidth)}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
