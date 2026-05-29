'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { services, whyChooseUs } from '@/lib/data';
import { Zap, Lamp, Home, Plug, Hammer, Wind, ShieldCheck, Clock, Map, Star, ArrowRight } from '@/lib/icons';
import { cn } from '@/lib/utils';

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-[var(--color-black-pure)]">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-black-rich)] via-[var(--color-black-pure)] to-[var(--color-black-rich)]" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-gold-primary)] rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--color-gold-primary)] rounded-full blur-[120px]"
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(var(--color-gold-primary) 1px, transparent 1px),
                         linear-gradient(90deg, var(--color-gold-primary) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-8"
          >
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-gold-primary)]/10 border border-[var(--color-gold-primary)]/20 px-4 py-2 text-sm font-medium text-[var(--color-gold-primary)]">
                <ShieldCheck className="h-4 w-4" />
                Licensed in the Dallas-Fort Worth Metroplex
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h1 className="font-display text-5xl font-bold text-[var(--color-text-primary)] sm:text-6xl lg:text-7xl leading-[1.1]">
                DFW's Premier
                <span className="block text-[var(--color-gold-primary)]">
                  Electrical Specialists
                </span>
              </h1>
              <p className="mt-6 text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
                Precision electrical crafted for excellence. From luxury chandelier installs to complete renovations — handled with licensed precision.
              </p>
            </motion.div>

            {/* Trust Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap gap-6"
            >
              {[
                { value: '5-Star', label: 'Client Rating', icon: Star },
                { value: '24hr', label: 'Response Time', icon: Clock },
                { value: '100%', label: 'DFW Coverage', icon: Map },
              ].map((metric) => (
                <div key={metric.label} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-gold-primary)]/10">
                    <metric.icon className="h-5 w-5 text-[var(--color-gold-primary)]" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-[var(--color-text-primary)]">
                      {metric.value}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">
                      {metric.label}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-lg bg-[var(--color-gold-primary)] px-8 py-4 text-base font-semibold text-[var(--color-black-pure)] transition-all hover:bg-[var(--color-gold-light)] hover:shadow-[var(--shadow-gold)] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Get a Free Quote
                <ArrowRight className="h-5 w-5" />
              </button>
              <a
                href="tel:6824515951"
                className="rounded-lg border-2 border-[var(--color-surface-800)] px-8 py-4 text-base font-semibold text-[var(--color-text-primary)] transition-all hover:border-[var(--color-gold-primary)] hover:text-[var(--color-gold-primary)] flex items-center justify-center gap-2"
              >
                <Phone className="h-5 w-5" />
                (682) 451-5951
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column - Service Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="relative"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {services.slice(0, 4).map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="group rounded-2xl border border-[var(--color-surface-800)] bg-[var(--color-surface-900)]/50 p-6 transition-all hover:border-[var(--color-gold-primary)] hover:shadow-[var(--shadow-gold)] hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-gold-primary)]/10 group-hover:bg-[var(--color-gold-primary)] transition-colors">
                      <ServiceIcon icon={service.icon} className="h-6 w-6 text-[var(--color-gold-primary)] group-hover:text-[var(--color-black-pure)] transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-gold-primary)] transition-colors">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm text-[var(--color-text-muted)] line-clamp-2">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Decorative Element */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[var(--color-gold-primary)]/20 blur-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className="py-24 bg-[var(--color-black-rich)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="font-display text-4xl font-bold text-[var(--color-text-primary)] sm:text-5xl">
            Our Premium Services
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            From luxury chandelier installs to complete renovations, handled with licensed precision.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group rounded-2xl border border-[var(--color-surface-800)] bg-[var(--color-surface-900)]/50 p-8 transition-all hover:border-[var(--color-gold-primary)] hover:shadow-[var(--shadow-gold)] hover:-translate-y-2"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--color-gold-primary)]/10 group-hover:bg-[var(--color-gold-primary)] transition-colors">
                  <ServiceIcon icon={service.icon} className="h-7 w-7 text-[var(--color-gold-primary)] group-hover:text-[var(--color-black-pure)] transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-gold-primary)] transition-colors">
                    {service.title}
                  </h3>
                </div>
              </div>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                {service.description}
              </p>
              <div className="flex items-center justify-between pt-6 border-t border-[var(--color-surface-800)]">
                <span className="text-sm font-medium text-[var(--color-gold-primary)]">
                  {service.priceRange}
                </span>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-gold-primary)] transition-colors"
                >
                  Get Quote
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyChooseUs() {
  return (
    <section id="about" className="py-24 bg-[var(--color-black-pure)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-display text-4xl font-bold text-[var(--color-text-primary)] sm:text-5xl">
                The Standard Others Don't Meet
              </h2>
              <p className="mt-6 text-lg text-[var(--color-text-secondary)] leading-relaxed">
                We're not handymen. We're licensed electrical professionals who take pride in every connection, every install, every job.
              </p>
            </div>

            <div className="space-y-6">
              <WhyChooseCard
                title="Same-Day & Next-Day Available"
                description="Emergency electrical issues? We're here when you need us most. Fast response times across the entire DFW metroplex."
                icon={Clock}
              />
              <WhyChooseCard
                title="100% Licensed & Insured"
                description="Full licensing and comprehensive insurance coverage. Your peace of mind is our priority."
                icon={ShieldCheck}
              />
            </div>

            <div className="rounded-2xl border border-[var(--color-surface-800)] bg-[var(--color-surface-900)]/50 p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-gold-primary)]">
                  <Zap className="h-6 w-6 text-[var(--color-black-pure)]" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">
                    Faris - OWNER
                  </h3>
                  <p className="text-sm text-[var(--color-gold-primary)]">
                    Manaseerz Electric
                  </p>
                </div>
              </div>
              <p className="text-[var(--color-text-secondary)]">
                "I stand behind every project we undertake. Quality work, transparent pricing, and professional results — that's the Manaseerz promise."
              </p>
            </div>
          </motion.div>

          {/* Right Column - Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid gap-6 sm:grid-cols-2"
          >
            {whyChooseUs.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-2xl border border-[var(--color-surface-800)] bg-[var(--color-surface-900)]/50 p-6 hover:border-[var(--color-gold-primary)] transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-gold-primary)]/10 text-[var(--color-gold-primary)]">
                    <feature.icon />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function WhyChooseCard({ title, description, icon }: { title: string; description: string; icon: any }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-gold-primary)]/10 text-[var(--color-gold-primary)]">
        {React.createElement(icon, { className: "h-5 w-5" })}
      </div>
      <div>
        <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)] mb-2">
          {title}
        </h3>
        <p className="text-[var(--color-text-secondary)] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

function ServiceIcon({ icon, className }: { icon: string; className?: string }) {
  const icons: Record<string, any> = {
    lamp: Lamp,
    zap: Zap,
    home: Home,
    plug: Plug,
    hammer: Hammer,
    wind: Wind,
  };

  const Icon = icons[icon] || Zap;
  return <Icon className={className} />;
}

function Phone({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}