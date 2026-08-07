# Architecture — Japan Travel Guide

Static multi-page site.

| | |
|--|--|
| **Primary host** | [https://traveljapan.pages.dev](https://traveljapan.pages.dev/) (Cloudflare Pages) |
| **Backup** | [tgthms.github.io/japan-travel-guide](https://tgthms.github.io/japan-travel-guide/) (GitHub Pages) |

No bundler at runtime. Patterns aligned with the USA Travel Guide (stroke icons, contextual Back, Open-Meteo weather mini-app, SEO files).

## Layout

```
*.html · cities/ · assets/
src/css/styles.css · icons.css · weather.css · weather-app.css · cities/*
src/js/data/i18n.js · weather.js · nav-return.js · app.js · …
tools-weather.html   # weather mini-app (Open-Meteo only)
scripts/generate_city_pages.py
robots.txt · sitemap.xml
tools/               # Gallery Manager (local; stripped on Pages deploy)
```

## Weather

- Ported from USA `tools-weather.html` + `weather.js` UI/structure
- **Open-Meteo only** (forecast, geocode, air quality) — no NWS
- Japan major cities as the default list
- Units follow JTG Settings (°C/°F, km/mi)

## Script order (weather page)

`data/i18n → settings → i18n → units → nav → weather → nav-return → app`

## Gallery Manager

Local: `python3 tools/gallery_manager.py` or Add Photos.command.  
Stripped in `.github/workflows/static.yml` before GitHub Pages publish.
