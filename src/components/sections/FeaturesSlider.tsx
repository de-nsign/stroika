'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';
import { FEATURES_SLIDES, SITE } from '@/lib/constants';

export default function FeaturesSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const total = FEATURES_SLIDES.length;

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft } = scrollRef.current;
    const cardWidth = 560;
    const idx = Math.round(scrollLeft / cardWidth);
    setActiveIdx(Math.min(idx, total - 1));
  };

  const scrollTo = (dir: 'prev' | 'next') => {
    if (!scrollRef.current) return;
    const cardWidth = 560;
    const newIdx = dir === 'next'
      ? Math.min(activeIdx + 1, total - 1)
      : Math.max(activeIdx - 1, 0);
    scrollRef.current.scrollTo({ left: cardWidth * newIdx, behavior: 'smooth' });
    setActiveIdx(newIdx);
  };

  return (
    <section className="bg-white py-28 lg:py-36">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        {/* Title — donor uses blue color, not white on dark bg */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="font-display mb-4 text-3xl font-light text-primary md:text-5xl"
        >
          {SITE.name} — This Is:
        </motion.h2>

        {/* Pagination bar — donor style: "01 ——— 05" + arrows */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm text-primary-500">
            <span className="font-semibold text-primary">
              {String(activeIdx + 1).padStart(2, '0')}
            </span>
            <span className="h-px w-16 bg-primary" />
            <span>{String(total).padStart(2, '0')}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollTo('prev')}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-100 text-primary-500 transition-colors hover:bg-primary-50 hover:text-primary disabled:opacity-30"
              disabled={activeIdx === 0}
              aria-label="Previous"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollTo('next')}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-100 text-primary transition-colors hover:bg-primary-50 disabled:opacity-30"
              disabled={activeIdx === total - 1}
              aria-label="Next"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Slider */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 lg:px-10"
      >
        {FEATURES_SLIDES.map((slide) => (
          <div
            key={slide.title}
            className="relative h-[400px] w-[85vw] shrink-0 snap-start overflow-hidden rounded-[24px] md:w-[540px]"
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              sizes="540px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <h3 className="font-display text-2xl font-semibold text-white md:text-3xl">
                {slide.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
