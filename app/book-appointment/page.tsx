import { Navbar } from '@/components/navbar';
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