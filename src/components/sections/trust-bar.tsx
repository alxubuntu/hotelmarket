import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import type { Locale } from '@/i18n/routing';

type Metric = {
  value: string;
  label: string;
};

const icons = [
  // Buildings — hotel count
  <svg
    key="buildings"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-8 w-8"
    aria-hidden="true"
  >
    <path d="M3 21h18" />
    <path d="M5 21V7l8-4v18" />
    <path d="M13 7v2" />
    <path d="M13 11v2" />
    <path d="M13 15v2" />
    <path d="M13 19v2" />
  </svg>,

  // Globe — countries
  <svg
    key="globe"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-8 w-8"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>,

  // Star — retention
  <svg
    key="star"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-8 w-8"
    aria-hidden="true"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>,

  // Shield — support
  <svg
    key="shield"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-8 w-8"
    aria-hidden="true"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>,
];

export async function TrustBar({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'home.trust' });
  const metrics = t.raw('metrics') as Metric[];

  return (
    <section className="bg-white py-16 md:py-24" aria-labelledby="trust-heading">
      <Container>
        <h2
          id="trust-heading"
          className="mb-14 text-center font-heading text-3xl font-bold text-brand-primary md:text-4xl"
        >
          {t('heading')}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <ScrollReveal key={metric.label}>
              <div className="group flex flex-col items-center rounded-xl border border-neutral-100 bg-neutral-50 p-8 text-center transition-all duration-200 hover:-translate-y-1 hover:border-brand-secondary/30 hover:shadow-md cursor-default">
                <div className="mb-4 text-brand-secondary" aria-hidden="true">
                  {icons[i]}
                </div>
                <span className="mb-1 font-heading text-4xl font-bold text-brand-secondary md:text-5xl">
                  {metric.value}
                </span>
                <span className="text-sm font-medium uppercase tracking-wide text-neutral-600">
                  {metric.label}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
