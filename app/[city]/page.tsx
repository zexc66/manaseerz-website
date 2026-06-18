import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { citiesData, getCityBySlug, getAllCitySlugs } from '@/lib/cities-data';
import { services, testimonials, contactInfo } from '@/lib/data';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ScrollProgress } from '@/components/cinematic/scroll-animations';
import { BackToTop } from '@/components/cinematic/back-to-top';
import { Toaster } from '@/components/toaster';
import { MapPin, Clock, Phone, Star, ArrowRight, Zap, CheckCircle2 } from '@/lib/icons';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCitySlugs();
}

type Params = { params: Promise<{ city: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};

  const title = `Electrician in ${city.name}, TX | Licensed & Insured | Manaseerz Electric`;
  const description = `Top-rated electrician serving ${city.name}, TX and ${city.neighborhoods[0]} area. EV chargers, chandeliers, smart home, panel upgrades. Same-day service. Call ${contactInfo.phone}.`;

  return {
    title,
    description,
    keywords: [
      `electrician ${city.name} TX`,
      `${city.name} electrician`,
      `electrical contractor ${city.name}`,
      `EV charger installation ${city.name}`,
      `chandelier installation ${city.name}`,
      `electrical repair ${city.name} Texas`,
      ...city.neighborhoods.map((n) => `electrician ${n} ${city.name}`),
    ],
    alternates: {
      canonical: `/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://manaseerz-web.vercel.app/${slug}`,
      type: 'website',
      locale: 'en_US',
      siteName: 'Manaseerz Electric',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function CityPage({ params }: Params) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const cityServices = city.popularServices
    .map((id) => services.find((s) => s.id === id))
    .filter(Boolean) as typeof services;

  const cityTestimonials = testimonials.filter((t) =>
    t.city.toLowerCase().includes(city.name.toLowerCase())
  );
  const displayTestimonials = cityTestimonials.length > 0 ? cityTestimonials : testimonials.slice(0, 2);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Electrician',
    name: `Manaseerz Electric - ${city.name}`,
    description: `Licensed electrician serving ${city.name}, TX`,
    image: 'https://manaseerz-web.vercel.app/logo.png',
    '@id': `https://manaseerz-web.vercel.app/${slug}`,
    url: `https://manaseerz-web.vercel.app/${slug}`,
    telephone: contactInfo.phone,
    email: contactInfo.email,
    priceRange: '$100-$3000',
    address: {
      '@type': 'PostalAddress',
      addressLocality: city.name,
      addressRegion: city.state,
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'City',
      name: `${city.name}, ${city.state}`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: city.rating,
      reviewCount: city.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '07:00',
      closes: '19:00',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollProgress />
      <Navbar />

      <main className="min-h-screen pt-20">
        {/* HERO */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-surface-900)] to-[var(--color-black-pure)]" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-gold-primary)] opacity-10 rounded-full blur-3xl" />

          <div className="relative max-w-5xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-[var(--color-gold-primary)] mb-4">
              <MapPin className="w-4 h-4" />
              <span>{city.name}, {city.state} • {city.county}</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--color-text-primary)] leading-tight tracking-tight">
              Electrician in <span className="text-[var(--color-gold-primary)]">{city.name}, TX</span>
            </h1>

            <p className="mt-6 text-lg lg:text-xl text-[var(--color-text-secondary)] max-w-3xl leading-relaxed">
              {city.intro}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[var(--color-gold-primary)] text-[var(--color-gold-primary)]" />
                  ))}
                </div>
                <span className="font-medium">{city.rating}.0</span>
                <span className="text-[var(--color-text-muted)]">({city.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                <Clock className="w-4 h-4 text-[var(--color-gold-primary)]" />
                <span>Same-day available</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-gold-primary)]" />
                <span>Licensed & Insured</span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/book-appointment"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-gold-primary)] hover:bg-[var(--color-gold-light)] text-[var(--color-black-pure)] font-semibold rounded-lg transition-colors"
              >
                Book in {city.name}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}
                className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-surface-800)] hover:border-[var(--color-gold-muted)] text-[var(--color-text-primary)] font-medium rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4" />
                {contactInfo.phone}
              </a>
            </div>
          </div>
        </section>

        {/* POPULAR SERVICES */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <h2 className="font-display text-3xl font-bold text-[var(--color-text-primary)] mb-3">
                Electrical Services in {city.name}
              </h2>
              <p className="text-[var(--color-text-secondary)] max-w-2xl">
                Most-requested services by {city.name} homeowners:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cityServices.map((service) => (
                <Link
                  key={service.id}
                  href={`/#services`}
                  className="group p-6 bg-[var(--color-surface-900)] border border-[var(--color-surface-800)] rounded-xl hover:border-[var(--color-gold-muted)] transition-colors"
                >
                  <div className="w-10 h-10 mb-4 rounded-lg bg-[var(--color-surface-800)] flex items-center justify-center text-[var(--color-gold-primary)]">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--color-gold-primary)] font-medium">{service.priceRange}</span>
                    <ArrowRight className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-gold-primary)] group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* NEIGHBORHOODS */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 bg-[var(--color-surface-900)]/30">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-[var(--color-text-primary)] mb-4">
              {city.name} Neighborhoods We Serve
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-8 max-w-2xl">
              Local electricians familiar with {city.name} homes, codes, and neighborhoods.
            </p>
            <div className="flex flex-wrap gap-3">
              {city.neighborhoods.map((n) => (
                <span
                  key={n}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-surface-800)] border border-[var(--color-surface-700)] rounded-full text-sm text-[var(--color-text-secondary)]"
                >
                  <MapPin className="w-3.5 h-3.5 text-[var(--color-gold-muted)]" />
                  {n}
                </span>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[var(--color-surface-800)]">
              <div>
                <div className="text-2xl font-bold text-[var(--color-gold-primary)]">{city.population}</div>
                <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mt-1">Population</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[var(--color-gold-primary)]">{city.distanceFromBase}</div>
                <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mt-1">From Lewisville HQ</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[var(--color-gold-primary)]">{city.zipCodes.length}+</div>
                <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mt-1">Zip Codes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[var(--color-gold-primary)]">{city.reviewCount}+</div>
                <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mt-1">5-Star Reviews</div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-[var(--color-text-primary)] mb-10">
              What {city.name} Customers Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayTestimonials.map((t) => (
                <div
                  key={t.name}
                  className="p-6 bg-[var(--color-surface-900)] border border-[var(--color-surface-800)] rounded-xl"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[var(--color-gold-primary)] text-[var(--color-gold-primary)]" />
                    ))}
                  </div>
                  <p className="text-[var(--color-text-secondary)] mb-4 leading-relaxed">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-[var(--color-text-primary)]">{t.name}</div>
                      <div className="text-sm text-[var(--color-text-muted)]">{t.city}</div>
                    </div>
                    <span className="text-xs text-[var(--color-gold-primary)] bg-[var(--color-surface-800)] px-3 py-1 rounded-full">
                      {t.project}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA + SERVICE AREA NAVIGATION */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 bg-[var(--color-surface-900)]/30">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl font-bold text-[var(--color-text-primary)] mb-4">
                Ready to Book in {city.name}?
              </h2>
              <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
                Same-day and next-day appointments available. Free quotes. Licensed and insured.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="/book-appointment"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-gold-primary)] hover:bg-[var(--color-gold-light)] text-[var(--color-black-pure)] font-semibold rounded-lg transition-colors"
                >
                  Book Appointment
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/#quote"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-surface-800)] hover:border-[var(--color-gold-muted)] text-[var(--color-text-primary)] font-medium rounded-lg transition-colors"
                >
                  Get Instant Quote
                </Link>
              </div>
            </div>

            <div className="pt-10 border-t border-[var(--color-surface-800)]">
              <h3 className="text-sm uppercase tracking-wider text-[var(--color-text-muted)] mb-4">
                Also Serving
              </h3>
              <div className="flex flex-wrap gap-2">
                {citiesData
                  .filter((c) => c.slug !== city.slug)
                  .map((other) => (
                    <Link
                      key={other.slug}
                      href={`/${other.slug}`}
                      className="px-3 py-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-gold-primary)] hover:bg-[var(--color-surface-800)] rounded-md transition-colors"
                    >
                      {other.name}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>

      <BackToTop />
      <Toaster />
    </>
  );
}
