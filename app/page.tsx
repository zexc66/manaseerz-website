import { Navbar } from '@/components/navbar';
import { Hero, Services, WhyChooseUs } from '@/components/hero';
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
import { WhatsAppButton } from '@/components/whatsapp-button';
import { BackToTop } from '@/components/back-to-top';

export default function HomePage() {
  return (
    <AppWrapper>
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <Services />
        <WhyChooseUs />
        <Portfolio />
        <ServiceAreas />
        <ReviewSystem />
        <Testimonials />
        <AboutSection />
        <FAQ />
        <EnhancedContactForm />
        <Footer />
        <Toaster />
        <Chatbot />
        <WhatsAppButton />
        <BackToTop />
      </main>
    </AppWrapper>
  );
}