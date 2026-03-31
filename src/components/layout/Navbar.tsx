'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { SITE, NAV_LINKS } from '@/lib/constants';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Telegram WebView safe area: env(safe-area-inset-top) returns 0 in TG,
  // so we read the insets from Telegram SDK and set a CSS custom property.
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (!tg) return;
    const apply = () => {
      const safeTop = tg.safeAreaInset?.top || 0;
      const contentTop = tg.contentSafeAreaInset?.top || 0;
      const total = safeTop + contentTop;
      if (total > 0) {
        document.documentElement.style.setProperty('--tg-safe-top', `${total}px`);
      }
    };
    apply();
    tg.onEvent?.('safeAreaChanged', apply);
    tg.onEvent?.('contentSafeAreaChanged', apply);
    return () => {
      tg.offEvent?.('safeAreaChanged', apply);
      tg.offEvent?.('contentSafeAreaChanged', apply);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-4 pb-3 pt-[calc(0.75rem_+_var(--tg-safe-top,_env(safe-area-inset-top,_0px)))] transition-all duration-300 md:px-6 md:py-4 lg:px-10 ${scrolled ? 'max-md:bg-white max-md:shadow-sm' : ''}`}
    >
      {/* Cover area above navbar for iOS in-app browsers (mobile only, on scroll) */}
      {scrolled && <div className="pointer-events-none absolute inset-x-0 bottom-full h-[500px] bg-white md:hidden" />}
      {/* Logo */}
      <Link href="/" className="font-display text-lg font-bold">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo.svg"
          alt={SITE.name}
          className="h-7 w-auto brightness-0"
        />
      </Link>

      {/* Center pill — desktop only */}
      <div className="hidden items-center gap-1 rounded-full bg-white/95 px-2 py-1.5 shadow-lg backdrop-blur-md md:flex">
        {NAV_LINKS.map((link) => {
          const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-accent font-semibold text-white'
                  : 'text-primary-600 hover:bg-primary-50 hover:text-primary'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Right: CTA pill — desktop only */}
      <div className="hidden md:block">
        <Link
          href="/contacts#quote"
          className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-600"
        >
          Get a Quote
        </Link>
      </div>

      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="p-2 text-primary md:hidden"
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute inset-x-4 top-full mt-1 rounded-3xl bg-white p-6 shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => {
                const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-2xl px-4 py-3 text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-accent font-semibold text-white'
                        : 'text-primary hover:bg-primary-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/contacts#quote"
                onClick={() => setMobileOpen(false)}
                className="mt-4 rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-white hover:bg-primary-600"
              >
                Get a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
