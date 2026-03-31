'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  ArrowUpRight,
  MessageCircle,
  CheckCircle2,
} from 'lucide-react';
import InnerHero from '@/components/layout/InnerHero';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import type { Solution } from '@/lib/constants';
import { SITE } from '@/lib/constants';

interface Props {
  solution: Solution;
  otherSolutions: Solution[];
  excavationProcess?: string[];
}

export default function SolutionPageClient({
  solution,
  otherSolutions,
  excavationProcess,
}: Props) {
  return (
    <main>
      <InnerHero
        title={solution.title}
        subtitle={solution.description}
        breadcrumb={solution.title}
        breadcrumbParent={{ label: 'Solutions', href: '/solutions' }}
        image={solution.image}
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
            {/* Left column — main content */}
            <div className="lg:col-span-2">
              <motion.div variants={fadeInUp} className="rounded-[24px] bg-white p-8 lg:p-12">
                <h2 className="font-display mb-6 text-2xl font-light text-primary md:text-3xl">
                  Overview
                </h2>
                <p className="mb-8 leading-relaxed text-primary-600">
                  {solution.longDescription}
                </p>

                {/* Excavation process steps */}
                {excavationProcess && (
                  <div className="mb-8">
                    <h3 className="font-display mb-4 text-lg font-light text-primary">
                      Our 6-Step Process
                    </h3>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {excavationProcess.map((step, i) => (
                        <div
                          key={step}
                          className="flex items-center gap-2 rounded-[16px] bg-accent-50 px-4 py-3"
                        >
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                            {i + 1}
                          </span>
                          <span className="text-sm font-medium text-accent-dark">
                            {step}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}


                {/* Services included */}
                <h3 className="font-display mb-4 text-lg font-light text-primary">
                  Services Included
                </h3>
                <ul className="mb-8 grid gap-3 sm:grid-cols-2">
                  {solution.subServices.map((svc) => (
                    <li
                      key={svc}
                      className="flex items-start gap-2 text-sm text-primary-600"
                    >
                      <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {svc}
                    </li>
                  ))}
                </ul>

                {/* Equipment used */}
                <h3 className="font-display mb-4 text-lg font-light text-primary">
                  Equipment Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {solution.equipment.map((eq) => (
                    <span
                      key={eq}
                      className="rounded-full bg-primary-50 px-4 py-2 text-sm text-primary-600"
                    >
                      {eq}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right sidebar */}
            <div className="space-y-6">
              {/* Benefits card */}
              <motion.div
                variants={fadeInUp}
                className={`rounded-[24px] p-8 text-white ${
                  solution.color === 'primary' ? 'bg-primary' : 'bg-accent'
                }`}
              >
                <h3 className="font-display mb-6 text-xl font-light">
                  Why Choose Us
                </h3>
                <ul className="space-y-3">
                  {solution.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm leading-relaxed opacity-90">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 opacity-70" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* CTA card */}
              <motion.div
                variants={fadeInUp}
                className="rounded-[24px] bg-white p-8"
              >
                <h3 className="font-display mb-3 text-lg font-light text-primary">
                  Get a Free Quote
                </h3>
                <p className="mb-6 text-sm text-primary-500">
                  Tell us about your project and we will prepare a tailored proposal.
                </p>
                <a
                  href={`${SITE.whatsappLink}?text=${encodeURIComponent(`Hi, I'm interested in: ${solution.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
                <Link
                  href="/contacts#quote"
                  className="mt-3 flex items-center justify-center gap-2 rounded-full bg-primary-50 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary-100"
                >
                  Request a Quote
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Other solutions */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display mb-12 text-3xl font-light text-primary md:text-4xl"
          >
            Other Solutions
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 gap-5 md:grid-cols-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {otherSolutions.map((s) => (
              <motion.div key={s.id} variants={fadeInUp}>
                <Link
                  href={s.href}
                  className="group flex flex-col overflow-hidden rounded-[20px] bg-[#f4f4f2] transition-shadow hover:shadow-lg sm:flex-row sm:items-stretch"
                >
                  {/* Text content — left */}
                  <div className="flex flex-1 flex-col justify-center p-6 lg:p-8">
                    <h3 className="font-display mb-2 text-lg font-light text-primary lg:text-xl">
                      {s.title}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-primary-600">
                      {s.description}
                    </p>

                    <div className="flex items-center gap-1.5 text-sm font-semibold text-accent">
                      Explore solution
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  {/* Image — right */}
                  <div className="relative h-[260px] shrink-0 overflow-hidden sm:min-h-[200px] sm:h-auto sm:w-[200px] lg:w-[220px] px-6 pb-4 sm:p-6 flex items-end justify-end sm:items-center">
                    <div className="relative h-[220px] w-[260px] sm:h-full sm:w-full sm:scale-[1.2] sm:origin-right">
                      <Image
                        src={s.image}
                        alt={s.title}
                        fill
                        className="object-contain object-right-bottom sm:object-right transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 260px, 200px"
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
