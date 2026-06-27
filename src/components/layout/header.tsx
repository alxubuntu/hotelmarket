'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { NavLink } from './nav-link';
import { MobileNav } from './mobile-nav';
import { useAudience } from '@/contexts/audience-context';
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
  const { audience } = useAudience();
  const t = useTranslations('nav');

  const links: NavItem[] = (audience === 'buyers' ? buyerLinks : partnerLinks).map((l) => ({
    href: l.href,
    label: t(l.key),
  }));

  return (
    <header className="sticky top-0 z-50 bg-brand-primary shadow-sm">
      <Container as="div" className="flex items-center justify-between py-3">
        {/* Logo */}
        <NavLink href="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Hotel Market Pro"
            className="h-8 w-auto"
          />
        </NavLink>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 md:flex" aria-label={t('mainNav')}>
          {links.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile nav (hamburger) */}
        <MobileNav links={links} />
      </Container>
    </header>
  );
}
