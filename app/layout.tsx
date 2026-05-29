import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Manaseerz Electric | DFW Premier Electrical Specialists",
  description: "Licensed electrical specialists serving the Dallas-Fort Worth Metroplex. Precision electrical crafted for excellence - EV chargers, chandeliers, renovations, smart homes.",
  keywords: "electrician DFW, licensed electrician Lewisville, EV charger installation Dallas, chandelier installation Frisco, electrical renovation Plano",
  authors: [{ name: "Manaseerz Electric" }],
  openGraph: {
    title: "Manaseerz Electric | DFW Premier Electrical Specialists",
    description: "Same-day and next-day available. Licensed & Insured electrical specialists serving DFW.",
    url: "https://manaseerz.com",
    siteName: "Manaseerz Electric",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manaseerz Electric | DFW Premier Electrical Specialists",
    description: "Licensed electrical specialists serving DFW. Same-day & next-day available.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}