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
  title: 'Al Badar Mobile Crane — Mobile Crane Rental Dubai',
  description:
    'Mobile crane rental in Dubai from 25 to 700 tonnes. Certified operators, a modern maintained fleet and 24/7 emergency lifting support for construction, industrial and infrastructure projects.',
  openGraph: {
    title: 'Al Badar Mobile Crane — Mobile Crane Rental Dubai',
    description:
      'Mobile crane rental in Dubai from 25 to 700 tonnes. Certified operators, modern fleet, 24/7 support.',
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
