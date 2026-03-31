import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SERVICES_PRIMARY } from '@/lib/constants';
import ServicePageClient from './ServicePageClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES_PRIMARY.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_PRIMARY.find((s) => s.id === slug);
  if (!service) return {};
  return {
    title: service.seoTitle,
    description: service.seoDescription,
    openGraph: {
      title: service.seoTitle,
      description: service.seoDescription,
      type: 'website',
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES_PRIMARY.find((s) => s.id === slug);
  if (!service) notFound();

  const otherServices = SERVICES_PRIMARY.filter((s) => s.id !== slug);

  return (
    <ServicePageClient
      service={service}
      otherServices={otherServices}
    />
  );
}
