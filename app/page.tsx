import { Navbar } from '@/components/navbar';
import { Hero, Services, WhyChooseUs } from '@/components/hero';
import { Testimonials } from '@/components/testimonials';
import { FAQ } from '@/components/faq';
import { Portfolio } from '@/components/portfolio';
import { ServiceAreas } from '@/components/service-areas';
import { EnhancedContactForm } from '@/components/enhanced-contact-form';
import { Footer } from '@/components/footer';
import { AppWrapper } from '@/components/interactive-components';
import { Toaster } from '@/components/toaster';

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
        <Testimonials />
        <FAQ />
        <EnhancedContactForm />
        <Footer />
        <Toaster />
      </main>
    </AppWrapper>
  );
}