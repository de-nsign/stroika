'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { heroWordReveal, heroSubtitle, EASE_REVEAL } from '@/lib/animations';
import { HERO } from '@/lib/constants';

function CountUp({ target, duration = 1.2 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = (now - start) / (duration * 1000);
            const progress = Math.min(1, elapsed);
            // Ease out: fast start, slow end
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const words = HERO.heading.split(' ');

  return (
    <section ref={sectionRef} className="relative flex min-h-screen items-end overflow-hidden pb-16">
      {/* Background photo with parallax */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/main/hero.webp')", y }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 lg:px-10">
        <div className="flex items-end justify-between gap-8">
          {/* Left: heading + subtitle */}
          <motion.div
            className="max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.05, delayChildren: 0.1 },
              },
            }}
          >
            {/* Staggered word reveal with overflow clip */}
            <h1 className="font-display mb-6 flex flex-wrap gap-x-[0.3em] text-[clamp(40px,6vw,80px)] leading-[0.95] font-light tracking-tight text-white">
              {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden">
                  <motion.span
                    className="inline-block"
                    variants={heroWordReveal}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Subtitle — appears after heading */}
            <motion.p
              variants={heroSubtitle}
              className="max-w-xl text-base leading-relaxed text-white/70 lg:text-lg"
            >
              {HERO.subheading}
            </motion.p>

            {/* Stats: count-up */}
            <motion.div
              className="mt-8 flex gap-10"
              variants={heroSubtitle}
            >
              <div>
                <span className="font-display text-4xl font-light text-white">
                  <CountUp target={30} />+
                </span>
                <p className="mt-1 text-sm text-white/50">machines</p>
              </div>
              <div>
                <span className="font-display text-4xl font-light text-white">
                  <CountUp target={3} duration={0.8} />
                </span>
                <p className="mt-1 text-sm text-white/50">equipment classes</p>
              </div>
            </motion.div>

            {/* CTA buttons — appear quickly, not blocked */}
            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4, ease: EASE_REVEAL }}
            >
              <a
                href="/fleet"
                className="btn-hover rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white"
              >
                {HERO.cta_primary}
              </a>
              <a
                href="/contacts#quote"
                className="btn-hover rounded-full border border-white/30 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm"
              >
                {HERO.cta_secondary}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
