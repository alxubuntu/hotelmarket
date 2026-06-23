## Exploration: initial-project-scaffold

### Current State
Greenfield project — empty directory with only `.atl/` (SDD artifacts) and `openspec/` (OpenSpec configuration). No code, no dependencies, no framework. Stack chosen by user: Next.js + Tailwind CSS for Hotel Market Pro, a corporate business hotel hub website.

### Approaches

#### 1. Next.js App Router — Structure

**1a. Flat routes under `app/`**
Pages directly under `app/page.tsx`, `app/about/page.tsx`, etc.
- Pros: Simplest, zero abstraction overhead
- Cons: No i18n routing — mixing locale into URL requires manual work
- Effort: Low

**1b. Route group with locale prefix: `app/[locale]/`**
Pages nested under a locale param: `app/[locale]/page.tsx`, `app/[locale]/about/page.tsx`. Uses `generateStaticParams` for `/en/` and `/es/`.
- Pros: Native i18n routing, SEO-friendly locale prefix, next-intl supports this natively
- Cons: Requires middleware setup, slightly more files
- Effort: Medium

**1c. Route groups for sections: `app/(marketing)/`**
Use route groups to organize marketing pages separate from potential future admin sections.
- Pros: Clean separation future-proofing
- Cons: Over-engineering for a corporate landing site with 4 pages
- Effort: Low-Medium

**Winner: 1b** — `[locale]` prefix aligns with next-intl, gives us `/en/about`, `/es/about` out of the box.

---

#### 2. Tailwind CSS — Configuration

**2a. Stock Tailwind with custom theme**
`tailwind.config.ts` with brand colors (hotel blues/golds), custom fonts, spacing scale.
- Pros: Simple, standard, well-documented
- Cons: Manual color management across components
- Effort: Low

**2b. Tailwind + CSS variables for theming**
Define brand tokens as CSS custom properties, reference in `tailwind.config` via `colors: { brand: { primary: 'var(--color-brand-primary)' } }`.
- Pros: Runtime themability, easier maintenance, design token clarity
- Cons: Slightly more initial config
- Effort: Low

**2c. Tailwind + headless UI library (Radix UI, Headless UI)**
Add Radix UI primitives for accessible navigation, dialogs, etc.
- Pros: Accessibility out of the box, great for interactive components like mobile menu
- Cons: Extra dependency, may be overkill for mostly static site
- Effort: Medium

**Winner: 2b with optional 2c** — CSS variables for tokens, Headless UI only if interactive components are needed.

---

#### 3. Internationalization (i18n)

**3a. next-intl (recommended)**
Full-featured: App Router integration, middleware routing, ICU message format, file-based JSON translations.
- Pros: Best Next.js i18n library, type-safe, date/number formatting, active maintenance
- Cons: Learning curve for middleware/routing setup
- Effort: Medium

**3b. next-i18next**
Legacy of the Pages Router era — works with App Router via react-i18next but not first-class.
- Pros: Familiar to teams with i18next experience
- Cons: Not optimized for App Router, RSC-incompatible patterns, less maintained
- Effort: Medium-High

**3c. Custom i18n (React context + JSON files)**
Build own provider/hook, no library dependency.
- Pros: Full control, zero external deps
- Cons: Must reinvent date/number formatting, middleware routing, locale detection, RSC support
- Effort: High

**URL structure:**
- `/en/` prefix for English, `/es/` for Spanish — best for SEO, content negotiation
- Subdomain (`en.hotelmarket.com`) — overkill for this project size
- No prefix + cookie-only — worse for SEO, breaks shareable URLs

**Winner: 3a (next-intl) with `/en/`, `/es/` prefix**

---

#### 4. Project Structure

**4a. Feature-based (`components/`, `lib/`, `hooks/` top-level)**
```
src/
├── app/
├── components/
├── lib/
├── hooks/
├── messages/
└── i18n/
```
- Pros: Standard Next.js recommended structure
- Cons: Components can become a dumping ground
- Effort: Low

**4b. Atomic-ish design (`components/ui/`, `components/layout/`, `components/sections/`)**
```
src/
├── app/
├── components/
│   ├── ui/         (Button, Card, Input — shared primitives)
│   ├── layout/     (Header, Footer, Sidebar)
│   └── sections/   (HeroSection, ServicesGrid — page-specific sections)
├── lib/
├── hooks/
├── messages/
└── i18n/
```
- Pros: Clear separation, reusable primitives, scalable
- Cons: More directories upfront
- Effort: Low

**Winner: 4b** — scales from 4 pages to 20+ without refactoring.

---

#### 5. Tooling

**5a. ESLint + Prettier + Husky + lint-staged**
Standard Next.js ESLint config, Prettier for formatting, Husky for pre-commit hooks, lint-staged for running linters only on staged files.
- Pros: Industry standard, catches issues before commit, Next.js ships ESLint config
- Cons: Husky setup requires git init
- Effort: Low

