'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { MISSION } from '@/lib/constants';

export default function Mission() {
  return (
    <section className="relative overflow-hidden bg-accent">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 lg:grid-cols-2">
        {/* Left: text content */}
        <motion.div
          className="flex flex-col justify-center px-6 pt-10 pb-2 lg:px-16 lg:py-36"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h2
            variants={fadeInUp}
            className="font-display mb-6 text-4xl font-light text-white md:text-5xl"
          >
            {MISSION.heading}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mb-6 max-w-lg text-base leading-relaxed text-white/80"
          >
            {MISSION.text}
          </motion.p>

          {/* CTA button — desktop only (inline) */}
          <motion.div variants={fadeInUp} className="hidden lg:block">
            <a
              href="tel:+1"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-accent transition-opacity hover:opacity-90"
            >
              Call Now
            </a>
          </motion.div>
        </motion.div>

        {/* Right: photo */}
        <div className="relative min-h-[250px] lg:min-h-0">
          <div
            className="absolute inset-0 bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/main/mission.webp')" }}
          />
        </div>
      </div>

      {/* CTA button — mobile only (full-width, below image) */}
      <motion.div
        className="px-6 pb-10 lg:hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <a
          href="tel:+1"
          className="flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-accent transition-opacity hover:opacity-90"
        >
          Call Now
        </a>
      </motion.div>
    </section>
  );
}
