import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

export default createMiddleware({
  ...routing,
  localeDetection: true,
});

// next-intl v4 matcher — catches all paths except static assets and Next.js internals
export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/(en|es)/:path*'],
};
