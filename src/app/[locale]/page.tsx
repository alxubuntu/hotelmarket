import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { DualAudienceHero } from '@/components/sections/dual-audience-hero';
import { PlatformFeatures } from '@/components/sections/platform-features';
import { TrustBar } from '@/components/sections/trust-bar';
import { Testimonials } from '@/components/sections/testimonials';
import { ContactCta } from '@/components/sections/contact-cta';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('home.title'),
    description: t('home.description'),
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const localeTyped = locale as Locale;

  return (
    <>
      <DualAudienceHero />
      <PlatformFeatures locale={localeTyped} />
      <TrustBar locale={localeTyped} />
      <Testimonials locale={localeTyped} />
      <ContactCta locale={localeTyped} />
    </>
  );
}
