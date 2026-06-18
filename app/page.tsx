import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { Services } from '@/components/services';
import { WhyChooseUs } from '@/components/why-choose-us';
import { Testimonials } from '@/components/testimonials';
import { FAQ } from '@/components/faq';
import { Portfolio } from '@/components/portfolio';
import { ServiceAreas } from '@/components/service-areas';
import { EnhancedContactForm } from '@/components/enhanced-contact-form';
import { ReviewSystem } from '@/components/review-system';
import { AboutSection } from '@/components/about-section';
import { Footer } from '@/components/footer';
import { AppWrapper } from '@/components/interactive-components';
import { Toaster } from '@/components/toaster';
import { Chatbot } from '@/components/chatbot';
import { LazyWrapper, LazyPortfolio, LazyTestimonials, LazyFAQ, LazyAboutSection, LazyEnhancedContactForm } from '@/components/performance/lazy-components';
import { ScrollProgress } from '@/components/cinematic/scroll-animations';
import { QuoteCalculator } from '@/components/interactive/quote-calculator';
import { PageLoadChoreography, PremiumSuspense } from '@/components/cinematic/premium-interactions';
import { CommandPalette } from '@/components/cinematic/command-palette';
import { BackToTop } from '@/components/cinematic/back-to-top';

export default function HomePage() {
  return (
    <AppWrapper>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <ScrollProgress />
      <CommandPalette />
      <PageLoadChoreography>
        <main id="main-content" className="min-h-screen">
          <Navbar />
          <div id="hero">
            <Hero />
          </div>
          <div id="services">
            <Services />
          </div>
          <div id="quote">
            <QuoteCalculator />
          </div>
          <WhyChooseUs />
          <PremiumSuspense>
            <LazyWrapper>
              <LazyPortfolio />
            </LazyWrapper>
          </PremiumSuspense>
          <ServiceAreas />
          <ReviewSystem />
          <PremiumSuspense>
            <LazyWrapper>
              <LazyTestimonials />
            </LazyWrapper>
          </PremiumSuspense>
          <PremiumSuspense>
            <LazyWrapper>
              <LazyAboutSection />
            </LazyWrapper>
          </PremiumSuspense>
          <PremiumSuspense>
            <LazyWrapper>
              <LazyFAQ />
            </LazyWrapper>
          </PremiumSuspense>
          <PremiumSuspense>
            <LazyWrapper>
              <LazyEnhancedContactForm />
            </LazyWrapper>
          </PremiumSuspense>
          <Footer />
          <Toaster />
          <Chatbot />
          <BackToTop />
        </main>
      </PageLoadChoreography>
    </AppWrapper>
  );
}