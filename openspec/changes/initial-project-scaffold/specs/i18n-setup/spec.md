# i18n Setup Specification

## Purpose

Define the internationalization layer: next-intl integration, locale-based routing, and translation files for English and Spanish.

## Requirements

### Requirement: Locale Routing

The system MUST route incoming requests to the correct locale using next-intl middleware. Supported locales are `en` and `es`; `en` is the default.

#### Scenario: Root path redirects to default locale

- GIVEN a user visits `/`
- WHEN the middleware processes the request
- THEN the user redirects to `/en/`

#### Scenario: Explicit locale routes correctly

- GIVEN a user visits `/es/contact`
- WHEN the middleware processes the request
- THEN the Contact page renders with Spanish locale

#### Scenario: Unsupported locale returns 404

- GIVEN a user visits `/fr/services`
- WHEN the middleware processes the request
- THEN a 404 response is returned

### Requirement: Translation Files

The system MUST provide `en.json` and `es.json` message files under `src/messages/` covering navigation labels, page headings, and placeholder body text for both locales.

#### Scenario: Translations serve correct locale

- GIVEN a user is on `/es/`
- WHEN the page renders
- THEN all translatable strings come from `es.json`

#### Scenario: Missing key does not crash

- GIVEN a translation key is absent from the active locale file
- WHEN `next-intl` resolves the key
- THEN the system SHOULD render the English fallback value without throwing
