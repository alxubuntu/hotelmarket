'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { LanguageSwitcher } from './language-switcher';
import { NavLink } from './nav-link';
import type { Locale } from '@/i18n/routing';

export function Footer({ locale }: { locale: Locale }) {
  const t = useTranslations('footer');

  return (
    <footer className="border-t border-neutral-200 bg-neutral-900 text-neutral-300">
      <Container as="div" className="py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Buyer Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {t('buyerLinks.heading')}
            </h3>
            <nav className="flex flex-col gap-2" aria-label={t('buyerLinks.heading')}>
              <NavLink href="/hotels" className="text-sm text-neutral-400 hover:text-white">
                {t('buyerLinks.hotels')}
              </NavLink>
              <NavLink href="/services" className="text-sm text-neutral-400 hover:text-white">
                {t('buyerLinks.services')}
              </NavLink>
              <NavLink href="/contact" className="text-sm text-neutral-400 hover:text-white">
                {t('buyerLinks.contact')}
              </NavLink>
            </nav>
          </div>

          {/* Partner Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {t('partnerLinks.heading')}
            </h3>
            <nav className="flex flex-col gap-2" aria-label={t('partnerLinks.heading')}>
              <NavLink href="/partners" className="text-sm text-neutral-400 hover:text-white">
                {t('partnerLinks.partners')}
              </NavLink>
              <NavLink href="/case-studies" className="text-sm text-neutral-400 hover:text-white">
                {t('partnerLinks.caseStudies')}
              </NavLink>
              <NavLink href="/contact" className="text-sm text-neutral-400 hover:text-white">
                {t('partnerLinks.contact')}
              </NavLink>
            </nav>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {t('companyLinks.heading')}
            </h3>
            <nav className="flex flex-col gap-2" aria-label={t('companyLinks.heading')}>
              <NavLink href="/about" className="text-sm text-neutral-400 hover:text-white">
                {t('companyLinks.about')}
              </NavLink>
              <NavLink href="/contact" className="text-sm text-neutral-400 hover:text-white">
                {t('companyLinks.contact')}
              </NavLink>
            </nav>
          </div>

          {/* Language + Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {t('languageSwitcher')}
            </h3>
            <div className="mb-6">
              <LanguageSwitcher />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-neutral-400">{t('privacy')}</span>
              <span className="text-sm text-neutral-400">{t('terms')}</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-neutral-700 pt-6 text-center text-sm text-neutral-500">
          <p>
            &copy; {new Date().getFullYear()} Hotel Market Pro. {t('rights')}
          </p>
        </div>
      </Container>
    </footer>
  );
}
