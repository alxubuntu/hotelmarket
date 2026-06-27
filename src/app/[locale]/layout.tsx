import type { ReactNode } from 'react';
import type { Locale } from '@/i18n/routing';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { LangSetter } from '@/components/layout/lang-setter';
import { AudienceProvider } from '@/contexts/audience-context';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: {
      default: t('home.title'),
      template: `%s | Hotel Market Pro`,
    },
    description: t('home.description'),
    metadataBase: new URL('https://hotelmarketpro.com'),
    alternates: {
      languages: {
        en: '/en',
        es: '/es',
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const localeTyped = locale as Locale;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LangSetter />
      <AudienceProvider>
        <div className="flex min-h-screen flex-col">
          <Header locale={localeTyped} />
          <main className="flex-1">{children}</main>
          <Footer locale={localeTyped} />
        </div>
      </AudienceProvider>
    </NextIntlClientProvider>
  );
}
