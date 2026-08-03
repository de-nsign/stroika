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
  title: 'Star Power Equipment Rental Dubai — Scaffolding, Ladders & Generators',
  description:
    'Aluminium scaffolding, ladders, silent generators and power tools for rent in Dubai. Erection and dismantling, same-day delivery from Al Quoz. Rated 4.9 from 182 Google reviews.',
  openGraph: {
    title: 'Star Power Equipment Rental & Repairing L.L.C. — Dubai',
    description:
      'Scaffolding, ladders, silent generators, cutting and cleaning machines for rent across Dubai. Open 7 days, 6am–10pm. Delivery to site.',
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
