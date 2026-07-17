<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&height=300&color=gradient&text=Japan%20Travel%20Guide&animation=fadeIn"/>
</p>

<p align="center">
  <a href="README.md">English</a> ·
  <a href="docs/i18n/README.zh.md">中文</a> ·
  <a href="docs/i18n/README.ja.md">日本語</a>
</p>

<p align="center">
  A practical multi-city Japan travel guide — 14 destination cities, routes, transport, seasons, festivals, a photo gallery, dedicated travel tools, fun facts, and planning essentials grounded in how people actually travel Japan.
</p>

<p align="center">
  <a href="https://tgthms.github.io/japan-travel-guide/"><strong>🔗 Try it out</strong></a>
</p>

---

## ✨ Features

| | |
|---|---|
| 🏙️ **14 city guides** | Tokyo, Kyoto, Osaka, Nara, Hiroshima, Yokohama, Hakone, Nikko, Kanazawa, Sapporo, Fukuoka, Kobe, Nagasaki, and Okinawa — each with its own look and practical tips. |
| 🗺️ **Map, routes & seasons** | Interactive destination map, sample itineraries, when to go, and festival highlights. |
| 🖼️ **Photo gallery** | Filterable trip photography with quality tiers (thumbnail / medium / full) and lightbox. |
| 🧰 **Travel tools** | Budget planner, packing list, currency conversion, clocks, tax, JR Pass helpers, rail estimates, and emergency numbers. |
| 🚆 **Transport know-how** | IC cards, shinkansen basics, and official JR / rail resource pointers. |
| 🎲 **Japan fun facts** | One shuffled fact at a time — trivia in every language. |
| 🌐 **Multi-language** | English, 日本語, and 简体中文 across the guide (including legal pages). |
| ⚙️ **Personalization** | Language, units (°C/°F, km/mi), theme, and motion preferences — saved on your device. |
| ♿️ **Animations: Full / Reduced / Off** | Accessibility-first motion levels. Respects OS “prefers reduced motion.” |
| 📱 **Mobile-ready** | Responsive layouts and performance-friendly interactions. |
| 🔒 **Privacy & terms** | On-site [Privacy Policy](privacy.html) and [Terms of Use](terms.html). |
| 🔗 **Official resources** | Links toward JNTO and other official travel references for verification. |

---

Main pages: `index.html` · `gallery.html` · `tools.html` · `privacy.html` · `terms.html` · `cities/*`

Local preview from the repo root:

```bash
npm run serve
# → http://127.0.0.1:8000/
```

---


## Project structure

```
index.html · gallery.html · tools.html · privacy.html · terms.html
cities/                 # 14 city guides (generated)
src/css/styles.css      # shared design system + release locks
src/css/cities/         # per-city theme skins
src/js/                 # classic JTG modules (no bundler)
src/js/data/i18n.js     # EN / JA / zh-CN strings + city content
assets/                 # icons + gallery media
scripts/generate_city_pages.py
```

Regenerate city pages after template changes:

```bash
npm run generate:cities
```

## 💬 Feedback

This is an interest-driven personal project — bug reports and suggestions are welcome!

📧 **contact.timg@icloud.com**

---

## 📄 License and legal

- **Code:** MIT — see [LICENSE](LICENSE).
- **Fonts (web):** Loaded from Google Fonts — open-licensed families for Latin, Japanese, and Simplified Chinese text.
- **Site policy:** [Privacy Policy](privacy.html) · [Terms of Use](terms.html)
