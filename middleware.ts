import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/i18n/routing';

export default createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true,
  localePrefix: 'always',
});

// next-intl v4 matcher — explicit locale list for Vercel edge runtime
export const config = {
  matcher: ['/', '/(en|es)/:path*'],
};
