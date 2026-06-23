'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqData = [
  {
    id: 'pricing',
    question: 'How much do your services cost?',
    answer: 'Our pricing varies by project type and complexity. Chandelier installation starts at $150, EV charger installation at $300, smart home integration at $100, and complete renovations range from $500-$3,000. We provide free quotes with transparent, no-obligation pricing.',
  },
  {
    id: 'availability',
    question: 'How quickly can you respond?',
    answer: 'We offer same-day and next-day availability throughout the DFW metroplex. Emergency services are available 24/7. For standard appointments, we typically can schedule within 1-3 business days depending on your location and project complexity.',
  },
  {
    id: 'areas',
    question: 'What cities do you serve?',
    answer: 'We serve the entire Dallas-Fort Worth metroplex including Lewisville, Frisco, McKinney, Plano, Dallas, Prosper, Allen, Carrollton, Richardson, Addison, Garland, Irving, Flower Mound, Southlake, Celina, and The Colony. If your city isn\'t listed, contact us - we may still serve your area!',
  },
  {
    id: 'license',
    question: 'Are you licensed and insured?',
    answer: 'Yes! Manaseerz Electric is fully licensed and insured in the state of Texas. Our team consists of certified electrical professionals who undergo regular training to stay current with the latest codes and safety standards.',
  },
  {
    id: 'payment',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, debit cards, cash, checks, and offer financing options for larger projects. Payment is typically due upon completion of work, though we may require a deposit for extensive renovations or special-order equipment.',
  },
  {
    id: 'warranty',
    question: 'Do you offer warranties on your work?',
    answer: 'Absolutely! We stand behind our work with a 1-year labor warranty on all installations. Equipment warranties vary by manufacturer but typically range from 1-5 years. We\'ll provide full warranty details before starting any project.',
  },
  {
    id: 'ev',
    question: 'Can you install any type of EV charger?',
    answer: 'Yes! We install all major EV charger brands including Tesla, ChargePoint, JuiceBox, ClipperCreek, and more. We handle everything from basic Level 1 chargers to high-power Level 2 installations with circuit panel upgrades as needed.',
  },
  {
    id: 'chandelier',
    question: 'Do you provide the chandelier or just installation?',
    answer: 'We can help either way! If you already have a chandelier, we\'ll professionally install it with secure mounting and precise electrical connections. If you need help selecting one, we can recommend suppliers and ensure the fixture you choose is compatible with your electrical system.',
  },
  {
    id: 'smart',
    question: 'What smart home systems do you work with?',
    answer: 'We install and integrate with major smart home platforms including Google Home, Amazon Alexa, Apple HomeKit, Ring, Philips Hue, Lutron Caséta, and more. Whether you want individual smart switches or a complete whole-home automation system, we\'ve got you covered.',
  },
  {
    id: 'renovation',
    question: 'Do you work with contractors on renovations?',
    answer: 'Yes, we regularly collaborate with general contractors, interior designers, and homeowners on renovation projects. We understand timelines, coordinate with other trades, and ensure electrical work is completed to code and on schedule.',
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-[var(--color-black-pure)]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl font-bold text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our services, pricing, and availability.
            Can&apos;t find your answer? <a href="#contact" className="text-[var(--color-gold-primary)] hover:underline">Contact us directly</a>.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <FAQItem key={faq.id} faq={faq} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-[var(--color-text-secondary)] mb-6">
            Still have questions?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 rounded-lg bg-[var(--color-gold-primary)] text-[var(--color-black-pure)] font-semibold text-lg transition-all hover:bg-[var(--color-gold-light)] hover:shadow-[var(--shadow-gold)]"
          >
            Contact Us
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

function FAQItem({ faq, index }: { faq: typeof faqData[0]; index: number }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="border border-[var(--color-surface-800)] rounded-xl bg-[var(--color-surface-900)]/30 overflow-hidden"
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-[var(--color-surface-800)]/50 transition-colors"
      >
        <span className="text-lg font-semibold text-[var(--color-text-primary)]">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-5 w-5 text-[var(--color-gold-primary)] flex-shrink-0" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5">
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}