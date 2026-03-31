'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { fadeInUp } from '@/lib/animations';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface InnerHeroProps {
  title: string;
  subtitle: string;
  breadcrumb: string;
  breadcrumbParent?: BreadcrumbItem;
  image?: string;
}

export default function InnerHero({
  title,
  subtitle,
  breadcrumb,
  breadcrumbParent,
  image,
}: InnerHeroProps) {
  return (
    <section className="relative flex h-[400px] items-end overflow-hidden pb-12 bg-accent">
      {/* Decorative image — right side, no background (cut-out) */}
      {image && (
        <img
          src={image}
          alt=""
          className="absolute left-1/2 top-0 h-full w-auto -translate-x-1/2 object-contain md:left-auto md:right-24 md:translate-x-0 md:object-right"
        />
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 lg:px-10">
        {/* Breadcrumbs */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-4 flex items-center gap-2 text-sm text-white/70"
        >
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          {breadcrumbParent && (
            <>
              <Link href={breadcrumbParent.href} className="transition-colors hover:text-white">
                {breadcrumbParent.label}
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
            </>
          )}
          <span className="text-white">{breadcrumb}</span>
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="font-display mb-4 max-w-3xl text-[clamp(36px,5vw,64px)] leading-[1] font-light text-white"
        >
          {title}
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="max-w-xl text-base leading-relaxed text-white/80 lg:text-lg"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}
