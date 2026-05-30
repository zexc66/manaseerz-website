'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Eye, AlertTriangle, Clock, Lock, User } from 'lucide-react';

export default function PrivacyPage() {
  const lastUpdated = 'January 1, 2024';

  return (
    <div className="min-h-screen bg-[var(--color-black-pure)] py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-5xl font-bold text-[var(--color-text-primary)] mb-6">
            Privacy Policy
          </h1>
          <p className="text-[var(--color-text-muted)] mb-8">
            Last updated: {lastUpdated}
          </p>

          <div className="space-y-12">
            <section className="space-y-4">
              <h2 className="text-2xl font-display font-semibold text-[var(--color-text-primary)] mb-4">
                Information We Collect
              </h2>
              <div className="bg-[var(--color-surface-900)]/50 border border-[var(--color-surface-800)] rounded-xl p-6">
                <p className="text-[var(--color-text-secondary)] mb-4">
                  At Manaseerz Electric, we collect information you provide directly to us when you:
                </p>
                <ul className="space-y-2 text-[var(--color-text-secondary)]">
                  <li>• Request a quote or book an appointment through our website</li>
                  <li>• Contact us via phone, email, or online form</li>
                  <li>• Provide feedback or reviews about our services</li>
                  <li>• Sign up for email updates or newsletters</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-display font-semibold text-[var(--color-text-primary)] mb-4">
                How We Use Your Information
              </h2>
              <div className="bg-[var(--color-surface-900)]/50 border border-[var(--color-surface-800)] rounded-xl p-6">
                <ul className="space-y-2 text-[var(--color-text-secondary)]">
                  <li>• <strong>To provide services:</strong> Process your requests, schedule appointments, and complete electrical work</li>
                  <li>• <strong>To communicate with you:</strong> Send appointment confirmations, project updates, and service reminders</li>
                  <li>• <strong>To improve our services:</strong> Analyze usage patterns and customer feedback</li>
                  <li>• <strong>To send marketing communications:</strong> Only with your explicit consent</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-display font-semibold text-[var(--color-text-primary)] mb-4">
                Data Security
              </h2>
              <div className="bg-[var(--color-surface-900)]/50 border border-[var(--color-surface-800)] rounded-xl p-6">
                <p className="text-[var(--color-text-secondary)] mb-4">
                  We implement appropriate security measures to protect your personal information:
                </p>
                <ul className="space-y-2 text-[var(--color-text-secondary)]">
                  <li>• Secure SSL encryption for all data transmission</li>
                  <li>• Restricted access to personal data</li>
                  <li>• Regular security assessments and updates</li>
                  <li>• Compliance with data protection regulations</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-display font-semibold text-[var(--color-text-primary)] mb-4">
                Your Rights
              </h2>
              <div className="bg-[var(--color-surface-900)]/50 border border-[var(--color-surface-800)] rounded-xl p-6">
                <p className="text-[var(--color-text-secondary)] mb-4">
                  You have the right to:
                </p>
                <ul className="space-y-2 text-[var(--color-text-secondary)]">
                  <li>• Access your personal information</li>
                  <li>• Request deletion of your data</li>
                  <li>• Opt out of marketing communications</li>
                  <li>• Request a copy of your data</li>
                  <li>• Correct inaccurate information</li>
                </ul>
                <p className="text-[var(--color-text-secondary)] mt-4">
                  To exercise these rights, contact us at info@manaseerz.com or (682) 451-5951.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-display font-semibold text-[var(--color-text-primary)] mb-4">
                Third-Party Services
              </h2>
              <div className="bg-[var(--color-surface-900)]/50 border border-[var(--color-surface-800)] rounded-xl p-6">
                <p className="text-[var(--color-text-secondary)]">
                  We may share your information with trusted third parties for:
                </p>
                <ul className="space-y-2 text-[var(--color-text-secondary)] mt-4">
                  <li>• <strong>Service providers:</strong> To complete requested services (e.g., payment processing)</li>
                  <li>• <strong>Analytics:</strong> To improve our website and services</li>
                  <li>• <strong>Marketing:</strong> Only with your explicit consent</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-display font-semibold text-[var(--color-text-primary)] mb-4">
                Contact Us
              </h2>
              <div className="bg-[var(--color-surface-900)]/50 border border-[var(--color-surface-800)] rounded-xl p-6">
                <p className="text-[var(--color-text-secondary)] mb-4">
                  If you have questions about this Privacy Policy or our data practices, please contact us:
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