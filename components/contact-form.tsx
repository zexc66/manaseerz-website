'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, CheckCircle2, ArrowRight, Sparkles, Star, Clock } from '@/lib/icons';
import { useState } from 'react';
import { cities } from '@/lib/data';
import { cn } from '@/lib/utils';

export function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    service: '',
    projectDetails: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitted(true);
    setIsSubmitting(false);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        city: '',
        service: '',
        projectDetails: '',
      });
    }, 3000);
  };

  return (
    <section id="contact" className="bg-[var(--color-black-rich)] py-24 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-gold-primary)] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-gold-primary)] rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left Column - Contact Info */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-gold-primary)]/10 px-4 py-2 text-sm font-medium text-[var(--color-gold-primary)]">
                <Sparkles className="h-4 w-4" />
                Same-Day & Next-Day Available
              </div>
              <h2 className="mt-6 font-display text-4xl font-bold text-[var(--color-text-primary)] sm:text-5xl">
                Get Your Free Quote
              </h2>
              <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
                Fill out the form and we'll respond within a few hours. Licensed & Insured electrical specialists ready to help.
              </p>
            </motion.div>

            {/* Direct Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">
                Direct Communication
              </h3>
              <p className="text-[var(--color-text-secondary)]">
                Call or text us directly for the fastest response. We typically reply within the hour during business hours.
              </p>
              <div className="space-y-4">
                <ContactLink
                  icon={<Phone className="h-5 w-5" />}
                  label="Phone"
                  value="(682) 451-5951"
                  href="tel:6824515951"
                />
                <ContactLink
                  icon={<Mail className="h-5 w-5" />}
                  label="Email"
                  value="info@manaseerz.com"
                  href="mailto:info@manaseerz.com"
                />
                <ContactLink
                  icon={<MapPin className="h-5 w-5" />}
                  label="Service Area"
                  value="Dallas-Fort Worth Metroplex"
                />
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: 'Licensed & Insured', icon: CheckCircle2 },
                { label: '5-Star Rated', icon: Star },
                { label: '100% DFW Coverage', icon: MapPin },
                { label: 'Fast Response', icon: Clock },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-lg border border-[var(--color-surface-800)] bg-[var(--color-surface-900)]/50 p-4"
                >
                  <item.icon className="h-5 w-5 text-[var(--color-gold-primary)]" />
                  <span className="text-sm font-medium text-[var(--color-text-primary)]">
                    {item.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-[var(--color-surface-800)] bg-[var(--color-surface-900)] p-8 shadow-[var(--shadow-xl)]">
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                />
                <FormField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                />
              </div>

              <FormField
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(682) 451-5951"
                required
              />

              <div className="space-y-2">
                <label htmlFor="city" className="block text-sm font-medium text-[var(--color-text-secondary)]">
                  City
                </label>
                <select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, city: e.target.value })}
                  required
                  className={cn(
                    'w-full rounded-lg border border-[var(--color-surface-800)] bg-[var(--color-black-rich)] px-4 py-3 text-[var(--color-text-primary)]',
                    'transition-all duration-200',
                    'focus:border-[var(--color-gold-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold-primary)]/20',
                    'placeholder:text-[var(--color-text-muted)]'
                  )}
                >
                  <option value="">Select your city...</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="service" className="block text-sm font-medium text-[var(--color-text-secondary)]">
                  Service Needed
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, service: e.target.value })}
                  required
                  className={cn(
                    'w-full rounded-lg border border-[var(--color-surface-800)] bg-[var(--color-black-rich)] px-4 py-3 text-[var(--color-text-primary)]',
                    'transition-all duration-200',
                    'focus:border-[var(--color-gold-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold-primary)]/20',
                    'placeholder:text-[var(--color-text-muted)]'
                  )}
                >
                  <option value="">Select a service...</option>
                  <option value="chandelier">Chandelier Installation</option>
                  <option value="ev-charger">EV Charger Installation</option>
                  <option value="smart-switches">Smart Switches</option>
                  <option value="outlet-circuit">Outlet & Circuit Work</option>
                  <option value="renovation">Electrical Renovation</option>
                  <option value="range-hood">Range Hood Wiring</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="projectDetails" className="block text-sm font-medium text-[var(--color-text-secondary)]">
                  Project Details
                </label>
                <textarea
                  id="projectDetails"
                  name="projectDetails"
                  value={formData.projectDetails}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, projectDetails: e.target.value })}
                  rows={4}
                  className={cn(
                    'w-full rounded-lg border border-[var(--color-surface-800)] bg-[var(--color-black-rich)] px-4 py-3 text-[var(--color-text-primary)]',
                    'transition-all duration-200 resize-none',
                    'focus:border-[var(--color-gold-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold-primary)]/20',
                    'placeholder:text-[var(--color-text-muted)]'
                  )}
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={cn(
                  'w-full rounded-lg bg-[var(--color-gold-primary)] px-6 py-4 text-base font-semibold text-[var(--color-black-pure)]',
                  'transition-all duration-200',
                  'hover:bg-[var(--color-gold-light)] hover:shadow-[var(--shadow-gold)]',
                  'active:scale-[0.98]',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  'flex items-center justify-center gap-2'
                )}
              >
                {isSubmitting ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--color-black-pure)] border-t-transparent" />
                    Sending...
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle2 className="h-5 w-5" />
                    Quote Request Sent!
                  </>
                ) : (
                  <>
                    Send Quote Request
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FormField({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  required 
}: { 
  label: string; 
  name: string; 
  type?: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  placeholder?: string; 
  required?: boolean; 
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-[var(--color-text-secondary)]">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={cn(
          'w-full rounded-lg border border-[var(--color-surface-800)] bg-[var(--color-black-rich)] px-4 py-3 text-[var(--color-text-primary)]',
          'transition-all duration-200',
          'focus:border-[var(--color-gold-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold-primary)]/20',
          'placeholder:text-[var(--color-text-muted)]'
        )}
      />
    </div>
  );
}

function ContactLink({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-[var(--color-gold-primary)]">
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
          {label}
        </p>
        <p className="text-sm font-medium text-[var(--color-text-primary)]">
          {value}
        </p>
      </div>
    </div>
  );

  if (href) {
    return <a href={href} className="block hover:text-[var(--color-gold-primary)] transition-colors">{content}</a>;
  }

  return <div>{content}</div>;
}