# Delta for placeholder-content

## REMOVED Requirements

### Requirement: Stub Sections

(Reason: All placeholder sections are replaced with real content components that serve actual B2B platform messaging.)
(Migration: HeroSection → DualAudienceHero, ServicesGrid → PlatformFeatures, ContactForm → ValidatedContactForm)

### Requirement: Page Copy

(Reason: Lorem Ipsum page copy replaced with persuasive, audience-specific content in translation files.)
(Migration: Translation keys rewritten and extended per page; old keys removed from `en.json` and `es.json`)

## ADDED Requirements

### Requirement: Dual-Audience Hero

The system MUST render a HeroSection on the Home page that presents two distinct value propositions — one for corporate buyers and one for hotel partners — with separate CTAs for each audience.

#### Scenario: Hero shows both audience paths

- GIVEN a user visits the Home page
- WHEN the HeroSection renders
- THEN both a "Find Hotels" CTA and a "Partner With Us" CTA are visible with audience-specific copy

#### Scenario: Mobile hero stacks vertically

- GIVEN a user visits the Home page on a mobile viewport
- WHEN the HeroSection renders
- THEN the two audience blocks stack vertically without overlap

### Requirement: Platform Features Grid

The system MUST render a features section on the Home and Services pages that showcases B2B platform capabilities: group booking, corporate packages, partner benefits, and event services.

#### Scenario: Feature cards link to relevant pages

- GIVEN a user views a feature card about group booking
- WHEN they click the card or its CTA
- THEN they navigate to the relevant buyer or partner page

### Requirement: Validated Contact Form

The system MUST render a contact form on the Contact page with client-side validation (name, email, message) and submit to `POST /api/contact`.

#### Scenario: Form submits successfully

- GIVEN a user fills all required fields with valid data
- WHEN they click Submit
- THEN the form sends the payload to `/api/contact` and shows a success message

#### Scenario: Empty fields show validation errors

- GIVEN a user clicks Submit without filling required fields
- THEN inline validation errors appear next to each empty field
