'use client';

import { motion } from 'framer-motion';
import { staggerContainer, wordCloudWord } from '@/lib/animations';

interface AnimatedHeadingProps {
  row1: string[];
  row2: string[];
  accentWords?: string[];
  className?: string;
}

export default function AnimatedHeading({
  row1,
  row2,
  accentWords = [],
  className = '',
}: AnimatedHeadingProps) {
  const isAccent = (word: string) =>
    accentWords.map((w) => w.toLowerCase()).includes(word.toLowerCase());

  return (
    <motion.div
      className={`mb-8 text-center md:mb-16 ${className}`}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {[row1, row2].map((row, rowIdx) => (
        <div key={rowIdx} className="flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1 md:gap-x-5">
          {row.map((word, i) => (
            <motion.span
              key={`${rowIdx}-${i}`}
              variants={wordCloudWord}
              className={`font-display text-[clamp(28px,6vw,80px)] leading-[1.1] ${
                isAccent(word)
                  ? 'font-semibold text-primary'
                  : 'font-light text-primary-500'
              }`}
            >
              {word}
            </motion.span>
          ))}
        </div>
      ))}
    </motion.div>
  );
}
