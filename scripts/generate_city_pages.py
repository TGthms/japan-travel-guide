#!/usr/bin/env python3
"""
Generate all city guide HTML pages from a single template.

Run from repo root:
  python3 scripts/generate_city_pages.py

City pages are static HTML for GitHub Pages. Keeping one generator avoids
drift across 14 nearly-identical files.
"""

from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "cities"
VERSION = "ios-nav1"

# id, display name, extra body classes, distance km from Tokyo, temp min/max °C, hero photo
CITIES: list[tuple[str, str, str, int, int, int, str | None]] = [
    ("tokyo", "Tokyo", "city-theme-dark", 0, 8, 30, "Tokyo.jpg"),
    ("kyoto", "Kyoto", "", 365, 5, 32, "Kyoto.jpg"),
    ("osaka", "Osaka", "", 400, 6, 33, "Osaka.jpg"),
    ("nara", "Nara", "", 390, 5, 32, "Nara.jpg"),
    ("hiroshima", "Hiroshima", "", 700, 6, 31, None),
    ("yokohama", "Yokohama", "", 30, 7, 30, None),
    ("hakone", "Hakone", "", 90, 3, 26, "Hakone.jpg"),
    ("nikko", "Nikko", "city-theme-dark", 140, 1, 25, None),
    ("kanazawa", "Kanazawa", "", 300, 3, 30, None),
    ("sapporo", "Sapporo", "", 830, -4, 26, None),
    ("fukuoka", "Fukuoka", "", 890, 7, 32, None),
    ("kobe", "Kobe", "", 430, 6, 32, "Kobe.jpg"),
    ("nagasaki", "Nagasaki", "", 1000, 7, 31, None),
    ("okinawa", "Okinawa", "", 1550, 17, 32, None),
]

FONT_LINKS = """  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;600;700&family=Noto+Serif+JP:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet" />
"""

THEME_BOOT = """  <script>
  (function () {
    try {
      var p = JSON.parse(localStorage.getItem("jtg-preferences") || "{}");
      var theme = p.theme || "auto";
      var resolved = theme === "auto"
        ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
        : theme;
      document.documentElement.setAttribute("data-theme", resolved);
      var motion = p.motion || "full";
      if (motion !== "full" && motion !== "reduced" && motion !== "off") motion = "full";
      document.documentElement.setAttribute("data-motion", motion);
      var osReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      var eff = motion === "off" ? "off" : ((motion === "reduced" || osReduce) ? "reduced" : "full");
      document.documentElement.setAttribute("data-motion-effective", eff);
      if (p.lang) document.documentElement.lang = p.lang === "zh-CN" ? "zh-CN" : p.lang;
    } catch (e) {}
  })();
  </script>
"""


def options_html(current_id: str) -> str:
    lines = []
    for cid, name, *_ in CITIES:
        sel = " selected" if cid == current_id else ""
        lines.append(f'                <option value="{cid}.html"{sel}>{name}</option>')
    return "\n".join(lines)


def switcher_html(current_id: str) -> str:
    chips = []
    for cid, name, *_ in CITIES:
        if cid == current_id:
            chips.append(
                f'          <span class="city-switcher__chip is-current" aria-current="page">'
                f'<span data-i18n="cities.{cid}.name">{name}</span></span>'
            )
        else:
            chips.append(
                f'          <a class="city-switcher__chip" href="{cid}.html">'
                f'<span data-i18n="cities.{cid}.name">{name}</span></a>'
            )
    return "\n".join(chips)


def hero_media(name: str, photo: str | None) -> str:
    if not photo:
        return ""
    return f"""          <figure class="city-hero__media reveal">
            <img
              src="../assets/gallery/main/{photo}"
              alt="{name}"
              width="1200"
              height="800"
              loading="eager"
              decoding="async"
            />
            <figcaption class="city-hero__media-cap">
              <span aria-hidden="true">📍</span>
              <span>{name}</span>
            </figcaption>
          </figure>
"""


