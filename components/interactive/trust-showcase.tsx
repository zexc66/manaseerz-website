'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Camera, CreditCard, ArrowRight, Sparkles } from 'lucide-react';
import { BeforeAfterSlider } from '@/components/interactive/before-after-slider';
import { LicenseVerificationWidget } from '@/components/interactive/license-verification';
import { FinancingBadge, FinancingCalculatorModal } from '@/components/interactive/financing';

export function TrustShowcase() {
  const [showFinancing, setShowFinancing] = useState(false);

  return (
    <section id="trust" className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-black-pure)]">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--color-gold-primary)]/10 border border-[var(--color-gold-primary)]/20 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[var(--color-gold-primary)]" />
            <span className="text-xs uppercase tracking-wider text-[var(--color-gold-primary)] font-medium">
              The Manaseerz Difference
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
            Verified. Trusted. Financed.
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            We back every job with real credentials, real transformations, and real payment flexibility.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Camera className="w-5 h-5 text-[var(--color-gold-primary)]" />
              <h3 className="font-display text-2xl font-semibold text-[var(--color-text-primary)]">
                Real Panel Upgrades
              </h3>
            </div>
            <p className="text-[var(--color-text-secondary)] mb-6">
              Drag the slider to see the difference our master electricians make. Every upgrade is code-compliant, inspected, and backed by a 1-year labor warranty.
            </p>
            <BeforeAfterSlider
              beforeImage="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%231a1a1a' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' fill='%23666' font-family='monospace' font-size='14' text-anchor='middle' dy='.3em'%3EBefore: Old Panel%3C/text%3E%3C/svg%3E"
              afterImage="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%230d0d0d' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' fill='%23d4af37' font-family='monospace' font-size='14' text-anchor='middle' dy='.3em'%3EAfter: Modern Panel%3C/text%3E%3C/svg%3E"
              beforeLabel="Old Panel"
              afterLabel="Upgraded"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-[var(--color-success)]" />
                <h3 className="font-display text-xl font-semibold text-[var(--color-text-primary)]">
                  Click-to-Verify License
                </h3>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                Don't take our word for it. Click below to verify our Texas license is active in real-time.
              </p>
              <LicenseVerificationWidget />
            </div>

            <div className="pt-6 border-t border-[var(--color-surface-800)]">
              <div className="flex items-center gap-2 mb-3">
                <CreditCard className="w-5 h-5 text-[var(--color-gold-primary)]" />
                <h3 className="font-display text-xl font-semibold text-[var(--color-text-primary)]">
                  Flexible Financing
                </h3>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                Big projects shouldn't drain your savings. We offer 0% APR plans and longer terms.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <FinancingBadge amount={1500} months={12} />
                <FinancingBadge amount={2500} months={24} apr={9.99} />
                <FinancingBadge amount={3000} months={36} apr={9.99} />
              </div>
              <button
                onClick={() => setShowFinancing(true)}
                className="inline-flex items-center gap-1.5 text-sm text-[var(--color-gold-primary)] hover:text-[var(--color-gold-light)] font-medium transition-colors"
              >
                See all financing options
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {showFinancing && (
        <FinancingCalculatorModal totalAmount={2000} onClose={() => setShowFinancing(false)} />
      )}
    </section>
  );
}
