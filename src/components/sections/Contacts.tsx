'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { fadeInUp } from '@/lib/animations';
import { SITE } from '@/lib/constants';

/* Donor contacts: logo icon at top, heading, 3-column grid, clean typography */
export default function Contacts() {
  return (
    <SectionWrapper id="contacts" className="pb-0">

      <motion.h2
        variants={fadeInUp}
        className="font-display mb-14 text-3xl font-light text-primary md:text-5xl"
      >
        Contacts
      </motion.h2>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        {/* Head Office */}
        <motion.div variants={fadeInUp} className="space-y-5">
          <h3 className="text-base font-bold text-primary">Head Office</h3>
          <div className="flex items-start gap-3 text-sm text-primary-600">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" />
            <span>{SITE.address}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-primary-600">
            <Phone className="h-4 w-4 shrink-0 text-primary-500" />
            <a href={`tel:${SITE.phone}`} className="hover:text-primary">
              {SITE.phone}
            </a>
          </div>
          <div className="flex items-center gap-3 text-sm text-primary-600">
            <Mail className="h-4 w-4 shrink-0 text-primary-500" />
            <a href={`mailto:${SITE.email}`} className="hover:text-primary">
              {SITE.email}
            </a>
          </div>
        </motion.div>

        {/* Operations */}
        <motion.div variants={fadeInUp} className="space-y-5">
          <h3 className="text-base font-bold text-primary">Operations</h3>
          <div className="flex items-center gap-3 text-sm text-primary-600">
            <MessageCircle className="h-4 w-4 shrink-0 text-primary-500" />
            <a
              href={`https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              WhatsApp: {SITE.whatsapp}
            </a>
          </div>
          <div className="flex items-center gap-3 text-sm text-primary-600">
            <Clock className="h-4 w-4 shrink-0 text-primary-500" />
            <span>{SITE.hours}</span>
          </div>
        </motion.div>

        {/* Quick Connect */}
        <motion.div variants={fadeInUp} className="space-y-5">
          <h3 className="text-base font-bold text-primary">Quick Connect</h3>
          <a
            href={`https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            <MessageCircle className="h-4 w-4" />
            Chat on WhatsApp
          </a>
          <div className="flex gap-4 pt-2">
            {['Facebook', 'Instagram', 'X'].map((platform) => (
              <span
                key={platform}
                className="cursor-pointer text-sm text-primary-600 transition-colors hover:text-primary"
              >
                {platform}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
