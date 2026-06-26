# Proposal: Content Restructure — B2B Platform Pivot

## Proposal Question Round

Auto-mode assumptions:
1. **Nav**: Segmented (Buyers/Partners). Unified toggle instead?
2. **Form**: `/api/contact` via Resend/SendGrid. OK?
3. **Search**: Static filter listing. Right first slice?
4. **Pages**: 3 new + 4 rewritten. Right scope?
5. **Locales**: EN + ES only. Need more?

## Intent

Site pitches B2B hotel consulting but serves zero content for corporate buyers or hotel partners. Full restructure to two-sided marketplace — demand (corporate buyers) and supply (hotels).

## Scope

| In | Out |
|----|-----|
| 100% content rewrite for dual-audience | Real-time booking / payment |
| Dual-audience IA + nav | Hotel dashboard / admin |
| Contact form `/api/contact` | User accounts / auth / CRM |
| 3 new pages + 4 rewritten | PMS integrations / live DB |
| Full EN/ES + SEO metadata | |

## Capabilities

### New
- `platform-narrative`: Dual-audience value prop, brand story
- `buyer-experience`: Corporate buyer content — search, packages, group support
- `hotel-onboarding`: Hotel partner content — benefits, demos, case studies
- `site-navigation`: New IA + dual-audience nav

### Modified (delta specs)
- `corporate-site-structure`: **REPLACED** — new routes, dual-audience layout
- `placeholder-content`: **REPLACED** — real content replaces Lorem Ipsum
- `i18n-setup`: **EXTENDED** — more keys, same infra
- `seo-metadata`: **EXTENDED** — new pages, same pattern

## Approach

1. Audit + IA — map current, design dual-audience tree
2. Messages — write en.json + es.json
3. Form backend — `/api/contact` with email
4. Core rewrite — Home, About, Services, Contact
5. New pages — Hotels, Partners, Case Studies
6. Nav — segmented nav + footer
7. SEO — `generateMetadata` pass

## Affected Areas

| Area | Impact |
|------|--------|
| `src/messages/*.json` | 95% rewritten + new keys |
| `src/app/[locale]/` | 4 pages rewritten |
| `src/app/[locale]/hotels/` | New |
| `src/app/[locale]/partners/` | New |
| `src/app/[locale]/case-studies/` | New |
| `src/app/api/contact/` | New route |
| `src/components/sections/` | Redesigned |
| `src/components/layout/` | Restructured |

## Risks & Rollback

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Content > 400-line budget | High | Chain PRs: messages+nav, then pages+backend |
| Form security | Med | Rate-limited, validated, external email |
| IA confuses visitors | Low | Legacy redirects |

**Rollback**: `git revert`. Disable `/api/contact` for placeholder.

## Dependencies

- Email service (Resend/SendGrid)
- Production URL for SEO base

## Success Criteria

- [ ] 7 pages render platform content EN+ES — no placeholders
- [ ] Contact form submits to backend
- [ ] Dual-audience nav renders on all viewports
- [ ] SEO metadata correct per page+locale
- [ ] `next build` passes
- [ ] No locale routing regression
