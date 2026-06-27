'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { WhatsAppModal } from '@/components/ui/whatsapp-modal';

type BenefitItem = {
  title: string;
  desc: string;
};

export function PartnerBenefits() {
  const t = useTranslations('partners');
  const items = t.raw('benefits.items') as BenefitItem[];
  const [modalOpen, setModalOpen] = useState(false);

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

        {/* CTA */}
        <div className="mt-12 text-center">
          <h3 className="mb-4 font-heading text-2xl font-bold text-brand-primary">
            {t('cta.heading')}
          </h3>
          <p className="mx-auto mb-6 max-w-xl text-neutral-600">
            {t('cta.subtext')}
          </p>
          <Button size="lg" onClick={() => setModalOpen(true)}>
            {t('cta.button')}
          </Button>
        </div>
      </Container>

      <WhatsAppModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
