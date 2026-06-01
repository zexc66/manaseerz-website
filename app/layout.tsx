import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import './globals.css';
import './design-tokens.css';
import './layout-system.css';
import './animation-system.css';
import { StructuredData } from '@/components/structured-data';

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
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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