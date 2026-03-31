'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';
import { SITE } from '@/lib/constants';

const EQUIPMENT_OPTIONS = [
  'Mini Excavator',
  'Excavator (Medium)',
  'Large Excavator',
  'Backhoe Loader',
  'Wheel Loader',
  'Dozer',
  'Motor Grader',
  'Crane (Mobile)',
  'Crane (Crawler)',
  'Boom Lift',
  'Scissor Lift',
  'Telehandler',
  'Compactor / Roller',
  'Dump Truck',
  'Piling Rig',
  'Multiple Units / Custom',
];

export default function QuoteForm({ defaultEquipment }: { defaultEquipment?: string } = {}) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const equipment = defaultEquipment ?? (formData.get('equipment') as string);
    const location = formData.get('location') as string;
    const message = formData.get('message') as string;

    const waMessage = [
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Equipment: ${equipment}`,
      `Location: ${location}`,
      message ? `Message: ${message}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    window.open(
      `${SITE.whatsappLink}?text=${encodeURIComponent(waMessage)}`,
      '_blank'
    );
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-surface-muted p-8 text-center lg:rounded-[24px] lg:p-12"
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-50">
          <Send className="h-7 w-7 text-accent" />
        </div>
        <h3 className="font-display mb-2 text-2xl font-light text-primary">
          Message Sent!
        </h3>
        <p className="text-primary-500">
          Our team will get back to you shortly via WhatsApp.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm font-medium text-accent hover:underline"
        >
          Send another request
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-surface-muted p-8 lg:rounded-[24px] lg:p-12"
    >
      <h3 className="font-display mb-8 text-2xl font-light text-primary md:text-3xl">
        Request a Quote
      </h3>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-primary-600">
            Name *
          </label>
          <input
            name="name"
            required
            className="w-full rounded-[16px] border border-primary-100 bg-white px-4 py-3 text-sm text-primary outline-none transition-colors focus:border-accent"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-primary-600">
            Phone *
          </label>
          <input
            name="phone"
            type="tel"
            required
            className="w-full rounded-[16px] border border-primary-100 bg-white px-4 py-3 text-sm text-primary outline-none transition-colors focus:border-accent"
            placeholder="+971 ..."
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-primary-600">
            Email
          </label>
          <input
            name="email"
            type="email"
            className="w-full rounded-[16px] border border-primary-100 bg-white px-4 py-3 text-sm text-primary outline-none transition-colors focus:border-accent"
            placeholder="email@company.com"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-primary-600">
            Equipment Needed *
          </label>
          {defaultEquipment ? (
            <input
              readOnly
              value={defaultEquipment}
              className="w-full rounded-[16px] border border-primary-100 bg-white px-4 py-3 text-sm text-primary outline-none"
            />
          ) : (
            <select
              name="equipment"
              required
              className="w-full rounded-[16px] border border-primary-100 bg-white px-4 pr-[calc(1rem+5px)] py-3 text-sm text-primary outline-none transition-colors focus:border-accent"
            >
              <option value="">Select equipment</option>
              {EQUIPMENT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="md:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-primary-600">
            Project Location
          </label>
          <input
            name="location"
            className="w-full rounded-[16px] border border-primary-100 bg-white px-4 py-3 text-sm text-primary outline-none transition-colors focus:border-accent"
            placeholder="e.g. Limassol, Nicosia, Paphos"
          />
        </div>
        <div className="md:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-primary-600">
            Message
          </label>
          <textarea
            name="message"
            rows={4}
            className="w-full resize-none rounded-[16px] border border-primary-100 bg-white px-4 py-3 text-sm text-primary outline-none transition-colors focus:border-accent"
            placeholder="Tell us about your project..."
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
      >
        <Send className="h-4 w-4" />
        Send Request
      </button>
    </motion.form>
  );
}
