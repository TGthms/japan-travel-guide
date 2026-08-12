# Architecture — Japan Travel Guide

Static multi-page site. No bundler at runtime.

| | |
|--|--|
| **Primary** | https://traveljapan.pages.dev/ (Cloudflare Pages) |
| **Backup** | https://tgthms.github.io/japan-travel-guide/ (GitHub Pages) |

Quality bar: [USA Travel Guide](https://github.com/TGthms/usa-travel-guide) — same chrome, core runtime, tools hub, and fail-soft features. Japan keeps city pages, Open-Meteo weather, JR/tax/budget/packing, and EN/JA/zh-CN.

## Layout

```
*.html · cities/
src/css/
  styles.css          # ordered @import barrel (only sheet pages need)
  site.css            # design system + city/home/legacy
  chrome.css          # mini-app bar, settings z-index
  tools.css           # tools hub cards
  tools-miniapp.css   # dedicated tool layouts
  gallery-app.css
  weather.css · weather-app.css
  motion-levels.css
  cities/*            # per-city skins
src/js/
  data/i18n.js
  core/env.js · core/nav-return.js
  settings.js · i18n.js · nav.js · app.js
  features: gallery.js · weather.js · budget.js · packing.js · tools.js
tools/                # Gallery Manager (tracked; stripped on public deploy)
scripts/generate_city_pages.py · build_pages.py · smoke-check.mjs
```

## Script load order

Classic `defer` scripts. Core triad on every page:

`data/i18n.js` → `settings.js` → `i18n.js` → `units.js` → **`core/env.js`** → **`core/nav-return.js`** → `nav.js` → page features → `app.js`

`nav-return.js` is **path-based** (like USA): `tools.html` is the hub; `tools-*.html` are mini-apps. City pages stamp as `city` so Back can return to that city.

## Tools

Hub: `tools.html` (cards only)

Mini-apps:

- `tools-weather.html` — Open-Meteo (Japan majors + world search)
- `tools-budget.html`
- `tools-packing.html`
- `tools-currency.html`
- `tools-clock.html`
- `tools-tax.html`
- `tools-rail.html` — JR Pass sense-check + shinkansen estimates
- `tools-emergency.html`

`tools-utilities.html` remains as a combined bookmark URL.

## CSS

Pages load **only** `src/css/styles.css`. Import order is the cascade. City pages add `src/css/cities/{id}.css`.

Z-index contract (see `chrome.css`): header 200, settings overlay 12000 / panel 12010, lightbox 11000.

## Gallery

- USA-style **HTML items** in `#gallery-grid` + `<!-- GALLERY_MANAGER_INSERT -->`
- `gallery.js` is **DOM-first** (never rebuilds tiles). Masonry reparents `.gallery-item` only.
- Lightbox: thumb → medium → optional full (`originals/`). Video via `data-video`.
- Deep link: `gallery.html?photo=slug`
- Manager (`python3 tools/gallery_manager.py`, port 8787): writes `originals/` + `medium/` + `thumbs/` (+ WebP when Pillow is available), HTML items, ja/zh-CN caption keys, and `gallery.json`
- Japan GPS fallback places — not US cities

## Motion

User **Full** always wins over OS `prefers-reduced-motion`. Constrained viewports force Reduced.

## Deploy

GitHub Actions strips `tools/` and `Add Photos.command` before Pages publish.  
Do the same on Cloudflare if publishing the full tree.
