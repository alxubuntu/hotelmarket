'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { NavLink } from './nav-link';
import { LanguageSwitcher } from './language-switcher';
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
            {/* Modern hotel facade with H sign */}
            <rect x="4" y="6" width="24" height="22" rx="2" />
            {/* H sign */}
            <path d="M12 11v10M20 11v10M12 16h8" strokeWidth="1.8" />
            {/* Windows row 1 */}
            <rect x="8" y="6" width="6" height="5" rx="0.5" />
            <rect x="18" y="6" width="6" height="5" rx="0.5" />
            {/* Door */}
            <rect x="12" y="21" width="8" height="7" rx="1" />
            {/* Floor line */}
            <path d="M4 14h24" strokeOpacity="0.4" />
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

        {/* Right section: language switcher + mobile nav */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <MobileNav links={links} />
        </div>
      </Container>
    </header>
  );
}
