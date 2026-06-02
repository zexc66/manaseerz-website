'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowRight, Phone, Mail, MapPin, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  trackCTAClick,
  trackPageView,
  trackConversion,
  useScrollDepthTracking,
  useTimeOnPage,
} from '@/lib/analytics';
import {
  SkipNavigation,
  useKeyboardNavigation,
  AccessibleModal,
  LiveRegion,
} from '@/components/accessibility';

export function BeforeAfter({
  before,
  after,
  label,
  className = '',
}: {
  before: string;
  after: string;
  label: string;
  className?: string;
}) {
  const [position, setPosition] = useState(50);

  return (
    <div className={cn("relative overflow-hidden rounded-xl", className)}>
      <img
        src={before}
        alt={`${label} before`}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `polygon(${position}% 0, 100% 0, 100% 100%, ${position}% 100%)` }}
      >
        <img
          src={after}
          alt={`${label} after`}
          className="w-full h-full object-cover"
        />
      </div>
      <div
        className="absolute inset-y-0 w-1 bg-[var(--color-gold-primary)] cursor-ew-resize"
        style={{ left: `${position}%` }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.parentElement?.getBoundingClientRect();
          if (rect) {
            const newPosition = ((e.clientX - rect.left) / rect.width) * 100;
            setPosition(Math.max(0, Math.min(100, newPosition)));
          }
        }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[var(--color-gold-primary)] flex items-center justify-center shadow-lg">
          <ArrowRight className="h-4 w-4 text-[var(--color-black-pure)]" />
        </div>
      </div>
      <div className="absolute bottom-4 left-4 px-3 py-1 rounded-lg bg-[var(--color-black-pure)]/80 text-white text-sm font-medium">
        Before
      </div>
      <div className="absolute bottom-4 right-4 px-3 py-1 rounded-lg bg-[var(--color-gold-primary)] text-[var(--color-black-pure)] text-sm font-medium">
        After
      </div>
    </div>
  );
}

// Interactive Service Calculator
export function ServiceCalculator() {
  const [service, setService] = useState('');
  const [urgency, setUrgency] = useState('standard');
  const [estimate, setEstimate] = useState<number | null>(null);

  const calculateEstimate = () => {
    const basePrices: Record<string, number> = {
      'chandelier-installation': 325,
      'ev-charger-installation': 550,
      'smart-switches': 250,
      'outlet-circuit': 225,
      'renovation-electrical': 1750,
      'range-hood': 275,
    };

    const urgencyMultipliers = {
      standard: 1,
      rush: 1.3,
      emergency: 1.6,
    };

    const basePrice = basePrices[service] || 0;
    const multiplier = urgencyMultipliers[urgency as keyof typeof urgencyMultipliers] || 1;
    setEstimate(Math.round(basePrice * multiplier));
  };

  return (
    <div className="bg-[var(--color-surface-900)]/50 border border-[var(--color-surface-800)] rounded-2xl p-8 space-y-6">
      <h3 className="text-2xl font-display font-semibold text-[var(--color-text-primary)]">
        Get an Instant Estimate
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
            Service Type
          </label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface-800)] border border-[var(--color-surface-700)] text-[var(--color-text-primary)] focus:border-[var(--color-gold-primary)] focus:ring-2 focus:ring-[var(--color-gold-primary)]/20 transition-all outline-none cursor-pointer"
          >
            <option value="">Select a service</option>
            <option value="chandelier-installation">Chandelier Installation</option>
            <option value="ev-charger-installation">EV Charger Installation</option>
            <option value="smart-switches">Smart Switches</option>
            <option value="outlet-circuit">Outlet & Circuit Work</option>
            <option value="renovation-electrical">Electrical Renovation</option>
            <option value="range-hood">Range Hood Wiring</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
            Urgency Level
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'standard', label: 'Standard', icon: Clock, multiplier: 1 },
              { value: 'rush', label: 'Rush', icon: Clock, multiplier: 1.3 },
              { value: 'emergency', label: 'Emergency', icon: AlertTriangle, multiplier: 1.6 },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setUrgency(option.value)}
                className={cn(
                  "p-4 rounded-lg border-2 transition-all",
                  urgency === option.value
                    ? "border-[var(--color-gold-primary)] bg-[var(--color-gold-primary)]/10"
                    : "border-[var(--color-surface-700)] bg-[var(--color-surface-800)] hover:border-[var(--color-gold-primary)]/50"
                )}
              >
                <option.icon className={cn(
                  "h-5 w-5 mx-auto mb-2",
                  urgency === option.value ? "text-[var(--color-gold-primary)]" : "text-[var(--color-text-muted)]"
                )} />
                <span className="block text-sm font-medium text-[var(--color-text-primary)]">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {estimate && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-xl bg-[var(--color-gold-primary)]/10 border border-[var(--color-gold-primary)]/20"
          >
            <p className="text-sm text-[var(--color-text-muted)] mb-2">Estimated Range</p>
            <p className="text-4xl font-display font-bold text-[var(--color-gold-primary)]">
              ${estimate - Math.round(estimate * 0.2)} - ${estimate + Math.round(estimate * 0.2)}
            </p>
            <p className="text-xs text-[var(--color-text-muted)] mt-2">
              *Final quote provided after on-site assessment
            </p>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            if (service) {
              calculateEstimate();
              trackCTAClick('Calculate Estimate', 'Service Calculator');
            }
          }}
          disabled={!service}
          className="w-full py-4 px-8 rounded-lg bg-[var(--color-gold-primary)] text-[var(--color-black-pure)] font-semibold text-lg transition-all hover:bg-[var(--color-gold-light)] hover:shadow-[var(--shadow-gold)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Calculate Estimate
        </motion.button>

        <div className="pt-4 border-t border-[var(--color-surface-800)] space-y-3">
          <div className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
            <CheckCircle className="h-4 w-4 text-[var(--color-gold-primary)]" />
            <span>Free on-site quote available</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
            <CheckCircle className="h-4 w-4 text-[var(--color-gold-primary)]" />
            <span>Transparent pricing, no hidden fees</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
            <CheckCircle className="h-4 w-4 text-[var(--color-gold-primary)]" />
            <span>1-year labor warranty included</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Video Background Section
