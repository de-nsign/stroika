import type { Metadata, Viewport } from 'next';
import { Inter, Manrope } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import ImagePreloader from '@/components/layout/ImagePreloader';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  viewportFit: 'cover',
  themeColor: '#FFFFFF',
};

export const metadata: Metadata = {
  title: 'GrowthLift — Heavy Equipment Rental, Trading & AMC in Dubai',
  description:
    'Heavy equipment rental, trading and AMC services from Dubai across the Middle East, Asia and Africa. Earth moving, lifting, access platforms, air and power systems. Genie, JLG, CAT, Komatsu multi-brand support. Rated 5.0 on Google.',
  openGraph: {
    title: 'GrowthLift Heavy Equipments Trading & Rental — Dubai',
    description:
      'Excavators, cranes, boom and scissor lifts, compressors and generators for rent across the Middle East, Asia and Africa. Short-term, long-term, with or without operator.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} antialiased`}
    >
      <head>
        {/* Preload hero background — CSS background-images are not auto-discovered by the browser */}
        <link rel="preload" as="image" href="/images/main/hero.webp" />
      </head>
      <body>
        <ImagePreloader />
        <ScrollToTop />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
