'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export function DualAudienceHero() {
  const t = useTranslations('home.hero');

  return (
    <section className="relative bg-gradient-to-br from-brand-primary to-[#0f2640] py-20 text-white md:py-36">
      <Container className="text-center">
        {/* Heading */}
        <h1 className="mx-auto max-w-4xl font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-7xl">
          {t('buyerHeading')}
        </h1>

        {/* Subheading */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
          {t('buyerSubheading')}
        </p>

        {/* Partner heading (shown below buyer for context) */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <ScrollReveal>
            <div className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <h2 className="font-heading text-2xl font-bold">{t('buyerHeading')}</h2>
              <p className="mt-3 text-white/70">{t('buyerSubheading')}</p>
              <a
                href="#hotels"
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-brand-secondary px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-brand-secondary-light md:w-auto"
              >
                {t('buyerCta')}
              </a>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <h2 className="font-heading text-2xl font-bold">{t('partnerHeading')}</h2>
              <p className="mt-3 text-white/70">{t('partnerSubheading')}</p>
              <a
                href="#partners"
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl border-2 border-brand-secondary px-6 py-3 text-sm font-medium text-brand-secondary transition-colors hover:bg-brand-secondary hover:text-black md:w-auto"
              >
                {t('partnerCta')}
              </a>
            </div>
          </ScrollReveal>
        </div>

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
