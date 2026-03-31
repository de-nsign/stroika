'use client';

import { motion } from 'framer-motion';
import type { WeightClass, EquipmentType } from '@/lib/constants';
import { WEIGHT_CLASS_LABELS, EQUIPMENT_TYPE_LABELS } from '@/lib/constants';

interface FilterBarProps {
  activeClass: WeightClass | 'all';
  activeType: EquipmentType | 'all';
  onClassChange: (cls: WeightClass | 'all') => void;
  onTypeChange: (type: EquipmentType | 'all') => void;
}

/** Segmented control — joined buttons, only outer edges rounded (desktop only) */
function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <>
      {/* Desktop: joined segmented control */}
      <div className="hidden lg:inline-flex overflow-hidden rounded-full border border-primary-100 bg-primary-50">
        {options.map((opt, i) => {
          const isActive = value === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={`relative px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-primary-600 hover:bg-primary-100'
              } ${i !== 0 ? 'border-l border-primary-100' : ''}`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* Mobile: wrap chips */}
      <div className="flex flex-wrap gap-2 lg:hidden">
        {options.map((opt) => {
          const isActive = value === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-white'
                  : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default function FilterBar({
  activeClass,
  activeType,
  onClassChange,
  onTypeChange,
}: FilterBarProps) {
  const classOptions: { value: WeightClass | 'all'; label: string }[] = [
    { value: 'all', label: 'All' },
    ...Object.entries(WEIGHT_CLASS_LABELS).map(([value, label]) => ({
      value: value as WeightClass,
      label,
    })),
  ];

  const typeOptions: { value: EquipmentType | 'all'; label: string }[] = [
    { value: 'all', label: 'All Types' },
    ...Object.entries(EQUIPMENT_TYPE_LABELS).map(([value, label]) => ({
      value: value as EquipmentType,
      label,
    })),
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="lg:sticky lg:top-20 lg:z-30 mx-auto mb-10 w-fit max-w-full rounded-[24px] bg-white p-4 shadow-sm lg:p-5"
    >
      <div className="flex flex-col gap-4 lg:gap-3">
        {/* Row 1 — Class */}
        <div className="flex flex-col gap-1.5 lg:flex-row lg:items-center lg:gap-3">
          <span className="text-xs font-semibold tracking-wider text-primary-500 uppercase lg:w-12 lg:shrink-0">
            Class
          </span>
          <SegmentedControl
            options={classOptions}
            value={activeClass}
            onChange={onClassChange}
          />
        </div>

        {/* Row 2 — Type */}
        <div className="flex flex-col gap-1.5 lg:flex-row lg:items-center lg:gap-3">
          <span className="text-xs font-semibold tracking-wider text-primary-500 uppercase lg:w-12 lg:shrink-0">
            Type
          </span>
          <SegmentedControl
            options={typeOptions}
            value={activeType}
            onChange={onTypeChange}
          />
        </div>
      </div>
    </motion.div>
  );
}
