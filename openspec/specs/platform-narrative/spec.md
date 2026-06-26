# Platform Narrative Specification

## Purpose

Define the dual-audience brand story, value proposition, and trust signals that position Hotel Market Pro as the bridge between corporate buyers and hotel partners.

## Requirements

### Requirement: Dual Value Proposition

The Home page MUST present two clear value propositions: corporate buyers find hotels for groups/events in ≤3 clicks; hotel partners increase occupancy through corporate bookings. Both propositions MUST appear above the fold.

#### Scenario: Corporate buyer sees demand-side value

- GIVEN a corporate buyer visits `/en/`
- WHEN the HeroSection renders
- THEN the buyer-focused CTA reads "Find Group Hotels" with a subtitle about 3-click search

#### Scenario: Hotel partner sees supply-side value

- GIVEN a hotelier visits `/en/`
- WHEN the HeroSection renders
- THEN the partner-focused CTA reads "List Your Hotel" with a subtitle about occupancy growth

### Requirement: Trust Signals

The site MUST display trust signals on the Home page and Contact page: security badges (SSL, data protection), partner count or reach statistic, and a satisfaction guarantee statement.

#### Scenario: Trust badges render on Contact page

- GIVEN a user navigates to `/en/contact`
- WHEN the page renders
- THEN security badges and a satisfaction guarantee statement are visible near the form
