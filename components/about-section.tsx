'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Clock, MapPin, Award, Users, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AboutSection() {
  const missionPoints = [
    {
      icon: ShieldCheck,
      title: 'Safety First',
      description: 'Licensed, insured, and code-compliant electrical work',
    },
    {
      icon: Clock,
      title: 'Same-Day Service',
      description: 'Available 7 days a week for urgent electrical needs',
    },
    {
      icon: MapPin,
      title: 'DFW Expert',
      description: 'Serving Lewisville and entire Dallas-Fort Worth area',
    },
    {
      icon: Award,
      title: '5-Star Rated',
      description: 'Consistently top-rated by homeowners and businesses',
    },
    {
      icon: Users,
      title: 'Customer Focused',
      description: 'Your satisfaction is our top priority',
    },
    {
      icon: Zap,
      title: 'Modern Technology',
      description: 'Expert in EV chargers, smart homes, and energy efficiency',
    },
  ];

  return (
    <section id="about" className="py-24 bg-[var(--color-black-rich)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl font-bold text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl mb-6">
            Why Choose Manaseerz Electric?
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            We're not just another electrical service company. We're your trusted partners in electrical excellence.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {missionPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[var(--color-surface-900)]/50 border border-[var(--color-surface-800)] rounded-xl p-6 hover:border-[var(--color-gold-primary)]/50 transition-all"
            >
              <div className="h-12 w-12 rounded-xl bg-[var(--color-gold-primary)]/10 border border-[var(--color-gold-primary)]/20 flex items-center justify-center mb-4">
                <point.icon className="h-6 w-6 text-[var(--color-gold-primary)]" />
              </div>
              <h3 className="text-xl font-display font-semibold text-[var(--color-text-primary)] mb-2">
                {point.title}
              </h3>
              <p className="text-[var(--color-text-secondary)]">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bg-[var(--color-surface-900)]/50 border border-[var(--color-surface-800)] rounded-2xl p-8 lg:p-12"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-display font-semibold text-[var(--color-text-primary)] mb-4">
                Our Commitment to Excellence
              </h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                At Manaseerz Electric, we believe that quality electrical work should be accessible to everyone. From luxury chandelier installations in high-end homes to essential repairs for everyday families, we approach every project with the same level of care and professionalism.
              </p>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                Our team of certified electricians brings years of combined experience to every job. We stay up-to-date with the latest electrical codes, technologies, and best practices to ensure your electrical system is safe, efficient, and built to last.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="px-4 py-2 rounded-lg bg-[var(--color-gold-primary)]/10 border border-[var(--color-gold-primary)]/20 text-[var(--color-gold-primary)]">
                  ✓ Licensed in Texas
                </div>
                <div className="px-4 py-2 rounded-lg bg-[var(--color-gold-primary)]/10 border border-[var(--color-gold-primary)]/20 text-[var(--color-gold-primary)]">
                  ✓ Fully Insured
                </div>
                <div className="px-4 py-2 rounded-lg bg-[var(--color-gold-primary)]/10 border border-[var(--color-gold-primary)]/20 text-[var(--color-gold-primary)]">
                  ✓ Satisfaction Guaranteed
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-6 rounded-xl bg-[var(--color-surface-800)]">
                <div className="text-4xl font-bold text-[var(--color-gold-primary)] mb-2">5+</div>
                <div className="text-sm text-[var(--color-text-muted)]">Years Experience</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-[var(--color-surface-800)]">
                <div className="text-4xl font-bold text-[var(--color-gold-primary)] mb-2">500+</div>
                <div className="text-sm text-[var(--color-text-muted)]">Projects Completed</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-[var(--color-surface-800)]">
                <div className="text-4xl font-bold text-[var(--color-gold-primary)] mb-2">100%</div>
                <div className="text-sm text-[var(--color-text-muted)]">Satisfaction Rate</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-[var(--color-surface-800)]">
                <div className="text-4xl font-bold text-[var(--color-gold-primary)] mb-2">24/7</div>
                <div className="text-sm text-[var(--color-text-muted)]">Emergency Service</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}