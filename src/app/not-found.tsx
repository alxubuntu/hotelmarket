'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NotFound() {
  const pathname = usePathname();
  const locale = pathname?.startsWith('/es') ? 'es' : 'en';

  const content = {
    en: {
      title: 'Page Not Found',
      description: "Sorry, we couldn't find the page you're looking for.",
      homeLink: 'Back to Home',
    },
    es: {
      title: 'Página no encontrada',
      description: 'Lo sentimos, no pudimos encontrar la página que buscas.',
      homeLink: 'Volver al inicio',
    },
  };

  const t = content[locale];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="mb-4 text-6xl font-bold text-brand-primary">404</h1>
      <h2 className="mb-2 text-2xl font-semibold text-neutral-dark">{t.title}</h2>
      <p className="mb-8 text-center text-neutral-500">{t.description}</p>
      <Link
        href={`/${locale}`}
        className="rounded bg-brand-primary px-6 py-3 text-white transition-colors hover:bg-brand-primary-light"
      >
        {t.homeLink}
      </Link>
    </div>
  );
}
