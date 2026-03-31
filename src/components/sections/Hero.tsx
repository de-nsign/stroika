'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import { HERO } from '@/lib/constants';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section ref={sectionRef} className="relative flex min-h-screen items-end overflow-hidden pb-16">
      {/* Background photo with parallax */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/main/hero.webp')", y }}
      />
      {/* Subtle gradient — only at the bottom for text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

      {/* Content at bottom-left, like donor */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 lg:px-10">
        <div className="flex items-end justify-between gap-8">
          {/* Left: heading + subtitle */}
          <motion.div
            className="max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          >
            <motion.h1
              variants={fadeInUp}
              className="font-display mb-6 text-[clamp(40px,6vw,80px)] leading-[0.95] font-light tracking-tight text-white"
            >
              {HERO.heading}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="max-w-xl text-base leading-relaxed text-white/70 lg:text-lg"
            >
              {HERO.subheading}
            </motion.p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
