'use client';

import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import InnerHero from '@/components/layout/InnerHero';
import QuoteForm from '@/components/ui/QuoteForm';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { SITE } from '@/lib/constants';

export default function ContactsPage() {
  return (
    <main>
      <InnerHero
        title="Get in Touch"
        subtitle="Our team is ready to help you find the right equipment and services for your project."
        breadcrumb="Contacts"
        image="/images/contacts/hero.webp"
      />

      {/* Contact grid */}
      <section className="bg-white py-20 lg:py-28">
        <motion.div
          className="mx-auto max-w-[1440px] px-6 lg:px-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >


          <motion.h2
            variants={fadeInUp}
            className="font-display mb-16 text-center text-3xl font-light text-primary md:text-5xl"
          >
            Contact Information
          </motion.h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Head Office */}
            <motion.div
              variants={fadeInUp}
              className="rounded-[24px] bg-surface-muted p-8"
            >
              <h3 className="font-display mb-6 text-lg font-light text-primary">
                Head Office
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-sm text-primary-600">{SITE.address}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <a
                    href={`tel:${SITE.phone.replace(/\s/g, '')}`}
                    className="text-sm text-primary-600 transition-colors hover:text-primary"
                  >
                    {SITE.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-sm text-primary-600 transition-colors hover:text-primary"
                  >
                    {SITE.email}
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Operations */}
            <motion.div
              variants={fadeInUp}
              className="rounded-[24px] bg-surface-muted p-8"
            >
              <h3 className="font-display mb-6 text-lg font-light text-primary">
                Operations
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <p className="text-xs font-semibold tracking-wider text-primary-500 uppercase">
                      WhatsApp
                    </p>
                    <a
                      href={SITE.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary-600 transition-colors hover:text-primary"
                    >
                      {SITE.whatsapp}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <p className="text-xs font-semibold tracking-wider text-primary-500 uppercase">
                      Working Hours
                    </p>
                    <span className="text-sm text-primary-600">{SITE.hours}</span>
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* Quick Connect */}
            <motion.div
              variants={fadeInUp}
              className="rounded-[24px] bg-surface-muted p-8"
            >
              <h3 className="font-display mb-6 text-lg font-light text-primary">
                Quick Connect
              </h3>
              <div className="space-y-3">
                <a
                  href={SITE.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                  <ArrowUpRight className="ml-auto h-4 w-4" />
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
                >
                  <Mail className="h-4 w-4" />
                  Send Email
                  <ArrowUpRight className="ml-auto h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Map */}
      <section className="bg-white pb-2">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="relative h-[400px] overflow-hidden rounded-[24px]">
            <iframe
              src="https://maps.google.com/maps?q=28+Anexartisias+Street,+Limassol+3036,+Cyprus&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Stroika office location"
            />
            <div className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-inset ring-black/5" />
          </div>
        </div>
      </section>

      {/* Quote form */}
      <section id="quote" className="bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-[800px] px-6 lg:px-10">
          <QuoteForm />
        </div>
      </section>
    </main>
  );
}
