'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import InnerHero from '@/components/layout/InnerHero';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { SERVICES_PRIMARY, SITE } from '@/lib/constants';

export default function ServicesPage() {
  return (
    <main>
      <InnerHero
        title="Value-Added Services"
        subtitle="Beyond equipment rental — certified operators, logistics, and support to keep your project moving."
        breadcrumb="Services"
        image="/images/services/hero.webp"
      />

      {/* Primary services — horizontal cards in 2-col grid */}
      <section className="bg-white pt-12 pb-20 lg:pt-16 lg:pb-28">
        <motion.div
          className="mx-auto max-w-[1440px] px-6 lg:px-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {SERVICES_PRIMARY.map((service) => (
              <motion.div key={service.id} variants={fadeInUp}>
                <Link
                  href={service.href}
                  className="group flex flex-col overflow-hidden rounded-[20px] bg-[#f4f4f2] transition-shadow hover:shadow-lg sm:flex-row sm:items-stretch"
                >
                  {/* Text content — left */}
                  <div className="flex flex-1 flex-col justify-center p-6 lg:p-8">
                    <h3 className="font-display mb-2 text-lg font-light text-primary lg:text-xl">
                      {service.title}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-primary-600">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-accent">
                      Learn more
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  {/* Image — right */}
                  <div className="relative h-[260px] shrink-0 overflow-hidden sm:min-h-[200px] sm:h-auto sm:w-[200px] lg:w-[220px] sm:p-6 flex items-end justify-end sm:items-center -mt-20 sm:mt-0">
                    <div className="relative h-[260px] w-[280px] sm:h-full sm:w-full sm:scale-[1.2] sm:origin-right">
                      <Image
                        src={service.image}
                        alt={service.title}
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
      <section className="bg-primary py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-6 text-center lg:px-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display mb-4 text-3xl font-light text-white md:text-5xl"
          >
            Ready to mobilize?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-8 text-white/70"
          >
            Contact our operations team for a customized service package.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href={SITE.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-accent px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
            >
              WhatsApp Us
            </a>
            <Link
              href="/contacts#quote"
              className="rounded-full bg-white/10 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/20"
            >
              Request a Quote
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
