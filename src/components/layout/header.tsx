import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { NavLink } from './nav-link';
import { LanguageSwitcher } from './language-switcher';

export async function Header() {
  const t = await getTranslations('nav');

  return (
    <header className="sticky top-0 z-50 bg-brand-primary shadow-sm">
      <Container as="div" className="flex items-center justify-between py-4">
        {/* Logo placeholder */}
        <NavLink href="/" className="text-lg font-bold tracking-tight text-white">
          Hotel Market Pro
        </NavLink>

        {/* Navigation links */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          <NavLink href="/">{t('home')}</NavLink>
          <NavLink href="/about">{t('about')}</NavLink>
          <NavLink href="/services">{t('services')}</NavLink>
          <NavLink href="/contact">{t('contact')}</NavLink>
        </nav>

        {/* Language switcher */}
        <LanguageSwitcher />
      </Container>
    </header>
  );
}
