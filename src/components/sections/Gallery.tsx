'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Play, ArrowLeft, ArrowRight } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { fadeInUp, tabSwitch } from '@/lib/animations';

const TABS = ['On-Site', 'Equipment', 'Logistics', 'Team'] as const;

const GALLERY_ITEMS = [
  { src: '/images/gallery-1.jpg', alt: 'Construction site aerial', tab: 'On-Site', video: false },
  { src: '/images/gallery-2.jpg', alt: 'Excavator digging foundation', tab: 'On-Site', video: true },
  { src: '/images/gallery-3.jpg', alt: 'Large crane on site', tab: 'Equipment', video: false },
  { src: '/images/gallery-4.jpg', alt: 'Backhoe loader at work', tab: 'Equipment', video: true },
  { src: '/images/gallery-5.jpg', alt: 'Equipment on flatbed transport', tab: 'Logistics', video: false },
  { src: '/images/gallery-6.jpg', alt: 'Fleet at depot', tab: 'Logistics', video: true },
  { src: '/images/gallery-7.jpg', alt: 'Equipment operator', tab: 'Team', video: false },
  { src: '/images/gallery-8.jpg', alt: 'Construction team on site', tab: 'Team', video: true },
];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>('On-Site');
  const filtered = GALLERY_ITEMS.filter((item) => item.tab === activeTab);

  return (
    <SectionWrapper>
      <div className="mb-10 flex items-end justify-between">
        <motion.h2
          variants={fadeInUp}
          className="font-display text-3xl font-light text-primary md:text-5xl"
        >
          Gallery
        </motion.h2>
        <div className="flex items-center gap-4">
          <span className="text-sm text-primary-500">01 / 04</span>
          <div className="flex gap-2">
            <button className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-100 text-primary-500 hover:bg-primary-50" aria-label="Previous">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-100 text-primary hover:bg-primary-50" aria-label="Next">
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="mb-8 flex gap-2">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
              tab === activeTab
                ? 'bg-primary text-white'
                : 'bg-white text-primary-500 hover:bg-primary-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={tabSwitch}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {filtered.map((item) => (
            <div
              key={item.src}
              className="group relative aspect-video overflow-hidden rounded-[20px]"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {/* Play button overlay for video items — donor pattern */}
              {item.video && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-primary transition-transform group-hover:scale-110">
                    <Play className="h-5 w-5 fill-primary" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </SectionWrapper>
  );
}
