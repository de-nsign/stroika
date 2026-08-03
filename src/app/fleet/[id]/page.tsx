import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { FLEET, SITE } from '@/lib/constants';
import EquipmentPageClient from './EquipmentPageClient';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return FLEET.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = FLEET.find((e) => e.id === id);
  if (!item) return {};
  return {
    title: `${item.name} — Rent in Dubai | ${SITE.name}`,
    description: `Rent ${item.name} (${[item.brand, item.weight].filter(Boolean).join(', ')}) in Dubai. ${item.specs || ''} Professional equipment rental with certified operators.`,
    openGraph: {
      title: `${item.name} — ${SITE.name}`,
      description: `Rent ${item.name} in Dubai. ${item.specs || ''}`,
      type: 'website',
    },
  };
}

export default async function EquipmentPage({ params }: Props) {
  const { id } = await params;
  const item = FLEET.find((e) => e.id === id);
  if (!item) notFound();

  const otherEquipment = FLEET.filter(
    (e) => e.id !== id && e.type === item.type
  ).slice(0, 6);

  const fallbackEquipment =
    otherEquipment.length < 3
      ? FLEET.filter((e) => e.id !== id && !otherEquipment.includes(e)).slice(
          0,
          6 - otherEquipment.length
        )
      : [];

  return (
    <EquipmentPageClient
      item={item}
      otherEquipment={[...otherEquipment, ...fallbackEquipment]}
    />
  );
}
