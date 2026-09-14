# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Spark Games website - a static HTML site showcasing games and developer tools. The site uses a modular approach with separate content files loaded dynamically via JavaScript.

## There are two Spark sites. This is one of them.

The newer **spark-apps-website** repo (`~/projects/spark-apps-website`) serves
**https://spark-apps.co** - a Next.js site on Vercel. It is not a replacement for
this one and this repo is not deprecated. The two split by subject:

| | spark-games.co.uk (here) | spark-apps.co |
|---|---|---|
| Owns | Games, Unity/Blender dev tools, and the pre-2026 back-catalogue | Apps, SaaS, developer tooling |
| Stack | Static HTML/SASS, GitHub Pages | Next.js, Vercel |
| Catalogue source | `products.json` | `lib/data/apps.ts` |

**Every product belongs to exactly one of the two.** Both sites used to list Full
House, Bottled, QuickPeek, Spark AI, PicLet, VidLet and Flexcel; those entries
were removed from here in favour of spark-apps.co, which took the Mobile Apps
category with them. Before adding a product to `products.json`, check it is not
already in the other repo's `lib/data/apps.ts`, and vice versa. Each site links
to the other from its nav.

## Architecture

### Content Structure
- Main entry point: `index.html`
- Product data driven by `products.json` with categories:
  - Games, Game Dev Tools, Chrome Extensions, SaaS Apps, Others
- Static content files:
  - `about-content.html` - About section
  - `team.json` - Team member data
- Shareable app pages in `apps/` folder. `apps/full-house.html` is now only a
  redirect to spark-apps.co, kept so existing shares and search results resolve.
- Content is loaded via `assets/js/load-sections.js`

### Styling
- SASS source files in `assets/sass/`
- Compiled CSS in `assets/css/main.css` and `assets/css/noscript.css`
- No build process configured - CSS appears to be pre-compiled

### Key JavaScript Files
- `assets/js/load-sections.js` - Loads content sections dynamically
- `assets/js/form-handler.js` - Handles contact form (uses Resend API)
- `assets/js/seasonal-banner.js` - Manages seasonal promotional banners
- `assets/js/ad-banner-fade.js` - Banner rotation/animation
- `assets/js/main.js` - Main site functionality

## Deployment

The site is deployed to GitHub Pages via GitHub Actions:
- Workflow: `.github/workflows/deploy_website.yml`
- Deploys on push to `main` branch
- Replaces Resend API key placeholder during deployment
- DNS configured to point to GitHub Pages (see README.md)

## Development Commands

### Local Development
Since this is a static site with no build process:
```bash
# Serve locally with any static server, e.g.:
python -m http.server 8000
# or
npx http-server
```

### Working with SASS
The SASS files are pre-compiled. If you need to modify styles:
- Edit SASS files in `assets/sass/`
- You'll need to compile them to CSS manually (no build script exists)
- Main entry points: `assets/sass/main.scss` and `assets/sass/noscript.scss`

## Important Notes

- Resend API integration with 10MB file upload support and professional email delivery
- The site loads all content sections on page load (no routing)
- Seasonal banners are managed through `assets/js/seasonal-banner.js`
- Images for affiliate banners are in `images/AffiliateBanners/`
- The site supports both light and dark themes