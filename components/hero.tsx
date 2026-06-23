'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
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
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Column - Content */}
          {/* Left Column - Content.
              NOTE: no opacity in `initial` — a parent opacity:0 would keep the
              whole hero (incl. the LCP subtitle) invisible until JS hydrates.
              The slide-in transform is fine; only opacity gates LCP. */}
          <motion.div
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-12"
          >
            {/* Tag */}
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-gold-primary)]/10 border border-[var(--color-gold-primary)]/20 px-4 py-2 text-sm font-medium text-[var(--color-gold-primary)]">
                <ShieldCheck className="h-4 w-4" />
                Licensed in the Dallas-Fort Worth Metroplex
              </div>
            </motion.div>

            {/* Main Headline — rendered statically (no entrance animation) so it
                paints immediately in SSR HTML. It is the page's LCP element;
                animating it in would gate Largest Contentful Paint on JS
                download + hydration. Secondary elements still animate. */}
            <div>
              <h1 className="font-display font-bold text-[var(--text-4xl)] sm:text-[var(--text-6xl)] lg:text-[var(--text-7xl)] leading-[1.08] tracking-tight">
                DFW&apos;s Premier
                <span className="block text-[var(--color-gold-primary)]">
                  Electrical Specialists
                </span>
              </h1>
              <p className="mt-16 text-[var(--text-xl)] text-[var(--color-text-secondary)] leading-[1.7] max-w-3xl">
                Precision electrical crafted for excellence. From luxury chandelier installs to complete renovations — handled with licensed precision.
              </p>
            </div>

            {/* Trust Metrics */}
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              className="flex flex-wrap gap-10 pt-4"
            >
              {[
                { value: '5-Star', label: 'Client Rating', icon: Star },
                { value: '24hr', label: 'Response Time', icon: Clock },
                { value: '100%', label: 'DFW Coverage', icon: Map },
              ].map((metric) => (
                <motion.div
                  key={metric.label}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
                  className="flex items-center gap-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-gold-primary)]/10 border border-[var(--color-gold-primary)]/20"
                  >
                    <metric.icon className="h-6 w-6 text-[var(--color-gold-primary)]" />
                  </motion.div>
                  <div>
                    <p className="text-xl font-bold text-[var(--color-text-primary)]">{metric.value}</p>
                    <p className="text-sm text-[var(--color-text-secondary)]">{metric.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-lg bg-[var(--color-gold-primary)] px-8 py-4 text-base font-semibold text-[var(--color-black-pure)] transition-all hover:bg-[var(--color-gold-light)] hover:shadow-[var(--shadow-gold)] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Get a Free Quote
                <ArrowRight className="h-5 w-5" />
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.02 }}
                href="https://wa.me/16824515951?text=Hi%20Manaseerz%20Electric!%20I%27d%20like%20a%20quote."
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-[#25D366] px-8 py-4 text-base font-semibold text-white transition-all hover:brightness-110 hover:shadow-[0_8px_24px_rgba(37,211,102,0.4)] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <WhatsAppGlyph className="h-5 w-5" />
                WhatsApp
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.02 }}
                href="tel:6824515951"
                className="rounded-lg border-2 border-[var(--color-surface-800)] px-8 py-4 text-base font-semibold text-[var(--color-text-primary)] transition-all hover:border-[var(--color-gold-primary)] hover:text-[var(--color-gold-primary)] flex items-center justify-center gap-2"
              >
                <Phone className="h-5 w-5" />
                (682) 451-5951
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Column - Service Preview.
              No opacity in `initial` (only the x slide) — same reason as the
              left column: a parent/card opacity:0 would gate these large cards
              and register as a late LCP candidate. */}
          <motion.div
            initial={{ x: 50 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {services.slice(0, 4).map((service) => (
                <motion.div
                  key={service.id}
                  whileHover={{ y: -4 }}
                  className="group rounded-2xl border border-[var(--color-surface-800)] bg-[var(--color-surface-900)]/50 p-6 transition-all hover:border-[var(--color-gold-primary)] hover:shadow-[var(--shadow-gold)]"
                >
                   <div className="flex items-start gap-4">
                     <motion.div
                       whileHover={{ rotate: 360, scale: 1.1 }}
                       transition={{ duration: 0.6, ease: "easeOut" }}
                       className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-gold-primary)]/10 group-hover:bg-[var(--color-gold-primary)] transition-colors"
                     >
                       <ServiceIcon icon={service.icon} className="h-6 w-6 text-[var(--color-gold-primary)] group-hover:text-[var(--color-black-pure)] transition-colors" />
                     </motion.div>
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
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6, ease: "easeOut" }}
           className="text-center space-y-6 mb-20"
         >
           <h2 className="font-display text-4xl font-bold text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
             Our Premium Services
           </h2>
           <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
             From luxury chandelier installs to complete renovations, handled with licensed precision.
           </p>
         </motion.div>

         {/* Services Grid - Asymmetric with varied spacing */}
         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
           {services.map((service, index) => (
             <motion.div
               key={service.id}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: index * 0.1 }}
               className={cn(
                 "group border border-[var(--color-surface-800)] bg-[var(--color-surface-900)]/50 transition-all",
                 index === 0 ? "lg:col-span-2 lg:row-span-2 rounded-2xl p-12 hover:border-[var(--color-gold-primary)] hover:shadow-[var(--shadow-gold)] hover:-translate-y-1" : "rounded-2xl p-8 hover:border-[var(--color-gold-primary)] hover:shadow-[var(--shadow-gold)] hover:-translate-y-1"
               )}
             >
               <div className={cn(
                 "flex items-start gap-4 mb-6",
                 index === 0 ? "gap-6" : "gap-4"
               )}>
                 <div className={cn(
                   "flex items-center justify-center rounded-xl bg-[var(--color-gold-primary)]/10 border border-[var(--color-gold-primary)]/20 group-hover:bg-[var(--color-gold-primary)] transition-colors",
                   index === 0 ? "h-16 w-16 lg:h-20 lg:w-20" : "h-14 w-14"
                 )}>
                   <ServiceIcon icon={service.icon} className={cn(
                     "text-[var(--color-gold-primary)] group-hover:text-[var(--color-black-pure)] transition-colors",
                     index === 0 ? "h-8 w-8 lg:h-10 lg:w-10" : "h-7 w-7"
                   )} />
                 </div>
                 <div className="flex-1">
                   <h3 className={cn(
                     "font-display text-xl font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-gold-primary)] transition-colors",
                     index === 0 ? "text-2xl lg:text-3xl" : ""
                   )}>
                     {service.title}
                   </h3>
                 </div>
               </div>
                <p className={cn(
                  "text-[var(--color-text-secondary)] leading-relaxed",
                  index === 0 ? "text-lg mb-8" : "mb-6"
                )}>
                  {service.description}
                </p>
                <div className={cn(
                  "flex items-center justify-between pt-6 border-t border-[var(--color-surface-800)]",
                  index === 0 ? "pt-8" : ""
                )}>
                  <div>
                    <span className="text-sm font-medium text-[var(--color-gold-primary)]">
                      {service.priceRange}
                    </span>
                    <Link
                      href={`/services/${service.id}`}
                      className="mt-1 block text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-gold-primary)]"
                    >
                      Learn more →
                    </Link>
                  </div>
                  <button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-2 rounded-full border border-[var(--color-gold-primary)]/40 bg-[var(--color-gold-primary)]/10 px-4 py-2 text-sm font-medium text-[var(--color-gold-primary)] transition-all hover:bg-[var(--color-gold-primary)] hover:text-[var(--color-black-pure)] group-hover:text-[var(--color-gold-primary)]"
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
                The Standard Others Don&apos;t Meet
              </h2>
              <p className="mt-6 text-lg text-[var(--color-text-secondary)] leading-relaxed">
                We&apos;re not handymen. We&apos;re licensed electrical professionals who take pride in every connection, every install, every job.
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
                &quot;I stand behind every project we undertake. Quality work, transparent pricing, and professional results — that&apos;s the Manaseerz promise.&quot;
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

function WhyChooseCard({ title, description, icon }: { title: string; description: string; icon: LucideIcon }) {
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
  const icons: Record<string, LucideIcon> = {
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

// Official WhatsApp glyph (brand green used in the hero CTA).
function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M16.003 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.257.59 4.46 1.71 6.402L3.2 28.8l6.55-1.717a12.72 12.72 0 0 0 6.253 1.592h.005c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.332-6.635-3.75-9.052A12.71 12.71 0 0 0 16.003 3.2zm0 23.04h-.004a10.6 10.6 0 0 1-5.4-1.48l-.387-.23-4.02 1.054 1.073-3.92-.252-.4a10.58 10.58 0 0 1-1.62-5.644c0-5.85 4.76-10.61 10.61-10.61 2.835 0 5.497 1.105 7.5 3.11a10.51 10.51 0 0 1 3.103 7.5c0 5.85-4.76 10.61-10.61 10.61zm5.82-7.93c-.32-.16-1.887-.93-2.177-1.037-.292-.107-.504-.16-.715.16-.21.32-.82 1.037-1.005 1.248-.185.21-.37.237-.685.08-.32-.16-1.35-.498-2.57-1.586-.95-.847-1.59-1.893-1.775-2.213-.185-.32-.02-.493.14-.652.144-.143.32-.37.48-.555.16-.185.21-.32.317-.53.106-.213.053-.398-.027-.558-.08-.16-.715-1.723-.98-2.358-.258-.62-.52-.535-.715-.545l-.61-.01c-.21 0-.555.08-.846.4-.29.32-1.11 1.085-1.11 2.645 0 1.56 1.137 3.066 1.295 3.28.16.21 2.234 3.41 5.41 4.78.756.326 1.346.522 1.806.668.76.24 1.45.207 1.996.126.61-.09 1.887-.77 2.153-1.514.266-.743.266-1.38.186-1.513-.08-.133-.29-.213-.61-.373z" />
    </svg>
  );
}