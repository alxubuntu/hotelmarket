'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { WhatsAppModal } from '@/components/ui/whatsapp-modal';

const WHATSAPP_NUMBER = '51901201502';
const WHATSAPP_FALLBACK_TEXT = 'Hola, estoy interesado en ser socio de Hotel Market Pro.';
const WHATSAPP_FALLBACK_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_FALLBACK_TEXT)}`;

type BenefitItem = {
  title: string;
  desc: string;
};

export function PartnerBenefits() {
  const t = useTranslations('partners');
  const items = t.raw('benefits.items') as BenefitItem[];
  const [modalOpen, setModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const openModal = useCallback(() => setModalOpen(true), []);

  // Attach native event listener IMMEDIATELY — no React hydration needed
  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    const handler = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      openModal();
    };

    // Use capture phase to fire before any other handler
    btn.addEventListener('click', handler, { capture: true, once: false });
    btn.addEventListener('touchend', handler, { capture: true, once: false });

    return () => {
      btn.removeEventListener('click', handler, { capture: true });
      btn.removeEventListener('touchend', handler, { capture: true });
    };
  }, [openModal]);

  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        <h2 className="mb-12 text-center font-heading text-3xl font-bold text-brand-primary md:text-4xl">
          {t('benefits.heading')}
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item, index) => (
            <ScrollReveal key={index}>
              <Card padding="lg" className="flex h-full flex-col">
                <h3 className="mb-3 text-xl font-semibold text-brand-primary">
                  {item.title}
                </h3>
                <p className="flex-1 leading-relaxed text-neutral-600">{item.desc}</p>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA — button with native event listener for instant tap response */}
        <div className="mt-12 text-center">
          <h3 className="mb-4 font-heading text-2xl font-bold text-brand-primary">
            {t('cta.heading')}
          </h3>
          <p className="mx-auto mb-6 max-w-xl text-neutral-600">
            {t('cta.subtext')}
          </p>
          <a
            href={WHATSAPP_FALLBACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex"
          >
            <button
              ref={buttonRef}
              type="button"
              className="inline-flex items-center justify-center rounded bg-brand-primary px-8 py-4 text-lg font-medium text-white transition-colors hover:bg-[var(--color-brand-primary-light)] active:bg-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
            >
              {t('cta.button')}
            </button>
          </a>
        </div>
      </Container>

      <WhatsAppModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
