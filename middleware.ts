import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

export default createMiddleware(routing);

// next-intl v4 matcher — root + all paths except static assets and Next.js internals
export const config = {
  // Match all routes except static assets and Next.js internals (next-intl v4 recommended matcher)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
