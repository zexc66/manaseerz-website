'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Slim reading-progress bar pinned to the very top of the viewport. A small
 * premium touch; the spring smoothing keeps it buttery, and the global
 * prefers-reduced-motion rule disables the transition automatically.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[1090] h-1 w-full origin-left bg-[var(--color-gold-primary)]"
      aria-hidden="true"
    />
  );
}
