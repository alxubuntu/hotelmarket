'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type HotelItem = {
  name: string;
  location: string;
  capacity: number;
  events: boolean;
  packages: boolean;
  features: string[];
};

type FilterState = {
  capacity: 'all' | 'small' | 'medium' | 'large';
  events: 'all' | 'yes';
  packages: 'all' | 'yes';
};

export function HotelListing() {
  const t = useTranslations('hotels');
  const items = t.raw('items') as HotelItem[];
  const [filters, setFilters] = useState<FilterState>({
    capacity: 'all',
    events: 'all',
    packages: 'all',
  });

  const filtered = useMemo(() => {
    return items.filter((hotel) => {
      if (filters.capacity === 'small' && hotel.capacity > 25) return false;
      if (filters.capacity === 'medium' && (hotel.capacity <= 25 || hotel.capacity > 100)) return false;
      if (filters.capacity === 'large' && hotel.capacity <= 100) return false;
      if (filters.events === 'yes' && !hotel.events) return false;
      if (filters.packages === 'yes' && !hotel.packages) return false;
      return true;
    });
  }, [items, filters]);

  function clearFilters() {
    setFilters({ capacity: 'all', events: 'all', packages: 'all' });
  }

  const selectClasses =
    'rounded border border-neutral-300 px-3 py-2 text-sm text-neutral-900 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20';

  return (
    <section className="bg-neutral-background py-16 md:py-24">
      <Container>
        <h2 className="mb-4 text-center font-heading text-3xl font-bold text-brand-primary md:text-4xl">
          {t('heading')}
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-neutral-600">
          {t('subheading')}
        </p>

        {/* Filters */}
        <div className="mb-8 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-700">
            {t('filters.heading')}
          </h3>
          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-500">
                {t('filters.capacity')}
              </label>
              <select
                value={filters.capacity}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, capacity: e.target.value as FilterState['capacity'] }))
                }
                className={selectClasses}
              >
                <option value="all">{t('filters.capacityAll')}</option>
                <option value="small">{t('filters.capacitySmall')}</option>
                <option value="medium">{t('filters.capacityMedium')}</option>
                <option value="large">{t('filters.capacityLarge')}</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-500">
                {t('filters.events')}
              </label>
              <select
                value={filters.events}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, events: e.target.value as FilterState['events'] }))
                }
                className={selectClasses}
              >
                <option value="all">{t('filters.eventsAll')}</option>
                <option value="yes">{t('filters.eventsYes')}</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-500">
                {t('filters.packages')}
              </label>
              <select
                value={filters.packages}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, packages: e.target.value as FilterState['packages'] }))
                }
                className={selectClasses}
              >
                <option value="all">{t('filters.packagesAll')}</option>
                <option value="yes">{t('filters.packagesYes')}</option>
              </select>
            </div>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              {t('filters.clearFilters')}
            </Button>
          </div>
          <p className="mt-4 text-sm text-neutral-500">
            {t('filters.resultsCount', { count: filtered.length })}
          </p>
        </div>

        {/* Hotel Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((hotel, index) => (
            <Card key={index} padding="lg" className="flex flex-col">
              <h3 className="mb-2 text-xl font-semibold text-brand-primary">{hotel.name}</h3>
              <p className="mb-4 text-sm text-neutral-500">{hotel.location}</p>
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-medium text-brand-primary">
                  {hotel.capacity} {t('cards.guests')}
                </span>
                {hotel.events && (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    {t('cards.eventSpace')}
                  </span>
                )}
                {hotel.packages && (
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                    {t('cards.corporatePackages')}
                  </span>
                )}
              </div>
              <ul className="mb-4 flex-1 space-y-1 text-sm text-neutral-600">
                {hotel.features.map((feature, fi) => (
                  <li key={fi}>• {feature}</li>
                ))}
              </ul>
              <Button variant="outline" size="sm" className="w-full">
                {t('cards.viewDetails')}
              </Button>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-8 text-center text-neutral-500">
            No hotels match your filters. Try adjusting your criteria.
          </p>
        )}
      </Container>
    </section>
  );
}
