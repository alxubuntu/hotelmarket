# Placeholder Content Specification

## Purpose

Define the Lorem Ipsum placeholder content for all page stubs and reusable section components (HeroSection, ServicesGrid, ContactForm).

## Requirements

### Requirement: Stub Sections

The system MUST provide three reusable section components under `src/components/sections/` — HeroSection, ServicesGrid, and ContactForm — rendered as static markup with placeholder text.

#### Scenario: HeroSection renders on Home page

- GIVEN a user visits the Home page in either locale
- WHEN the page renders
- THEN a HeroSection is visible with a placeholder heading, subheading, and CTA button

#### Scenario: ServicesGrid renders placeholder cards

- GIVEN a user visits the Home or Services page
- WHEN the page renders
- THEN a grid of service cards is shown with Lorem Ipsum descriptions

#### Scenario: ContactForm renders stub UI

- GIVEN a user visits the Contact page
- WHEN the page renders
- THEN a ContactForm is visible with name, email, message fields and a submit button (no validation logic attached)

### Requirement: Page Copy

Each page stub MUST display page-specific Lorem Ipsum copy (headings + body) served from the active locale's translation file.

#### Scenario: Locale-specific copy per page

- GIVEN a user switches from `/en/` to `/es/`
- WHEN the Home page re-renders
- THEN the heading and body text update to Spanish placeholder content
