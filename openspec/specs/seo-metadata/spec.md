# SEO Metadata Specification

## Purpose

Define the SEO metadata requirements: localized title/description via `generateMetadata`, `metadataBase`, and language alternates.

## Requirements

### Requirement: Localized Metadata

Each page MUST export a `generateMetadata` function returning locale-specific `title` and `description` sourced from translation messages.

#### Scenario: English metadata from en.json

- GIVEN a user requests `/en/services`
- WHEN `generateMetadata` executes
- THEN the `<title>` is "Our Services — Hotel Market Pro" and `<meta name="description">` contains the English description

#### Scenario: Spanish metadata from es.json

- GIVEN a user requests `/es/servicios`
- WHEN `generateMetadata` executes
- THEN the `<title>` is "Nuestros Servicios — Hotel Market Pro" and `<meta name="description">` contains the Spanish description

### Requirement: Metadata Base and Language Alternates

The root locale layout MUST set `metadataBase` to the production URL and declare `alternates.languages` with canonical paths for both `en` and `es`.

#### Scenario: Language alternates declared in `<head>`

- GIVEN a browser inspects `<head>` on `/en/about`
- WHEN checking the `alternates` metadata
- THEN `alternates.languages` includes `"en": "/en/about"` and `"es": "/es/about"`

#### Scenario: metadataBase is set

- GIVEN any page renders
- WHEN `metadataBase` is inspected
- THEN it resolves to the configured production URL
