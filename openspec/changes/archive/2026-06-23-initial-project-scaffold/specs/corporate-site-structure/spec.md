# Corporate Site Structure Specification

## Purpose

Define the project scaffold: page routing via `[locale]` route group and shared layout components for the Hotel Market Pro corporate website.

## Requirements

### Requirement: Page Routing

The project MUST provide four page stubs under `src/app/[locale]/`: `page.tsx` (Home), `about/page.tsx`, `contact/page.tsx`, and `services/page.tsx`.

#### Scenario: Home page renders at `/en/` and `/es/`

- GIVEN the dev server is running
- WHEN a user navigates to `/en/` or `/es/`
- THEN the Home page stub renders with the correct locale

#### Scenario: All routes resolve in both locales

- GIVEN the dev server is running
- WHEN a user navigates to `/en/about`, `/es/contact`, or `/en/services`
- THEN the requested page stub renders without 404 errors

### Requirement: Shared Layout

The project MUST provide a root locale layout with a Header (navigation links + LanguageSwitcher) and a Footer rendered on every page.

#### Scenario: Header and Footer appear on all pages

- GIVEN a user is on any page route
- WHEN the page renders
- THEN the Header with nav links and LanguageSwitcher and the Footer are visible

#### Scenario: Navigation links respect current locale

- GIVEN a user is on `/es/`
- WHEN they click a navigation link
- THEN the link target includes the `/es/` prefix (e.g., `/es/about`)
