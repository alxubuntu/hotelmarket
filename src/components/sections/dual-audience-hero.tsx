'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { AudienceToggle } from '@/components/layout/audience-toggle';
import { useAudience } from '@/contexts/audience-context';
import { WhatsAppModal } from '@/components/ui/whatsapp-modal';

const WHATSAPP_NUMBER = '51901201502';
const WHATSAPP_FALLBACK_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola, estoy interesado en ser socio de Hotel Market Pro.')}`;

export function DualAudienceHero() {
  const t = useTranslations('home.hero');
  const navT = useTranslations('nav');
  const { audience, setAudience } = useAudience();

  const isBuyer = audience === 'buyers';

  const heading = isBuyer ? t('buyerHeading') : t('partnerHeading');
  const subheading = isBuyer ? t('buyerSubheading') : t('partnerSubheading');
  const ctaLabel = isBuyer ? t('buyerCta') : t('partnerCta');
  const ctaHref = isBuyer ? '#hotels' : WHATSAPP_FALLBACK_URL;

  const secondaryLabel = isBuyer
    ? navT('partnersLabel')
    : navT('buyers');
  const secondaryPrompt = isBuyer
    ? '¿Te interesa ser'
    : '¿Buscas para tu empresa?';

  const [modalOpen, setModalOpen] = useState(false);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  const openModal = useCallback(() => setModalOpen(true), []);

  // Native listener for instant tap on partner CTA
  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;

    const handler = (e: Event) => {
      // Only intercept when in partner mode
      if (!isBuyer) {
        e.preventDefault();
        e.stopPropagation();
        openModal();
      }
      // When isBuyer, let the default anchor scroll happen
    };

    el.addEventListener('click', handler, { capture: true });
    el.addEventListener('touchend', handler, { capture: true });

    return () => {
      el.removeEventListener('click', handler, { capture: true });
      el.removeEventListener('touchend', handler, { capture: true });
    };
  }, [isBuyer, openModal]);

  return (
    <section className="relative bg-gradient-to-br from-brand-primary to-[#0f2640] py-16 text-white md:py-28">
      <Container className="text-center">
        {/* Audience toggle */}
        <div className="mb-10 flex justify-center">
          <AudienceToggle />
        </div>

        {/* Heading */}
        <h1 className="mx-auto max-w-4xl font-heading text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          {heading}
        </h1>

        {/* Subheading */}
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
          {subheading}
        </p>

        {/* Primary CTA — partners opens modal, buyers scrolls to #hotels */}
        <div className="mt-8">
          <a
            ref={ctaRef}
            href={ctaHref}
            target={!isBuyer ? '_blank' : undefined}
            rel={!isBuyer ? 'noopener noreferrer' : undefined}
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

      <WhatsAppModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
