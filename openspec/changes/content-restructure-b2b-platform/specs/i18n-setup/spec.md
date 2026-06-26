# Delta for i18n-setup

## ADDED Requirements

### Requirement: Extended Translation Keys

The system MUST provide translation keys in `en.json` and `es.json` covering dual-audience navigation, platform features, buyer-focused pages (Hotels, Search), partner-focused pages (Partners, Case Studies), and contact form labels/validation. Existing keys for Home, About, Services, and Contact remain unchanged.

#### Scenario: New keys render on Hotels page

- GIVEN a user navigates to `/en/hotels`
- WHEN the page renders
- THEN all buyer-experience strings resolve from `en.json` under a `hotels` namespace

#### Scenario: Partner case studies translate per locale

- GIVEN a user navigates to `/es/partners`
- WHEN the page renders
- THEN partner benefit and onboarding strings resolve from `es.json` under a `partners` namespace

### Requirement: Key Organization Namespaces

Translation files SHOULD organize keys by namespace: `nav`, `home`, `about`, `services`, `hotels`, `partners`, `case-studies`, `contact`, `shared`.

#### Scenario: Namespace prevents key collision

- GIVEN a `title` key exists in both `home` and `hotels` namespaces
- WHEN `next-intl` resolves each key in context
- THEN the correct namespace-specific value is returned
