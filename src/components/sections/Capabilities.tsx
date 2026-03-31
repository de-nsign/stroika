'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { gridCard, gridStagger, gridStaggerFast, blurReveal } from '@/lib/animations';
import { SOLUTIONS, SERVICES_PRIMARY } from '@/lib/constants';

const MOBILE_VISIBLE = 10;

/* Combined grid of everything Stroika can do — solutions + services */
const ITEMS = [
  ...SOLUTIONS.map((s) => ({ title: s.title, image: s.image, href: s.href })),
  ...SERVICES_PRIMARY.map((s) => ({ title: s.title, image: s.image, href: s.href })),
];

export default function Capabilities() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        {/* Header — blur reveal (different from previous section's animation) */}
        <motion.div
          className="mb-16 max-w-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={blurReveal}
        >
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

        {/* Grid — 2D wave stagger */}
        <motion.div
          className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          variants={gridStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              variants={gridCard}
              className={
                !expanded && i >= MOBILE_VISIBLE
                  ? 'hidden md:block'
                  : undefined
              }
            >
              <Link
                href={item.href}
                className="card-hover group flex aspect-square w-full flex-col overflow-hidden rounded-[20px] bg-[#f7f7f5]"
              >
                {/* Image — top area */}
                <div className="relative flex-1 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, (max-width: 1024px) 22vw, 18vw"
                    className="img-zoom object-contain"
                  />
                </div>
                {/* Label */}
                <span className="px-3 pb-4 text-center text-sm font-medium leading-snug text-primary transition-colors group-hover:text-accent">
                  {item.title}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Show more — mobile only, new batch staggers faster */}
        {!expanded && (
          <div className="mt-10 flex justify-center md:hidden">
            <button
              onClick={() => setExpanded(true)}
              className="btn-hover rounded-full border border-primary/20 px-8 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
            >
              Show More
            </button>
          </div>
        )}

        {/* When expanded on mobile, render remaining items with faster stagger */}
        {expanded && (
          <motion.div
            className="mt-5 grid grid-cols-2 gap-5 md:hidden"
            variants={gridStaggerFast}
            initial="hidden"
            animate="visible"
          >
            {ITEMS.slice(MOBILE_VISIBLE).map((item) => (
              <motion.div key={item.title + '-expanded'} variants={gridCard}>
                <Link
                  href={item.href}
                  className="card-hover group flex aspect-square w-full flex-col overflow-hidden rounded-[20px] bg-[#f7f7f5]"
                >
                  <div className="relative flex-1 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="45vw"
                      className="img-zoom object-contain"
                    />
                  </div>
                  <span className="px-3 pb-4 text-center text-sm font-medium leading-snug text-primary transition-colors group-hover:text-accent">
                    {item.title}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
