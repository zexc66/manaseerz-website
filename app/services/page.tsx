import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AppWrapper } from '@/components/interactive-components';
import { Toaster } from '@/components/toaster';
import { ServiceIcon } from '@/components/service-icon';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { allServiceDetails } from '@/lib/services';

export const metadata: Metadata = {
  title: 'Electrical Services in DFW | Manaseerz Electric',
  description:
    'Licensed electrical services across Dallas-Fort Worth: chandelier installation, EV chargers, smart switches, outlets & circuits, full renovations, and range hood wiring. Free quotes.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <AppWrapper>
      <main className="min-h-screen bg-[var(--color-black-pure)]">
        <Navbar />

        {/* Header */}
        <section className="relative overflow-hidden pt-36 pb-16">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-gold-primary)]/5 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold-primary)]/20 bg-[var(--color-gold-primary)]/10 px-4 py-2 text-sm font-medium text-[var(--color-gold-primary)]">
              Licensed &amp; Insured in Texas
            </div>
            <h1 className="mt-6 font-display text-4xl font-bold text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
              Our Premium <span className="text-[var(--color-gold-primary)]">Services</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-text-secondary)] leading-relaxed">
              Precision electrical work across the Dallas-Fort Worth metroplex. Same-day &amp;
              next-day availability, transparent pricing, and a 1-year labor warranty on every install.
            </p>
          </div>
        </section>

        {/* Services grid */}
        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {allServiceDetails.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.id}`}
                  className="group flex flex-col rounded-2xl border border-[var(--color-surface-800)] bg-[var(--color-surface-900)]/50 p-8 transition-all hover:-translate-y-1 hover:border-[var(--color-gold-primary)] hover:shadow-[var(--shadow-gold)]"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[var(--color-gold-primary)]/20 bg-[var(--color-gold-primary)]/10 transition-colors group-hover:bg-[var(--color-gold-primary)]">
                    <ServiceIcon
                      icon={service.icon}
                      className="h-7 w-7 text-[var(--color-gold-primary)] transition-colors group-hover:text-[var(--color-black-pure)]"
                    />
                  </div>
                  <h2 className="mt-6 font-display text-xl font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-gold-primary)] transition-colors">
                    {service.title}
                  </h2>
                  <p className="mt-1 text-sm text-[var(--color-gold-primary)]">{service.tagline}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {service.description}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {service.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-gold-primary)]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex items-center justify-between border-t border-[var(--color-surface-800)] pt-5">
                    <span className="text-sm font-medium text-[var(--color-gold-primary)]">
                      {service.priceRange}
                    </span>
                    <span className="flex items-center gap-1 text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-gold-primary)]">
                      View details
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-[var(--color-gold-primary)]/20 bg-[var(--color-surface-900)]/50 p-8 text-center lg:p-12">
              <h2 className="font-display text-3xl font-bold text-[var(--color-text-primary)]">
                Not sure which service you need?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-[var(--color-text-secondary)]">
                Tell us about your project and we&apos;ll point you in the right direction. Free quotes,
                no obligation.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/#contact"
                  className="rounded-lg bg-[var(--color-gold-primary)] px-8 py-4 text-base font-semibold text-[var(--color-black-pure)] transition-all hover:bg-[var(--color-gold-light)] hover:shadow-[var(--shadow-gold)]"
                >
                  Get a Free Quote
                </Link>
                <Link
                  href="/book-appointment"
                  className="rounded-lg border-2 border-[var(--color-surface-800)] px-8 py-4 text-base font-semibold text-[var(--color-text-primary)] transition-all hover:border-[var(--color-gold-primary)] hover:text-[var(--color-gold-primary)]"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
        <Toaster />
      </main>
    </AppWrapper>
  );
}