def render_city(
    cid: str,
    name: str,
    extra_cls: str,
    dist: int,
    tmin: int,
    tmax: int,
    photo: str | None,
) -> str:
    body_cls = f"city-{cid}" + (f" {extra_cls}" if extra_cls else "")
    hero_mod = "city-hero--with-photo" if photo else "city-hero--compact"
    media = hero_media(name, photo)

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <meta name="description" content="{name} travel guide — food, sights, transport, and practical tips for Japan." />
  <meta name="theme-color" content="#f5f2ef" media="(prefers-color-scheme: light)" />
  <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
  <meta name="color-scheme" content="light dark" />
  <title data-i18n="cities.{cid}.name">{name} · Japan Travel Guide</title>
  <link rel="icon" href="../assets/icons/logo.svg" />
{FONT_LINKS}  <link rel="stylesheet" href="../src/css/styles.css?v={VERSION}" />
  <link rel="stylesheet" href="../src/css/cities/{cid}.css?v={VERSION}" />
{THEME_BOOT}</head>
<body class="{body_cls}" data-page="city" data-city="{cid}">
  <a class="skip-link" href="#main" data-i18n="common.skipToContent">Skip to content</a>
  <div id="loader">
    <div class="loader__inner">
      <div class="loader__torii" aria-hidden="true"></div>
      <p class="loader__text" data-i18n="common.loading">Loading…</p>
    </div>
  </div>
  <div id="scroll-progress" aria-hidden="true"></div>

  <header class="site-header city-header">
    <div class="container nav">
      <a class="nav__brand" href="../index.html">
        <img class="nav__logo" src="../assets/icons/logo.svg" width="36" height="36" alt="" />
        <span class="nav__brand-text" data-i18n="meta.siteName">Japan Travel Guide</span>
      </a>
      <nav class="nav__links" id="city-nav" aria-label="City sections">
        <a href="#overview" data-i18n="common.overview">Overview</a>
        <a href="#food" data-i18n="common.foodGuide">Food</a>
        <a href="#attractions" data-i18n="common.attractions">Sights</a>
        <a href="#transport" data-i18n="common.transport">Getting around</a>
        <a href="#tips" data-i18n="common.travelTips">Tips</a>
        <a href="#other-cities" data-i18n="cityPage.otherCitiesShort">Cities</a>
        <div class="nav__drawer-sep" role="separator" aria-hidden="true"></div>
        <a class="nav__drawer-page" href="../gallery.html" data-i18n="nav.gallery">Gallery</a>
        <a class="nav__drawer-page" href="../tools.html" data-i18n="nav.tools">Tools</a>
      </nav>
      <div class="nav__actions">
        <a class="nav__page-link" href="../gallery.html" data-i18n="nav.gallery">Gallery</a>
        <a class="nav__page-link nav__tools" href="../tools.html" data-i18n="nav.tools">Tools</a>
        <button type="button" class="btn btn--secondary nav__settings-btn" data-open-settings data-i18n="nav.settings">Settings</button>
      </div>
      <button class="nav__toggle" type="button" aria-expanded="false" aria-controls="city-nav" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>

  <main id="main" tabindex="-1">
    <section class="city-hero {hero_mod}">
      <div class="container">
        <a class="city-back reveal" href="../index.html#destinations" data-city-back data-i18n="cityPage.back">← Back</a>
        <div class="city-hero__layout">
          <div class="city-hero__copy">
            <p class="section__eyebrow reveal" data-i18n="nav.destinations">Destinations</p>
            <h1 class="city-hero__title reveal"><span data-i18n="cities.{cid}.name">{name}</span></h1>
            <p class="city-hero__tagline section__desc reveal" data-i18n="cityContent.{cid}.tagline"></p>
            <div class="city-hero__meta reveal">
              <span class="chip"><span data-i18n="common.fromTokyo">From Tokyo</span>: <strong data-distance-km="{dist}">—</strong></span>
              <span class="chip chip--gold"><span data-i18n="common.weather">Weather</span>: <strong data-temp-c-min="{tmin}" data-temp-c-max="{tmax}">—</strong></span>
              <span class="chip"><span data-i18n="common.stay">Suggested stay</span>: <strong data-i18n="cityContent.{cid}.stay"></strong> <span data-i18n="common.days">days</span></span>
            </div>
            <div class="city-jump reveal">
              <label class="city-jump__label" for="city-jump-select" data-i18n="cityPage.switchCity">Switch city</label>
              <select id="city-jump-select" class="city-jump__select" aria-label="Switch city">
{options_html(cid)}
              </select>
            </div>
            <div class="city-stats reveal">
              <div class="card city-stat"><strong data-distance-km="{dist}">—</strong><span data-i18n="cityPage.distanceNote">Approx. from Tokyo Station</span></div>
              <div class="card city-stat"><strong data-i18n="cityContent.{cid}.budget">—</strong><span data-i18n="cityPage.budgetDay">per day</span></div>
              <div class="card city-stat"><strong data-temp-c-min="{tmin}" data-temp-c-max="{tmax}">—</strong><span data-i18n="cityPage.weatherAvg">Typical daytime range</span></div>
              <div class="card city-stat"><strong data-i18n="cityContent.{cid}.stay">—</strong><span data-i18n="common.stay">Suggested stay</span></div>
            </div>
          </div>
{media.rstrip()}
        </div>
      </div>
    </section>

    <section class="section" id="overview">
      <div class="container">
        <div class="city-overview-grid">
          <div class="reveal">
            <h2 class="section__title" data-i18n="common.overview">Overview</h2>
            <p class="city-prose mt-2" data-i18n="cityContent.{cid}.overview"></p>
            <h3 class="city-subhead mt-3" data-i18n="common.highlights">Highlights</h3>
            <ul class="tip-list mt-2" id="highlights-list"></ul>
          </div>
          <aside class="card card--solid city-fact-card reveal">
            <h3 data-i18n="common.bestTime">Best time</h3>
            <p class="card__text mt-1" data-i18n="cityContent.{cid}.bestTime"></p>
            <h3 class="mt-2" data-i18n="common.weather">Weather</h3>
            <p class="card__text mt-1" data-i18n="cityContent.{cid}.weather"></p>
            <h3 class="mt-2" data-i18n="cityPage.gettingThere">Getting there</h3>
            <p class="card__text mt-1" data-i18n="cityContent.{cid}.gettingThere"></p>
          </aside>
        </div>
      </div>
    </section>

    <section class="section section--alt" id="food">
      <div class="container">
        <header class="section__header reveal">
          <h2 class="section__title" data-i18n="common.foodGuide">Food</h2>
          <p class="section__desc" data-i18n="cityPage.foodIntro">What to try while you are here.</p>
        </header>
        <div class="dish-list" id="food-list"></div>
      </div>
    </section>

    <section class="section" id="attractions">
      <div class="container">
        <header class="section__header reveal">
          <h2 class="section__title" data-i18n="common.attractions">Sights</h2>
          <p class="section__desc" data-i18n="cityPage.sightsIntro">Places worth planning around.</p>
        </header>
        <div class="city-attr-grid" id="attr-list"></div>
      </div>
    </section>

    <section class="section section--alt" id="transport">
      <div class="container city-transport">
        <header class="section__header reveal">
          <h2 class="section__title" data-i18n="common.transport">Getting around</h2>
        </header>
        <div class="card city-transport-card reveal" data-i18n="cityContent.{cid}.transportLocal"></div>
      </div>
    </section>

    <section class="section" id="tips">
      <div class="container">
        <header class="section__header reveal">
          <h2 class="section__title" data-i18n="common.travelTips">Tips</h2>
        </header>
        <div class="tip-list tip-list--city" id="tips-list"></div>
        <div class="city-bottom-cta reveal">
          <a class="btn btn--primary" href="../tools.html" data-i18n="nav.tools">Travel tools</a>
          <a class="btn btn--secondary" href="../gallery.html" data-i18n="nav.gallery">Photo gallery</a>
        </div>
      </div>
    </section>

    <section class="section section--alt city-switcher-section" id="other-cities" aria-labelledby="other-cities-title">
      <div class="container">
        <header class="city-switcher__header reveal">
          <h2 class="city-switcher__title" id="other-cities-title" data-i18n="cityPage.otherCities">Other destinations</h2>
          <p class="city-switcher__desc" data-i18n="cityPage.otherCitiesDesc">Jump to another city guide without going back to the home page.</p>
        </header>
        <div class="city-switcher" role="navigation" aria-label="Other destinations">
{switcher_html(cid)}
        </div>
        <p class="city-switcher__all">
          <a href="../index.html#destinations" data-i18n="cityPage.viewAllDestinations">View all destinations overview →</a>
        </p>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="site-footer-inner container">
      <a href="../index.html" class="site-footer-brand">❀ <span data-i18n="meta.siteName">Japan Travel Guide</span></a>
      <p class="site-footer-tagline" data-i18n="footer.tagline">A practical multi-city planning companion for Japan trips.</p>
      <div class="site-footer-actions">
        <a href="https://tgthms.github.io/about/" class="footer-about-link" target="_blank" rel="noopener" data-i18n="footer.aboutMe">About Me</a>
        <a href="https://github.com/TGthms/japan-travel-guide" class="footer-github-link" target="_blank" rel="noopener">GitHub</a>
      </div>
      <div class="site-footer-meta">
        <p class="site-footer-copy" data-i18n="footer.copyright">© 2026 Japan Travel Guide · Created by Tim G</p>
        <div class="footer-legal-links" role="navigation" aria-label="Legal">
          <a href="../privacy.html" data-i18n="legal.privacyLink">Privacy Policy</a>
          <span class="footer-legal-sep" aria-hidden="true">·</span>
          <a href="../terms.html" data-i18n="legal.termsLink">Terms of Use</a>
        </div>
      </div>
    </div>
  </footer>

  <div class="settings-overlay" id="settings-overlay" data-close-settings></div>
  <aside class="settings-panel" id="settings-panel" aria-label="Settings">
    <div class="settings-panel__header">
      <h2 data-i18n="common.settingsTitle">Settings</h2>
      <button type="button" class="btn btn--icon btn--ghost" data-close-settings aria-label="Close">✕</button>
    </div>
    <div class="settings-group">
      <h3 data-i18n="common.language">Language</h3>
      <div class="settings-options">
        <button type="button" data-setting="lang" data-value="en" data-i18n="common.langEn">English</button>
        <button type="button" data-setting="lang" data-value="ja" data-i18n="common.langJa">日本語</button>
        <button type="button" data-setting="lang" data-value="zh-CN" data-i18n="common.langZh">简体中文</button>
      </div>
    </div>
    <div class="settings-group">
      <h3 data-i18n="common.distanceUnit">Distance</h3>
      <div class="settings-options">
        <button type="button" data-setting="distanceUnit" data-value="km">km</button>
        <button type="button" data-setting="distanceUnit" data-value="mi">mi</button>
      </div>
    </div>
    <div class="settings-group">
      <h3 data-i18n="common.tempUnit">Temperature</h3>
      <div class="settings-options">
        <button type="button" data-setting="tempUnit" data-value="c">°C</button>
        <button type="button" data-setting="tempUnit" data-value="f">°F</button>
      </div>
    </div>
    <div class="settings-group">
      <h3 data-i18n="common.theme">Theme</h3>
      <div class="settings-options">
        <button type="button" data-setting="theme" data-value="light" data-i18n="common.themeLight">Light</button>
        <button type="button" data-setting="theme" data-value="dark" data-i18n="common.themeDark">Dark</button>
        <button type="button" data-setting="theme" data-value="auto" data-i18n="common.themeAuto">Auto</button>
      </div>
    </div>
    <div class="settings-group">
      <h3 data-i18n="common.animation">Animation</h3>
      <div class="settings-options">
        <button type="button" data-setting="motion" data-value="full" data-i18n="common.motionFull">Full</button>
        <button type="button" data-setting="motion" data-value="reduced" data-i18n="common.motionReduced">Reduced</button>
        <button type="button" data-setting="motion" data-value="off" data-i18n="common.motionOff">Off</button>
      </div>
    </div>
  </aside>

  <script>
  (function () {{
    function esc(s) {{
      return String(s == null ? "" : s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }}
    var city = document.body.dataset.city;
    var cityJumpSelect = document.getElementById("city-jump-select");
    if (cityJumpSelect) {{
      cityJumpSelect.addEventListener("change", function () {{
        if (cityJumpSelect.value) location.href = cityJumpSelect.value;
      }});
    }}
    document.querySelectorAll("[data-city-back]").forEach(function (el) {{
      el.addEventListener("click", function (e) {{
        try {{
          if (document.referrer && document.referrer.indexOf(location.host) !== -1 && history.length > 1) {{
            e.preventDefault();
            history.back();
          }}
        }} catch (err) {{}}
      }});
    }});
    function renderCity() {{
      if (!window.JTG || !JTG.i18n) return;
      var lang = JTG.Settings.get("lang");
      var dict = JTG.i18n.getDict(lang);
      var c = (dict.cityContent && dict.cityContent[city]) || {{}};
      var hl = document.getElementById("highlights-list");
      if (hl) {{
        hl.innerHTML = (c.highlights || []).map(function (t) {{
          return '<li class="tip-item"><span aria-hidden="true">✦</span><span>' + esc(t) + "</span></li>";
        }}).join("");
      }}
      var fl = document.getElementById("food-list");
      if (fl) {{
        fl.innerHTML = (c.food || []).map(function (d) {{
          return '<div class="dish-item reveal"><span class="dish-item__emoji" aria-hidden="true">' +
            esc(d.e || "🍽") + '</span><div><strong>' + esc(d.n || "") +
            '</strong><p class="card__text">' + esc(d.d || "") + "</p></div></div>";
        }}).join("");
      }}
      var al = document.getElementById("attr-list");
      if (al) {{
        al.innerHTML = (c.attractions || []).map(function (a) {{
          return '<article class="card reveal"><span class="chip mb-2">' + esc(a.c || "") +
            '</span><h3 class="card__title">' + esc(a.n || "") +
            '</h3><p class="card__text">' + esc(a.d || "") + "</p></article>";
        }}).join("");
      }}
      var tl = document.getElementById("tips-list");
      if (tl) {{
        tl.innerHTML = (c.tips || []).map(function (t) {{
          return '<div class="tip-item reveal"><span aria-hidden="true">✓</span><span>' + esc(t) + "</span></div>";
        }}).join("");
      }}
      if (JTG.Animations) JTG.Animations.observeReveals(document);
      if (JTG.Units) JTG.Units.applyAll();
    }}
    window.addEventListener("jtg:i18n", renderCity);
    document.addEventListener("DOMContentLoaded", function () {{ setTimeout(renderCity, 0); }});
  }})();
  </script>
  <script src="../src/js/data/i18n.js?v={VERSION}" defer></script>
  <script src="../src/js/settings.js?v={VERSION}" defer></script>
  <script src="../src/js/i18n.js?v={VERSION}" defer></script>
  <script src="../src/js/units.js?v={VERSION}" defer></script>
  <script src="../src/js/currency.js?v={VERSION}" defer></script>
  <script src="../src/js/nav.js?v={VERSION}" defer></script>
  <script src="../src/js/animations.js?v={VERSION}" defer></script>
  <script src="../src/js/app.js?v={VERSION}" defer></script>
</body>
</html>
"""


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for row in CITIES:
        path = OUT_DIR / f"{row[0]}.html"
        path.write_text(render_city(*row), encoding="utf-8")
        print(f"wrote {path.relative_to(ROOT)}")
    print(f"done — {len(CITIES)} city pages (asset version {VERSION})")


if __name__ == "__main__":
    main()
