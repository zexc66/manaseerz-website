import { Navbar } from '@/components/navbar';
import { Hero, Services, WhyChooseUs } from '@/components/hero';
import { Testimonials } from '@/components/testimonials';
import { ContactForm } from '@/components/contact-form';
import { Footer } from '@/components/footer';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <ContactForm />
      <Footer />
    </main>
  );
}