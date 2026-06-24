import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

export default createMiddleware({
  ...routing,
  localeDetection: true,
});

// next-intl v4 matcher — root + all paths except static assets and Next.js internals
export const config = {
  matcher: [
    '/',
    '/(en|es)',
    '/(en|es)/:path*',
    '/about',
    '/services',
    '/contact',
  ],
};
