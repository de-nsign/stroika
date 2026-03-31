'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';
import type { Equipment } from '@/lib/constants';

const TAG_COLORS: Record<string, string> = {
  NEW: 'bg-accent text-white',
  TOP: 'bg-primary text-white',
  SALE: 'bg-red-500 text-white',
  '-10%': 'bg-orange-500 text-white',
  '-20%': 'bg-red-500 text-white',
};

export default function EquipmentCard({ item }: { item: Equipment }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="group overflow-hidden rounded-[24px] bg-surface-muted"
    >
      <Link href={`/fleet/${item.id}`} className="block">
        {/* Photo */}
        <div className="relative aspect-[4/3] overflow-hidden bg-primary-50">
          <div
            className="h-full w-full bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url('${item.image}')` }}
          />
          {/* Tags */}
          {item.tags.length > 0 && (
            <div className="absolute top-4 left-4 flex gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className={`rounded-full px-3 py-1 text-xs font-bold ${TAG_COLORS[tag] || 'bg-primary text-white'}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {/* Hover arrow */}
          <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white opacity-0 transition-opacity group-hover:opacity-100">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="mb-1 text-xs font-semibold tracking-wider text-accent-dark uppercase">
            {item.brand}
          </p>
          <h3 className="font-display mb-2 text-lg font-light text-primary">
            {item.name}
          </h3>
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-primary-50 px-3 py-1 text-xs text-primary-600">
              {item.weight}
            </span>
            {item.specs && (
              <span className="rounded-full bg-surface-muted px-3 py-1 text-xs text-primary-600">
                {item.specs}
              </span>
            )}
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-accent-dark">
            View Details
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
