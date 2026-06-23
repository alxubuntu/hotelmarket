'use client';

import { Link, usePathname } from '@/i18n/routing';
import type { ComponentProps, ReactNode } from 'react';

type NavLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<typeof Link>, 'href' | 'children' | 'className'>;

export function NavLink({ href, children, className = '', ...rest }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const baseClasses =
    'text-sm font-medium transition-colors duration-200';
  const activeClasses = 'text-brand-secondary';
  const inactiveClasses = 'text-white/80 hover:text-white';

  return (
    <Link
      href={href}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Link>
  );
}
