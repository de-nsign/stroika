'use client';

import { useEffect } from 'react';
import {
  FLEET,
  SERVICES_PRIMARY,
  SOLUTIONS,
  KEY_ASSETS,
  PRODUCTS_DUAL,
} from '@/lib/constants';

// Images visible on the landing page (loaded first)
const LANDING_IMAGES: string[] = [
  '/images/main/hero.webp',
  '/images/main/mission.webp',
  ...KEY_ASSETS.cards.map((c) => c.image),
  ...PRODUCTS_DUAL.map((p) => p.image),
];

// All images from other pages (loaded after idle)
const OTHER_PAGE_IMAGES: string[] = [
  // Page heroes
  '/images/fleet/hf_20260330_071733_cff68166-e762-4167-8917-e35197661f72.webp',
  '/images/services/hero.webp',
  '/images/solutions/hero.webp',
  '/images/contacts/hero.webp',
  // Equipment fleet
  ...FLEET.map((e) => e.image),
  // Services
  ...SERVICES_PRIMARY.map((s) => s.image),
  // Solutions
  ...SOLUTIONS.map((s) => s.image),
];

function preloadImages(urls: string[]): void {
  urls.forEach((src) => {
    const img = new window.Image();
    img.src = src;
  });
}

export default function ImagePreloader() {
  useEffect(() => {
    // Phase 1: preload landing images immediately
    preloadImages(LANDING_IMAGES);

    // Phase 2: preload other pages after the browser is idle
    const preloadOthers = () => preloadImages(OTHER_PAGE_IMAGES);

    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(preloadOthers, { timeout: 3000 });
    } else {
      setTimeout(preloadOthers, 1500);
    }
  }, []);

  return null;
}
