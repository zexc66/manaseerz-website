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

export default function HomePage() {
  return (
    <AppWrapper>
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <Services />
        <WhyChooseUs />
        <LazyWrapper>
          <LazyPortfolio />
        </LazyWrapper>
        <ServiceAreas />
        <ReviewSystem />
        <LazyWrapper>
          <LazyTestimonials />
        </LazyWrapper>
        <LazyWrapper>
          <LazyAboutSection />
        </LazyWrapper>
        <LazyWrapper>
          <LazyFAQ />
        </LazyWrapper>
        <LazyWrapper>
          <LazyEnhancedContactForm />
        </LazyWrapper>
        <Footer />
        <Toaster />
        <Chatbot />
      </main>
    </AppWrapper>
  );
}