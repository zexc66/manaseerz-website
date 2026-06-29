'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, ArrowRight, Zap } from '@/lib/icons';
import { contactInfo, cities } from '@/lib/data';

export function Footer() {
  return (
    <footer className="bg-[var(--color-black-rich)] border-t border-[var(--color-surface-800)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" aria-label="Manaseerz Electric — home" className="group flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-gold-primary)] transition-transform group-hover:scale-105">
                <Zap className="h-6 w-6 text-[var(--color-black-pure)]" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">
                  MANASEERZ
                </h3>
                <p className="text-sm text-[var(--color-gold-primary)]">
                  ELECTRIC
                </p>
              </div>
            </Link>
            <p className="max-w-md text-[var(--color-text-secondary)] leading-relaxed">
              Licensed electrical specialists serving the Dallas-Fort Worth Metroplex.
              Quality work, transparent pricing, professional results.
            </p>
            <div className="flex flex-wrap gap-4">
              <ContactItem icon={<Phone className="h-5 w-5" />} label="Call" value={contactInfo.phone} href={`tel:${contactInfo.phone.replace(/\D/g, '')}`} />
              <ContactItem icon={<Mail className="h-5 w-5" />} label="Email" value={contactInfo.email} href={`mailto:${contactInfo.email}`} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-6 font-display text-lg font-semibold text-[var(--color-text-primary)]">
              Services
            </h4>
            <ul className="space-y-3">
              {['Chandelier Installation', 'EV Charger Installation', 'Smart Switches', 'Electrical Renovation', 'Outlet & Circuit Work', 'Range Hood Wiring'].map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="group flex items-center text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-gold-primary)]"
                  >
                    <ArrowRight className="mr-2 h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Area */}
          <div>
            <h4 className="mb-6 font-display text-lg font-semibold text-[var(--color-text-primary)]">
              Service Area
            </h4>
            <ul className="space-y-2">
              {cities.slice(0, 8).map((city) => (
                <li key={city}>
                  <a
                    href="#contact"
                    className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-gold-primary)]"
                  >
                    <MapPin className="h-3 w-3" />
                    {city}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-3">
              <ContactItem icon={<MapPin className="h-5 w-5" />} label="Based in" value={contactInfo.baseLocation} />
              <ContactItem icon={<Clock className="h-5 w-5" />} label="Hours" value={contactInfo.hours} />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-[var(--color-surface-800)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[var(--color-text-muted)]">
            © 2026 Manaseerz. All rights reserved. {contactInfo.baseLocation}
          </p>
          <div className="flex gap-6">
            <a href="/privacy" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-gold-primary)] transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-gold-primary)] transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ContactItem({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-[var(--color-gold-primary)]">
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
          {label}
        </p>
        <p className="text-sm font-medium text-[var(--color-text-primary)]">
          {value}
        </p>
      </div>
    </div>
  );

  if (href) {
    return <a href={href} className="block hover:text-[var(--color-gold-primary)] transition-colors">{content}</a>;
  }

  return <div>{content}</div>;
}