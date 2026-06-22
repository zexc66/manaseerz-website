'use client';

import { motion } from 'framer-motion';
import { CreditCard, Calculator, X } from 'lucide-react';

type FinancingBadgeProps = {
  amount: number;
  apr?: number;
  months?: number;
  className?: string;
};

export function FinancingBadge({
  amount,
  apr = 0,
  months = 12,
  className = '',
}: FinancingBadgeProps) {
  const monthlyPayment = Math.round(amount / months);

  return (
    <motion.div
      whileHover={{ y: -1 }}
      className={`inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--color-success)]/10 border border-[var(--color-success)]/30 rounded-full ${className}`}
    >
      <CreditCard className="w-3.5 h-3.5 text-[var(--color-success)]" />
      <span className="text-xs font-medium text-[var(--color-text-secondary)]">
        ${monthlyPayment}/mo
      </span>
      <span className="text-[10px] text-[var(--color-text-muted)]">
        for {months}mo{apr === 0 ? ' • 0% APR' : ` • ${apr}% APR`}
      </span>
    </motion.div>
  );
}

export function FinancingCalculatorModal({
  totalAmount,
  onClose,
}: {
  totalAmount: number;
  onClose: () => void;
}) {
  const plans = [
    { months: 6, apr: 0, label: '6 months' },
    { months: 12, apr: 0, label: '12 months' },
    { months: 24, apr: 9.99, label: '24 months' },
    { months: 36, apr: 9.99, label: '36 months' },
    { months: 60, apr: 12.99, label: '60 months' },
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Financing calculator"
    >
      <div className="absolute inset-0 bg-[var(--color-black-pure)]/80 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-[var(--color-surface-900)] border border-[var(--color-surface-700)] rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between p-5 border-b border-[var(--color-surface-700)]">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[var(--color-gold-primary)]" />
            <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">
              Financing Options
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5">
          <p className="text-sm text-[var(--color-text-secondary)] mb-4">
            Estimated total: <span className="font-semibold text-[var(--color-text-primary)]">${totalAmount.toLocaleString()}</span>
          </p>

          <div className="space-y-2">
            {plans.map((plan) => {
              const monthly = Math.round(
                (totalAmount * (1 + (plan.apr / 100) * (plan.months / 12))) / plan.months
              );
              const total = monthly * plan.months;
              return (
                <div
                  key={plan.months}
                  className="flex items-center justify-between p-3 bg-[var(--color-surface-800)] rounded-lg"
                >
                  <div>
                    <div className="font-medium text-[var(--color-text-primary)] text-sm">
                      {plan.label}
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)]">
                      {plan.apr === 0 ? '0% APR' : `${plan.apr}% APR`} • ${total.toLocaleString()} total
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-[var(--color-gold-primary)]">
                      ${monthly}
                    </div>
                    <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">
                      per month
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-4 text-[10px] text-[var(--color-text-muted)] leading-relaxed">
            Estimates only. Final terms based on credit approval. Subject to qualification. Manaseerz Electric partners with leading home improvement lenders to offer flexible payment plans.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
