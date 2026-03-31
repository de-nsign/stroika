'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import AnimatedHeading from '@/components/ui/AnimatedHeading';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { directionalCards } from '@/lib/animations';
import { KEY_ASSETS } from '@/lib/constants';
import { heroSubtitle } from '@/lib/animations';

export default function KeyAssets() {
  return (
    <SectionWrapper id="fleet" bg="white">
      <AnimatedHeading
        row1={KEY_ASSETS.heading_words_row1}
        row2={KEY_ASSETS.heading_words_row2}
        accentWords={['equipment', 'construction']}
      />
      <motion.p
        variants={heroSubtitle}
        className="mx-auto mb-8 max-w-2xl text-center text-base text-primary-600 md:mb-16 lg:text-lg"
      >
        {KEY_ASSETS.subheading}
      </motion.p>

      {/* 3 cards — each enters from a different direction */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {KEY_ASSETS.cards.map((card, i) => (
          <motion.a
            key={card.title}
            href={card.href}
            variants={directionalCards[i % 3]}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="card-hover group relative h-[340px] overflow-hidden rounded-[24px] bg-[#f7f7f5] md:h-[440px]"
          >
            <div className="absolute inset-0 scale-90 md:scale-[0.81]">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="img-zoom object-contain"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            {/* Hover arrow button */}
            <div className="absolute top-5 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white transition-all duration-300 md:opacity-0 md:group-hover:opacity-100">
              <ArrowUpRight className="h-5 w-5" />
            </div>

            {/* Bottom label */}
            <div className="absolute inset-x-0 bottom-0 p-6">
              <div className="mb-2 flex items-center gap-3">
                <span className="text-sm font-semibold uppercase tracking-wider text-primary-900">
                  {card.title}
                </span>
              </div>
              <p className="text-sm text-primary-500">{card.subtitle}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </SectionWrapper>
  );
}
