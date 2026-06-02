'use client';

import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--color-black-pure)] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-[clamp(8rem,20vw,12rem)] font-display font-bold text-[var(--color-gold-primary)] leading-none">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 space-y-4"
        >
          <h2 className="text-3xl font-display font-semibold text-[var(--color-text-primary)]">
            Page Not Found
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)]">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg border-2 border-[var(--color-surface-800)] text-[var(--color-text-primary)] transition-all hover:border-[var(--color-gold-primary)] hover:text-[var(--color-gold-primary)]"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[var(--color-gold-primary)] text-[var(--color-black-pure)] font-semibold transition-all hover:bg-[var(--color-gold-light)] hover:shadow-[var(--shadow-gold)]"
          >
            <Home className="h-5 w-5" />
            Home Page
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16"
        >
          <p className="text-sm text-[var(--color-text-muted)]">
            Need help? <a href="tel:6824515951" className="text-[var(--color-gold-primary)] hover:underline">Call (682) 451-5951</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}