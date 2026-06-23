'use client';

import { useState, useCallback } from 'react';
import { NavLink } from './nav-link';

type NavItem = {
  href: string;
  label: string;
};

type MobileNavProps = {
  links: NavItem[];
};

function HamburgerIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export function MobileNav({ links }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);

  return (
    <>
      {/* Hamburger button — hidden on md+ */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="ml-2 rounded p-2 text-white transition-colors hover:bg-white/10 md:hidden"
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={isOpen}
      >
        {isOpen ? <CloseIcon /> : <HamburgerIcon />}
      </button>

      {/* Drawer overlay — only on mobile */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={close}
            aria-hidden="true"
          />
          {/* Drawer panel */}
          <div className="fixed inset-y-0 right-0 z-50 w-72 bg-brand-primary shadow-xl md:hidden">
            <div className="flex items-center justify-between px-4 py-4">
              <span className="text-sm font-medium text-white/80">Navegación</span>
              <button
                onClick={close}
                className="rounded p-2 text-white transition-colors hover:bg-white/10"
                aria-label="Cerrar menú"
              >
                <CloseIcon />
              </button>
            </div>
            <nav className="flex flex-col gap-1 px-4" aria-label="Mobile navigation">
              {links.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  className="block rounded px-3 py-3 text-base"
                  onClick={close}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
