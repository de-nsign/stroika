'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SITE, NAV_LINKS } from '@/lib/constants';
import { fadeIn } from '@/lib/animations';

export default function Footer() {
  return (
    <motion.footer
      className="bg-white py-10"
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <Link href="/" className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.svg" alt={SITE.name} className="h-6 w-auto brightness-0" />
          </Link>
          <div className="flex flex-wrap justify-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="link-hover text-sm text-primary-500 transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8 border-t border-primary-50 pt-6 text-center text-sm text-primary-500">
          &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </div>
      </div>
    </motion.footer>
  );
}
