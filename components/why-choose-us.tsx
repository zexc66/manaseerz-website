'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { whyChooseUs } from '@/lib/data';
import { ShieldCheck, Zap, Clock, Sparkles, Star, CheckCircle2 } from '@/lib/icons';

export function WhyChooseUs() {
  const features = [
    {
      icon: ShieldCheck,
      title: 'Licensed & Insured',
      description: 'Fully licensed electrical contractors with comprehensive insurance coverage for complete peace of mind.',
      stat: '100%',
      statLabel: 'Compliant',
    },
    {
      icon: Zap,
      title: 'Rapid Response',
      description: '24/7 emergency availability with average response times under 4 hours across the entire DFW metroplex.',
      stat: '<4hr',
      statLabel: 'Response Time',
    },
    {
      icon: Star,
      title: 'Premium Quality',
      description: 'Meticulous attention to detail with premium materials and workmanship that exceeds industry standards.',
      stat: '5★',
      statLabel: 'Quality Rating',
    },
    {
      icon: Clock,
      title: '15+ Years Experience',
      description: 'Deep expertise across residential, commercial, and industrial electrical systems throughout Texas.',
      stat: '15+',
      statLabel: 'Years Experience',
    },
    {
      icon: Sparkles,
      title: 'Dedicated Team',
      description: 'Certified professionals committed to excellence, safety, and customer satisfaction on every project.',
      stat: '200+',
      statLabel: 'Happy Clients',
    },
    {
      icon: CheckCircle2,
      title: 'Transparent Pricing',
      description: 'Clear, upfront pricing with no hidden fees. Detailed quotes before work begins.',
      stat: '0',
      statLabel: 'Hidden Fees',
    },
  ];

  return (
    <section className="relative py-32 bg-[var(--color-black-pure)]">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black-rich)] to-[var(--color-black-pure)]" />

      {/* Animated Mesh */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-gold-primary)] rounded-full blur-[200px]"
      />

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-gold-primary)]/10 border border-[var(--color-gold-primary)]/20 px-4 py-2 text-sm font-medium text-[var(--color-gold-primary)] mb-6">
            Why Choose Us
          </div>

          <h2 className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] tracking-tight">
            Excellence Built on
            <br />
            <span className="text-[var(--color-gold-primary)]">
              Trust & Expertise
            </span>
          </h2>

          <p className="mt-6 text-[var(--color-text-secondary)] max-w-2xl mx-auto text-lg font-light">
            We don't just complete projects — we deliver experiences that exceed expectations, backed by industry-leading expertise and unwavering commitment to quality.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative h-full p-8 bg-gradient-to-br from-[var(--color-surface-900)]/60 to-[var(--color-surface-900)]/30 backdrop-blur-sm border border-[var(--color-gold-primary)]/10 rounded-[2.5rem] overflow-hidden group hover:border-[var(--color-gold-primary)]/30 transition-all duration-500">
                {/* Background Glow */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.1 }}
                  className="absolute inset-0 bg-gradient-to-br from-[var(--color-gold-primary)]/0 to-[var(--color-gold-primary)]/10"
                />

                <div className="relative z-10">
                  {/* Stat */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-6"
                  >
                    <div className="font-display font-bold text-5xl lg:text-6xl text-[var(--color-gold-primary)] leading-none">
                      {feature.stat}
                    </div>
                    <div className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-widest mt-2">
                      {feature.statLabel}
                    </div>
                  </motion.div>

                  {/* Icon */}
                  <div className="h-14 w-14 rounded-2xl bg-[var(--color-gold-primary)]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-7 w-7 text-[var(--color-gold-primary)]" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-semibold text-xl text-[var(--color-text-primary)] mb-4 group-hover:text-[var(--color-gold-primary)] transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[var(--color-text-secondary)] leading-[1.7] font-light">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}