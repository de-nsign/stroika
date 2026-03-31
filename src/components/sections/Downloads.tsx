'use client';

import { motion } from 'framer-motion';
import { Download, MessageCircle } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { fadeInUp } from '@/lib/animations';
import { SITE } from '@/lib/constants';

/* Donor: green and blue gradient cards with rounded-[24px] */
export default function Downloads() {
  return (
    <SectionWrapper bg="muted">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Orange card — Equipment Catalogue */}
        <motion.div
          variants={fadeInUp}
          className="relative flex h-[280px] flex-col justify-between overflow-hidden rounded-[24px] bg-accent p-8"
        >
          <div>
            <h3 className="font-display mb-2 text-2xl font-semibold text-white">
              Equipment Catalogue
            </h3>
            <p className="text-sm text-white/60">
              Download our complete equipment overview with specifications.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/80">
            <Download className="h-4 w-4" />
            <span>pdf (16 mb)</span>
          </div>
          {/* Decorative shape */}
          <div className="absolute -right-6 -bottom-6 h-32 w-32 rounded-3xl bg-white/10 rotate-12" />
        </motion.div>

        {/* Black card — Brand Style / Quote */}
        <motion.a
          href={`https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          variants={fadeInUp}
          className="relative flex h-[280px] flex-col justify-between overflow-hidden rounded-[24px] bg-primary p-8"
        >
          <div>
            <h3 className="font-display mb-2 text-2xl font-semibold text-white">
              Request a Quote
            </h3>
            <p className="text-sm text-white/60">
              Get a personalized quote for your project via WhatsApp.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/80">
            <MessageCircle className="h-4 w-4" />
            <span>Chat on WhatsApp</span>
          </div>
          {/* Decorative shape */}
          <div className="absolute -right-6 -bottom-6 h-32 w-32 rounded-3xl bg-white/10 rotate-12" />
        </motion.a>
      </div>
    </SectionWrapper>
  );
}
