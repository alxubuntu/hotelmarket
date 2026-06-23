# Proposal: Initial Project Scaffold

## Intent

Greenfield corporate website for Hotel Market Pro — a business hotel management company. Scaffold the full project foundation: Next.js 15 App Router with i18n, Tailwind CSS with brand tokens, and 4 page stubs (Home, About, Contact, Services) with Spanish/English support. No real content yet — placeholder/Lorem Ipsum text.

## Scope

### In Scope
- Next.js 15 project init with TypeScript strict mode
- Tailwind CSS config with brand tokens (blue + gold) via CSS variables
- next-intl i18n setup with `/en/` and `/es/` locale routing
- 4 page stubs with placeholder content: Home, About, Contact, Services
- Shared layout: Header (nav + LanguageSwitcher), Footer
- SEO metadata via `generateMetadata` per locale
- Tooling: ESLint, Prettier, commitlint, Husky + lint-staged

### Out of Scope
- Real copy/content (placeholder only)
- Brand refinement (generic blue/gold for now)
- Interactive ContactForm validation/logic (stub markup only)
- Testing setup (Vitest/Playwright — deferred)
- Animation/transitions
- Backend or CMS integration

## Capabilities

### New Capabilities
- `corporate-site-structure`: Project scaffold, page routing, shared layout components
- `i18n-setup`: next-intl integration, locale routing, translation files for en/es
- `placeholder-content`: Lorem Ipsum page copy, stub sections (HeroSection, ServicesGrid, ContactForm)
- `seo-metadata`: `generateMetadata` with localized title/description, `metadataBase`, `alternates.languages`

### Modified Capabilities
None — greenfield project.

## Approach

Next.js 15 App Router with `[locale]` route group. Tailwind + CSS variable tokens for brand theming. next-intl for routing/translations. Atomic-ish component tree: `components/ui/` (Button, Card, Container), `components/layout/` (Header, Footer, LanguageSwitcher), `components/sections/` (HeroSection, ServicesGrid). Placeholder SVG for logo, generic OG images per locale.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/app/[locale]/` | New | All page stubs + locale layout |
| `src/components/` | New | UI, layout, and section components |
| `src/i18n/` | New | Locale config and request loader |
| `src/messages/` | New | en.json, es.json translation files |
| `middleware.ts` | New | next-intl locale routing middleware |
| `next.config.ts` | New | Next.js + next-intl plugin config |
| `tailwind.config.ts` | New | Brand tokens via CSS variables |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| next-intl middleware misconfig | Low | Test `/en/` and `/es/` pages immediately after first scaffold |
| Over-scaffolding delays first render | Med | Verify `npm run dev` works after each group of additions |

## Rollback Plan

Greenfield project — `rm -rf` the project dir and re-init from scratch. If git-initialized, `git clean -fd` and `git checkout .` from initial commit.

## Dependencies

- Node.js 20+
- npm (or pnpm)

## Success Criteria

- [ ] `npm run dev` starts without errors
- [ ] `/en/` and `/es/` routes render with correct locale
- [ ] LanguageSwitcher toggles between locales
- [ ] Header navigation links resolve (/, /about, /contact, /services) in both locales
- [ ] Brand colors (blue/gold) visible in rendered components
- [ ] ESLint passes with zero errors
