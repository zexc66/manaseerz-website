'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Upload, CheckCircle, Loader2, AlertCircle, Star, Quote } from 'lucide-react';
import { cities, contactInfo, testimonials } from '@/lib/data';
import { cn } from '@/lib/utils';

// Zod schema for form validation
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\(\d{3}\) \d{3}-\d{4}$/, 'Please use format: (682) 451-5951'),
  city: z.string().min(1, 'Please select a city'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(500, 'Message must be less than 500 characters'),
  files: z.array(z.any()).optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function EnhancedContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  // Honeypot: a visually-hidden field humans won't fill, but spam bots
  // auto-filling all inputs will. Server rejects submissions that include it.
  const [company, setCompany] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    // Validate on blur, then re-validate on every change after first touch —
    // so users see field feedback as they go, not all-at-once after submit.
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      city: '',
      service: '',
      message: '',
      files: [],
    },
  });

  const selectedService = watch('service');

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          city: data.city,
          service: data.service,
          message: data.message,
          // File binaries are not uploaded (would require blob storage);
          // pass names only so the owner knows what was attached.
          fileNames: uploadedFiles.map((f) => f.name),
          company, // honeypot
        }),
      });

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }

      setSubmitStatus('success');
      reset();
      setUploadedFiles([]);
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles((prev) => [...prev, ...newFiles].slice(0, 5)); // Limit to 5 files
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const getEstimatedPrice = () => {
    const servicePrices: Record<string, string> = {
      'chandelier-installation': '$150 - $500',
      'ev-charger-installation': '$300 - $800',
      'smart-switches': '$100 - $400',
      'outlet-circuit': '$100 - $350',
      'renovation-electrical': '$500 - $3,000',
      'range-hood': '$150 - $400',
    };
    return servicePrices[selectedService] || 'Contact for quote';
  };

  return (
    <section id="contact" className="relative py-24 bg-[var(--color-black-rich)] overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-gold-primary)] via-transparent to-[var(--color-gold-primary)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-display text-4xl font-bold text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl mb-6">
                Get Your Free Quote
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
                Same-day and next-day availability. Licensed, insured, and serving the entire Dallas-Fort Worth Metroplex.
              </p>
            </div>

            {/* Social proof — rating + featured review, shown beside the form
                to lift conversion. */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-4 rounded-2xl border border-[var(--color-gold-primary)]/20 bg-[var(--color-surface-900)]/50 p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold-primary)]/15">
                  <Star className="h-6 w-6 fill-[var(--color-gold-primary)] text-[var(--color-gold-primary)]" />
                </div>
                <div>
                  <div className="flex items-center gap-0.5" aria-label="Rated 5.0 out of 5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-[var(--color-gold-primary)] text-[var(--color-gold-primary)]" />
                    ))}
                  </div>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                    <span className="font-semibold text-[var(--color-text-primary)]">5.0</span> · 127+ happy customers
                  </p>
                </div>
              </div>
            </div>

            {/* Featured testimonial */}
            {testimonials[0] && (
              <figure className="relative rounded-2xl border border-[var(--color-surface-800)] bg-[var(--color-surface-900)]/50 p-6">
                <Quote className="absolute right-4 top-4 h-8 w-8 text-[var(--color-gold-primary)]/20" />
                <blockquote className="text-[var(--color-text-secondary)] leading-relaxed">
                  &ldquo;{testimonials[0].text}&rdquo;
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-gold-primary)]/15 text-sm font-bold text-[var(--color-gold-primary)]">
                    {testimonials[0].name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-text-primary)]">{testimonials[0].name}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{testimonials[0].city} · {testimonials[0].project}</p>
                  </div>
                </figcaption>
              </figure>
            )}

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-gold-primary)]/10 border border-[var(--color-gold-primary)]/20 flex-shrink-0">
                  <Phone className="h-6 w-6 text-[var(--color-gold-primary)]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">Phone</h3>
                  <a href="tel:6824515951" className="text-[var(--color-text-secondary)] hover:text-[var(--color-gold-primary)] transition-colors">
                    {contactInfo.phone}
                  </a>
                  <p className="text-sm text-[var(--color-text-muted)] mt-1">{contactInfo.hours}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-gold-primary)]/10 border border-[var(--color-gold-primary)]/20 flex-shrink-0">
                  <Mail className="h-6 w-6 text-[var(--color-gold-primary)]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">Email</h3>
                  <a href={`mailto:${contactInfo.email}`} className="text-[var(--color-text-secondary)] hover:text-[var(--color-gold-primary)] transition-colors">
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-gold-primary)]/10 border border-[var(--color-gold-primary)]/20 flex-shrink-0">
                  <MapPin className="h-6 w-6 text-[var(--color-gold-primary)]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">Service Area</h3>
                  <p className="text-[var(--color-text-secondary)]">{contactInfo.serviceArea}</p>
                  <p className="text-sm text-[var(--color-text-muted)] mt-1">Based in {contactInfo.baseLocation}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-gold-primary)]/10 border border-[var(--color-gold-primary)]/20 flex-shrink-0">
                  <Clock className="h-6 w-6 text-[var(--color-gold-primary)]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">Response Time</h3>
                  <p className="text-[var(--color-text-secondary)]">Same-day & Next-day available</p>
                  <p className="text-sm text-[var(--color-text-muted)] mt-1">Emergency services 24/7</p>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-[var(--color-surface-800)]">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[var(--color-gold-primary)]" />
                  <span className="text-sm text-[var(--color-text-secondary)]">Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[var(--color-gold-primary)]" />
                  <span className="text-sm text-[var(--color-text-secondary)]">5-Star Rated</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[var(--color-gold-primary)]" />
                  <span className="text-sm text-[var(--color-text-secondary)]">Free Quotes</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[var(--color-gold-primary)]" />
                  <span className="text-sm text-[var(--color-text-secondary)]">Satisfaction Guaranteed</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Honeypot field — visually hidden, humans leave it empty */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="absolute h-0 w-0 opacity-0 -z-50 pointer-events-none"
              />
              {/* Form Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center gap-3"
                >
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                  <p>Thank you! Your request has been submitted. We&apos;ll contact you within 24 hours.</p>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3"
                >
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <p>Something went wrong. Please try again or call us directly.</p>
                </motion.div>
              )}

              {/* Personal Information */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                    Full Name *
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    id="name"
                    className={cn(
                      "w-full px-4 py-3 rounded-lg bg-[var(--color-surface-800)] border border-[var(--color-surface-700)]",
                      "text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)]",
                      "focus:border-[var(--color-gold-primary)] focus:ring-2 focus:ring-[var(--color-gold-primary)]/20 transition-all outline-none",
                      errors.name && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                      touchedFields.name && !errors.name && "border-green-500/50 focus:border-green-500 focus:ring-green-500/20"
                    )}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                      Email Address *
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      id="email"
                      className={cn(
                        "w-full px-4 py-3 rounded-lg bg-[var(--color-surface-800)] border border-[var(--color-surface-700)]",
                        "text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)]",
                        "focus:border-[var(--color-gold-primary)] focus:ring-2 focus:ring-[var(--color-gold-primary)]/20 transition-all outline-none",
                        errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                        touchedFields.email && !errors.email && "border-green-500/50 focus:border-green-500 focus:ring-green-500/20"
                      )}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                      Phone Number *
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      id="phone"
                      className={cn(
                        "w-full px-4 py-3 rounded-lg bg-[var(--color-surface-800)] border border-[var(--color-surface-700)]",
                        "text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)]",
                        "focus:border-[var(--color-gold-primary)] focus:ring-2 focus:ring-[var(--color-gold-primary)]/20 transition-all outline-none",
                        errors.phone && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                        touchedFields.phone && !errors.phone && "border-green-500/50 focus:border-green-500 focus:ring-green-500/20"
                      )}
                      placeholder="(682) 451-5951"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Service Information */}
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                      City *
                    </label>
                    <select
                      {...register('city')}
                      id="city"
                      className={cn(
                        "w-full px-4 py-3 rounded-lg bg-[var(--color-surface-800)] border border-[var(--color-surface-700)]",
                        "text-[var(--color-text-primary)]",
                        "focus:border-[var(--color-gold-primary)] focus:ring-2 focus:ring-[var(--color-gold-primary)]/20 transition-all outline-none cursor-pointer",
                        errors.city && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                        touchedFields.city && !errors.city && "border-green-500/50 focus:border-green-500 focus:ring-green-500/20"
                      )}
                    >
                      <option value="">Select your city</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}, TX
                        </option>
                      ))}
                    </select>
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.city.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                      Service Type *
                    </label>
                    <select
                      {...register('service')}
                      id="service"
                      className={cn(
                        "w-full px-4 py-3 rounded-lg bg-[var(--color-surface-800)] border border-[var(--color-surface-700)]",
                        "text-[var(--color-text-primary)]",
                        "focus:border-[var(--color-gold-primary)] focus:ring-2 focus:ring-[var(--color-gold-primary)]/20 transition-all outline-none cursor-pointer",
                        errors.service && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                        touchedFields.service && !errors.service && "border-green-500/50 focus:border-green-500 focus:ring-green-500/20"
                      )}
                    >
                      <option value="">Select service type</option>
                      <option value="chandelier-installation">Chandelier Installation</option>
                      <option value="ev-charger-installation">EV Charger Installation</option>
                      <option value="smart-switches">Smart Switches</option>
                      <option value="outlet-circuit">Outlet & Circuit Work</option>
                      <option value="renovation-electrical">Electrical Renovation</option>
                      <option value="range-hood">Range Hood Wiring</option>
                    </select>
                    {errors.service && (
                      <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.service.message}
                      </p>
                    )}
                    {selectedService && (
                      <p className="mt-2 text-sm text-[var(--color-gold-primary)]">
                        Estimated range: {getEstimatedPrice()}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                    Project Details *
                  </label>
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={5}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg bg-[var(--color-surface-800)] border border-[var(--color-surface-700)]",
                      "text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] resize-none",
                      "focus:border-[var(--color-gold-primary)] focus:ring-2 focus:ring-[var(--color-gold-primary)]/20 transition-all outline-none",
                      errors.message && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                      touchedFields.message && !errors.message && "border-green-500/50 focus:border-green-500 focus:ring-green-500/20"
                    )}
                    placeholder="Describe your project, timeline, and any specific requirements..."
                  />
                  <div className="flex justify-between items-center mt-1">
                    {errors.message && (
                      <p className="text-sm text-red-400 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.message.message}
                      </p>
                    )}
                    <p className="text-sm text-[var(--color-text-muted)] ml-auto">
                      {watch('message')?.length || 0}/500
                    </p>
                  </div>
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                  Project Photos (Optional)
                </label>
                <div className="border-2 border-dashed border-[var(--color-surface-700)] rounded-lg p-6 hover:border-[var(--color-gold-primary)] transition-colors">
                  <div className="text-center">
                    <input
                      type="file"
                      id="files"
                      accept="image/*,.pdf"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label htmlFor="files" className="cursor-pointer">
                      <Upload className="h-8 w-8 text-[var(--color-gold-primary)] mx-auto mb-2" />
                      <p className="text-sm text-[var(--color-text-secondary)]">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-[var(--color-text-muted)] mt-1">
                        PNG, JPG, PDF up to 10MB (max 5 files)
                      </p>
                    </label>
                  </div>

                  {/* Uploaded Files */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-surface-800)]"
                        >
                          <div className="flex items-center gap-3">
                            <CheckCircle className="h-4 w-4 text-[var(--color-gold-primary)]" />
                            <span className="text-sm text-[var(--color-text-secondary)] truncate max-w-[200px]">
                              {file.name}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <AlertCircle className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting || submitStatus === 'success'}
                className="w-full py-4 px-8 rounded-lg bg-[var(--color-gold-primary)] text-[var(--color-black-pure)] font-semibold text-lg transition-all hover:bg-[var(--color-gold-light)] hover:shadow-[var(--shadow-gold)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    Submitted Successfully
                  </>
                ) : (
                  'Get Free Quote'
                )}
              </motion.button>

              {/* Privacy Notice */}
              <p className="text-xs text-center text-[var(--color-text-muted)]">
                By submitting, you agree to our <a href="#" className="text-[var(--color-gold-primary)] hover:underline">Privacy Policy</a>.
                We&apos;ll never share your information.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}