# Delta for corporate-site-structure

## MODIFIED Requirements

### Requirement: Page Routing

The project MUST provide page stubs under `src/app/[locale]/`: `page.tsx` (Home), `about/page.tsx`, `contact/page.tsx`, `services/page.tsx`, `hotels/page.tsx`, `partners/page.tsx`, and `case-studies/page.tsx`. The system MUST expose `POST /api/contact` for form submissions.
(Previously: four routes — Home, About, Services, Contact. No API route.)

#### Scenario: Home page renders at `/en/` and `/es/`

- GIVEN the dev server is running
- WHEN a user navigates to `/en/` or `/es/`
- THEN the Home page stub renders with the correct locale

#### Scenario: All routes resolve in both locales

- GIVEN the dev server is running
- WHEN a user navigates to `/en/about`, `/es/contact`, `/en/services`, `/en/hotels`, `/es/partners`, or `/en/case-studies`
- THEN the requested page stub renders without 404 errors

#### Scenario: Contact API accepts submissions

- GIVEN a user submits a valid contact form payload
- WHEN `POST /api/contact` receives the request
- THEN a 200 response is returned and the message is forwarded via email

### Requirement: Shared Layout

The project MUST provide a root locale layout with a Header (dual-audience navigation with buyer and partner paths, plus LanguageSwitcher) and a Footer rendered on every page.
(Previously: Header with simple nav links + LanguageSwitcher, no audience segmentation.)

#### Scenario: Dual-audience nav renders on all pages

- GIVEN a user is on any page route
- WHEN the page renders
- THEN the Header shows buyer-focused and partner-focused navigation paths plus LanguageSwitcher

#### Scenario: Navigation links respect current locale and audience path

- GIVEN a user is on `/es/hotels`
- WHEN they click a navigation link
- THEN the link target includes the `/es/` prefix and correct audience path

## ADDED Requirements

### Requirement: Contact API Route

The system MUST provide a `POST /api/contact` route that validates fields (name, email, message), rate-limits requests, and forwards the payload to a configured email service.

#### Scenario: Invalid form fields return 400

- GIVEN a user submits a contact form with missing or invalid email
- WHEN `POST /api/contact` processes the request
- THEN a 400 response is returned with field-level error details

#### Scenario: Rate limit exceeded returns 429

- GIVEN a client exceeds the rate limit threshold within a window
- WHEN `POST /api/contact` receives the request
- THEN a 429 response is returned
