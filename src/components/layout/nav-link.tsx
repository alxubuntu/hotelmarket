'use client';

import { Link, usePathname } from '@/i18n/routing';
import type { ReactNode } from 'react';

type NavLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export function NavLink({ href, children, className = '', onClick }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const baseClasses =
    'text-sm font-medium transition-colors duration-200';
  const activeClasses = 'text-brand-secondary';
  const inactiveClasses = 'text-white/80 hover:text-white';

  // Cast href to bypass strict pathnames typing — we only use English canonical paths
  const linkHref = href as never;

  return (
    <Link
      href={linkHref}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} ${className}`.trim()}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
