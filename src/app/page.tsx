import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import type { Locale } from '@/i18n/routing';
import { locales, defaultLocale } from '@/i18n/routing';

/**
 * Root page — handles locale detection via Accept-Language header.
 * Redirects to /{locale} so the middleware and SSG pages can take over.
 * 
 * The next-intl middleware normally handles this, but on Vercel Edge
 * the root path matcher can be unreliable, so we catch it here.
 */
export default async function RootPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || '';

  const preferred = parseAcceptLanguage(acceptLanguage, locales);
  redirect(`/${preferred}`);
}

/**
 * Parse Accept-Language header and return the best matching locale.
 */
function parseAcceptLanguage(header: string, available: readonly Locale[]): Locale {
  if (!header) return defaultLocale;

  // Parse: "es-AR,es;q=0.9,en;q=0.8" → [{lang: "es", q: 1.0}, {lang: "es", q: 0.9}, {lang: "en", q: 0.8}]
  const parsed = header
    .split(',')
    .map((part) => {
      const [langPart, qPart] = part.trim().split(';');
      const lang = langPart.split('-')[0].toLowerCase();
      const q = qPart ? parseFloat(qPart.split('=')[1] || '1') : 1.0;
      return { lang, q };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of parsed) {
    const match = available.find(
      (locale) => locale === lang,
    );
    if (match) return match;
  }

  return defaultLocale;
}
