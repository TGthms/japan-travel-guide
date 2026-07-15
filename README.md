<p align="center">
  <strong>Japan Travel Guide</strong>
</p>

<p align="center">
  A practical multi-city Japan travel guide — destinations, routes, transport, tools, gallery, and legal pages.
  Static site architecture aligned with the USA Travel Guide core technology.
</p>

<p align="center">
  <a href="https://tgthms.github.io/japan-travel-guide/"><strong>🔗 Live site</strong></a>
  ·
  <a href="https://github.com/TGthms/japan-travel-guide">GitHub</a>
</p>

---

## Core technology (same model as USA guide)

| | |
|---|---|
| **Static multi-page** | No bundler. Classic `<script>` tags (not ES modules). |
| **Layout** | `src/css/styles.css` · `src/js/app.js` · `src/js/data/*` |
| **Serve** | `npm run serve` → http://127.0.0.1:8000/ |
| **Deploy** | GitHub Pages from `main` (`https://tgthms.github.io/japan-travel-guide/`). Private `tools/` is gitignored and never published. |
| **Preferences** | `safeStorage` + `jtg-preferences` (language, units, theme, motion) |
| **Motion** | Full / Reduced / Off (+ OS `prefers-reduced-motion`) |
| **i18n** | EN · 日本語 · 简体中文 via `src/js/data/i18n.js` |

### Project layout

| Path | Role |
|------|------|
| `index.html` · `gallery.html` · `tools.html` · `privacy.html` · `terms.html` | Site pages (repo root for GitHub Pages) |
| `cities/*.html` | 14 destination pages with local design themes |
| `src/css/styles.css` | Shared styles |
| `src/css/cities/` | Per-city visual languages |
| `src/js/app.js` | Bootstrap, ENV, safeStorage, motion |
| `src/js/data/i18n.js` | Translation dictionary |
| `src/js/*.js` | Feature modules (settings, gallery, tools, …) |
| `assets/gallery/` | Gallery originals · medium · thumbs · `gallery.json` |
| `tools/` | **Private** Gallery Manager (not published) |
| `Add Photos.command` | Local launcher for Gallery Manager |

```bash
npm run serve
# → http://127.0.0.1:8000/
```

Gallery Manager (local only):

```bash
python3 tools/gallery_manager.py
# or double-click Add Photos.command
```

---

## Features

- 14 city guides with distinct themes  
- Interactive map, routes, seasons, festivals, FAQ, fun facts  
- Travel Tools: budget, packing, currency, clocks, tax, JR Pass, rail estimates, emergencies  
- Photo gallery (thumb / medium / full)  
- Privacy Policy & Terms of Use  
- Official JNTO resource links  

---

## License

MIT — see [LICENSE](LICENSE).
