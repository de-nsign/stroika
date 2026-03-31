import { Variants } from 'framer-motion';

/* ─── Shared easings ─── */
export const EASE_REVEAL: [number, number, number, number] = [0.16, 1, 0.3, 1]; // power3.out equivalent
export const EASE_UI: [number, number, number, number] = [0.25, 0.4, 0.25, 1];

/* ─── Generic fade (footer, minimal sections) ─── */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: EASE_UI },
  },
};

/* ─── Stagger containers ─── */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/* ─── Hero: word mask reveal ─── */
export const heroWordReveal: Variants = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.8, ease: EASE_REVEAL },
  },
};

export const heroSubtitle: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_REVEAL },
  },
};

/* ─── KeyAssets: multi-directional card entry ─── */
export const cardFromLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_REVEAL },
  },
};

export const cardFromBottom: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_REVEAL },
  },
};

export const cardFromRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_REVEAL },
  },
};

export const directionalCards = [cardFromLeft, cardFromBottom, cardFromRight];

/* ─── Capabilities: grid cascade ─── */
export const gridCard: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_REVEAL },
  },
};

export const gridStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export const gridStaggerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

/* ─── Testimonials: soft scale-in ─── */
export const softScaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.0, ease: [0.4, 0, 0.2, 1] },
  },
};

export const testimonialStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

/* ─── Contacts: split entry ─── */
export const splitFromLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_REVEAL },
  },
};

export const splitFromRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_REVEAL, delay: 0.2 },
  },
};

/* ─── Mission: blur-to-sharp reveal ─── */
export const blurReveal: Variants = {
  hidden: { opacity: 0.3, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: EASE_REVEAL },
  },
};

/* ─── CTA buttons: scale-in ─── */
export const ctaReveal: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_REVEAL },
  },
};

/* ─── AnimatedHeading word cloud ─── */
export const wordCloudWord: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

/* ─── Products: alternate slide ─── */
export const productSlideLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_REVEAL },
  },
};

export const productSlideRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_REVEAL, delay: 0.15 },
  },
};

/* ─── Projects: stagger cards ─── */
export const projectCard: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_REVEAL },
  },
};

/* ─── Legacy alias: used by non-homepage pages ─── */
export const fadeInUp = cardFromBottom;

/* ─── Tab switch (used by subpages) ─── */
export const tabSwitch: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE_UI } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
};

/* ─── Quote form: rise with slight scale ─── */
export const formReveal: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: EASE_REVEAL },
  },
};
