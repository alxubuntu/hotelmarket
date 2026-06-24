import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { ContactForm } from '@/components/sections/contact-form';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import type { Locale } from '@/i18n/routing';

export async function ContactCta({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'home.contactCta' });

  return (
    <section
      className="bg-gradient-to-br from-brand-primary to-[#0f2640] py-16 md:py-24"
      aria-labelledby="contact-cta-heading"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <ScrollReveal>
            <div className="text-white">
              <h2
                id="contact-cta-heading"
                className="font-heading text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
              >
                {t('heading')}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-white/80">
                {t('subtext')}
              </p>
            </div>
          </ScrollReveal>
          <div className="rounded-xl bg-white p-6 shadow-lg md:p-8">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
