'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import type { QAItem } from '@/lib/geo-data';

type GEOQuestionsProps = {
  items: QAItem[];
  title?: string;
  subtitle?: string;
  className?: string;
};

export function GEOQuestions({
  items,
  title = 'Frequently Asked Questions',
  subtitle = 'Direct answers to the questions DFW homeowners ask most',
  className = '',
}: GEOQuestionsProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-black-rich)] ${className}`}>
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3">
            {title}
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
          {items.map((item, index) => {
            const isOpen = open === index;
            return (
              <div
                key={index}
                className="border border-[var(--color-surface-800)] rounded-xl overflow-hidden bg-[var(--color-surface-900)]"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  aria-expanded={isOpen}
                >
                  <h3
                    className="font-display text-lg font-semibold text-[var(--color-text-primary)]"
                    itemProp="name"
                  >
                    {item.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-[var(--color-gold-primary)] flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: isOpen ? 'auto' : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <p
                    className="px-5 pb-5 text-[var(--color-text-secondary)] leading-relaxed"
                    itemProp="text"
                  >
                    {item.answer}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