export function VideoBackground({
  videoSrc,
  children,
  overlayOpacity = 0.6,
}: {
  videoSrc: string;
  children: React.ReactNode;
  overlayOpacity?: number;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

// Interactive Timeline
export function Timeline({
  items,
  className = '',
}: {
  items: Array<{
    title: string;
    description: string;
    date?: string;
    icon?: React.ReactNode;
  }>;
  className?: string;
}) {
  return (
    <div className={cn("space-y-8", className)}>
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative pl-8 pb-8 border-l-2 border-[var(--color-surface-800)] last:pb-0"
        >
          {/* Timeline Dot */}
          <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-[var(--color-gold-primary)] -translate-x-[calc(100%+4px)]">
            <div className="absolute inset-0 rounded-full bg-[var(--color-gold-primary)] animate-ping opacity-75" />
          </div>

          {/* Content */}
          <div className="space-y-2">
            {item.date && (
              <p className="text-sm text-[var(--color-gold-primary)] font-medium">
                {item.date}
              </p>
            )}
            <h3 className="text-xl font-display font-semibold text-[var(--color-text-primary)]">
              {item.title}
            </h3>
            <p className="text-[var(--color-text-secondary)]">
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Trust Badges Component
export function TrustBadges() {
  const badges = [
    {
      icon: CheckCircle,
      title: 'Licensed & Insured',
      description: 'Texas state certified electrical professionals',
    },
    {
      icon: Clock,
      title: 'Same-Day Service',
      description: 'Available throughout DFW metroplex',
    },
    {
      icon: Phone,
      title: '24/7 Emergency',
      description: 'Priority response for urgent issues',
    },
    {
      icon: MapPin,
      title: 'DFW Coverage',
      description: 'Serving 16+ cities in the metroplex',
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {badges.map((badge, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="p-6 rounded-xl bg-[var(--color-surface-900)]/50 border border-[var(--color-surface-800)] hover:border-[var(--color-gold-primary)]/50 transition-colors"
        >
          <badge.icon className="h-8 w-8 text-[var(--color-gold-primary)] mb-4" />
          <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
            {badge.title}
          </h4>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {badge.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

// Stats Counter Component
export function StatsCounter({
  stats,
  className = '',
}: {
  stats: Array<{
    value: number;
    label: string;
    suffix?: string;
  }>;
  className?: string;
}) {
  return (
    <div className={cn("grid sm:grid-cols-2 lg:grid-cols-4 gap-8", className)}>
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="text-center"
        >
          <div className="text-5xl font-display font-bold text-[var(--color-gold-primary)] mb-2">
            {stat.value}
            {stat.suffix && <span className="text-3xl">{stat.suffix}</span>}
          </div>
          <p className="text-[var(--color-text-secondary)]">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

// Floating Action Button
export function FloatingCTA({
  phoneNumber = '(682) 451-5951',
  position = 'bottom-right',
}: {
  phoneNumber?: string;
  position?: 'bottom-right' | 'bottom-left';
}) {
  return (
    <motion.a
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      href={`tel:${phoneNumber.replace(/\D/g, '')}`}
      onClick={() => trackCTAClick('Floating CTA', 'Phone Number')}
      className={cn(
        "fixed z-[1040] flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--color-gold-primary)] text-[var(--color-black-pure)] font-semibold shadow-[var(--shadow-gold)] hover:shadow-xl transition-shadow",
        position === 'bottom-right' ? "bottom-6 right-6" : "bottom-6 left-6"
      )}
    >
      <Phone className="h-5 w-5" />
      <span className="hidden sm:inline">{phoneNumber}</span>
    </motion.a>
  );
}

// Main App Wrapper with Accessibility
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