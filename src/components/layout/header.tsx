import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { NavLink } from './nav-link';
import { LanguageSwitcher } from './language-switcher';
import { MobileNav } from './mobile-nav';

export async function Header() {
  const t = await getTranslations('nav');

  const links = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/services', label: t('services') },
    { href: '/contact', label: t('contact') },
  ];

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

        {/* Right side: language switcher + mobile hamburger */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <MobileNav links={links} />
        </div>
      </Container>
    </header>
  );
}
