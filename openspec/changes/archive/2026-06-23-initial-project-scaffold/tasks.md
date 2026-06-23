# Tasks: Initial Project Scaffold

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~800+ |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 → PR 2 → PR 3 |
| Delivery strategy | auto-forecast |
| Chain strategy | stacked-to-main |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: stacked-to-main
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Project init + tooling config | PR 1 | base = feature tracker branch; package.json, tsconfig, tailwind, eslint, prettier, husky, commitlint |
| 2 | i18n + layout + UI primitives | PR 2 | base = PR 1 branch; routing.ts, request.ts, middleware, messages, globals.css, Root layout, not-found, Button/Card/Container |
| 3 | Layout, sections, and pages | PR 3 | base = PR 2 branch; Header, Footer, LanguageSwitcher, NavLink, HeroSection, ServicesGrid, ContactForm, all 4 pages |

## Phase 1: Project Init & Config

- [x] 1.1 Init Next.js 15 with TypeScript strict mode — `package.json`, `tsconfig.json`
- [x] 1.2 Create `next.config.ts` with next-intl plugin
- [x] 1.3 Create `tailwind.config.ts` referencing CSS variable brand tokens
- [x] 1.4 Create `postcss.config.mjs` with Tailwind + autoprefixer
- [x] 1.5 Create `.eslintrc.json`, `.prettierrc`, `commitlint.config.js`
- [x] 1.6 Create `.husky/` with commit-msg hook for commitlint

## Phase 2: i18n Foundation

- [x] 2.1 Create `src/i18n/routing.ts` — `locales`, `defaultLocale`, `createNavigation`
- [x] 2.2 Create `src/i18n/request.ts` — `getRequestConfig` loading en/es.json per request
- [x] 2.3 Create `middleware.ts` — next-intl locale routing (308 root redirect, unsupported → 404)
- [x] 2.4 Create `src/messages/en.json` — nav, hero, services, contact, footer, metadata keys
- [x] 2.5 Create `src/messages/es.json` — same keys with Spanish translations

## Phase 3: Global Styles & Layout

- [x] 3.1 Create `src/app/globals.css` — Tailwind directives + `:root` CSS variables (blue/gold)
- [x] 3.2 Create `src/app/[locale]/layout.tsx` — locale layout with `metadataBase`, `alternates.languages`, Header + Footer wrapping children
- [x] 3.3 Create `src/app/not-found.tsx` — custom 404 with locale-aware home link

## Phase 4: Shared UI Components

- [x] 4.1 Create `src/components/ui/button.tsx` — brand variants (primary/outline), polymorphic `as` prop
- [x] 4.2 Create `src/components/ui/card.tsx` — rounded container with padding
- [x] 4.3 Create `src/components/ui/container.tsx` — max-width centered wrapper

## Phase 5: Layout Components

- [x] 5.1 Create `src/components/layout/nav-link.tsx` — locale-aware `<Link>` wrapper
- [x] 5.2 Create `src/components/layout/language-switcher.tsx` — en/es toggle via `usePathname` + `useRouter`
- [x] 5.3 Create `src/components/layout/header.tsx` — nav links + LanguageSwitcher
- [x] 5.4 Create `src/components/layout/footer.tsx` — site footer with copyright

## Phase 6: Section Components & Pages

- [x] 6.1 Create `src/components/sections/hero-section.tsx` — heading, subheading, CTA from translations
- [x] 6.2 Create `src/components/sections/services-grid.tsx` — card grid reading `services.items` from messages
- [x] 6.3 Create `src/components/sections/contact-form.tsx` — stub markup (name, email, message, submit)
- [x] 6.4 Create page stubs: Home (`page.tsx`), About, Services, Contact — each with `generateMetadata` reading locale messages

## Phase 7: Final Verification

- [x] 7.1 Verify `npm run build` — builds successfully (all 11 pages: /en/, /es/, /en/about, /es/about, /en/services, /es/services, /en/contact, /es/contact, not-found; /fr/* → 404 via middleware)
- [x] 7.2 Run ESLint — zero errors across all files
