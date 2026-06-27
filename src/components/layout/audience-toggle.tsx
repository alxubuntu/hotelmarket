'use client';

import { useTranslations } from 'next-intl';
import { useAudience } from '@/contexts/audience-context';

export type Audience = 'buyers' | 'partners';

type AudienceToggleProps = {
  className?: string;
};

export function AudienceToggle({ className = '' }: AudienceToggleProps) {
  const t = useTranslations('nav');
  const { audience, setAudience } = useAudience();

  const base =
    'px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-200';
  const activeStyle = 'bg-brand-secondary text-black shadow-md';
  const inactiveStyle =
    'text-white/90 hover:text-white border border-white/30 hover:border-white/60 hover:bg-white/10';

  return (
    <div
      role="radiogroup"
      aria-label={t('audienceToggle')}
      className={`inline-flex items-center rounded-full border border-white/20 bg-white/5 p-1 ${className}`}
    >
      <button
        role="radio"
        aria-checked={audience === 'buyers'}
        onClick={() => setAudience('buyers')}
        className={`${base} ${audience === 'buyers' ? activeStyle : inactiveStyle}`}
      >
        {t('buyers')}
      </button>
      <button
        role="radio"
        aria-checked={audience === 'partners'}
        onClick={() => setAudience('partners')}
        className={`${base} ${audience === 'partners' ? activeStyle : inactiveStyle}`}
      >
        {t('partnersLabel')}
      </button>
    </div>
  );
}
