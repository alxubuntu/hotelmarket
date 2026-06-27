'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { AudienceToggle } from '@/components/layout/audience-toggle';
import { useAudience } from '@/contexts/audience-context';

export function DualAudienceHero() {
  const t = useTranslations('home.hero');
  const navT = useTranslations('nav');
  const { audience, setAudience } = useAudience();

  const isBuyer = audience === 'buyers';

  const heading = isBuyer ? t('buyerHeading') : t('partnerHeading');
  const subheading = isBuyer ? t('buyerSubheading') : t('partnerSubheading');
  const ctaLabel = isBuyer ? t('buyerCta') : t('partnerCta');
  const ctaHref = isBuyer ? '#hotels' : '#partners';

  const secondaryLabel = isBuyer
    ? navT('partnersLabel')
    : navT('buyers');
  const secondaryPrompt = isBuyer
    ? '¿Te interesa ser'
    : '¿Buscas para tu empresa?';

  return (
    <section className="relative bg-gradient-to-br from-brand-primary to-[#0f2640] py-16 text-white md:py-28">
      <Container className="text-center">
        {/* Audience toggle with more breathing room */}
        <div className="mb-10 flex justify-center">
          <AudienceToggle />
        </div>

        {/* Heading — changes with audience */}
        <h1 className="mx-auto max-w-4xl font-heading text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          {heading}
        </h1>

        {/* Subheading */}
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
          {subheading}
        </p>

        {/* Primary CTA */}
        <div className="mt-8">
          <a
            href={ctaHref}
            className="inline-flex w-full items-center justify-center rounded-xl bg-brand-secondary px-10 py-4 text-base font-semibold text-black transition-colors hover:bg-brand-secondary-light md:w-auto"
          >
            {ctaLabel}
          </a>
        </div>

        {/* Secondary audience prompt */}
        <button
          onClick={() => setAudience(isBuyer ? 'partners' : 'buyers')}
          className="mt-4 inline-flex items-center gap-1 text-sm text-white/50 transition-colors hover:text-white/80"
        >
          <span>{secondaryPrompt}</span>
          <span className="font-medium underline underline-offset-2">
            {secondaryLabel}
          </span>
          <span aria-hidden="true">→</span>
        </button>

        {/* Stat badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-sm md:gap-8 md:text-base">
          <span className="rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-sm">
            {t('statHotels')}
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-brand-secondary sm:inline-block" aria-hidden="true" />
          <span className="rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-sm">
            {t('statCountries')}
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-brand-secondary sm:inline-block" aria-hidden="true" />
          <span className="rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-sm">
            {t('statRetention')}
          </span>
        </div>
      </Container>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 motion-safe:animate-bounce" aria-hidden="true">
        <a
          href="#features"
          aria-label="Learn more"
          className="flex text-white/50 hover:text-white/80 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </a>
      </div>
    </section>
  );
}
