'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import AnimatedHeading from '@/components/ui/AnimatedHeading';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { productSlideLeft, productSlideRight } from '@/lib/animations';
import { PRODUCTS_DUAL } from '@/lib/constants';

const BUTTON_COLORS = ['bg-accent', 'bg-primary'];
const cardVariants = [productSlideLeft, productSlideRight];

export default function ProductsDual() {
  return (
    <SectionWrapper id="solutions" bg="muted">
      <AnimatedHeading
        row1={['Two', 'ways', 'to']}
        row2={['get', 'it', 'done']}
        accentWords={['ways', 'done']}
      />

      {/* 2 cards — slide in from opposite sides */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {PRODUCTS_DUAL.map((card, i) => (
          <motion.a
            key={card.title}
            href={card.href}
            variants={cardVariants[i % 2]}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="group relative flex h-[460px] flex-col justify-end overflow-hidden rounded-[24px]"
          >
            {/* Full-bleed background image */}
            <Image
              src={card.image}
              alt={card.title}
              fill
              className="img-zoom object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

            {/* Hover arrow top-right */}
            <div className={`absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full ${BUTTON_COLORS[i]} text-white opacity-0 transition-all duration-300 group-hover:opacity-100`}>
              <ArrowUpRight className="h-5 w-5" />
            </div>

            {/* Text at bottom-left */}
            <div className="relative z-10 p-8 lg:p-10">
              <h3 className="font-display mb-2 text-3xl font-light text-white md:text-4xl">
                {card.title}
              </h3>
              <p className="max-w-sm text-base text-white/70">
                {card.subtitle}
              </p>
              <div className={`mt-6 flex h-12 w-12 items-center justify-center rounded-full ${BUTTON_COLORS[i]} text-white`}>
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </SectionWrapper>
  );
}
