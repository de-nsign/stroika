'use client';

import { motion } from 'framer-motion';
import { staggerContainer } from '@/lib/animations';
import { ReactNode } from 'react';

interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
  bg?: 'white' | 'muted' | 'dark';
}

export default function SectionWrapper({
  id,
  children,
  className = '',
  bg = 'white',
}: SectionWrapperProps) {
  const bgClass =
    bg === 'muted'
      ? 'bg-surface-muted'
      : bg === 'dark'
        ? 'bg-primary text-white'
        : 'bg-white';

  return (
    <section id={id} className={`py-10 lg:py-20 ${bgClass} ${className}`}>
      <motion.div
        className="mx-auto max-w-[1440px] px-6 lg:px-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {children}
      </motion.div>
    </section>
  );
}
