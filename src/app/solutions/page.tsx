'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
} from 'lucide-react';
import InnerHero from '@/components/layout/InnerHero';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { SOLUTIONS, SITE } from '@/lib/constants';



export default function SolutionsPage() {
  return (
    <main>
      <InnerHero
        title="Solutions by Job"
        subtitle="Turnkey site solutions managed by experts — from permits to cleanup."
        breadcrumb="Solutions"
        image="/images/solutions/hero.webp"
      />

      <section className="bg-white pt-12 pb-20 lg:pt-16 lg:pb-28">
        <motion.div
          className="mx-auto max-w-[1440px] px-6 lg:px-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {SOLUTIONS.map((solution) => (
              <motion.div key={solution.id} variants={fadeInUp}>
                <Link
                  href={solution.href}
                  className="group flex flex-col overflow-hidden rounded-[20px] bg-[#f4f4f2] transition-shadow hover:shadow-lg sm:flex-row sm:items-stretch"
                >
                  {/* Text content — left */}
                  <div className="flex flex-1 flex-col justify-center p-6 lg:p-8">
                    <h3 className="font-display mb-2 text-lg font-light text-primary lg:text-xl">
                      {solution.title}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-primary-600">
                      {solution.description}
                    </p>

                    <div className="flex items-center gap-1.5 text-sm font-semibold text-accent">
                      Explore solution
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  {/* Image — right */}
                  <div className="relative h-[260px] shrink-0 overflow-hidden sm:min-h-[200px] sm:h-auto sm:w-[200px] lg:w-[220px] sm:p-6 flex items-end justify-end sm:items-center -mt-20 sm:mt-0">
                    <div className="relative h-[260px] w-[280px] sm:h-full sm:w-full sm:scale-[1.2] sm:origin-right">
                      <Image
                        src={solution.image}
                        alt={solution.title}
                        fill
                        className="object-contain object-right-bottom sm:object-right transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 260px, 200px"
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="bg-accent py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-6 text-center lg:px-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display mb-4 text-3xl font-light text-white md:text-5xl"
          >
            Need a custom solution?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-8 text-white/80"
          >
            Let&apos;s talk. We&apos;ll design a package tailored to your project.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            href={SITE.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-accent transition-colors hover:bg-accent-50"
          >
            <ArrowUpRight className="h-5 w-5" />
            Chat on WhatsApp
            <ArrowUpRight className="h-4 w-4" />
          </motion.a>
        </div>
      </section>
    </main>
  );
}
