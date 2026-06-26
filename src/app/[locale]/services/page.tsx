import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { PlatformFeatures } from '@/components/sections/platform-features';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('services.title'),
    description: t('services.description'),
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  return <PlatformFeatures locale={locale as Locale} />;
}
