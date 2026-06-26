'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { NavLink } from './nav-link';
import { LanguageSwitcher } from './language-switcher';
import { MobileNav } from './mobile-nav';
import { AudienceToggle, type Audience } from './audience-toggle';
import type { Locale } from '@/i18n/routing';

type NavItem = {
  href: string;
  label: string;
};

const buyerLinks: { href: string; key: string }[] = [
  { href: '/', key: 'home' },
  { href: '/hotels', key: 'hotels' },
  { href: '/services', key: 'services' },
  { href: '/about', key: 'about' },
  { href: '/contact', key: 'contact' },
];

const partnerLinks: { href: string; key: string }[] = [
  { href: '/', key: 'home' },
  { href: '/partners', key: 'partners' },
  { href: '/case-studies', key: 'caseStudies' },
  { href: '/about', key: 'about' },
  { href: '/contact', key: 'contact' },
];

export function Header({ locale }: { locale: Locale }) {
  const [audience, setAudience] = useState<Audience>('buyers');
  const t = useTranslations({ locale, namespace: 'nav' });

  const links: NavItem[] = (audience === 'buyers' ? buyerLinks : partnerLinks).map((l) => ({
    href: l.href,
    label: t(l.key),
  }));

  const handleAudienceChange = useCallback((a: Audience) => {
    setAudience(a);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-brand-primary shadow-sm">
      <Container as="div" className="flex items-center justify-between py-4">
        {/* Logo */}
        <NavLink href="/" className="text-lg font-bold tracking-tight text-white">
          Hotel Market Pro
        </NavLink>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 md:flex" aria-label={t('mainNav')}>
          {links.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right side: audience toggle + language switcher + mobile hamburger */}
        <div className="flex items-center gap-3">
          <AudienceToggle onChange={handleAudienceChange} />
          <LanguageSwitcher />
          <MobileNav links={links} />
        </div>
      </Container>
    </header>
  );
}
