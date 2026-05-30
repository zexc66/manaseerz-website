import { Navbar } from '@/components/navbar';
import { Hero, Services, WhyChooseUs } from '@/components/hero';
import { Testimonials } from '@/components/testimonials';
import { FAQ } from '@/components/faq';
import { Portfolio } from '@/components/portfolio';
import { ServiceAreas } from '@/components/service-areas';
import { EnhancedContactForm } from '@/components/enhanced-contact-form';
import { AppointmentBooking } from '@/components/appointment-booking';
import { Footer } from '@/components/footer';
import { AppWrapper } from '@/components/interactive-components';
import { Toaster } from '@/components/toaster';

export default function AppointmentPage() {
  return (
    <AppWrapper>
      <main className="min-h-screen">
        <Navbar />
        <AppointmentBooking />
        <Footer />
        <Toaster />
      </main>
    </AppWrapper>
  );
}