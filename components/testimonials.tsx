'use client';

import { motion } from 'framer-motion';
import { Star, MapPin, Quote, ArrowRight } from '@/lib/icons';
import { testimonials } from '@/lib/data';

export function Testimonials() {
  return (
    <section id="reviews" className="py-24 bg-[var(--color-black-rich)]">
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
            What People Say
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Don&apos;t just take our word for it — hear from our satisfied clients across the DFW metroplex.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group rounded-2xl border border-[var(--color-surface-800)] bg-[var(--color-surface-900)]/50 p-8 transition-all hover:border-[var(--color-gold-primary)] hover:shadow-[var(--shadow-gold)] hover:-translate-y-2"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-[var(--color-gold-primary)] text-[var(--color-gold-primary)]" />
                ))}
              </div>

              {/* Quote */}
              <div className="relative mb-6">
                <Quote className="absolute -top-2 -left-2 h-8 w-8 text-[var(--color-gold-primary)]/20" />
                <p className="text-[var(--color-text-secondary)] leading-relaxed relative">
                  {testimonial.text}
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center justify-between pt-6 border-t border-[var(--color-surface-800)]">
                <div>
                  <h4 className="font-display font-semibold text-[var(--color-text-primary)]">
                    {testimonial.name}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-1">
                    <MapPin className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
                    <p className="text-sm text-[var(--color-text-muted)]">
                      {testimonial.city}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-[var(--color-gold-primary)] uppercase tracking-wider">
                    Project
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                    {testimonial.project}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-gold-primary)] px-8 py-4 text-base font-semibold text-[var(--color-black-pure)] transition-all hover:bg-[var(--color-gold-light)] hover:shadow-[var(--shadow-gold)] active:scale-[0.98]"
          >
            Get Your Free Quote
            <ArrowRight className="h-5 w-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}