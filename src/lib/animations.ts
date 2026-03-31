import { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export const wordCloudWord: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const scaleOnHover = {
  whileHover: { scale: 1.02 },
  transition: { type: 'spring', stiffness: 300 },
};

export const parallaxBg = {
  initial: { scale: 1.1 },
  animate: { scale: 1 },
  transition: { duration: 1.2, ease: 'easeOut' },
};

export const sliderSnap = {
  drag: 'x' as const,
  dragConstraints: { left: -1000, right: 0 },
  dragElastic: 0.1,
};

export const tabSwitch: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
};
