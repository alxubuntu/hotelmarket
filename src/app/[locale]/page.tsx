import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { HeroSection } from '@/components/sections/hero-section';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('home.title'),
    description: t('home.description'),
  };
}

export default function HomePage() {
  return <HeroSection />;
}
