'use client';

import { motion } from 'framer-motion';
import { Scale, Users, ShieldCheck, AlertTriangle, Clock } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[var(--color-black-pure)] py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-5xl font-bold text-[var(--color-text-primary)] mb-6">
            Terms of Service
          </h1>
          <p className="text-[var(--color-text-muted)] mb-8">
            Last updated: January 1, 2024
          </p>

          <div className="space-y-12">
            <section className="space-y-4">
              <h2 className="text-2xl font-display font-semibold text-[var(--color-text-primary)] mb-4">
                Acceptance of Terms
              </h2>
              <div className="bg-[var(--color-surface-900)]/50 border border-[var(--color-surface-800)] rounded-xl p-6">
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  By accessing or using Manaseerz Electric's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-display font-semibold text-[var(--color-text-primary)] mb-4">
                Services Provided
              </h2>
              <div className="bg-[var(--color-surface-900)]/50 border border-[var(--color-surface-800)] rounded-xl p-6">
                <p className="text-[var(--color-text-secondary)] mb-4 leading-relaxed">
                  Manaseerz Electric provides professional electrical services including:
                </p>
                <ul className="space-y-2 text-[var(--color-text-secondary)]">
                  <li>• Chandelier installation and lighting services</li>
                  <li>• Electric vehicle (EV) charger installation</li>
                  <li>• Smart home automation and integration</li>
                  <li>• Electrical troubleshooting and repairs</li>
                  <li>• Renovation electrical planning and installation</li>
                  <li>• Range hood wiring and kitchen electrical work</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-display font-semibold text-[var(--color-text-primary)] mb-4">
                Service Agreement
              </h2>
              <div className="bg-[var(--color-surface-900)]/50 border border-[var(--color-surface-800)] rounded-xl p-6">
                <ul className="space-y-3 text-[var(--color-text-secondary)]">
                  <li>• <strong>Quality Standards:</strong> All work performed meets or exceeds Texas electrical code requirements</li>
                  <li>• <strong>Warranty:</strong> 1-year labor warranty on all installations</li>
                  <li>• <strong>Pricing:</strong> Transparent pricing with no hidden fees unless agreed upon</li>
                  <li>• <strong>Timeline:</strong> We strive to complete projects within agreed-upon timeframes</li>
                  <li>• <strong>Access:</strong> We respect your property and minimize disruption</li>
                  <li>• <strong>Cleanliness:</strong> We clean up after completing work</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-display font-semibold text-[var(--color-text-primary)] mb-4">
                Client Responsibilities
              </h2>
              <div className="bg-[var(--color-surface-900)]/50 border border-[var(--color-surface-800)] rounded-xl p-6">
                <ul className="space-y-3 text-[var(--color-text-secondary)]">
                  <li>• Provide accurate information about electrical needs and property</li>
                  <li>• Ensure clear access to work areas at scheduled times</li>
                  <li>• Secure pets and protect valuable items during service</li>
                  <li>• Communicate any changes or concerns promptly</li>
                  <li>• Make payments according to agreed-upon terms</li>
                  <li>• Follow safety guidelines provided by our technicians</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-display font-semibold text-[var(--color-text-primary)] mb-4">
                Limitation of Liability
              </h2>
              <div className="bg-[var(--color-surface-900)]/50 border border-[var(--color-surface-800)] rounded-xl p-6">
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  Manaseerz Electric shall not be liable for any indirect, incidental, special, or consequential damages resulting from our services, except where prohibited by law.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-display font-semibold text-[var(--color-text-primary)] mb-4">
                Changes to Terms
              </h2>
              <div className="bg-[var(--color-surface-900)]/50 border border-[var(--color-surface-800)] rounded-xl p-6">
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-display font-semibold text-[var(--color-text-primary)] mb-4">
                Contact Information
              </h2>
              <div className="bg-[var(--color-surface-900)]/50 border border-[var(--color-surface-800)] rounded-xl p-6">
                <p className="text-[var(--color-text-secondary)] mb-4">
                  For questions about these Terms of Service, please contact us:
                </p>
                <ul className="space-y-2 text-[var(--color-text-secondary)]">
                  <li>• <strong>Email:</strong> info@manaseerz.com</li>
                  <li>• <strong>Phone:</strong> (682) 451-5951</li>
                  <li>• <strong>Address:</strong> Lewisville, TX</li>
                </ul>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}