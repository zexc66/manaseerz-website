'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Award } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen bg-[var(--color-black-pure)]">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-gold-primary)]/5 via-transparent to-[var(--color-gold-primary)]/5" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-[var(--color-text-primary)] leading-tight mb-6">
              About <span className="text-[var(--color-gold-primary)]">Manaseerz Electric</span>
            </h1>
            <p className="text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed">
              Licensed electrical professionals serving the Dallas-Fort Worth metroplex with precision, integrity, and excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-[var(--color-black-rich)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="font-display text-4xl font-bold text-[var(--color-text-primary)]">
                Our Mission
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
                To provide the Dallas-Fort Worth metroplex with exceptional electrical services that combine technical expertise, safety excellence, and customer-focused care. We believe every electrical project deserves the same level of precision and attention to detail.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-6">
                {[
                  { icon: ShieldCheck, label: 'Safety First' },
                  { icon: Clock, label: 'Timely Service' },
                  { icon: Award, label: 'Quality Work' },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="h-12 w-12 rounded-xl bg-[var(--color-gold-primary)]/10 border border-[var(--color-gold-primary)]/20 flex items-center justify-center mx-auto mb-3">
                      <item.icon className="h-6 w-6 text-[var(--color-gold-primary)]" />
                    </div>
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">{item.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="font-display text-4xl font-bold text-[var(--color-text-primary)]">
                Our Vision
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
                To be the most trusted and respected electrical services provider in the DFW area, known for our commitment to quality, customer satisfaction, and innovative solutions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-[var(--color-black-pure)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { value: '5+', label: 'Years Experience' },
              { value: '500+', label: 'Projects Completed' },
              { value: '127', label: 'Happy Customers' },
              { value: '16+', label: 'Cities Served' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-6xl font-display font-bold text-[var(--color-gold-primary)] mb-2">
                  {stat.value}
                </div>
                <p className="text-[var(--color-text-secondary)]">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}