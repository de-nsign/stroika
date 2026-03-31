'use client';

import { motion } from 'framer-motion';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { fadeInUp } from '@/lib/animations';
import { TESTIMONIALS } from '@/lib/constants';

/* Donor "News" cards: lavender bg, decorative circles, date at top, title at bottom */
export default function Testimonials() {
  return (
    <SectionWrapper bg="white">
      <div className="mb-12 flex items-end justify-between">
        <div>
          <motion.h2
            variants={fadeInUp}
            className="font-display text-3xl font-light text-primary md:text-5xl"
          >
            Client Reviews
          </motion.h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {TESTIMONIALS.map((review) => (
          <motion.div
            key={review.author}
            variants={fadeInUp}
            className="flex flex-col gap-6 rounded-[24px] bg-surface-muted p-8"
          >
            <p className="text-sm font-medium text-primary-600">{review.date}</p>
            <div>
              <p className="mb-4 text-base font-medium leading-relaxed text-primary">
                &ldquo;{review.text}&rdquo;
              </p>
              <p className="text-sm font-semibold text-primary">{review.author}</p>
              <p className="text-xs text-primary-600">{review.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
