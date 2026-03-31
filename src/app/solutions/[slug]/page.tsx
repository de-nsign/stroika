import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SOLUTIONS, EXCAVATION_PROCESS } from '@/lib/constants';
import SolutionPageClient from './SolutionPageClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = SOLUTIONS.find((s) => s.id === slug);
  if (!solution) return {};
  return {
    title: solution.seoTitle,
    description: solution.seoDescription,
    openGraph: {
      title: solution.seoTitle,
      description: solution.seoDescription,
      type: 'website',
    },
  };
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const solution = SOLUTIONS.find((s) => s.id === slug);
  if (!solution) notFound();

  const otherSolutions = SOLUTIONS.filter((s) => s.id !== slug);

  return (
    <SolutionPageClient
      solution={solution}
      otherSolutions={otherSolutions}
      excavationProcess={solution.id === 'excavation' ? EXCAVATION_PROCESS : undefined}
    />
  );
}
