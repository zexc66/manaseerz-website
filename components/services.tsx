'use client';

import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { services } from '@/lib/data';
import { Zap, Lamp, Home, Plug, Hammer, Wind, ArrowRight } from '@/lib/icons';
import { cn } from '@/lib/utils';

export function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-32 bg-[var(--color-black-pure)]">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-black-rich)] to-[var(--color-black-pure)]" />

      {/* Noise Grain */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        {/* Header - Asymmetric */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="lg:max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-gold-primary)]/10 border border-[var(--color-gold-primary)]/20 px-4 py-2 text-sm font-medium text-[var(--color-gold-primary)] mb-6">
                <span className="h-2 w-2 rounded-full bg-[var(--color-gold-primary)]" />
                Comprehensive Solutions
              </div>

              <h2 className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] tracking-tight">
                Electrical Excellence
                <br />
                <span className="text-[var(--color-gold-primary)]">
                  Crafted for Your Space
                </span>
              </h2>
            </div>

            <div className="lg:max-w-md">
              <p className="text-[var(--color-text-secondary)] leading-[1.75] text-lg font-light">
                From intricate installations to complete system overhauls, our expertise spans the full spectrum of premium electrical services for residential and commercial environments.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bento Grid - Asymmetric */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const isLarge = index === 0 || index === 4;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  'group relative',
                  isLarge ? 'md:col-span-2' : ''
                )}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                <div className="relative h-full p-8 bg-gradient-to-br from-[var(--color-surface-900)]/60 to-[var(--color-surface-900)]/30 backdrop-blur-sm border border-[var(--color-gold-primary)]/10 rounded-[2rem] overflow-hidden">
                  {/* Hover Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-gold-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      animate={{
                        scale: hoveredIndex === index ? 1.1 : 1,
                        rotate: hoveredIndex === index ? 5 : 0,
                      }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="h-16 w-16 rounded-2xl bg-[var(--color-gold-primary)]/10 flex items-center justify-center mb-6 group-hover:bg-[var(--color-gold-primary)]/15 transition-colors duration-300"
                    >
                      <service.icon className="h-8 w-8 text-[var(--color-gold-primary)]" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="font-display font-semibold text-2xl text-[var(--color-text-primary)] mb-4 group-hover:text-[var(--color-gold-primary)] transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[var(--color-text-secondary)] leading-[1.7] mb-6 font-light">
                      {service.description}
                    </p>

                    {/* CTA */}
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-gold-primary)] group-hover:gap-3 transition-all duration-300"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  </div>

                  {/* Decorative Elements */}
                  <motion.div
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                      scale: hoveredIndex === index ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-4 right-4 h-2 w-2 rounded-full bg-[var(--color-gold-primary)] opacity-0"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}