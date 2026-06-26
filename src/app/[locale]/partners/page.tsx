import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { routing } from '@/i18n/routing';
import { PartnerBenefits } from '@/components/sections/partner-benefits';
import { OnboardingFlow } from '@/components/sections/onboarding-flow';

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
    title: t('partners.title'),
    description: t('partners.description'),
    alternates: {
      languages: {
        en: '/en/partners',
        es: '/es/socios',
      },
    },
  };
}

export default async function PartnersPage() {
  return (
    <>
      <PartnerBenefits />
      <OnboardingFlow />
    </>
  );
}
