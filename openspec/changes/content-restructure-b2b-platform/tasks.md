# Tasks: Content Restructure — B2B Platform Pivot

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: High

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~3500 |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | 4 PRs |
| Delivery strategy | auto-forecast |
| Chain strategy | pending |

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Messages rewrite + env config | PR 1 | Pure data, no code — independent |
| 2 | Nav architecture + middleware | PR 2 | audience-toggle, header, footer, mobile-nav, middleware matcher |
| 3 | Home page + existing page rewrites | PR 3 | New sections, modified pages, replaces ServicesGrid |
| 4 | New pages (Hotels, Partners, Case Studies) | PR 4 | 3 new page files + 4 new section components |
| 5 | Contact API + SEO + tests | PR 5 | Backend route, Resend abstraction, metadata per page, build verification |

## Phase 1: Foundation — Messages + Config

- [ ] 1.1 Rewrite `src/messages/en.json` — full dual-audience content: nav, home, about, services, hotels, partners, case-studies, contact, shared namespaces
- [ ] 1.2 Rewrite `src/messages/es.json` — mirror Spanish translations with ES route paths (hoteles, casos-de-exito)
- [ ] 1.3 Create `.env.local.example` — `RESEND_API_KEY`, `CONTACT_EMAIL_TO` with placeholder values

## Phase 2: Navigation Architecture

- [ ] 2.1 Create `src/components/layout/audience-toggle.tsx` — segmented pill component (`buyers | partners`), `useState` with `Audience` type
- [ ] 2.2 Modify `src/components/layout/header.tsx` — render `AudienceToggle`, switch nav link sets based on active audience
- [ ] 2.3 Modify `src/components/layout/footer.tsx` — audience-grouped link columns + legal section + `LanguageSwitcher`
- [ ] 2.4 Modify `src/components/layout/mobile-nav.tsx` — add `AudienceToggle` inside overlay, toggle switches links without closing overlay
- [ ] 2.5 Modify `middleware.ts` — add `/hotels`, `/partners`, `/case-studies` (and ES: `/hoteles`, `/casos-de-exito`) to locale matcher

## Phase 3: Home Page + Existing Page Rewrites

- [ ] 3.1 Create `src/components/sections/dual-audience-hero.tsx` — two value props (buyer + partner) with separate CTAs, uses `getTranslations()`
- [ ] 3.2 Create `src/components/sections/platform-features.tsx` — feature grid: group booking, corp packages, partner benefits, event services — replaces ServicesGrid
- [ ] 3.3 Modify `src/app/[locale]/page.tsx` — wire `DualAudienceHero` + `PlatformFeatures` + trust bar + testimonial sections from messages
- [ ] 3.4 Modify `src/app/[locale]/about/page.tsx` — platform positioning copy with dual-audience value prop
- [ ] 3.5 Modify `src/app/[locale]/services/page.tsx` — use `PlatformFeatures` component, remove old `ServicesGrid` import
- [ ] 3.6 Modify `src/app/[locale]/contact/page.tsx` — add subject field selector (`general | demo | partners`)

## Phase 4: New Platform Pages

- [ ] 4.1 Create `src/components/sections/hotel-listing.tsx` — filter UI (capacity, events, location, corp packages) + hotel cards from messages JSON data
- [ ] 4.2 Create `src/app/[locale]/hotels/page.tsx` — SSG page with `getTranslations()`, `generateStaticParams`, renders `HotelListing` + trust signals
- [ ] 4.3 Create `src/components/sections/partner-benefits.tsx` — benefit cards (occupancy growth, portfolio, onboarding) + demo request CTA
- [ ] 4.4 Create `src/components/sections/onboarding-flow.tsx` — 4-step visual timeline (submit → demo → agreement → activation)
- [ ] 4.5 Create `src/app/[locale]/partners/page.tsx` — SSG page rendering `PartnerBenefits` + `OnboardingFlow`
- [ ] 4.6 Create `src/components/sections/case-study-card.tsx` — metrics (before/after), testimonial quote, results summary, partner CTA
- [ ] 4.7 Create `src/app/[locale]/case-studies/page.tsx` — SSG page rendering 2+ `CaseStudyCard` instances from messages data

## Phase 5: Contact API + Form Backend

- [ ] 5.1 Create `src/lib/email.ts` — `sendEmail()` abstraction wrapping Resend SDK, config via `RESEND_API_KEY` + `CONTACT_EMAIL_TO`
- [ ] 5.2 Create `src/app/api/contact/route.ts` — POST handler: Zod schema validation → 400, in-memory rate limiter (`Map<IP, timestamps[]>`) → 429, email forward → 200
- [ ] 5.3 Modify `src/components/sections/contact-form.tsx` — add Zod-validated fields, subject dropdown, API submit with status transitions (idle→sending→success/error)

## Phase 6: SEO + Verification

- [ ] 6.1 Add `generateMetadata` to `hotels/page.tsx`, `partners/page.tsx`, `case-studies/page.tsx` — locale-specific title/description from messages, language alternates
- [ ] 6.2 Verify all 7 pages render correctly in EN + ES — check routes, nav, content, no placeholders
- [ ] 6.3 Run `next build` — ensure zero build errors, no locale routing regression
- [ ] 6.4 Write Vitest tests: Zod validation (valid/missing/boundary), rate limiter (window thresholds, expiry), API handler (200/400/429)
