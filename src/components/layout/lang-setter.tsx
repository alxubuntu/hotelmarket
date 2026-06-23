'use client';

import { useLocale } from 'next-intl';
import { useEffect } from 'react';

/**
 * Syncs the <html lang="…"> attribute with the active locale.
 * Must be rendered inside NextIntlClientProvider.
 */
export function LangSetter() {
  const locale = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
