# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Viador Partners (viadorpartners.com) — a real estate investor financing website for DSCR loans, fix & flip bridge loans, and Business Purpose Loans. Licensed mortgage brokerage operating in Florida and Ohio.

## Architecture

This is a **static site with no build system** — plain HTML, CSS, and vanilla JS. No frameworks, no bundler, no package manager.

- **~90 HTML pages**: Each page is a standalone `.html` file in the repo root (no subdirectories). Pages share the same nav/footer markup copy-pasted across files.
- **`styles.css`**: Single shared stylesheet using CSS custom properties (design tokens in `:root`). Fonts: Fraunces (display), DM Sans (body), DM Mono (labels) loaded via Google Fonts.
- **`script.js`**: Shared JS — nav scroll behavior, mobile burger menu, two-step deal form with HubSpot submission, DSCR calculator, fix & flip analyzer, scroll reveal animations, sticky mobile CTA.
- **`sitemap.xml`**: Manually maintained sitemap for all pages.
- **`llms.txt`**: AI crawler reference file with company/product details.

## Key Integrations

- **HubSpot Forms API**: Deal submission form posts to HubSpot (portal ID and form GUID in `script.js` lines 63-64).
- **Schema.org structured data**: JSON-LD blocks in HTML `<head>` for SEO (FinancialService, FAQPage, etc.).
- **Google Fonts**: Loaded via `@import` in `styles.css` line 7.

## Development

No build/lint/test commands exist. To develop:
- Open any `.html` file directly in a browser, or use a local server (`python -m http.server` or VS Code Live Server).
- Changes to `styles.css` and `script.js` apply across all pages that reference them.

## Deployment

Files are uploaded directly to the repo root (see `DEPLOY-NOTES.txt`). The site is served as static files.

## Common Page Structure

All content pages follow the same pattern: full `<head>` with SEO meta/OG tags/structured data, shared nav, hero section, content sections on alternating `--cream`/`--cream-dark` backgrounds, deal form (HubSpot-connected), footer. The nav and footer HTML are duplicated in every file — there is no templating system, so changes to shared elements must be applied to all pages.

## CSS Design Tokens

Color palette uses `--cream`, `--ink`, `--gold` variants. Key breakpoint: most responsive adjustments happen via `clamp()` and media queries within `styles.css`. The `--max: 1160px` token controls content width.
