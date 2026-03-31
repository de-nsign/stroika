'use client';

import { motion } from 'framer-motion';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { softScaleIn, testimonialStagger, splitFromLeft } from '@/lib/animations';
import { TESTIMONIALS } from '@/lib/constants';

export default function Testimonials() {
  return (
    <SectionWrapper bg="white">
      <div className="mb-12 flex items-end justify-between">
        <div>
          <motion.h2
            variants={splitFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="font-display text-3xl font-light text-primary md:text-5xl"
          >
            Client Reviews
          </motion.h2>
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
        variants={testimonialStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {TESTIMONIALS.map((review) => (
          <motion.div
            key={review.author}
            variants={softScaleIn}
            className="flex flex-col gap-6 rounded-[24px] bg-surface-muted p-8"
          >
            {/* Decorative quote */}
            <div className="flex items-center gap-3">
              <motion.span
                className="font-display text-4xl leading-none text-accent/20"
                initial={{ rotate: -10, scale: 0.5, opacity: 0 }}
                whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                &ldquo;
              </motion.span>
              <p className="text-sm font-medium text-primary-600">{review.date}</p>
            </div>
            <div>
              <p className="mb-4 text-base font-medium leading-relaxed text-primary">
                &ldquo;{review.text}&rdquo;
              </p>
              {/* Author appears after review text */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              >
                <p className="text-sm font-semibold text-primary">{review.author}</p>
                <p className="text-xs text-primary-600">{review.role}</p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
