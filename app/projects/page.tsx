import type { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AppWrapper } from '@/components/interactive-components';
import { Toaster } from '@/components/toaster';
import { Portfolio } from '@/components/portfolio';

export const metadata: Metadata = {
  title: 'Our Work | Manaseerz Electric',
  description:
    'A portfolio of Manaseerz Electric projects across the Dallas-Fort Worth metroplex — chandeliers, EV chargers, smart-home installs, renovations, and more.',
  alternates: { canonical: '/projects' },
};

export default function ProjectsPage() {
  return (
    <AppWrapper>
      <main className="min-h-screen bg-[var(--color-black-pure)]">
        <Navbar />

        {/* Header */}
        <section className="relative overflow-hidden pt-36 pb-8">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-gold-primary)]/5 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold-primary)]/20 bg-[var(--color-gold-primary)]/10 px-4 py-2 text-sm font-medium text-[var(--color-gold-primary)]">
              500+ projects completed
            </div>
            <h1 className="mt-6 font-display text-4xl font-bold text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
              Our <span className="text-[var(--color-gold-primary)]">Work</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-text-secondary)] leading-relaxed">
              Real installations across the Dallas-Fort Worth metroplex. Tap any project to see the details.
            </p>
          </div>
        </section>

        {/* Gallery (reuses the interactive Portfolio component) */}
        <Portfolio />

        <Footer />
        <Toaster />
      </main>
    </AppWrapper>
  );
}
