'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Wrench, Truck } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { PILLARS } from '@/lib/constants';

const ICONS: Record<string, React.ElementType> = { ShieldCheck, Wrench, Truck };

/* Donor ESG: fullscreen photo bg + 3 colored cards overlapping bottom */
const CARD_COLORS = [
  'bg-primary text-white',
  'bg-accent text-white',
  'bg-primary-100 text-primary',
];

export default function Pillars() {
  return (
    <section className="relative">
      {/* Photo background — like donor ESG section */}
      <div className="relative min-h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/pillars-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/20" />

        {/* Centered heading over photo */}
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center px-6 pt-28 text-center lg:pt-36"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/30">
            <span className="text-lg text-white">✦</span>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="font-display mb-4 max-w-xl text-3xl font-light text-white md:text-5xl"
          >
            {PILLARS.heading}
          </motion.h2>
          <motion.p variants={fadeInUp} className="max-w-lg text-base text-white/70">
            {PILLARS.subheading}
          </motion.p>
        </motion.div>
      </div>

      {/* 3 colored cards — overlap the photo section bottom */}
      <motion.div
        className="relative z-20 mx-auto -mt-20 grid max-w-[1440px] grid-cols-1 gap-4 px-6 md:grid-cols-3 lg:px-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {PILLARS.cards.map((card, i) => {
          const Icon = ICONS[card.icon];
          return (
            <motion.div
              key={card.title}
              variants={fadeInUp}
              className={`rounded-[24px] p-8 lg:p-10 ${CARD_COLORS[i]}`}
            >
              <h3 className="mb-4 text-xl font-semibold">{card.title}</h3>
              <p className="text-sm leading-relaxed opacity-80">
                {card.description}
              </p>
              <div className="mt-8">
                <Icon className="h-6 w-6 opacity-40" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
