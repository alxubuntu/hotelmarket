import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { routing } from '@/i18n/routing';
import { Container } from '@/components/ui/container';
import { CaseStudyCard } from '@/components/sections/case-study-card';
import { Button } from '@/components/ui/button';

type CaseStudyItem = {
  hotel: string;
  location: string;
  quote: string;
  name: string;
  role: string;
  metrics: {
    before: { occupancy: string; revenue: string };
    after: { occupancy: string; revenue: string };
  };
  results: string;
};

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('caseStudies.title'),
    description: t('caseStudies.description'),
    alternates: {
      languages: {
        en: '/en/case-studies',
        es: '/es/casos-de-exito',
      },
    },
  };
}

export default async function CaseStudiesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'caseStudies' });
  const items = t.raw('items') as CaseStudyItem[];

  return (
    <section className="bg-neutral-background py-16 md:py-24">
      <Container>
        <h1 className="mb-4 text-center font-heading text-3xl font-bold text-brand-primary md:text-4xl">
          {t('heading')}
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-center text-neutral-600">
          {t('subheading')}
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {items.map((item, index) => (
            <CaseStudyCard
              key={index}
              hotel={item.hotel}
              location={item.location}
              quote={item.quote}
              name={item.name}
              role={item.role}
              metrics={item.metrics}
              results={item.results}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <h2 className="mb-4 font-heading text-2xl font-bold text-brand-primary">
            {t('cta.heading')}
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-neutral-600">
            {t('cta.subtext')}
          </p>
          <Button size="lg">
            {t('cta.button')}
          </Button>
        </div>
      </Container>
    </section>
  );
}
