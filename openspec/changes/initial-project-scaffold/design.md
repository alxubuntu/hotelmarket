# Design: Initial Project Scaffold

## Technical Approach

Greenfield Next.js 15 App Router scaffold with `[locale]` route group,
next-intl for locale routing and translations, Tailwind CSS via CSS
variables for brand theming (blue + gold). Four page stubs (Home, About,
Contact, Services) under a shared locale layout (Header + Footer). All
content is Lorem Ipsum placeholder. SEO via `generateMetadata` reading
from locale translation files.

## Architecture Decisions

| Decision | Options | Tradeoffs | Choice |
|---|---|---|---|
| **Locale routing** | next-intl middleware vs custom middleware | next-intl handles 308 redirect, cookie detection, unsupported-locale 404 out of the box; custom gives full control but more surface area | next-intl middleware via `createNavigation` |
| **CSS strategy** | Tailwind + CSS vars vs pure Tailwind tokens | CSS vars in `:root` allow brand value changes without rebuild; pure Tailwind tokens are simpler but lock brand into config | Tailwind + CSS variables — brand tokens in `globals.css`, referenced in `tailwind.config.ts` |
| **Component org** | atomic-ish (`ui/layout/sections`) vs flat dir | Hierarchy scales cleanly as components grow; flat works for small projects but becomes unwieldy | `components/ui/` (Button, Card, Container), `components/layout/` (Header, Footer), `components/sections/` (HeroSection, ServicesGrid) |
| **Translation loading** | Server-side (next-intl RSC) vs client-side | next-intl RSC works with React Server Components, zero hydration delay; client-side needs `NextIntlClientProvider` wrappers | Server-side via `getTranslations()` in pages + `NextIntlClientProvider` only for client components that need i18n |
| **SEO approach** | `generateMetadata` with locale params vs static per-locale metadata objects | `generateMetadata` reads translation messages at request time — single source of truth; static objects duplicate strings per locale | `generateMetadata` per page, reading from `getTranslations()` |

## Data Flow

```
Browser Request
       │
       ▼
next-intl middleware.ts
  ├─ /           → 308 redirect → /en/
  ├─ /en/*       → locale=en, continue
  ├─ /es/*       → locale=es, continue
  └─ /fr/*       → 404 (unsupported locale)
       │
       ▼
Root Layout [locale] (generateMetadata → metadataBase + alternates)
       │
       ├── <Header />
       │     ├── <NavLink href="/">           ← uses locale prefix
       │     ├── <NavLink href="/about">
       │     ├── <NavLink href="/services">
       │     ├── <NavLink href="/contact">
       │     └── <LanguageSwitcher />         ← toggles en/es
       │
       ├── children (Page)
       │     ├── Home:    <HeroSection />
       │     ├── Services:<ServicesGrid />
       │     ├── Contact: <ContactForm />
       │     └── About:   Lorem Ipsum body
       │
       └── <Footer />
```

## File Changes

| File | Action | Description |
|---|---|---|
| `package.json` | Create | deps: next@15, react, next-intl, tailwindcss, typescript, eslint, prettier, husky, commitlint |
| `next.config.ts` | Create | next-intl plugin config |
| `tsconfig.json` | Create | strict mode TypeScript |
| `tailwind.config.ts` | Create | brand tokens via CSS variable references |
| `postcss.config.mjs` | Create | PostCSS + Tailwind plugin |
| `middleware.ts` | Create | next-intl locale routing middleware |
| `src/i18n/routing.ts` | Create | locale definitions + `createNavigation` |
| `src/i18n/request.ts` | Create | `getRequestConfig` — loads `en.json`/`es.json` per request |
| `src/app/globals.css` | Create | Tailwind directives + `:root` CSS variables (blue/gold) |
| `src/app/[locale]/layout.tsx` | Create | Root locale layout w/ `metadataBase` + `alternates.languages` |
| `src/app/[locale]/page.tsx` | Create | Home page — HeroSection |
| `src/app/[locale]/about/page.tsx` | Create | About stub |
| `src/app/[locale]/contact/page.tsx` | Create | Contact stub + ContactForm |
| `src/app/[locale]/services/page.tsx` | Create | Services stub + ServicesGrid |
| `src/app/not-found.tsx` | Create | Custom 404 |
| `src/messages/en.json` | Create | English translations (nav, hero, services, contact, footer, metadata) |
| `src/messages/es.json` | Create | Spanish translations (same keys) |
| `src/components/ui/button.tsx` | Create | Reusable Button with brand variants |
| `src/components/ui/card.tsx` | Create | Card container |
| `src/components/ui/container.tsx` | Create | Max-width centered wrapper |
| `src/components/layout/header.tsx` | Create | Site header + nav + LanguageSwitcher |
| `src/components/layout/footer.tsx` | Create | Site footer |
| `src/components/layout/language-switcher.tsx` | Create | en/es locale toggle |
| `src/components/layout/nav-link.tsx` | Create | Locale-aware `<Link>` wrapper |
| `src/components/sections/hero-section.tsx` | Create | Hero with heading, subheading, CTA |
| `src/components/sections/services-grid.tsx` | Create | Service cards grid |
| `src/components/sections/contact-form.tsx` | Create | Stub form markup (name, email, message, submit) |
| `.eslintrc.json` | Create | ESLint config |
| `.prettierrc` | Create | Prettier config |
| `commitlint.config.js` | Create | Commitlint config |

Total: **32 new files**, 0 modified, 0 deleted.

## Interfaces / Contracts

```typescript
// src/i18n/routing.ts
export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

// Next.js 15 page props — params is Promise
type PageProps = {
  params: Promise<{ locale: Locale }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

// Translation message shape
type Messages = {
  nav: Record<string, string>;
  hero: { heading: string; subheading: string; cta: string };
  services: { heading: string; items: Array<{ title: string; desc: string }> };
  contact: { heading: string; fields: Record<string, string>; submit: string };
  footer: Record<string, string>;
  metadata: Record<string, { title: string; description: string }>;
};
```

## Testing Strategy

No test runner configured — testing is deferred per proposal scope.

| Layer | What to Test | Approach |
|---|---|---|
| Manual | All 4 routes in en/es, LanguageSwitcher toggling, brand colors, 404 unsupported locale | `npm run dev` + browser inspection after each group |
| Automated | — | Deferred to future change |

## Migration / Rollout

No migration required (greenfield project). Project init is the rollout.

## Open Questions

None. All design decisions are covered by the proposal and specs.
