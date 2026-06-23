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
import { ScrollProgress } from '@/components/cinematic/scroll-animations';
import { QuoteCalculator } from '@/components/interactive/quote-calculator';
import { PageLoadChoreography } from '@/components/cinematic/premium-interactions';
import { BackToTop } from '@/components/cinematic/back-to-top';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { TrustShowcase } from '@/components/interactive/trust-showcase';
import { GEOQuestions } from '@/components/interactive/geo-questions';
import { evChargerGeoQuestions, panelUpgradeGeoQuestions } from '@/lib/geo-data';
import { MultiStepBooking } from '@/components/interactive/multi-step-booking';
import { PhotoQuoteStub } from '@/components/interactive/photo-quote-stub';
import { ExitIntentModal } from '@/components/interactive/exit-intent-modal';

export default function HomePage() {
  return (
    <AppWrapper>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <ScrollProgress />
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
          <TrustShowcase />
          <GEOQuestions
            items={[...evChargerGeoQuestions.slice(0, 2), ...panelUpgradeGeoQuestions.slice(0, 2)]}
            title="DFW Electrical Cost & Service Questions"
            subtitle="Direct answers homeowners ask before booking"
          />
          <PhotoQuoteStub />
          <Portfolio />
          <ServiceAreas />
          <ReviewSystem />
          <Testimonials />
          <AboutSection />
          <FAQ />
          <EnhancedContactForm />
          <MultiStepBooking />
          <Footer />
          <Toaster />
          <Chatbot />
          <BackToTop />
          <WhatsAppButton />
          <ExitIntentModal />
        </main>
      </PageLoadChoreography>
    </AppWrapper>
  );
}
