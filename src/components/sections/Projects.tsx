'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { projectCard, blurReveal, staggerContainer, EASE_REVEAL } from '@/lib/animations';
import { PROJECTS } from '@/lib/constants';

export default function Projects() {
  return (
    <section className="bg-white">
      {/* Full-bleed photo top half */}
      <div className="relative min-h-[450px] overflow-hidden">
        <Image
          src="/images/project-hero.jpg"
          alt="Stroika Projects"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        <motion.div
          className="absolute inset-x-0 bottom-0 z-10 mx-auto max-w-[1440px] px-6 pb-12 lg:px-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={blurReveal}
        >
          <h2 className="font-display mb-3 text-4xl font-light text-accent md:text-6xl">
            Projects Across
          </h2>
          <h2 className="font-display text-4xl font-light text-white md:text-6xl">
            Cyprus
          </h2>
          <p className="mt-4 max-w-lg text-base text-white/70">
            From bulk excavation to full site preparation — delivering results on landmark developments.
          </p>
        </motion.div>

        {/* Slider card floating on the right */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6, ease: EASE_REVEAL }}
          className="absolute right-6 bottom-8 z-20 hidden w-[340px] rounded-[24px] bg-accent p-6 text-white lg:right-10 lg:block"
        >
          <p className="text-sm leading-relaxed text-white/90">
            {PROJECTS[0].description}
          </p>
          <p className="mt-4 text-xs text-white/50">{PROJECTS[0].title}</p>
        </motion.div>
      </div>

      {/* Bottom: project cards */}
      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-10">
        {/* Navigation */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm text-primary-500">
            <span className="font-semibold text-primary">01</span>
            <span className="h-px w-12 bg-primary" />
            <span>03</span>
          </div>
          <div className="flex gap-2">
            <button className="btn-hover flex h-11 w-11 items-center justify-center rounded-full border border-primary-100 text-primary-500 hover:bg-primary-50" aria-label="Previous">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button className="btn-hover flex h-11 w-11 items-center justify-center rounded-full border border-primary-100 text-primary hover:bg-primary-50" aria-label="Next">
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-4 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {PROJECTS.map((project) => (
            <motion.a
              key={project.title}
              href={project.href}
              variants={projectCard}
              className="group relative h-[280px] overflow-hidden rounded-[24px]"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="img-zoom object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display mb-2 text-lg font-light text-white">
                  {project.title}
                </h3>
                <p className="text-xs leading-relaxed text-white/60">
                  {project.description}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
