'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedHeading from '@/components/ui/AnimatedHeading';
import { fadeInUp, tabSwitch, staggerContainer } from '@/lib/animations';
import { STATS_TABS } from '@/lib/constants';

const TAB_ICONS = ['⚙️', '🚛', '🔧'];

export default function StatsBento() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="services" className="bg-surface-muted py-28 lg:py-36">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <AnimatedHeading
          row1={['Powering', "Cyprus's", 'largest']}
          row2={['construction', 'projects']}
          accentWords={["Cyprus's", 'construction']}
        />

        {/* Tabs — donor style: pill with icon + text */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12 flex flex-wrap justify-center gap-3"
        >
          {STATS_TABS.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all ${
                i === activeTab
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-primary-400 hover:bg-primary-50'
              }`}
            >
              <span>{TAB_ICONS[i]}</span>
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Bento Grid — donor uses COLORED cards with huge numbers */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabSwitch}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {/* Large photo+stat card — spans 2 cols */}
              <motion.div
                variants={fadeInUp}
                className="relative flex flex-col justify-between overflow-hidden rounded-[24px] bg-accent p-8 text-white md:col-span-2 md:row-span-2"
                style={{ minHeight: 360 }}
              >
                <div>
                  <span className="font-display text-[clamp(60px,8vw,120px)] leading-none font-bold">
                    {STATS_TABS[activeTab].stats[0].value}
                  </span>
                </div>
                <p className="mt-4 text-sm text-white/70">
                  {STATS_TABS[activeTab].stats[0].label}
                </p>
              </motion.div>

              {/* Right column — gradient card with stacked stats */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-col justify-between rounded-[24px] p-8 md:col-span-2 md:row-span-2"
                style={{
                  background: 'linear-gradient(135deg, #171717 0%, #F56300 100%)',
                  minHeight: 360,
                }}
              >
                {STATS_TABS[activeTab].stats.slice(1).map((stat) => (
                  <div key={stat.label} className="mb-6 last:mb-0">
                    <span className="font-display text-5xl font-bold text-white lg:text-6xl">
                      {stat.value}
                    </span>
                    <p className="mt-1 text-sm text-white/60">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Bottom row — 3 stat cards with donor colors */}
            <motion.div
              className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {[
                { bg: 'bg-primary-50', text: 'text-primary', value: '24/7', label: 'Support Available' },
                { bg: 'bg-accent-50', text: 'text-accent-dark', value: '2h', label: 'Avg. Mobilization' },
                { bg: 'bg-primary', text: 'text-white', value: '50+', label: 'Projects Completed' },
              ].map((card) => (
                <motion.div
                  key={card.label}
                  variants={fadeInUp}
                  className={`flex flex-col justify-between rounded-[24px] ${card.bg} p-8`}
                  style={{ minHeight: 200 }}
                >
                  <span className={`font-display text-5xl font-bold lg:text-7xl ${card.text}`}>
                    {card.value}
                  </span>
                  <p className={`mt-4 text-sm ${card.text} opacity-60`}>{card.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
