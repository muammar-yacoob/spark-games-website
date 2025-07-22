# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Spark Games website - a static HTML site showcasing games and developer tools. The site uses a modular approach with separate content files loaded dynamically via JavaScript.

## Architecture

### Content Structure
- Main entry point: `index.html`
- Content sections are loaded dynamically from separate HTML files:
  - `games-content.html`
  - `tools-content.html`
  - `about-content.html`
  - `contact-content.html`
  - `careers-content.html`
- Content is loaded via `assets/js/load-sections.js`

### Styling
- SASS source files in `assets/sass/`
- Compiled CSS in `assets/css/main.css` and `assets/css/noscript.css`
- No build process configured - CSS appears to be pre-compiled

### Key JavaScript Files
- `assets/js/load-sections.js` - Loads content sections dynamically
- `assets/js/form-handler.js` - Handles contact form (uses EmailJS)
- `assets/js/seasonal-banner.js` - Manages seasonal promotional banners
- `assets/js/ad-banner-fade.js` - Banner rotation/animation
- `assets/js/main.js` - Main site functionality

## Deployment

The site is deployed to GitHub Pages via GitHub Actions:
- Workflow: `.github/workflows/deploy_website.yml`
- Deploys on push to `main` branch
- Replaces EmailJS API key placeholder during deployment
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

- EmailJS integration uses a placeholder API key that gets replaced during deployment
- The site loads all content sections on page load (no routing)
- Seasonal banners are managed through `assets/js/seasonal-banner.js`
- Images for affiliate banners are in `images/AffiliateBanners/`
- The site supports both light and dark themes