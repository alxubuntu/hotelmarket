'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { useTransition } from 'react';

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  function switchLocale(nextLocale: 'en' | 'es') {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  const btnBase =
    'px-2 py-1 text-xs font-medium uppercase tracking-wider rounded transition-colors duration-200';
  const btnActive = 'bg-white/20 text-white';
  const btnInactive = 'text-white/60 hover:text-white hover:bg-white/10';

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Language switcher">
      <button
        onClick={() => switchLocale('en')}
        disabled={isPending || locale === 'en'}
        className={`${btnBase} ${locale === 'en' ? btnActive : btnInactive}`}
        aria-pressed={locale === 'en'}
      >
        EN
      </button>
      <button
        onClick={() => switchLocale('es')}
        disabled={isPending || locale === 'es'}
        className={`${btnBase} ${locale === 'es' ? btnActive : btnInactive}`}
        aria-pressed={locale === 'es'}
      >
        ES
      </button>
    </div>
  );
}
