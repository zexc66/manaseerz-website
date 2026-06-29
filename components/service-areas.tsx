'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, CheckCircle, Phone, Mail } from 'lucide-react';
import { cities, contactInfo } from '@/lib/data';
import { allCities } from '@/lib/cities';
import { cn } from '@/lib/utils';

// DFW metroplex cities with coordinates (simplified)
const cityData = [
  { name: 'Lewisville', x: 50, y: 60, highlighted: true },
  { name: 'Frisco', x: 70, y: 45 },
  { name: 'McKinney', x: 85, y: 40 },
  { name: 'Plano', x: 65, y: 50 },
  { name: 'Dallas', x: 50, y: 75 },
  { name: 'Prosper', x: 75, y: 35 },
  { name: 'Allen', x: 80, y: 45 },
  { name: 'Carrollton', x: 55, y: 60 },
  { name: 'Richardson', x: 60, y: 55 },
  { name: 'Addison', x: 58, y: 65 },
  { name: 'Garland', x: 65, y: 70 },
  { name: 'Irving', x: 45, y: 65 },
  { name: 'Flower Mound', x: 40, y: 55 },
  { name: 'Southlake', x: 60, y: 40 },
  { name: 'Celina', x: 85, y: 30 },
  { name: 'The Colony', x: 52, y: 50 },
];

