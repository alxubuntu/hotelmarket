'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import enMessages from '@/messages/en.json';
import esMessages from '@/messages/es.json';

const messages = { en: enMessages, es: esMessages } as const;

export default function NotFound() {
  const pathname = usePathname();
  const locale: 'en' | 'es' = pathname?.startsWith('/es') ? 'es' : 'en';
  const t = messages[locale].notFound;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="mb-4 text-6xl font-bold text-brand-primary">404</h1>
      <h2 className="mb-2 text-2xl font-semibold text-neutral-dark">{t.title}</h2>
      <p className="mb-8 text-center text-neutral-500">{t.description}</p>
      <Link
        href={`/${locale}`}
        className="rounded bg-brand-primary px-6 py-3 text-white transition-colors hover:bg-[var(--color-brand-primary-light)]"
      >
        {t.homeLink}
      </Link>
    </div>
  );
}
