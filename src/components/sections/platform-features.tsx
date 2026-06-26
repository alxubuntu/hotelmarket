import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';
import type { Locale } from '@/i18n/routing';

type FeatureItem = {
  title: string;
  desc: string;
};

export async function PlatformFeatures({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'home.features' });
  const items = t.raw('items') as FeatureItem[];

  return (
    <section id="features" className="bg-white py-16 md:py-24">
      <Container>
        <h2 className="mb-4 text-center font-heading text-3xl font-bold text-brand-primary md:text-4xl">
          {t('heading')}
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-neutral-600">
          {t('subheading')}
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <Card key={index} padding="lg" className="flex flex-col">
              <h3 className="mb-3 text-xl font-semibold text-brand-primary">
                {item.title}
              </h3>
              <p className="leading-relaxed text-neutral-600">{item.desc}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