export function ServiceAreas() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  return (
    <section id="service-areas" className="py-24 bg-[var(--color-black-pure)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl font-bold text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl mb-6">
            Service Area
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            We serve the entire Dallas-Fort Worth metroplex with fast, reliable electrical services.
            Select a city to see service details.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Interactive Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-[4/3] bg-[var(--color-surface-900)]/30 border border-[var(--color-surface-800)] rounded-2xl overflow-hidden">
              {/* DFW Metroplex Background Pattern */}
              <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>

              {/* City Markers */}
              {cityData.map((city, index) => (
                <motion.div
                  key={city.name}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="absolute cursor-pointer group"
                  style={{ left: `${city.x}%`, top: `${city.y}%` }}
                  onClick={() => setSelectedCity(city.name)}
                >
                  <div className={cn(
                    "relative",
                    selectedCity === city.name && "z-10"
                  )}>
                    {/* Pulse Effect */}
                    {city.highlighted && (
                      <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -inset-4 rounded-full bg-[var(--color-gold-primary)]/20"
                      />
                    )}

                    {/* Marker */}
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className={cn(
                        "h-4 w-4 rounded-full transition-all",
                        selectedCity === city.name
                          ? "bg-[var(--color-gold-primary)] scale-125 shadow-[var(--shadow-gold)]"
                          : city.highlighted
                          ? "bg-[var(--color-gold-primary)]"
                          : "bg-[var(--color-surface-700)] group-hover:bg-[var(--color-gold-primary)]"
                      )}
                    />

                    {/* Label on hover */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: selectedCity === city.name ? 1 : 0,
                        y: selectedCity === city.name ? 0 : 10,
                      }}
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 whitespace-nowrap px-3 py-1 rounded-lg bg-[var(--color-surface-800)] border border-[var(--color-surface-700)] text-sm text-[var(--color-text-primary)]"
                    >
                      {city.name}, TX
                    </motion.div>
                  </div>
                </motion.div>
              ))}

              {/* Base Location Indicator */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-gold-primary)]/10 border border-[var(--color-gold-primary)]/20">
                <MapPin className="h-4 w-4 text-[var(--color-gold-primary)]" />
                <span className="text-sm font-medium text-[var(--color-gold-primary)]">
                  Base: {contactInfo.baseLocation}
                </span>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-6 flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[var(--color-gold-primary)]" />
                <span className="text-sm text-[var(--color-text-secondary)]">Highlighted Cities</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[var(--color-surface-700)]" />
                <span className="text-sm text-[var(--color-text-secondary)]">Other Cities</span>
              </div>
            </div>
          </motion.div>

          {/* City Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {selectedCity ? (
              <CityDetail city={selectedCity} />
            ) : (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-[var(--color-surface-900)]/50 border border-[var(--color-surface-800)]">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-[var(--color-gold-primary)]/10 border border-[var(--color-gold-primary)]/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-[var(--color-gold-primary)]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
                        Serving 16+ Cities
                      </h3>
                      <p className="text-[var(--color-text-secondary)] leading-relaxed">
                        We&apos;re proud to serve communities throughout the Dallas-Fort Worth metroplex.
                        Click on any city marker to learn more about services in your area.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <ServiceCard
                    icon={<CheckCircle className="h-5 w-5" />}
                    title="Same-Day Service"
                    description="Available for most cities"
                  />
                  <ServiceCard
                    icon={<CheckCircle className="h-5 w-5" />}
                    title="Licensed & Insured"
                    description="Texas state certified"
                  />
                  <ServiceCard
                    icon={<CheckCircle className="h-5 w-5" />}
                    title="No Travel Fee"
                    description="Within service area"
                  />
                  <ServiceCard
                    icon={<CheckCircle className="h-5 w-5" />}
                    title="Emergency 24/7"
                    description="Priority response"
                  />
                </div>
              </div>
            )}

            {/* City List */}
            <div className="p-6 rounded-2xl bg-[var(--color-surface-900)]/50 border border-[var(--color-surface-800)]">
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
                All Served Cities
              </h3>
              <div className="flex flex-wrap gap-2">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-sm transition-all",
                      selectedCity === city
                        ? "bg-[var(--color-gold-primary)] text-[var(--color-black-pure)]"
                        : "bg-[var(--color-surface-800)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-700)]"
                    )}
                  >
                    {city}
                  </button>
                ))}
              </div>

              {/* Crawlable links to dedicated city landing pages (local SEO). */}
              <div className="mt-6 pt-6 border-t border-[var(--color-surface-800)]">
                <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">
                  Browse your city:
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {allCities.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/service-area/${c.slug}`}
                      className="flex items-center gap-1.5 rounded-lg border border-[var(--color-surface-800)] bg-[var(--color-surface-900)]/50 px-3 py-2 text-sm text-[var(--color-text-secondary)] transition-all hover:border-[var(--color-gold-primary)] hover:text-[var(--color-gold-primary)]"
                    >
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{c.name}, TX</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CityDetail({ city }: { city: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* City Header */}
      <div className="p-6 rounded-2xl bg-[var(--color-gold-primary)]/10 border border-[var(--color-gold-primary)]/20">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-[var(--color-gold-primary)] flex items-center justify-center flex-shrink-0">
            <MapPin className="h-6 w-6 text-[var(--color-black-pure)]" />
          </div>
          <div>
            <h3 className="text-2xl font-display font-semibold text-[var(--color-text-primary)]">
              {city}, TX
            </h3>
            <p className="text-[var(--color-text-secondary)] mt-1">
              {city === contactInfo.baseLocation ? 'Our Base Location' : 'Fully Serviced Area'}
            </p>
          </div>
        </div>
      </div>

      {/* Service Details */}
      <div className="grid sm:grid-cols-2 gap-4">
        <ServiceCard
          icon={<CheckCircle className="h-5 w-5 text-[var(--color-gold-primary)]" />}
          title="Same-Day Available"
          description="Most requests completed same day"
        />
        <ServiceCard
          icon={<CheckCircle className="h-5 w-5 text-[var(--color-gold-primary)]" />}
          title="Licensed Technicians"
          description="Certified electrical professionals"
        />
        <ServiceCard
          icon={<CheckCircle className="h-5 w-5 text-[var(--color-gold-primary)]" />}
          title="Free Estimates"
          description="No-obligation price quotes"
        />
        <ServiceCard
          icon={<CheckCircle className="h-5 w-5 text-[var(--color-gold-primary)]" />}
          title="Satisfaction Guaranteed"
          description="1-year labor warranty"
        />
      </div>

      {/* Contact Options */}
      <div className="p-6 rounded-2xl bg-[var(--color-surface-900)]/50 border border-[var(--color-surface-800)] space-y-4">
        <h4 className="text-lg font-semibold text-[var(--color-text-primary)]">
          Book Service in {city}
        </h4>

        <div className="space-y-3">
          <a
            href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}
            className="flex items-center gap-3 p-4 rounded-lg bg-[var(--color-surface-800)] hover:bg-[var(--color-surface-700)] transition-colors"
          >
            <Phone className="h-5 w-5 text-[var(--color-gold-primary)]" />
            <div>
              <p className="text-sm text-[var(--color-text-muted)]">Call Now</p>
              <p className="text-[var(--color-text-primary)] font-semibold">{contactInfo.phone}</p>
            </div>
          </a>

          <a
            href={`mailto:${contactInfo.email}`}
            className="flex items-center gap-3 p-4 rounded-lg bg-[var(--color-surface-800)] hover:bg-[var(--color-surface-700)] transition-colors"
          >
            <Mail className="h-5 w-5 text-[var(--color-gold-primary)]" />
            <div>
              <p className="text-sm text-[var(--color-text-muted)]">Email Us</p>
              <p className="text-[var(--color-text-primary)] font-semibold">{contactInfo.email}</p>
            </div>
          </a>

          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full py-4 px-8 rounded-lg bg-[var(--color-gold-primary)] text-[var(--color-black-pure)] font-semibold text-lg transition-all hover:bg-[var(--color-gold-light)] hover:shadow-[var(--shadow-gold)]"
          >
            Request Free Quote
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ServiceCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-4 rounded-xl bg-[var(--color-surface-900)]/50 border border-[var(--color-surface-800)] hover:border-[var(--color-gold-primary)]/50 transition-colors">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 text-[var(--color-gold-primary)]">
          {icon}
        </div>
        <div>
          <h4 className="font-semibold text-[var(--color-text-primary)] text-sm mb-1">
            {title}
          </h4>
          <p className="text-xs text-[var(--color-text-secondary)]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}