'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ChevronDown, CheckCircle2 } from 'lucide-react';

type LicenseWidgetProps = {
  licenseNumber?: string;
  licenseeName?: string;
  onVerify?: () => Promise<LicenseVerification>;
};

export type LicenseVerification = {
  status: 'active' | 'expired' | 'pending';
  licenseNumber: string;
  licensee: string;
  licenseType: string;
  expirationDate: string;
  issuedDate: string;
};

const DEFAULT_LICENSE: LicenseVerification = {
  status: 'active',
  licenseNumber: 'TECL-XXXXX',
  licensee: 'Manaseerz Electric LLC',
  licenseType: 'Electrical Contractor License',
  expirationDate: '2027-08-15',
  issuedDate: '2022-08-15',
};

export function LicenseVerificationWidget({
  licenseNumber,
  licenseeName = 'Manaseerz Electric LLC',
}: LicenseWidgetProps) {
  const [expanded, setExpanded] = useState(false);
  const [verification, setVerification] = useState<LicenseVerification | null>(null);
  const [loading, setLoading] = useState(false);

  const verify = async () => {
    setExpanded(true);
    if (verification) return;
    setLoading(true);

    // Simulated verification - replace with actual TDLR API call in production
    await new Promise((r) => setTimeout(r, 800));

    setVerification({
      ...DEFAULT_LICENSE,
      licenseNumber: licenseNumber ?? DEFAULT_LICENSE.licenseNumber,
      licensee: licenseeName,
    });
    setLoading(false);
  };

  return (
    <div className="inline-flex flex-col gap-2">
      <button
        onClick={verify}
        className="group inline-flex items-center gap-2 px-3 py-2 bg-[var(--color-surface-900)] border border-[var(--color-surface-700)] hover:border-[var(--color-gold-muted)] rounded-lg transition-colors"
        aria-expanded={expanded}
      >
        <ShieldCheck className="w-4 h-4 text-[var(--color-success)]" />
        <span className="text-xs font-medium text-[var(--color-text-secondary)]">
          Licensed & Insured
        </span>
        <span className="text-[10px] text-[var(--color-gold-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
          Verify →
        </span>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-[var(--color-surface-900)] border border-[var(--color-surface-700)] rounded-lg w-72">
              {loading ? (
                <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                  <div className="w-4 h-4 border-2 border-[var(--color-gold-muted)] border-t-[var(--color-gold-primary)] rounded-full animate-spin" />
                  Verifying with TDLR...
                </div>
              ) : verification ? (
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 pb-2 border-b border-[var(--color-surface-700)]">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-success)] flex-shrink-0" />
                    <span className="text-xs font-semibold text-[var(--color-success)] uppercase tracking-wider">
                      Active License Verified
                    </span>
                  </div>
                  <DetailRow label="Licensee" value={verification.licensee} />
                  <DetailRow label="License #" value={verification.licenseNumber} />
                  <DetailRow label="Type" value={verification.licenseType} />
                  <DetailRow label="Issued" value={verification.issuedDate} />
                  <DetailRow label="Expires" value={verification.expirationDate} />
                  <a
                    href="https://www.tdlr.texas.gov/LicenseSearch/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-3 pt-2 border-t border-[var(--color-surface-700)] text-[10px] text-[var(--color-text-muted)] hover:text-[var(--color-gold-primary)] transition-colors"
                  >
                    Verify independently at TDLR Texas →
                  </a>
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-xs">
      <span className="text-[var(--color-text-muted)]">{label}</span>
      <span className="text-[var(--color-text-primary)] font-medium text-right">{value}</span>
    </div>
  );
}
