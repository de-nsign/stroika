'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  MessageCircle,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import InnerHero from '@/components/layout/InnerHero';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import type { Service } from '@/lib/constants';
import { SITE } from '@/lib/constants';

interface Props {
  service: Service;
  otherServices: Service[];
}

export default function ServicePageClient({ service, otherServices }: Props) {
  return (
    <main>
      <InnerHero
        title={service.title}
        subtitle={service.description}
        breadcrumb={service.title}
        breadcrumbParent={{ label: 'Services', href: '/services' }}
        image={service.image}
      />

      {/* Main content */}
      <section className="bg-surface-muted py-20 lg:py-28">
        <motion.div
          className="mx-auto max-w-[1440px] px-6 lg:px-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Left column */}
            <div className="lg:col-span-2">
              <motion.div variants={fadeInUp} className="rounded-[24px] bg-white p-8 lg:p-12">
                <h2 className="font-display mb-6 text-2xl font-light text-primary md:text-3xl">
                  About This Service
                </h2>
                <p className="mb-8 leading-relaxed text-primary-600">
                  {service.longDescription}
                </p>

                {/* Details list if present */}
                {service.details && service.details.length > 0 && (
                  <>
                    <h3 className="font-display mb-4 text-lg font-light text-primary">
                      What&apos;s Included
                    </h3>
                    <ul className="mb-8 grid gap-3 sm:grid-cols-2">
                      {service.details.map((detail) => (
                        <li
                          key={detail}
                          className="flex items-start gap-2 text-sm text-primary-600"
                        >
                          <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Benefits */}
                <h3 className="font-display mb-4 text-lg font-light text-primary">
                  Key Benefits
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {service.benefits.map((b) => (
                    <div
                      key={b}
                      className="flex items-start gap-3 rounded-[16px] bg-accent-50 p-4"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <span className="text-sm text-primary-600">{b}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right sidebar */}
            <div className="space-y-6">
              {/* CTA card */}
              <motion.div
                variants={fadeInUp}
                className="rounded-[24px] bg-primary p-8 text-white"
              >
                <h3 className="font-display mb-3 text-xl font-light">
                  Need This Service?
                </h3>
                <p className="mb-6 text-sm opacity-70">
                  Contact us for pricing and availability. Fast response guaranteed.
                </p>
                <a
                  href={`${SITE.whatsappLink}?text=${encodeURIComponent(`Hi, I'm interested in: ${service.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
                <Link
                  href="/contacts#quote"
                  className="mt-3 flex items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
                >
                  Request a Quote
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </motion.div>

              {/* Contact info */}
              <motion.div
                variants={fadeInUp}
                className="rounded-[24px] bg-white p-8"
              >
                <h3 className="font-display mb-4 text-lg font-light text-primary">
                  Contact
                </h3>
                <div className="space-y-3 text-sm text-primary-600">
                  <p>
                    <span className="text-xs font-semibold tracking-wider text-primary-500 uppercase">Phone</span>
                    <br />
                    <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="hover:text-primary">
                      {SITE.phone}
                    </a>
                  </p>
                  <p>
                    <span className="text-xs font-semibold tracking-wider text-primary-500 uppercase">Email</span>
                    <br />
                    <a href={`mailto:${SITE.email}`} className="hover:text-primary">
                      {SITE.email}
                    </a>
                  </p>
                  <p>
                    <span className="text-xs font-semibold tracking-wider text-primary-500 uppercase">Hours</span>
                    <br />
                    {SITE.hours}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Other services */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display mb-12 text-3xl font-light text-primary md:text-4xl"
          >
            Other Services
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {otherServices.slice(0, 3).map((s) => (
              <motion.div key={s.id} variants={fadeInUp}>
                <Link
                  href={s.href}
                  className="group flex flex-col overflow-hidden rounded-[20px] bg-[#f4f4f2] transition-shadow hover:shadow-lg sm:flex-row sm:items-stretch"
                >
                  {/* Text — left */}
                  <div className="flex flex-1 flex-col justify-center p-6 lg:p-8">
                    <h3 className="font-display mb-2 text-lg font-light text-primary">
                      {s.title}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-primary-600">
                      {s.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-accent">
                      Learn more
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  {/* Cut-out image — right */}
                  <div className="relative h-[240px] shrink-0 overflow-hidden sm:h-auto sm:w-[160px] lg:w-[180px] px-6 pb-4 sm:p-4 flex items-end justify-end sm:items-center">
                    <div className="relative h-[200px] w-[240px] sm:h-full sm:w-full sm:scale-[1.2] sm:origin-right">
                      <Image
                        src={s.image}
                        alt={s.title}
                        fill
                        className="object-contain object-right-bottom sm:object-right transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 240px, 180px"
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
