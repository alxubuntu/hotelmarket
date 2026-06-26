# Design: Content Restructure — B2B Platform Pivot

## Technical Approach

Content-first restructure: rewrite i18n messages, rewire layout for dual-audience nav, add 3 static SSG pages + 1 API route. No backend beyond `/api/contact`. New pages follow existing patterns — async server components with `getTranslations()`, `generateMetadata()` sourcing from messages, `params: Promise<{ locale }>`, `generateStaticParams` for locale pre-generation.

**Phasing**: (1) Messages + nav architecture → (2) Home page dual-audience hero → (3) Existing page rewrites → (4) New pages → (5) Contact API → (6) SEO `generateMetadata` pass.

## Architecture Decisions

### Nav: Segmented Audience Toggle
| Option | Tradeoff | Decision |
|--------|----------|----------|
| Segmented pill (Buyers \| Partners) | Explicit choice, simple UX, matches spec | ✅ **Selected** |
| Dropdown per audience | Compact but hides discoverability | Rejected |
| Hero-only CTAs | No persistent guidance | Rejected |

**Choice**: New `AudienceToggle` renders as segmented pill in `Header`. Active audience (`buyers`|`partners`) determines visible nav link set. Mobile preserves toggle without closing overlay (spec scenario).

### Contact API: Resend + Abstraction
| Option | Tradeoff | Decision |
|--------|----------|----------|
| Resend SDK | Light, Next.js-friendly, 100/day free | ✅ **Selected** |
| SendGrid | Heavier SDK, more features | Rejected — overkill |
| Nodemailer SMTP | Self-hosted, delivery issues | Rejected |

**Choice**: `src/lib/email.ts` with `sendEmail()` interface wrapping Resend. Config via `RESEND_API_KEY` + `CONTACT_EMAIL_TO`.

### Content Organization: Namespace-per-Page
**Choice**: Keys structured as `nav`, `home`, `about`, `services`, `hotels`, `partners`, `case-studies`, `contact`, `shared`. Extends existing pattern (`home.trust`, `home.testimonials`). Existing key paths preserved for backward compat. New namespaces for Hotels, Partners, Case Studies.

### Form Handling
**Choice**: HTML5 constraint validation (client) + Zod schema (server). Rate limit via in-memory `Map<IP, timestamps[]>` — adequate for static SSG with no DB. No persistence layer — email-forward only.

### SEO + Routing
**Choice**: `generateMetadata()` per page from `metadata.<page>.title/description` keys. Language alternates in root layout cover all 7 routes. ES paths: `/es/hoteles` (buyers), `/es/casos-de-exito` (case studies).

## Data Flow

```
ContactForm (client)
  → HTML5 constraint validation
  → POST /api/contact { name, email, subject, message }
    → Zod schema validation → 400 if invalid
    → Rate limit check (Map<IP>) → 429 if exceeded
    → email.sendEmail({ to, from, subject, html })
    → 200 { status: "success" }

Nav audience toggle
  → React useState in Header
  → Active audience → filtered nav link list
  → Mobile: audience toggle changes links, overlay stays open

Hotel filter (static, client-side only)
  → Hotel data from messages JSON
  → Filter UI (capacity, events, location) → array.filter → re-render
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/messages/en.json` | Modify | 95% rewrite + 3 new namespaces |
| `src/messages/es.json` | Modify | 95% rewrite + mirror |
| `src/lib/email.ts` | Create | Resend abstraction |
| `src/app/api/contact/route.ts` | Create | POST handler (Zod + rate limit) |
| `src/app/[locale]/page.tsx` | Modify | Dual-audience hero + features |
| `src/app/[locale]/about/page.tsx` | Modify | Platform positioning copy |
| `src/app/[locale]/services/page.tsx` | Modify | PlatformFeatures component |
| `src/app/[locale]/contact/page.tsx` | Modify | Add subject field |
| `src/app/[locale]/hotels/page.tsx` | Create | Static listing + filters |
| `src/app/[locale]/partners/page.tsx` | Create | Benefits + onboarding |
| `src/app/[locale]/case-studies/page.tsx` | Create | Case study showcase |
| `src/components/layout/header.tsx` | Modify | Dual link sets + toggle |
| `src/components/layout/footer.tsx` | Modify | Audience-grouped links + legal |
| `src/components/layout/mobile-nav.tsx` | Modify | In-overlay audience toggle |
| `src/components/layout/audience-toggle.tsx` | Create | Segmented pill control |
| `src/components/sections/contact-form.tsx` | Modify | Zod fields, subject dropdown, API submit |
| `src/components/sections/dual-audience-hero.tsx` | Create | Two CTAs, two value props |
| `src/components/sections/platform-features.tsx` | Create | Feature grid (replaces ServicesGrid) |
| `src/components/sections/hotel-listing.tsx` | Create | Filter UI + cards |
| `src/components/sections/partner-benefits.tsx` | Create | Benefit cards + demo CTA |
| `src/components/sections/onboarding-flow.tsx` | Create | 4-step visual with timeline |
| `src/components/sections/case-study-card.tsx` | Create | Metrics + quote + results |
| `middleware.ts` | Modify | Add `/hotels`, `/partners`, `/case-studies` to matcher |
| `.env.local` | Create | `RESEND_API_KEY`, `CONTACT_EMAIL_TO` |

**Unchanged**: `src/components/ui/*` (Container, Button, Card, ScrollReveal), `src/app/layout.tsx` (root), `src/app/page.tsx` (locale redirect), `src/app/not-found.tsx`, `src/i18n/`, `tailwind.config.ts`.

## Interfaces / Contracts

```typescript
// Contact API
type ContactPayload = {
  name: string;        // 2-100 chars
  email: string;       // valid email
  subject: "general" | "demo" | "partners";
  message: string;     // 10-5000 chars
};
type ContactResponse =
  | { status: "success" }
  | { status: "error"; errors: { field: string; message: string }[] }
  | { status: "rate_limited"; retryAfter: number };

// Navigation
type Audience = "buyers" | "partners";
type NavItem = { href: string; label: string };

// Email service
interface EmailService { send(p: EmailPayload): Promise<void>; }
```

## Testing Strategy

| Layer | What | Approach |
|-------|------|----------|
| Unit | Zod validation | Valid payloads, missing fields, boundary values |
| Unit | Rate limiter | Window thresholds, expiry, cleanup |
| Component | ContactForm | Status transitions: idle→sending→success/error |
| API | POST /api/contact | Vitest RouteHandler: 200, 400, 429 |

## Migration / Rollout

**No DB migration** — all content in JSON messages, static SSG. Rollback: `git revert` + disable `/api/contact` route. Feature flag: default nav to "Buyers" — backwards compatible for existing visitors accustomed to old nav.

## Open Questions

- [ ] Resend key provisioning — who manages production env?
- [ ] Hotel sample data — define structure in messages JSON (6-8 hotels)?
- [ ] ES route `/es/casos-de-exito` — handled by next-intl routing or custom middleware path?
