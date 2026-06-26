# Site Navigation Specification

## Purpose

Define the dual-audience information architecture and navigation component behavior for all viewports and locales.

## Requirements

### Requirement: Navigation Tree

The Header MUST present two audience paths: corporate buyer path (Home, Hotels, Services, About, Contact) and hotel partner path (Partners, Case Studies, About, Contact). Both paths MUST share a common top-level segmented nav (Buyers / Partners toggle) plus LanguageSwitcher.

#### Scenario: Buyer nav path renders

- GIVEN a user selects "Buyers" in the segmented nav
- WHEN the navigation renders
- THEN links for Home, Hotels, Services, About, and Contact are displayed

#### Scenario: Partner nav path renders

- GIVEN a user selects "Partners" in the segmented nav
- WHEN the navigation renders
- THEN links for Partners, Case Studies, About, and Contact are displayed

### Requirement: Mobile Navigation

On mobile viewports (≤768px), the navigation MUST collapse into a hamburger menu. Opening the menu MUST reveal the segmented nav toggle and full link tree for the selected audience.

#### Scenario: Hamburger menu opens correctly

- GIVEN a user on a mobile device views any page
- WHEN they tap the hamburger icon
- THEN a full-screen nav overlay appears with the audience toggle and navigation links

#### Scenario: Audience toggle switches nav links on mobile

- GIVEN a mobile user opens the nav overlay on "Buyers"
- WHEN they tap "Partners" in the segmented toggle
- THEN the link list updates to show the partner path without closing the overlay

### Requirement: Footer Navigation

The Footer MUST include links to all pages grouped by audience, plus legal links (Privacy, Terms), LanguageSwitcher, and social/contact links.

#### Scenario: Footer renders complete site map

- GIVEN a user scrolls to the Footer on any page
- WHEN the Footer renders
- THEN buyer links, partner links, legal links, and LanguageSwitcher are all present
