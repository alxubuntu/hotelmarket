import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';

type ValueItem = {
  title: string;
  desc: string;
};

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('about.title'),
    description: t('about.description'),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  const values = t.raw('values.items') as ValueItem[];

  return (
    <section className="bg-neutral-background py-16 md:py-24">
      <Container className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold text-brand-primary">
          {t('heading')}
        </h1>
        <p className="mb-12 text-lg leading-relaxed text-neutral-600">{t('body')}</p>

        {/* Mission */}
        <div className="mb-16">
          <h2 className="mb-4 text-2xl font-bold text-brand-primary">
            {t('mission.heading')}
          </h2>
          <p className="text-lg leading-relaxed text-neutral-600">{t('mission.body')}</p>
        </div>

        {/* Values */}
        <div>
          <h2 className="mb-8 text-2xl font-bold text-brand-primary">
            {t('values.heading')}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {values.map((item, index) => (
              <Card key={index} padding="lg" className="flex flex-col">
                <h3 className="mb-3 text-xl font-semibold text-brand-primary">
                  {item.title}
                </h3>
                <p className="leading-relaxed text-neutral-600">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
