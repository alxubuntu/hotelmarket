'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

type StepItem = {
  step: string;
  title: string;
  desc: string;
};

export function OnboardingFlow() {
  const t = useTranslations('partners.onboarding');
  const steps = t.raw('steps') as StepItem[];

  return (
    <section className="bg-neutral-background py-16 md:py-24">
      <Container>
        <h2 className="mb-12 text-center font-heading text-3xl font-bold text-brand-primary md:text-4xl">
          {t('heading')}
        </h2>
        <div className="relative mx-auto max-w-3xl">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 h-full w-0.5 bg-brand-secondary/30 md:left-1/2 md:-translate-x-1/2" aria-hidden="true" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <ScrollReveal key={index}>
                <div className={`relative flex items-start gap-6 md:gap-0 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  {/* Step number circle */}
                  <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-brand-secondary bg-white text-2xl font-bold text-brand-secondary shadow-md">
                    {step.step}
                  </div>

                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:ml-8' : 'md:mr-8 md:text-right'}`}>
                    <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
                      <h3 className="mb-2 text-xl font-semibold text-brand-primary">
                        {step.title}
                      </h3>
                      <p className="leading-relaxed text-neutral-600">{step.desc}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
