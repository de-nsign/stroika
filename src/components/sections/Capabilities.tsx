'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { SOLUTIONS, SERVICES_PRIMARY } from '@/lib/constants';

const MOBILE_VISIBLE = 10;

/* Combined grid of everything Stroika can do — solutions + services */
const ITEMS = [
  ...SOLUTIONS.map((s) => ({ title: s.title, image: s.image, href: s.href })),
  ...SERVICES_PRIMARY.map((s) => ({ title: s.title, image: s.image, href: s.href })),
];

const card = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Capabilities() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="bg-white py-16 lg:py-20">
      <motion.div
        className="mx-auto max-w-[1440px] px-6 lg:px-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="mb-16 max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">
            What We Do
          </p>
          <h2 className="font-display text-4xl font-light text-primary md:text-5xl">
            Everything Your Site Needs
          </h2>
          <p className="mt-4 text-base leading-relaxed text-primary-400">
            From land clearing to final landscaping — solutions, equipment, and
            services under one contract.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              variants={card}
              className={
                !expanded && i >= MOBILE_VISIBLE
                  ? 'hidden md:block'
                  : undefined
              }
            >
              <Link
                href={item.href}
                className="group flex aspect-square w-full flex-col overflow-hidden rounded-[20px] bg-[#f7f7f5]"
              >
                {/* Image — top area */}
                <div className="relative flex-1">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, (max-width: 1024px) 22vw, 18vw"
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {/* Label — bottom inside card */}
                <span className="px-3 pb-4 text-center text-sm font-medium leading-snug text-primary transition-colors group-hover:text-accent">
                  {item.title}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Show more — mobile only */}
        {!expanded && (
          <div className="mt-10 flex justify-center md:hidden">
            <button
              onClick={() => setExpanded(true)}
              className="rounded-full border border-primary/20 px-8 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
            >
              Show More
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
}
