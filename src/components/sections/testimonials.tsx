import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import type { Locale } from '@/i18n/routing';

type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
};

export async function Testimonials({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'home.testimonials' });
  const items = t.raw('items') as TestimonialItem[];

  return (
    <section
      className="bg-neutral-background py-16 md:py-24"
      aria-labelledby="testimonials-heading"
    >
      <Container>
        <h2
          id="testimonials-heading"
          className="mb-14 text-center font-heading text-3xl font-bold text-brand-primary md:text-4xl"
        >
          {t('heading')}
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((item, i) => (
            <ScrollReveal key={i}>
              <blockquote className="flex h-full flex-col rounded-xl border border-neutral-200 bg-white p-8 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-default">
                <div className="mb-1 text-brand-secondary" aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-8 w-8 opacity-40"
                  >
                    <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                  </svg>
                </div>
                <p className="mb-6 flex-1 text-base leading-relaxed italic text-neutral-700">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <footer className="border-t border-neutral-100 pt-4">
                  <span className="block text-sm font-semibold text-brand-primary">
                    {item.name}
                  </span>
                  <span className="block text-sm text-neutral-500">
                    {item.role}
                  </span>
                </footer>
              </blockquote>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
