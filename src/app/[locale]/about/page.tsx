import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { Container } from '@/components/ui/container';

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

  return (
    <section className="bg-neutral-background py-16 md:py-24">
      <Container className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-4xl font-bold text-brand-primary">
          {t('heading')}
        </h1>
        <p className="text-lg leading-relaxed text-neutral-600">{t('body')}</p>
      </Container>
    </section>
  );
}
