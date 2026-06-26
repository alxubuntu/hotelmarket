import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
  pathnames: {
    '/hotels': {
      en: '/hotels',
      es: '/hoteles',
    },
    '/partners': {
      en: '/partners',
      es: '/socios',
    },
    '/case-studies': {
      en: '/case-studies',
      es: '/casos-de-exito',
    },
  },
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
