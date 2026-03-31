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
  title: 'Stroika — Heavy Equipment Rental Cyprus',
  description:
    "Cyprus's premier partner for heavy equipment rental and full site solutions. 27+ machines, certified operators, 24/7 support.",
  openGraph: {
    title: 'Stroika — Heavy Equipment Rental Cyprus',
    description:
      "Cyprus's premier partner for heavy equipment rental and full site solutions.",
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
