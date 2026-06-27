# Design: Content Restructure — B2B Platform Pivot

## Technical Approach

Content-first restructure: rewrite i18n messages, rewire layout for dual-audience nav, add 3 static SSG pages. No backend — contact form uses WhatsApp deep link (`wa.me`). New pages follow existing patterns — async server components with `getTranslations()`, `generateMetadata()` sourcing from messages, `params: Promise<{ locale }>`, `generateStaticParams` for locale pre-generation.

**Phasing**: (1) Messages + nav architecture → (2) Home page dual-audience hero → (3) Existing page rewrites → (4) New pages → (5) Contact via WhatsApp → (6) SEO `generateMetadata` pass.

## Architecture Decisions

### Nav: Segmented Audience Toggle
| Option | Tradeoff | Decision |
|--------|----------|----------|
| Segmented pill (Buyers \| Partners) | Explicit choice, simple UX, matches spec | ✅ **Selected** |
| Dropdown per audience | Compact but hides discoverability | Rejected |
| Hero-only CTAs | No persistent guidance | Rejected |

**Choice**: New `AudienceToggle` renders as segmented pill in `Header`. Active audience (`buyers`|`partners`) determines visible nav link set. Mobile preserves toggle without closing overlay (spec scenario).

### Contact: WhatsApp Deep Link (wa.me)
| Option | Tradeoff | Decision |
|--------|----------|----------|
| `wa.me` deep link | No backend, no API key, free, user taps "Send" | ✅ **Selected** |
| WhatsApp Business API | Auto-send, but needs Meta verification + cost | Rejected — overkill |
| Resend email | Email delivery, but needs API key + backend | Rejected — user prefers WhatsApp |

**Choice**: Contact form collects data → client-side generates `https://wa.me/51901201502?text=...` with URL-encoded message → user taps link → WhatsApp opens with pre-filled message → user sends. Zero backend, zero cost.

**WhatsApp message format**:
```
Hola, soy {name} ({email}).

Asunto: {subject}

{message}
```

### Content Organization: Namespace-per-Page
**Choice**: Keys structured as `nav`, `home`, `about`, `services`, `hotels`, `partners`, `case-studies`, `contact`, `shared`. Extends existing pattern (`home.trust`, `home.testimonials`). Existing key paths preserved for backward compat. New namespaces for Hotels, Partners, Case Studies.

### Form Handling
**Choice**: HTML5 constraint validation (client) + Zod schema (client-side). No server-side validation needed — no API route. Form builds the WhatsApp URL on submit.

### SEO + Routing
**Choice**: `generateMetadata()` per page from `metadata.<page>.title/description` keys. Language alternates in root layout cover all 7 routes. ES paths: `/es/hoteles` (buyers), `/es/casos-de-exito` (case studies).

## Data Flow

```
ContactForm (client)
  → HTML5 constraint validation
  → Zod schema validation (client-side)
  → Build wa.me URL with encoded message
  → window.open(url, "_blank") → WhatsApp opens
  → User taps "Send" in WhatsApp

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
| `src/app/[locale]/page.tsx` | Modify | Dual-audience hero + features |
| `src/app/[locale]/about/page.tsx` | Modify | Platform positioning copy |
| `src/app/[locale]/services/page.tsx` | Modify | PlatformFeatures component |
| `src/app/[locale]/contact/page.tsx` | Modify | Add subject field + WhatsApp submit |
| `src/app/[locale]/hotels/page.tsx` | Create | Static listing + filters |
| `src/app/[locale]/partners/page.tsx` | Create | Benefits + onboarding |
| `src/app/[locale]/case-studies/page.tsx` | Create | Case study showcase |
| `src/components/layout/header.tsx` | Modify | Dual link sets + toggle |
| `src/components/layout/footer.tsx` | Modify | Audience-grouped links + legal |
| `src/components/layout/mobile-nav.tsx` | Modify | In-overlay audience toggle |
| `src/components/layout/audience-toggle.tsx` | Create | Segmented pill control |
| `src/components/sections/contact-form.tsx` | Modify | Zod fields, subject dropdown, wa.me link |
| `src/components/sections/dual-audience-hero.tsx` | Create | Two CTAs, two value props |
| `src/components/sections/platform-features.tsx` | Create | Feature grid (replaces ServicesGrid) |
| `src/components/sections/hotel-listing.tsx` | Create | Filter UI + cards |
| `src/components/sections/partner-benefits.tsx` | Create | Benefit cards + demo CTA |
| `src/components/sections/onboarding-flow.tsx` | Create | 4-step visual with timeline |
| `src/components/sections/case-study-card.tsx` | Create | Metrics + quote + results |
| `middleware.ts` | Modify | Add `/hotels`, `/partners`, `/case-studies` to matcher |

**Removed from original design**: `src/lib/email.ts`, `src/app/api/contact/route.ts`, `.env.local` — no longer needed.

**Unchanged**: `src/components/ui/*` (Container, Button, Card, ScrollReveal), `src/app/layout.tsx` (root), `src/app/page.tsx` (locale redirect), `src/app/not-found.tsx`, `src/i18n/`, `tailwind.config.ts`.

## Interfaces / Contracts

```typescript
// Contact form → WhatsApp
type ContactPayload = {
  name: string;        // 2-100 chars
  email: string;       // valid email
  subject: "general" | "demo" | "partners";
  message: string;     // 10-5000 chars
};

// WhatsApp deep link builder
function buildWhatsAppUrl(payload: ContactPayload): string {
  const text = `Hola, soy ${payload.name} (${payload.email}).\n\nAsunto: ${payload.subject}\n\n${payload.message}`;
  return `https://wa.me/51901201502?text=${encodeURIComponent(text)}`;
}

// Navigation
type Audience = "buyers" | "partners";
type NavItem = { href: string; label: string };
```

## Testing Strategy

| Layer | What | Approach |
|-------|------|----------|
| Unit | Zod validation | Valid payloads, missing fields, boundary values |
| Unit | `buildWhatsAppUrl` | Correct encoding, special chars, URL format |
| Component | ContactForm | Status transitions: idle→validation→link generated |

## Migration / Rollout

**No DB migration, no API, no backend** — all content in JSON messages, static SSG, client-side WhatsApp link. Rollback: `git revert`. Feature flag: default nav to "Buyers" — backwards compatible for existing visitors accustomed to old nav.

## Open Questions

- [x] ~~Resend key provisioning~~ — Resolved: using wa.me, no API key needed
- [ ] Hotel sample data — define structure in messages JSON (6-8 hotels)?
- [ ] ES route `/es/casos-de-exito` — handled by next-intl routing or custom middleware path?
