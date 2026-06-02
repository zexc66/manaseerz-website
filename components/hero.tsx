'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { services, whyChooseUs } from '@/lib/data';
import { Zap, Lamp, Home, Plug, Hammer, Wind, ShieldCheck, Clock, Map, Star, ArrowRight } from '@/lib/icons';
import { cn } from '@/lib/utils';

export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  const springConfig = { damping: 15, stiffness: 150 };

  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const handleMouseMove = (event: React.MouseEvent) => {
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - left - width / 2);
    mouseY.set(event.clientY - top - height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-[var(--color-black-pure)]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Sophisticated Noise Grain */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Animated Background Gradient - Premium Mesh */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-black-rich)] via-[var(--color-black-pure)] to-[var(--color-black-rich)]" />

        {/* Dynamic Mesh Gradient */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.12, 0.18, 0.12],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute top-[20%] left-[15%] w-[500px] h-[500px] bg-[var(--color-gold-primary)] rounded-full blur-[150px]"
        />

        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: [0.16, 1, 0.3, 1],
            delay: 3,
          }}
          className="absolute bottom-[20%] right-[15%] w-[500px] h-[500px] bg-[var(--color-gold-light)] rounded-full blur-[150px]"
        />

        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(var(--color-gold-primary) 1px, transparent 1px),
                             linear-gradient(90deg, var(--color-gold-primary) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Radial Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black-pure)] via-transparent to-transparent" />
      </div>

      {/* Asymmetric Split Layout */}
      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12 py-24 w-full">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-24 items-center">
          {/* Left Column - Premium Content */}
          <motion.div
            style={{
              rotateX: rotateXSpring,
              rotateY: rotateYSpring,
              transformStyle: 'preserve-3d'
            }}
            className="space-y-8"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 rounded-full bg-[var(--color-surface-900)]/60 backdrop-blur-sm border border-[var(--color-gold-primary)]/30 px-5 py-2.5"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="h-2 w-2 rounded-full bg-[var(--color-gold-primary)]"
              />
              <span className="text-sm font-medium text-[var(--color-gold-light)] tracking-wide uppercase">
                Licensed & Insured
              </span>
            </motion.div>

            {/* Sophisticated Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-display font-bold text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-tighter">
                DFW's Premier
                <br />
                <span className="bg-gradient-to-r from-[var(--color-gold-light)] to-[var(--color-gold-primary)] bg-clip-text text-transparent">
                  Electrical Excellence
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 text-[clamp(1rem,1.25vw,1.25rem)] text-[var(--color-text-secondary)] leading-[1.75] max-w-2xl font-light tracking-wide"
              >
                Precision electrical solutions for those who demand excellence. Luxury installations, complete renovations, and technical mastery — delivered with licensed precision across the Dallas-Fort Worth metroplex.
              </motion.p>
            </motion.div>

            {/* Premium Metrics - Asymmetric */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-12 pt-2"
            >
              {[
                { value: '5.0', label: 'Client Rating', sublabel: '200+ reviews' },
                { value: '<24hr', label: 'Response Time', sublabel: 'Emergency 24/7' },
                { value: '15+', label: 'Years Experience', sublabel: 'DFW Metroplex' },
              ].map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col"
                >
                  <div className="font-display font-bold text-3xl lg:text-4xl text-[var(--color-gold-primary)] leading-none">
                    {metric.value}
                  </div>
                  <div className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mt-1">
                    {metric.label}
                  </div>
                  <div className="text-[11px] text-[var(--color-text-muted)] mt-0.5">
                    {metric.sublabel}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Premium CTAs - Negative Space */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4 pt-6"
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98, y: 0 }}
                className="group relative px-8 py-4 bg-[var(--color-gold-primary)] text-[var(--color-black-pure)] font-medium tracking-wide overflow-hidden rounded-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-gold-light)] to-[var(--color-gold-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  Book Appointment
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98, y: 0 }}
                className="group px-8 py-4 border border-[var(--color-gold-primary)]/30 text-[var(--color-gold-light)] font-medium tracking-wide rounded-sm hover:bg-[var(--color-gold-primary)]/5 transition-colors"
              >
                View Portfolio
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column - Interactive 3D Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            {/* Main Card */}
            <motion.div
              style={{
                rotateX: rotateXSpring,
                rotateY: rotateYSpring,
                transformStyle: 'preserve-3d'
              }}
              className="relative bg-gradient-to-br from-[var(--color-surface-900)]/80 to-[var(--color-surface-900)]/40 backdrop-blur-sm border border-[var(--color-gold-primary)]/20 rounded-[2.5rem] p-8 shadow-[0_20px_40px_-15px_rgba(212,175,55,0.15)]"
            >
              {/* Animated Border */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-[var(--color-gold-primary)]/20 to-transparent pointer-events-none" />

              {/* Inner Content */}
              <div className="relative space-y-6">
                {/* Top Section */}
                <div className="flex items-center justify-between border-b border-[var(--color-gold-primary)]/10 pb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-[var(--color-gold-primary)]/10 flex items-center justify-center">
                      <Zap className="h-6 w-6 text-[var(--color-gold-primary)]" />
                    </div>
                    <div>
                      <div className="font-display font-semibold text-lg text-[var(--color-text-primary)]">
                        Premium Service
                      </div>
                      <div className="text-sm text-[var(--color-text-muted)]">
                        Available Now
                      </div>
                    </div>
                  </div>
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="h-2 w-2 rounded-full bg-[var(--color-gold-primary)]"
                  />
                </div>

                {/* Services Grid - Bento Style */}
                <div className="grid grid-cols-2 gap-4">
                  {services.slice(0, 4).map((service, index) => (
                    <motion.div
                      key={service.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="group relative p-4 bg-[var(--color-surface-800)]/50 border border-[var(--color-gold-primary)]/10 rounded-2xl cursor-pointer overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-gold-primary)]/0 to-[var(--color-gold-primary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="relative z-10">
                        <div className="h-8 w-8 rounded-lg bg-[var(--color-gold-primary)]/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <div className="h-4 w-4 bg-[var(--color-gold-primary)]/50" />
                        </div>
                        <div className="font-medium text-sm text-[var(--color-text-primary)]">
                          {service.title}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom Stats */}
                <div className="pt-4 border-t border-[var(--color-gold-primary)]/10">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="font-display font-bold text-2xl text-[var(--color-gold-primary)]">
                        500+
                      </div>
                      <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mt-1">
                        Projects
                      </div>
                    </div>
                    <div>
                      <div className="font-display font-bold text-2xl text-[var(--color-gold-primary)]">
                        100%
                      </div>
                      <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mt-1">
                        Satisfaction
                      </div>
                    </div>
                    <div>
                      <div className="font-display font-bold text-2xl text-[var(--color-gold-primary)]">
                        24/7
                      </div>
                      <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mt-1">
                        Support
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -top-4 -right-4 h-12 w-12 bg-[var(--color-gold-primary)]/20 rounded-full backdrop-blur-sm border border-[var(--color-gold-primary)]/30"
              />

              <motion.div
                animate={{
                  y: [0, 8, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
                className="absolute -bottom-6 -left-6 h-8 w-8 bg-[var(--color-gold-light)]/20 rounded-full backdrop-blur-sm border border-[var(--color-gold-light)]/30"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-widest">
          Scroll
        </div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="h-12 w-px bg-gradient-to-b from-[var(--color-gold-primary)] to-transparent"
        />
      </motion.div>
    </section>
  );
}