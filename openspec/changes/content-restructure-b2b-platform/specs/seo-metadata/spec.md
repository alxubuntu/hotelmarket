# Delta for seo-metadata

## ADDED Requirements

### Requirement: New Page Metadata

The Hotels, Partners, and Case Studies pages MUST each export a `generateMetadata` function returning locale-specific `title` and `description` sourced from translation messages under their respective namespaces.

#### Scenario: Hotels page has localized metadata

- GIVEN a user requests `/en/hotels`
- WHEN `generateMetadata` executes
- THEN the `<title>` is "Hotels for Corporate Groups — Hotel Market Pro" and `<meta name="description">` contains the English buyer description

#### Scenario: Partners page has localized metadata

- GIVEN a user requests `/es/partners`
- WHEN `generateMetadata` executes
- THEN the `<title>` is "Socios Hoteleros — Hotel Market Pro" and `<meta name="description">` contains the Spanish partner description

#### Scenario: Case Studies page metadata

- GIVEN a user requests `/en/case-studies`
- WHEN `generateMetadata` executes
- THEN the `<title>` is "Case Studies — Hotel Market Pro" and the description reflects success stories content

### Requirement: Language Alternates for New Pages

The root locale layout MUST declare `alternates.languages` for all seven routes, including Hotels (`/en/hotels` ↔ `/es/hoteles`), Partners (`/en/partners` ↔ `/es/partners`), and Case Studies (`/en/case-studies` ↔ `/es/casos-de-exito`).

#### Scenario: All new routes have language alternates

- GIVEN a browser inspects `<head>` on `/en/hotels`
- WHEN checking `alternates`
- THEN `alternates.languages` includes `"en": "/en/hotels"` and `"es": "/es/hoteles"`
