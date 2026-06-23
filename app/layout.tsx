import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Space_Grotesk, Outfit } from 'next/font/google';
import './globals.css';
import { StructuredData } from '@/components/structured-data';

// Self-hosted fonts via next/font — eliminates the render-blocking Google Fonts
// @import chain (globals.css) and the fonts.gstatic.com third-party requests.
// Fonts are inlined, preloaded, cached, and add zero render-blocking CSS.
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Manaseerz Electric | DFW Premier Electrical Specialists',
  description: 'Licensed electrical specialists serving the Dallas-Fort Worth Metroplex. Precision electrical crafted for excellence - EV chargers, chandeliers, renovations, smart homes.',
  keywords: 'electrician DFW, licensed electrician Lewisville, EV charger installation Dallas, chandelier installation Frisco, electrical renovation Plano',
  authors: [{ name: 'Manaseerz Electric' }],
  creator: 'Manaseerz Electric',
  publisher: 'Manaseerz Electric',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://manaseerz-web.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Manaseerz Electric | DFW Premier Electrical Specialists',
    description: 'Same-day and next-day available. Licensed & Insured electrical specialists serving DFW.',
    url: 'https://manaseerz-web.vercel.app',
    siteName: 'Manaseerz Electric',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manaseerz Electric | DFW Premier Electrical Specialists',
    description: 'Licensed electrical specialists serving DFW. Same-day & next-day available.',
    creator: '@manaseerzelectric',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${outfit.variable}`}>
      <head>
        <StructuredData />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}