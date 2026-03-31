'use client';

import { Suspense, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { PackageOpen } from 'lucide-react';
import InnerHero from '@/components/layout/InnerHero';
import FilterBar from '@/components/ui/FilterBar';
import EquipmentCard from '@/components/ui/EquipmentCard';
import { staggerContainer } from '@/lib/animations';
import {
  FLEET,
  type WeightClass,
  type EquipmentType,
} from '@/lib/constants';

function FleetContent() {
  const searchParams = useSearchParams();
  const initialClass = (searchParams.get('class') as WeightClass) || 'all';

  const [activeClass, setActiveClass] = useState<WeightClass | 'all'>(initialClass);
  const [activeType, setActiveType] = useState<EquipmentType | 'all'>('all');

  const filtered = useMemo(() => {
    return FLEET.filter((item) => {
      if (activeClass !== 'all' && item.weightClass !== activeClass) return false;
      if (activeType !== 'all' && item.type !== activeType) return false;
      return true;
    });
  }, [activeClass, activeType]);

  return (
    <>
      <FilterBar
        activeClass={activeClass}
        activeType={activeType}
        onClassChange={setActiveClass}
        onTypeChange={setActiveType}
      />

      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center py-20 text-center"
        >
          <PackageOpen className="mb-4 h-16 w-16 text-primary-500" />
          <h3 className="font-display mb-2 text-xl font-light text-primary">
            No equipment found
          </h3>
          <p className="text-sm text-primary-500">
            Try adjusting your filters to see available machines.
          </p>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          key={`${activeClass}-${activeType}`}
        >
          {filtered.map((item) => (
            <EquipmentCard key={item.id} item={item} />
          ))}
        </motion.div>
      )}

      <p className="mt-8 text-center text-sm text-primary-500">
        Showing {filtered.length} of {FLEET.length} machines
      </p>
    </>
  );
}

export default function FleetPage() {
  return (
    <main>
      <InnerHero
        title="Our Equipment"
        subtitle="27+ machines from world-class brands — modern, maintained, and ready to deploy across Cyprus."
        breadcrumb="Equipment"
        image="/images/fleet/hf_20260330_071733_cff68166-e762-4167-8917-e35197661f72.webp"
      />

      <section className="bg-white py-12 lg:py-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <Suspense fallback={<div className="py-20 text-center text-primary-500">Loading equipment...</div>}>
            <FleetContent />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
