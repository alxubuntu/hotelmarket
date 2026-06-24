import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { Link, getPathname } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';

export async function HeroSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'hero' });

  return (
    <section className="relative bg-gradient-to-br from-brand-primary to-[#0f2640] py-20 text-white md:py-36">
      <Container className="text-center">
        {/* Heading */}
        <h1 className="mx-auto max-w-4xl font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-7xl">
          {t('heading')}
        </h1>

        {/* Subheading */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
          {t('subheading')}
        </p>

        {/* Stat badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm md:gap-8 md:text-base">
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

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={getPathname({ locale, href: '/services' })}
            className="inline-flex items-center justify-center rounded bg-brand-secondary px-8 py-4 text-lg font-semibold text-brand-primary transition-colors hover:bg-brand-secondary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-primary"
          >
            {t('cta')}
          </Link>
          <a
            href="#services"
            className="inline-flex items-center justify-center rounded border-2 border-white/30 px-8 py-4 text-lg font-medium text-white transition-colors duration-200 hover:border-white/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-primary"
          >
            {t('learnMore')}
          </a>
        </div>
      </Container>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 motion-safe:animate-bounce" aria-hidden="true">
        <a
          href="#services"
          aria-label={t('learnMore')}
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
