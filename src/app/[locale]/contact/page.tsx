import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { ContactForm } from '@/components/sections/contact-form';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('contact.title'),
    description: t('contact.description'),
  };
}

export default function ContactPage() {
  return <ContactForm />;
}
