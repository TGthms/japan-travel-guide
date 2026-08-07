# Architecture — Japan Travel Guide

Static multi-page site.

| | |
|--|--|
| **Primary** | https://traveljapan.pages.dev/ (Cloudflare Pages) |
| **Backup** | https://tgthms.github.io/japan-travel-guide/ (GitHub Pages) |

## Layout

```
*.html · cities/ · assets/
src/css/
  styles.css          # core + release/production locks
  icons.css           # stroke toolbar icons
  weather.css · weather-app.css
  cities/*            # per-city skins
src/js/
  data/i18n.js
  gallery.js · weather.js · budget.js · packing.js · …
  nav.js · nav-return.js · app.js
tools/                # Gallery Manager (tracked; stripped on public deploy)
  gallery_manager.py · README.md
scripts/generate_city_pages.py · smoke-check.mjs
robots.txt · sitemap.xml
```

## Tools

Hub: `tools.html`  
Mini-apps: `tools-weather.html`, `tools-budget.html`, `tools-packing.html`, `tools-utilities.html`

## Gallery

- USA-style **HTML items** in `#gallery-grid` + `<!-- GALLERY_MANAGER_INSERT -->`
- `gallery.js` prefers DOM items (works on `file://`); falls back to `gallery.json`
- Video-capable lightbox (`#lightboxVideo`)
- Manager: `python3 tools/gallery_manager.py` (photos + videos)

## Deploy

GitHub Actions strips `tools/` and `Add Photos.command` before Pages publish.  
Do the same on Cloudflare if publishing the full tree.
