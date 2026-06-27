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
        {/* Logo — icon + text like fisiopro.co style */}
        <NavLink href="/" className="flex items-center gap-2">
          <svg
            viewBox="0 0 32 32"
            className="h-7 w-7 text-brand-secondary"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {/* Building / hotel icon */}
            <rect x="4" y="10" width="24" height="18" rx="2" />
            <path d="M4 14h24" />
            <rect x="10" y="18" width="4" height="4" rx="1" />
            <rect x="18" y="18" width="4" height="4" rx="1" />
            <path d="M16 4l-6 6h12l-6-6z" />
          </svg>
          <span className="text-lg font-bold tracking-tight">
            <span className="text-white">Hotel Market </span>
            <span className="text-brand-secondary">Pro</span>
          </span>
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
