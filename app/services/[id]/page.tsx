import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AppWrapper } from '@/components/interactive-components';
import { Toaster } from '@/components/toaster';
import { ServiceIcon } from '@/components/service-icon';
import { ArrowRight, CheckCircle2, ArrowLeft, Clock, ShieldCheck } from 'lucide-react';
import { getServiceDetail, allServiceDetails } from '@/lib/services';

// Prerender a page per service at build time.
export function generateStaticParams() {
  return allServiceDetails.map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const service = getServiceDetail(id);
  if (!service) return { title: 'Service not found | Manaseerz Electric' };

  return {
    title: `${service.title} in DFW | Manaseerz Electric`,
    description: `${service.description} Serving the Dallas-Fort Worth metroplex. ${service.priceRange}. Same-day & next-day availability, licensed & insured.`,
    alternates: { canonical: `/services/${service.id}` },
    openGraph: {
      title: `${service.title} | Manaseerz Electric`,
      description: service.description,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = getServiceDetail(id);
  if (!service) notFound();

  const others = allServiceDetails.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <AppWrapper>
      <main className="min-h-screen bg-[var(--color-black-pure)]">
        <Navbar />

        {/* Header */}
        <section className="relative overflow-hidden pt-36 pb-12">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-gold-primary)]/5 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-gold-primary)]"
            >
              <ArrowLeft className="h-4 w-4" />
              All services
            </Link>
            <div className="mt-6 flex items-start gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[var(--color-gold-primary)]/20 bg-[var(--color-gold-primary)]/10">
                <ServiceIcon icon={service.icon} className="h-8 w-8 text-[var(--color-gold-primary)]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--color-gold-primary)]">{service.tagline}</p>
                <h1 className="mt-1 font-display text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl lg:text-5xl">
                  {service.title}
                </h1>
              </div>
            </div>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[var(--color-text-secondary)]">
              {service.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
              <span className="rounded-full border border-[var(--color-gold-primary)]/30 bg-[var(--color-gold-primary)]/10 px-4 py-2 font-semibold text-[var(--color-gold-primary)]">
                {service.priceRange}
              </span>
              <span className="flex items-center gap-2 text-[var(--color-text-muted)]">
                <Clock className="h-4 w-4 text-[var(--color-gold-primary)]" />
                Same-day &amp; next-day available
              </span>
              <span className="flex items-center gap-2 text-[var(--color-text-muted)]">
                <ShieldCheck className="h-4 w-4 text-[var(--color-gold-primary)]" />
                Licensed &amp; insured · 1-year warranty
              </span>
            </div>
          </div>
        </section>

        {/* Body: features + what's included */}
        <section className="py-12">
          <div className="mx-auto grid max-w-5xl gap-12 px-4 sm:px-6 lg:px-8 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">
                What you get
              </h2>
              <ul className="mt-6 space-y-3">
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[var(--color-text-secondary)]">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-gold-primary)]" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">
                Included in every visit
              </h2>
              <ul className="mt-6 space-y-3">
                {service.included.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[var(--color-text-secondary)]">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-gold-primary)]" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="bg-[var(--color-black-rich)] py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-3xl font-bold text-[var(--color-text-primary)]">
              How it works
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {service.process.map((p, i) => (
                <div
                  key={p.step}
                  className="rounded-2xl border border-[var(--color-surface-800)] bg-[var(--color-surface-900)]/50 p-6"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-gold-primary)] font-display font-bold text-[var(--color-black-pure)]">
                    {i + 1}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-[var(--color-text-primary)]">
                    {p.step}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {p.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-3xl font-bold text-[var(--color-text-primary)]">
              Frequently asked questions
            </h2>
            <div className="mt-10 space-y-4">
              {service.faqs.map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-xl border border-[var(--color-surface-800)] bg-[var(--color-surface-900)]/50 p-6"
                >
                  <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">
                    {faq.q}
                  </h3>
                  <p className="mt-2 leading-relaxed text-[var(--color-text-secondary)]">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-[var(--color-gold-primary)]/20 bg-[var(--color-surface-900)]/50 p-8 text-center lg:p-12">
              <h2 className="font-display text-3xl font-bold text-[var(--color-text-primary)]">
                Ready to get started?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-[var(--color-text-secondary)]">
                Get a free quote for {service.title.toLowerCase()} today.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/#contact"
                  className="rounded-lg bg-[var(--color-gold-primary)] px-8 py-4 text-base font-semibold text-[var(--color-black-pure)] transition-all hover:bg-[var(--color-gold-light)] hover:shadow-[var(--shadow-gold)]"
                >
                  Get a Free Quote
                </Link>
                <a
                  href="https://wa.me/16824515951"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border-2 border-[var(--color-surface-800)] px-8 py-4 text-base font-semibold text-[var(--color-text-primary)] transition-all hover:border-[var(--color-gold-primary)] hover:text-[var(--color-gold-primary)]"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Related services */}
        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">
              Other services
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {others.map((s) => (
                <Link
                  key={s.id}
                  href={`/services/${s.id}`}
                  className="group flex items-center gap-4 rounded-2xl border border-[var(--color-surface-800)] bg-[var(--color-surface-900)]/50 p-6 transition-all hover:border-[var(--color-gold-primary)]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--color-gold-primary)]/20 bg-[var(--color-gold-primary)]/10">
                    <ServiceIcon icon={s.icon} className="h-6 w-6 text-[var(--color-gold-primary)]" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-gold-primary)]">
                      {s.title}
                    </p>
                    <p className="text-sm text-[var(--color-gold-primary)]">{s.priceRange}</p>
                  </div>
                  <ArrowRight className="ml-auto h-5 w-5 text-[var(--color-text-muted)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--color-gold-primary)]" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Footer />
        <Toaster />
      </main>
    </AppWrapper>
  );
}
