import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { ServicesGrid } from '@/components/sections/services-grid';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('services.title'),
    description: t('services.description'),
  };
}

export default function ServicesPage() {
  return <ServicesGrid />;
}
