'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

interface BentoStatCardProps {
  value: string;
  label: string;
}

export default function BentoCard({ value, label }: BentoStatCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex flex-col justify-center rounded-2xl bg-white p-8 shadow-sm"
    >
      <span className="font-display text-5xl font-bold text-primary">
        {value}
      </span>
      <span className="mt-2 text-sm text-primary-500">{label}</span>
    </motion.div>
  );
}