**5b. TypeScript strict mode**
`tsconfig.json` with `strict: true`, `noUncheckedIndexedAccess`, exactOptionalPropertyTypes.
- Pros: Catches null/undefined bugs at compile time
- Cons: More verbose code
- Effort: Low

**5c. Testing: Playwright vs Vitest**
- **Playwright**: End-to-end testing for a mostly static site — overkill for 4 landing pages. Valuable for contact form submission flow.
- **Vitest + Testing Library**: Component testing for UI building blocks (Button, Card, Header). Better ROI for component-heavy work.
- **Recommended**: Vitest + Testing Library for component tests, Playwright only for critical user flows (contact form, language switcher).

**5d. Commit convention**
Conventional Commits (`feat:`, `fix:`, `chore:`) with commitlint + Husky.
- Pros: Automated changelogs, semantic versioning compatible
- Cons: Minor discipline overhead
- Effort: Low

**Winner: ESLint (Next.js built-in) + Prettier + Husky/lint-staged + TypeScript strict + Vitest/Testing Library + Conventional Commits**

---

#### 6. OpenGraph / SEO Setup

**6a. Static metadata per page**
Export `metadata` object from each `page.tsx` with title, description, OG image per locale.
- Pros: Simple, type-safe with Next.js Metadata API
- Cons: Duplicate metadata per locale if not using `generateMetadata`
- Effort: Low

**6b. Dynamic `generateMetadata` with locale**
Use `generateMetadata({ params })` to derive metadata from locale param, load localized title/description from translation files.
- Pros: Single source of truth for meta per locale, extensible for CMS-backed content later
- Cons: Slightly more code upfront
- Effort: Low-Medium

**Winner: 6b** — `generateMetadata` with localized strings from translation JSON. Includes `metadataBase`, `alternates.languages`, and per-page OG image.

---

### Recommended Stack & Structure

```
hotel-market-pro/
├── .husky/
│   └── pre-commit                  # lint-staged
├── public/
│   ├── images/
│   │   ├── og-default-en.jpg
│   │   └── og-default-es.jpg
│   ├── favicon.ico
│   └── logo.svg
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx          # Locale-based HTML shell + NextIntlClientProvider
│   │   │   ├── page.tsx            # Home page (/en, /es)
│   │   │   ├── about/
│   │   │   │   └── page.tsx        # /en/about, /es/about
│   │   │   ├── contact/
│   │   │   │   └── page.tsx        # /en/contact, /es/contact
│   │   │   └── services/
│   │   │       └── page.tsx        # /en/services, /es/services
│   │   ├── layout.tsx              # Root layout (minimal — just passes through to [locale])
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                     # Primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Container.tsx
│   │   ├── layout/                 # Shell components
│   │   │   ├── Header.tsx          # Logo + nav + language switcher
│   │   │   ├── Footer.tsx
│   │   │   └── LanguageSwitcher.tsx
│   │   └── sections/              # Page-specific sections
│   │       ├── HeroSection.tsx
│   │       ├── ServicesGrid.tsx
│   │       └── ContactForm.tsx
│   ├── i18n/
│   │   ├── routing.ts              # Locale config, pathname definitions
│   │   └── request.ts             # getRequestConfig loader
│   ├── lib/
│   │   └── utils.ts                # cn() helper, other utilities
│   ├── hooks/
│   │   └── useLocale.ts            # Thin locale helper (if needed)
│   └── messages/
│       ├── en.json                 # English translations
│       └── es.json                 # Spanish translations
├── middleware.ts                   # next-intl routing middleware
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json                   # strict: true
├── .eslintrc.json
├── .prettierrc
├── commitlint.config.ts
├── .lintstagedrc.js
├── vitest.config.ts
└── package.json
```

### Risks

- **next-intl middleware complexity**: If the middleware matcher or routing config is misconfigured, it can cause infinite redirects or 404s on localized routes — must test `/en/` and `/es/` from the first commit.
- **Over-scaffolding**: Adding Husky, lint-staged, commitlint, and Vitest on day zero increases setup time before seeing a single rendered page — tradeoff between discipline and velocity.
- **CSS variable theming learning curve**: If the team is unfamiliar with CSS custom properties referenced in Tailwind config, they may fight the abstraction instead of using it.
- **Static generation vs middleware**: next-intl middleware may conflict with `output: 'export'` for full static sites — need to verify that the chosen approach supports static generation (it does for `generateStaticParams` + `setRequestLocale`).
- **Locale cookie/detection**: First-time visitors without a preferred locale need geo-detection or browser language detection — adds complexity for initial scaffold.

### Ready for Proposal
Yes — the exploration is complete. Clear recommendations exist for every dimension. The orchestrator should proceed to the **propose** phase with the recommended stack: Next.js 15 App Router, Tailwind CSS with CSS variable tokens, next-intl for i18n, atomic-ish component structure, and standard tooling. The only open question for the user is whether they want **Husky/lint-staged on day one** or **after the first working render**.