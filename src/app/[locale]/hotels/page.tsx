import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { routing } from '@/i18n/routing';
import { HotelListing } from '@/components/sections/hotel-listing';
import { TrustBar } from '@/components/sections/trust-bar';

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
    title: t('hotels.title'),
    description: t('hotels.description'),
    alternates: {
      languages: {
        en: '/en/hotels',
        es: '/es/hoteles',
      },
    },
  };
}

export default async function HotelsPage({ params }: Props) {
  const { locale } = await params;
  const localeTyped = locale as Locale;

  return (
    <>
      <HotelListing />
      <TrustBar locale={localeTyped} />
    </>
  );
}
