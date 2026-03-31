'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  ArrowUpRight,
  MessageCircle,
  Clock,
  Percent,
  Info,
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import type { Equipment } from '@/lib/constants';
import { SITE, WEIGHT_CLASS_LABELS, EQUIPMENT_TYPE_LABELS } from '@/lib/constants';
import QuoteForm from '@/components/ui/QuoteForm';

interface Props {
  item: Equipment;
  otherEquipment: Equipment[];
}


const TAG_COLORS: Record<string, string> = {
  NEW: 'bg-accent text-white',
  TOP: 'bg-primary text-white',
  SALE: 'bg-red-500 text-white',
  '-10%': 'bg-orange-500 text-white',
  '-20%': 'bg-red-500 text-white',
};

export default function EquipmentPageClient({ item, otherEquipment }: Props) {
  return (
    <main>
      {/* Breadcrumb bar */}
      <section className="bg-white pt-20 md:pt-24">
        <div className="mx-auto flex max-w-[1440px] items-center gap-2 px-6 text-sm text-primary-600 lg:px-10">
          <Link href="/" className="transition-colors hover:text-accent">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/fleet" className="transition-colors hover:text-accent">
            Equipment
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-primary">{item.name}</span>
        </div>
      </section>

      {/* Hero: Photo left + Info right */}
      <section className="bg-white pt-4 pb-12 lg:pt-6 lg:pb-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <motion.div
            className="grid gap-8 lg:grid-cols-2 lg:gap-12"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Left — Photo */}
            <motion.div
              variants={fadeInUp}
              className="relative overflow-hidden rounded-[24px] bg-surface-muted"
            >
              <div className="relative aspect-[4/3] overflow-hidden lg:aspect-[3/2]">
                <div
                  className="h-full w-full bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />
                {/* Tags */}
                {item.tags.length > 0 && (
                  <div className="absolute top-4 left-4 flex gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-full px-3 py-1.5 text-xs font-bold ${TAG_COLORS[tag] || 'bg-primary text-white'}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Right — Info */}
            <motion.div variants={fadeInUp} className="flex flex-col">
              {/* Pricing badges */}
              <div className="mb-6 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-[16px] bg-surface-muted px-4 py-3">
                  <Clock className="h-4 w-4 text-accent" />
                  <div>
                    <p className="text-xs text-primary-500">1–7 days</p>
                    <p className="text-sm font-semibold text-primary">Price on Request</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-[16px] border border-accent bg-surface-muted px-4 py-3">
                  <Percent className="h-4 w-4 text-accent" />
                  <div>
                    <p className="text-xs text-primary-500">7+ days</p>
                    <p className="text-sm font-semibold text-primary">Discount Available</p>
                  </div>
                </div>
              </div>

              {/* Title */}
              <p className="mb-1 text-xs font-semibold tracking-wider text-accent-dark uppercase">
                {item.brand}
              </p>
              <h1 className="font-display mb-6 text-[clamp(28px,4vw,48px)] leading-[1.1] font-light text-primary">
                {item.name}
              </h1>

              {/* Specs */}
              <div className="mb-8 space-y-3">
                <h2 className="font-display text-lg font-light text-primary">
                  Specifications
                </h2>
                <div className="flex flex-wrap gap-2">
                  <span className="flex items-center gap-1.5 rounded-full bg-surface-muted px-4 py-2 text-sm text-primary-600">
                    <Info className="h-3.5 w-3.5 text-accent" />
                    Weight: {item.weight}
                  </span>
                  <span className="rounded-full bg-surface-muted px-4 py-2 text-sm text-primary-600">
                    Class: {WEIGHT_CLASS_LABELS[item.weightClass]}
                  </span>
                  <span className="rounded-full bg-surface-muted px-4 py-2 text-sm text-primary-600">
                    Type: {EQUIPMENT_TYPE_LABELS[item.type]}
                  </span>
                </div>
                {item.specs && (
                  <div className="rounded-[16px] bg-surface-muted p-5">
                    <p className="text-sm leading-relaxed text-primary-600">
                      {item.specs}
                    </p>
                  </div>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="mt-auto flex flex-wrap gap-3">
                <a
                  href={`${SITE.whatsappLink}?text=${encodeURIComponent(`Hi, I'd like a quote for: ${item.name}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
                <a
                  href="#quote"
                  className="flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
                >
                  Request a Quote
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quote Form */}
      <section id="quote" className="bg-white pb-20 lg:pb-28">
        <div className="mx-auto max-w-[800px] px-6 lg:px-10">
          <QuoteForm defaultEquipment={item.name} />
        </div>
      </section>

      {/* Other Equipment */}
      {otherEquipment.length > 0 && (
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display mb-12 text-3xl font-light text-primary md:text-4xl"
            >
              You May Also Need
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {otherEquipment.map((eq) => (
                <motion.div key={eq.id} variants={fadeInUp}>
                  <Link
                    href={`/fleet/${eq.id}`}
                    className="group block overflow-hidden rounded-[24px] bg-[#f4f4f2] transition-shadow hover:shadow-lg"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <div
                        className="h-full w-full bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url('${eq.image}')` }}
                      />
                      {eq.tags.length > 0 && (
                        <div className="absolute top-4 left-4 flex gap-2">
                          {eq.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`rounded-full px-3 py-1 text-xs font-bold ${TAG_COLORS[tag] || 'bg-primary text-white'}`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <p className="mb-1 text-xs font-semibold tracking-wider text-accent-dark uppercase">
                        {eq.brand}
                      </p>
                      <h3 className="font-display mb-2 text-lg font-light text-primary">
                        {eq.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-accent">
                        View Details
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}
    </main>
  );
}
