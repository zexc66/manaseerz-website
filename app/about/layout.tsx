import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AppWrapper } from '@/components/interactive-components';
import { Toaster } from '@/components/toaster';

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppWrapper>
      <main className="min-h-screen">
        <Navbar />
        {children}
        <Footer />
        <Toaster />
      </main>
    </AppWrapper>
  );
}