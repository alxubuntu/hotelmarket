'use client';

import { Card } from '@/components/ui/card';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

type Metrics = {
  before: { occupancy: string; revenue: string };
  after: { occupancy: string; revenue: string };
};

type CaseStudyCardProps = {
  hotel: string;
  location: string;
  quote: string;
  name: string;
  role: string;
  metrics: Metrics;
  results: string;
};

export function CaseStudyCard({
  hotel,
  location,
  quote,
  name,
  role,
  metrics,
  results,
}: CaseStudyCardProps) {
  return (
    <ScrollReveal>
      <Card padding="lg" className="flex h-full flex-col">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-brand-primary">{hotel}</h3>
          <p className="text-sm text-neutral-500">{location}</p>
        </div>

        {/* Metrics */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-red-50 p-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-red-600">Before</p>
            <p className="mt-1 text-2xl font-bold text-red-700">{metrics.before.occupancy}</p>
            <p className="text-sm text-red-600">{metrics.before.revenue}</p>
          </div>
          <div className="rounded-lg bg-green-50 p-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-green-600">After</p>
            <p className="mt-1 text-2xl font-bold text-green-700">{metrics.after.occupancy}</p>
            <p className="text-sm text-green-600">{metrics.after.revenue}</p>
          </div>
        </div>

        {/* Quote */}
        <blockquote className="mb-4 flex-1 border-l-4 border-brand-secondary pl-4 italic text-neutral-600">
          &ldquo;{quote}&rdquo;
        </blockquote>

        {/* Attribution */}
        <footer className="mb-4 border-t border-neutral-100 pt-4">
          <span className="block text-sm font-semibold text-brand-primary">{name}</span>
          <span className="block text-sm text-neutral-500">{role}</span>
        </footer>

        {/* Results */}
        <p className="text-sm leading-relaxed text-neutral-600">{results}</p>
      </Card>
    </ScrollReveal>
  );
}
