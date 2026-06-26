'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export type Audience = 'buyers' | 'partners';

type AudienceToggleProps = {
  onChange?: (audience: Audience) => void;
  className?: string;
};

export function AudienceToggle({ onChange, className = '' }: AudienceToggleProps) {
  const t = useTranslations('nav');
  const [active, setActive] = useState<Audience>('buyers');

  function handleSelect(audience: Audience) {
    setActive(audience);
    onChange?.(audience);
  }

  const base =
    'px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-200';
  const activeStyle = 'bg-brand-secondary text-brand-primary shadow-sm';
  const inactiveStyle = 'text-white/70 hover:text-white hover:bg-white/10';

  return (
    <div
      role="radiogroup"
      aria-label={t('audienceToggle')}
      className={`inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/5 p-1 ${className}`}
    >
      <button
        role="radio"
        aria-checked={active === 'buyers'}
        onClick={() => handleSelect('buyers')}
        className={`${base} ${active === 'buyers' ? activeStyle : inactiveStyle}`}
      >
        {t('buyers')}
      </button>
      <button
        role="radio"
        aria-checked={active === 'partners'}
        onClick={() => handleSelect('partners')}
        className={`${base} ${active === 'partners' ? activeStyle : inactiveStyle}`}
      >
        {t('partnersLabel')}
      </button>
    </div>
  );
}
