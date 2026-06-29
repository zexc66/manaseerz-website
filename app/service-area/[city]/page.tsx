import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AppWrapper } from '@/components/interactive-components';
import { Toaster } from '@/components/toaster';
import { ServiceIcon } from '@/components/service-icon';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Phone,
  MapPin,
  Star,
} from 'lucide-react';
import { allCities, getCity, getNearbyCities, citySlugs } from '@/lib/cities';
import { allServiceDetails } from '@/lib/services';
import { contactInfo } from '@/lib/data';

// Prerender one page per city at build time.
export function generateStaticParams() {
  return citySlugs.map((slug) => ({ city: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const c = getCity(city);
  if (!c) return { title: 'City not found | Manaseerz Electric' };

  const title = `Electrician in ${c.name}, TX | Licensed & Insured | Manaseerz Electric`;
  const description = `Top-rated licensed electrician serving ${c.name}, TX and ${c.county}. EV chargers, panel upgrades, chandeliers, smart-home wiring, and 24/7 emergency repair. Same-day service. Free quotes.`;

  return {
    title,
    description,
    alternates: { canonical: `/service-area/${c.slug}` },
    openGraph: {
      title,
      description,
      type: 'website',
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const c = getCity(city);
  if (!c) notFound();

  const nearby = getNearbyCities(c.slug);
  const phoneHref = `tel:${contactInfo.phone.replace(/\D/g, '')}`;

  return (
    <AppWrapper>
      <CityJsonLd city={c} />
      <main className="min-h-screen bg-[var(--color-black-pure)]">
        <Navbar />

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-36 pb-12">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-gold-primary)]/5 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/#service-areas"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-gold-primary)]"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              All service areas
            </Link>

            <div className="mt-6 flex items-center gap-2 text-sm font-medium text-[var(--color-gold-primary)]">
              <MapPin className="h-4 w-4" />
              {c.county} · Dallas-Fort Worth Metroplex
            </div>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
              Electrician in <span className="text-[var(--color-gold-primary)]">{c.name}</span>, TX
            </h1>

            {/* Trust row */}
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <span className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
                <span className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[var(--color-gold-primary)] text-[var(--color-gold-primary)]" />
                  ))}
                </span>
                500+ projects completed
              </span>
              <span className="flex items-center gap-1.5 text-[var(--color-text-muted)]">
                <ShieldCheck className="h-4 w-4 text-[var(--color-gold-primary)]" />
                Licensed &amp; insured · TECL
              </span>
              <span className="flex items-center gap-1.5 text-[var(--color-text-muted)]">
                <Clock className="h-4 w-4 text-[var(--color-gold-primary)]" />
                Same-day &amp; 24/7 emergency
              </span>
            </div>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[var(--color-text-secondary)]">
              {c.blurb}
            </p>

            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href={phoneHref}
                className="rounded-lg bg-[var(--color-gold-primary)] px-8 py-4 text-base font-semibold text-[var(--color-black-pure)] transition-all hover:bg-[var(--color-gold-light)] hover:shadow-[var(--shadow-gold)]"
              >
                <span className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  {contactInfo.phone}
                </span>
              </a>
              <Link
                href={`/#contact?city=${encodeURIComponent(c.name)}`}
                className="rounded-lg border-2 border-[var(--color-surface-800)] px-8 py-4 text-base font-semibold text-[var(--color-text-primary)] transition-all hover:border-[var(--color-gold-primary)] hover:text-[var(--color-gold-primary)]"
              >
                Get a Free Quote in {c.name}
              </Link>
            </div>
          </div>
        </section>

        {/* ── Services offered in this city ────────────────────────────── */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold text-[var(--color-text-primary)]">
              Electrical services in {c.name}
            </h2>
            <p className="mt-3 max-w-2xl text-[var(--color-text-secondary)]">
              The full range of licensed residential electrical work we provide to {c.name} homeowners.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {allServiceDetails.map((s) => (
                <Link
                  key={s.id}
                  href={`/services/${s.id}`}
                  className="group flex items-start gap-4 rounded-2xl border border-[var(--color-surface-800)] bg-[var(--color-surface-900)]/50 p-6 transition-all hover:border-[var(--color-gold-primary)]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--color-gold-primary)]/20 bg-[var(--color-gold-primary)]/10">
                    <ServiceIcon icon={s.icon} className="h-6 w-6 text-[var(--color-gold-primary)]" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-gold-primary)]">
                      {s.title}
                    </p>
                    <p className="text-sm text-[var(--color-gold-primary)]">{s.priceRange}</p>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-secondary)] line-clamp-2">
                      {s.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why choose us / service guarantees ───────────────────────── */}
        <section className="bg-[var(--color-black-rich)] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-3xl font-bold text-[var(--color-text-primary)]">
              Why {c.name} homeowners choose us
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { t: 'Same-Day Service', d: 'Most {name} calls completed the same day — emergency response 24/7.' },
                { t: 'Licensed & Insured', d: 'Texas-licensed electrician (TECL). Fully insured. Permits pulled for you.' },
                { t: 'Upfront Pricing', d: 'Clear, written quotes before any work starts. No surprises.' },
                { t: '1-Year Warranty', d: 'Every installation backed by a 1-year labor warranty.' },
              ].map((item) => (
                <div
                  key={item.t}
                  className="rounded-2xl border border-[var(--color-surface-800)] bg-[var(--color-surface-900)]/50 p-6"
                >
                  <CheckCircle2 className="h-6 w-6 text-[var(--color-gold-primary)]" />
                  <h3 className="mt-3 font-display text-lg font-semibold text-[var(--color-text-primary)]">
                    {item.t}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {item.d.replace('{name}', c.name)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Neighborhoods we serve ───────────────────────────────────── */}
        <section className="py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold text-[var(--color-text-primary)]">
              Neighborhoods we serve in {c.name}
            </h2>
            <p className="mt-3 max-w-2xl text-[var(--color-text-secondary)]">
              We routinely work throughout {c.name}, including:
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {c.neighborhoods.map((n) => (
                <span
                  key={n}
                  className="rounded-full border border-[var(--color-gold-primary)]/20 bg-[var(--color-gold-primary)]/10 px-4 py-2 text-sm text-[var(--color-gold-primary)]"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── City-specific FAQs (+ FAQ schema) ────────────────────────── */}
        <section className="bg-[var(--color-black-rich)] py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-3xl font-bold text-[var(--color-text-primary)]">
              {c.name} electrician FAQs
            </h2>
            <div className="mt-10 space-y-4">
              {c.faqs.map((faq) => (
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

        {/* ── Nearby cities (internal linking for SEO) ─────────────────── */}
        {nearby.length > 0 && (
          <section className="py-16">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <h2 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">
                Electricians near {c.name}
              </h2>
              <p className="mt-2 text-[var(--color-text-secondary)]">
                We also serve the {c.name}-area communities:
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {nearby.map((n) => (
                  <Link
                    key={n.slug}
                    href={`/service-area/${n.slug}`}
                    className="group flex items-center gap-3 rounded-xl border border-[var(--color-surface-800)] bg-[var(--color-surface-900)]/50 p-4 transition-all hover:border-[var(--color-gold-primary)]"
                  >
                    <MapPin className="h-5 w-5 text-[var(--color-gold-primary)]" />
                    <span className="font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-gold-primary)]">
                      {n.name}, TX
                    </span>
                    <ArrowRight className="ml-auto h-4 w-4 text-[var(--color-text-muted)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--color-gold-primary)]" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section className="pb-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-[var(--color-gold-primary)]/20 bg-[var(--color-surface-900)]/50 p-8 text-center lg:p-12">
              <h2 className="font-display text-3xl font-bold text-[var(--color-text-primary)]">
                Ready to get started in {c.name}?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-[var(--color-text-secondary)]">
                Get a free quote from a licensed {c.name} electrician today. Same-day service available.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href={`/#contact?city=${encodeURIComponent(c.name)}`}
                  className="rounded-lg bg-[var(--color-gold-primary)] px-8 py-4 text-base font-semibold text-[var(--color-black-pure)] transition-all hover:bg-[var(--color-gold-light)] hover:shadow-[var(--shadow-gold)]"
                >
                  Get a Free Quote
                </Link>
                <a
                  href={phoneHref}
                  className="rounded-lg border-2 border-[var(--color-surface-800)] px-8 py-4 text-base font-semibold text-[var(--color-text-primary)] transition-all hover:border-[var(--color-gold-primary)] hover:text-[var(--color-gold-primary)]"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Call {contactInfo.phone}
                  </span>
                </a>
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

/**
 * Per-city local-business structured data: an Electrician entity with this city
 * in areaServed, plus the city-specific FAQ schema for rich results.
 */
function CityJsonLd({ city }: { city: (typeof allCities)[number] }) {
  const baseUrl = 'https://manaseerz-web.vercel.app';

  const business = {
    '@context': 'https://schema.org',
    '@type': 'Electrician',
    name: 'Manaseerz Electric',
    '@id': `${baseUrl}/service-area/${city.slug}`,
    url: `${baseUrl}/service-area/${city.slug}`,
    telephone: contactInfo.phone.replace(/\D/g, ''),
    email: contactInfo.email,
    image: `${baseUrl}/logo.png`,
    priceRange: '$100-$3000',
    address: {
      '@type': 'PostalAddress',
      addressLocality: contactInfo.baseLocation.split(',')[0],
      addressRegion: 'TX',
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'City',
      name: `${city.name}, TX`,
    },
  };

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: city.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </>
  );
}
