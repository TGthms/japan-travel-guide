#!/usr/bin/env python3
"""Rebuild tools hub + mini-apps and patch shared page chrome (USA-quality shell)."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

VERIFY = "0rE0QD0vWPSfPxelCpS8qL2_n3JGrd_ZYPJBaGwnLZQ"
OG = "https://traveljapan.pages.dev/assets/gallery/main/ShibuyaSkyView.jpeg"

FIRST_PAINT = """<!-- FIRST_PAINT_START -->
  <script>
  (function () {
    try {
      var p = JSON.parse(localStorage.getItem("jtg-preferences") || "{}");
      var theme = p.theme || "auto";
      var resolved = theme === "auto"
        ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
        : theme;
      document.documentElement.setAttribute("data-theme", resolved);
      document.documentElement.style.colorScheme = resolved === "light" ? "light" : "dark";
      var motion = p.motion || "full";
      if (motion !== "full" && motion !== "reduced" && motion !== "off") motion = "full";
      document.documentElement.setAttribute("data-motion", motion);
      var osReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      var eff = motion === "off" ? "off" : (motion === "full" ? "full" : (motion === "reduced" ? "reduced" : (osReduce ? "reduced" : "full")));
      document.documentElement.setAttribute("data-motion-effective", eff);
      if (p.lang) document.documentElement.lang = p.lang === "zh-CN" ? "zh-CN" : p.lang;
    } catch (e) {
      document.documentElement.setAttribute("data-theme", "light");
    }
  })();
  </script>
<!-- FIRST_PAINT_END -->"""

ICON_GALLERY = (
    '<svg class="jtg-icon jtg-icon--nav" viewBox="0 0 24 24" width="20" height="20" fill="none" '
    'stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
    '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>'
    '<path d="M21 15l-5-5L5 21"/></svg>'
)
ICON_TOOLS = (
    '<svg class="jtg-icon jtg-icon--nav" viewBox="0 0 24 24" width="20" height="20" fill="none" '
    'stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
    '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>'
    '<path d="M2 13h20"/></svg>'
)
ICON_GEAR = (
    '<svg class="jtg-icon jtg-icon--nav" viewBox="0 0 24 24" width="20" height="20" fill="none" '
    'stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
    '<circle cx="12" cy="12" r="3"/>'
    '<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l-.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>'
    "</svg>"
)
ICON_BACK = (
    '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" '
    'stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
    '<path d="M19 12H5M11 18l-6-6 6-6"/></svg>'
)
ICON_CHEVRON = (
    '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" '
    'stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
    '<path d="m9 5 7 7-7 7"/></svg>'
)

ICONS = {
    "weather": '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>',
    "budget": '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M8 15h2"/></svg>',
    "packing": '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="7" width="12" height="13" rx="2"/><path d="M9 7V5a3 3 0 0 1 6 0v2M9 12h6"/></svg>',
    "currency": '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M9.5 9.5c.5-1 1.5-1.5 2.5-1.5s2 .6 2 1.75-1 1.75-2.5 2.25-2.5.9-2.5 2.25 1 1.75 2.5 1.75 2-.5 2.5-1.5"/></svg>',
    "clock": '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    "tax": '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8.5 15.5 15.5 8.5"/><circle cx="9" cy="9" r="1.6"/><circle cx="15" cy="15" r="1.6"/></svg>',
    "rail": '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="3" width="14" height="14" rx="3"/><path d="M5 11h14M8 17l-2 3M16 17l2 3M9 14h.01M15 14h.01"/></svg>',
    "emergency": '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8.2 3.8h7.6c.8 0 1.4.6 1.4 1.4v13.6c0 .8-.6 1.4-1.4 1.4H8.2c-.8 0-1.4-.6-1.4-1.4V5.2c0-.8.6-1.4 1.4-1.4z"/><path d="M10 18.2h4"/></svg>',
}


def settings_html() -> str:
    return """<!-- SETTINGS_START -->
  <div class="settings-overlay" id="settings-overlay" data-close-settings></div>
  <aside class="settings-panel" id="settings-panel" aria-label="Settings">
    <div class="settings-panel__header">
      <h2 data-i18n="common.settingsTitle">Settings</h2>
      <button type="button" class="settings-close" data-close-settings aria-label="Close" data-i18n-aria="common.close"><svg class="jtg-icon jtg-icon--sm" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6.5 6.5 17.5 17.5M17.5 6.5 6.5 17.5"/></svg></button>
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
<!-- SETTINGS_END -->"""


def footer_html(home_href: str = "index.html") -> str:
    return f"""  <footer class="site-footer">
  <div class="site-footer-inner container">
    <a href="{home_href}" class="site-footer-brand gallery-app-footer-home">❀ <span data-i18n="meta.siteName">Japan Travel Guide</span></a>
    <p class="site-footer-tagline" data-i18n="footer.tagline">A practical multi-city planning companion for Japan trips.</p>
    <div class="site-footer-actions">
      <a href="https://tgthms.github.io/about/" class="footer-about-link" target="_blank" rel="noopener" data-i18n="footer.aboutMe">About Me</a>
      <a href="https://github.com/TGthms/japan-travel-guide" class="footer-github-link" target="_blank" rel="noopener">GitHub</a>
    </div>
    <div class="site-footer-meta">
      <p class="site-footer-copy" data-i18n="footer.copyright">© {{year}} Japan Travel Guide · Created by Tim G</p>
      <div class="footer-legal-links" role="navigation" aria-label="Legal">
        <a href="privacy.html" data-i18n="legal.privacyLink">Privacy Policy</a>
        <span class="footer-legal-sep" aria-hidden="true">·</span>
        <a href="terms.html" data-i18n="legal.termsLink">Terms of Use</a>
      </div>
    </div>
  </div>
</footer>"""


def scripts(*names: str) -> str:
    lines = []
    for n in names:
        lines.append(f'  <script src="{n}" defer></script>')
    return "\n".join(lines)


CORE = (
    "src/js/data/i18n.js",
    "src/js/settings.js",
    "src/js/i18n.js",
    "src/js/units.js",
    "src/js/core/env.js",
    "src/js/core/nav-return.js",
    "src/js/nav.js",
)


def head(
    *,
    title: str,
    desc: str,
    canonical: str,
    og_title: str | None = None,
) -> str:
    og_title = og_title or title
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="google-site-verification" content="{VERIFY}" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <meta name="description" content="{desc}" />
  <meta name="theme-color" content="#8b1a2b" />
  <meta name="color-scheme" content="light dark" />
  <title>{title}</title>
  <link rel="canonical" href="{canonical}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Japan Travel Guide" />
  <meta property="og:title" content="{og_title}" />
  <meta property="og:description" content="{desc}" />
  <meta property="og:url" content="{canonical}" />
  <meta property="og:image" content="{OG}" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="icon" href="assets/icons/logo.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;600;700&family=Noto+Serif+JP:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="src/css/styles.css" />
{FIRST_PAINT}
</head>"""


def app_bar(*, back_href: str, back_key: str, back_en: str, title_key: str, title_en: str, mark: str, extra_actions: str = "") -> str:
    return f"""  <header class="gallery-app-bar site-header" role="banner">
    <a href="{back_href}" class="gallery-app-back" data-i18n-aria="{back_key}" aria-label="{back_en}">
      {ICON_BACK}
      <span class="gallery-app-back-label" data-i18n="{back_key}">{back_en}</span>
    </a>
    <div class="gallery-app-title" aria-current="page">
      <span class="gallery-app-mark gallery-app-mark-svg" aria-hidden="true">{mark}</span>
      <span data-i18n="{title_key}">{title_en}</span>
    </div>
    <div class="gallery-app-actions">
      {extra_actions}
      <a href="gallery.html" class="nav__icon-btn" title="Gallery" aria-label="Gallery" data-i18n-aria="nav.gallery">{ICON_GALLERY}</a>
      <button type="button" class="nav__icon-btn" data-open-settings title="Settings" aria-label="Settings" data-i18n-aria="nav.settings">{ICON_GEAR}</button>
    </div>
  </header>"""


def loader(label: str = "Loading…") -> str:
    return (
        '  <a class="skip-link" href="#main" data-i18n="common.skipToContent">Skip to content</a>\n'
        '  <div id="loader"><div class="loader__inner"><div class="loader__torii" aria-hidden="true"></div>'
        f'<p class="loader__text" data-i18n="common.loading">{label}</p></div></div>\n'
        '  <div id="scroll-progress" aria-hidden="true"></div>'
    )


def hub_card(href: str, icon: str, title_key: str, title: str, sub_key: str, sub: str) -> str:
    return f"""    <a href="{href}" class="tools-hub-card reveal">
      <span class="tools-hub-icon" aria-hidden="true">{icon}</span>
      <span class="tools-hub-body">
        <span class="tools-hub-title" data-i18n="{title_key}">{title}</span>
        <span class="tools-hub-blurb" data-i18n="{sub_key}">{sub}</span>
      </span>
      <span class="tools-hub-chevron" aria-hidden="true">{ICON_CHEVRON}</span>
    </a>"""


def write_tools_hub() -> None:
    cards = [
        hub_card("tools-weather.html", ICONS["weather"], "tools.weatherLabel", "Weather", "tools.weatherSub", "Japan cities, world search, forecasts & air quality via Open-Meteo."),
        hub_card("tools-budget.html", ICONS["budget"], "budget.title", "Budget planner", "budget.desc", "Realistic Japan trip cost estimate from daily rates, rail, transfers, and a buffer."),
        hub_card("tools-packing.html", ICONS["packing"], "packing.title", "Packing checklist", "packing.desc", "Tap items to check them off — your list is saved in this browser."),
        hub_card("tools-currency.html", ICONS["currency"], "tools.currencyLabel", "Live currency converter", "tools.currencySub", "Daily rates via frankfurter.dev (JPY-centered)."),
        hub_card("tools-clock.html", ICONS["clock"], "tools.clockLabel", "World clock", "tools.clockSub", "Japan uses one timezone (JST). Compare with home for calls and arrivals."),
        hub_card("tools-tax.html", ICONS["tax"], "tools.taxLabel", "Japan consumption tax", "tools.taxSub", "Standard rate is typically 10% (some groceries 8%). Tipping is not expected."),
        hub_card("tools-rail.html", ICONS["rail"], "tools.railHubLabel", "Rail planner", "tools.railHubSub", "JR Pass sense-check and shinkansen fare estimates."),
        hub_card("tools-emergency.html", ICONS["emergency"], "tools.emergencyLabel", "Useful numbers in Japan", "tools.emergencySub", "Save these before you need them."),
    ]
    html = f"""{head(title="Travel Tools · Japan Travel Guide", desc="Japan travel tools — weather, budget, packing, currency, clocks, tax, rail, and emergency numbers.", canonical="https://traveljapan.pages.dev/tools.html")}
<body data-page="tools" class="page-tools">
{loader()}
{app_bar(back_href="index.html", back_key="tools.backToGuide", back_en="Back to the guide", title_key="nav.tools", title_en="Tools", mark=ICON_TOOLS)}
  <main id="main" tabindex="-1">
    <section id="tools" class="tools-page tools-hub-page" aria-labelledby="toolsTitle">
      <header class="tools-app-header reveal">
        <div>
          <p class="section__eyebrow" data-i18n="tools.eyebrow">Travel tools</p>
          <h1 class="section__title" id="toolsTitle" data-i18n-html="true" data-i18n="tools.heading">Plan Japan with <em>clarity</em></h1>
        </div>
        <p class="section__desc" data-i18n="tools.intro">Open a tool to plan a Japan trip — weather, budget, packing, currency, clocks, tax, rail, and emergency numbers.</p>
      </header>
      <div class="tools-hub-grid">
{chr(10).join(cards)}
      </div>
    </section>
  </main>
{footer_html()}
{settings_html()}
{scripts(*CORE, "src/js/app.js")}
</body>
</html>
"""
    (ROOT / "tools.html").write_text(html, encoding="utf-8")


CURRENCY_BODY = """    <section id="tools" class="tools-page tools-detail-page tools-miniapp" data-tool="currency" aria-labelledby="toolsTitle">
      <h2 id="toolsTitle" class="visually-hidden" data-i18n="tools.currencyLabel">Live currency converter</h2>
      <p class="tools-miniapp-sub reveal" data-i18n="tools.currencySub">Daily rates via frankfurter.dev (JPY-centered).</p>
      <div class="tools-miniapp-body reveal">
        <div class="tool-form currency-tool">
          <label class="tool-field"><span data-i18n="tools.amount">Amount</span>
            <input id="tool-amount" type="number" min="0" step="0.01" value="10000" inputmode="decimal" />
          </label>
          <label class="tool-field"><span data-i18n="tools.from">From</span>
            <select id="tool-from">
              <option value="JPY" selected>JPY</option>
              <option value="USD">USD</option><option value="EUR">EUR</option><option value="CNY">CNY</option>
              <option value="GBP">GBP</option><option value="KRW">KRW</option><option value="AUD">AUD</option>
              <option value="HKD">HKD</option><option value="SGD">SGD</option><option value="TWD">TWD</option>
              <option value="THB">THB</option><option value="CAD">CAD</option><option value="CHF">CHF</option>
            </select>
          </label>
          <button type="button" class="tool-swap" id="tool-swap" aria-label="Swap">⇄</button>
          <label class="tool-field"><span data-i18n="tools.to">To</span>
            <select id="tool-to">
              <option value="USD" selected>USD</option>
              <option value="JPY">JPY</option><option value="EUR">EUR</option><option value="CNY">CNY</option>
              <option value="GBP">GBP</option><option value="KRW">KRW</option><option value="AUD">AUD</option>
              <option value="HKD">HKD</option><option value="SGD">SGD</option><option value="TWD">TWD</option>
              <option value="THB">THB</option><option value="CAD">CAD</option><option value="CHF">CHF</option>
            </select>
          </label>
        </div>
        <div class="tool-result tool-result-hero" id="tool-currency-result">—</div>
        <p class="tool-meta" id="tool-currency-meta"></p>
      </div>
    </section>"""

CLOCK_BODY = """    <section id="tools" class="tools-page tools-detail-page tools-miniapp tools-miniapp-flat" data-tool="clock" aria-labelledby="toolsTitle">
      <h2 id="toolsTitle" class="visually-hidden" data-i18n="tools.clockLabel">World clock</h2>
      <p class="tools-miniapp-sub reveal" data-i18n="tools.clockSub">Japan uses one timezone (JST). Compare with home for calls and arrivals.</p>
      <div class="tools-miniapp-body reveal">
        <div class="clock-list" id="world-clock-list"></div>
      </div>
    </section>"""

TAX_BODY = """    <section id="tools" class="tools-page tools-detail-page tools-miniapp" data-tool="tax" aria-labelledby="toolsTitle">
      <h2 id="toolsTitle" class="visually-hidden" data-i18n="tools.taxLabel">Japan consumption tax</h2>
      <p class="tools-miniapp-sub reveal" data-i18n="tools.taxSub">Standard rate is typically 10% (some groceries 8%). Tipping is not expected.</p>
      <div class="tools-miniapp-body reveal">
        <div class="tool-form stacked">
          <label class="tool-field"><span data-i18n="tools.taxBill">Price before tax (¥)</span>
            <input id="tax-bill" type="number" min="0" step="1" value="3000" inputmode="decimal" />
          </label>
          <label class="tool-field"><span data-i18n="tools.taxRate">Tax %</span>
            <select id="tax-rate">
              <option value="10" selected>10% — standard</option>
              <option value="8">8% — reduced (some food)</option>
              <option value="0">0% — tax-free eligible (if applicable)</option>
            </select>
          </label>
        </div>
        <div class="tool-result tool-result-hero" id="tax-result">—</div>
        <p class="tool-meta" id="tax-meta"></p>
        <p class="tool-meta" data-i18n="tools.noTip">Tipping is not customary in Japan — excellent service is part of the culture, not the bill.</p>
      </div>
    </section>"""

RAIL_BODY = """    <section id="tools" class="tools-page tools-detail-page tools-miniapp" data-tool="rail" aria-labelledby="toolsTitle">
      <h2 id="toolsTitle" class="visually-hidden" data-i18n="tools.railHubLabel">Rail planner</h2>
      <p class="tools-miniapp-sub reveal" data-i18n="tools.railHubSub">JR Pass sense-check and shinkansen fare estimates.</p>
      <div class="tools-miniapp-body reveal">
        <section class="tool-card reveal">
          <div class="tool-label" data-i18n="tools.jrLabel">JR Pass sense-check</div>
          <p class="tool-sub" data-i18n="tools.jrSub">Rough comparison of a tourist rail pass vs long-distance tickets. Always verify official prices.</p>
          <div class="tool-form stacked">
            <label class="tool-field"><span data-i18n="tools.jrDays">Trip length (days)</span>
              <input id="jr-days" type="number" min="1" max="30" value="7" />
            </label>
            <label class="tool-field"><span data-i18n="tools.jrLegs">Long-distance rail legs (approx.)</span>
              <input id="jr-legs" type="number" min="0" max="40" value="4" />
            </label>
          </div>
          <div class="tool-result tool-result-sm" id="jr-result">—</div>
          <p class="tool-meta" id="jr-meta"></p>
        </section>
        <section class="tool-card reveal" style="margin-top:1rem">
          <div class="tool-label" data-i18n="tools.railLabel">Shinkansen fare estimate</div>
          <p class="tool-sub" data-i18n="tools.railSub">Indicative ordinary-car one-way averages for planning.</p>
          <div class="tool-form stacked">
            <label class="tool-field"><span data-i18n="tools.railRoute">Route</span>
              <select id="rail-route">
                <option value="tokyo-kyoto">Tokyo ↔ Kyoto</option>
                <option value="tokyo-osaka">Tokyo ↔ Osaka</option>
                <option value="tokyo-hiroshima">Tokyo ↔ Hiroshima</option>
                <option value="tokyo-fukuoka">Tokyo ↔ Fukuoka (Hakata)</option>
                <option value="tokyo-kanazawa">Tokyo ↔ Kanazawa</option>
                <option value="osaka-hiroshima">Osaka ↔ Hiroshima</option>
                <option value="osaka-fukuoka">Osaka ↔ Fukuoka</option>
                <option value="tokyo-nagoya">Tokyo ↔ Nagoya</option>
                <option value="tokyo-sendai">Tokyo ↔ Sendai</option>
              </select>
            </label>
            <label class="tool-field"><span data-i18n="tools.railTrips">Number of one-ways</span>
              <input id="rail-trips" type="number" min="1" max="20" value="2" />
            </label>
          </div>
          <div class="tool-result" id="rail-result">—</div>
          <p class="tool-meta" id="rail-meta"></p>
        </section>
      </div>
    </section>"""

EMERGENCY_BODY = """    <section id="tools" class="tools-page tools-detail-page tools-miniapp" data-tool="emergency" aria-labelledby="toolsTitle">
      <h2 id="toolsTitle" class="visually-hidden" data-i18n="tools.emergencyLabel">Useful numbers in Japan</h2>
      <p class="tools-miniapp-sub reveal" data-i18n="tools.emergencySub">Save these before you need them.</p>
      <div class="tools-miniapp-body reveal">
        <ul class="tool-info-list">
          <li><strong>110</strong> — <span data-i18n="tools.emPolice">Police</span></li>
          <li><strong>119</strong> — <span data-i18n="tools.emFire">Fire &amp; ambulance</span></li>
          <li><strong>118</strong> — <span data-i18n="tools.emCoast">Coast Guard</span></li>
          <li><strong>0570-000-911</strong> — <span data-i18n="tools.emHelpline">Japan Helpline (English-friendly)</span></li>
          <li><strong>#7119</strong> — <span data-i18n="tools.emMedical">Non-emergency medical advice (many areas)</span></li>
        </ul>
        <p class="tool-meta" data-i18n="tools.emNote">Also save your country’s embassy or consulate in Japan.</p>
      </div>
    </section>"""


def write_mini(
    filename: str,
    *,
    title: str,
    desc: str,
    canonical_name: str,
    title_key: str,
    title_en: str,
    mark: str,
    body: str,
    extra_scripts: tuple[str, ...],
    tool: str,
) -> None:
    extra_tools = f'<a href="tools.html" class="nav__icon-btn" title="Tools" aria-label="Tools" data-i18n-aria="nav.tools">{ICON_TOOLS}</a>'
    html = f"""{head(title=title, desc=desc, canonical=f"https://traveljapan.pages.dev/{canonical_name}")}
<body data-page="tools-mini" class="page-tools page-tools-mini" data-tool="{tool}">
{loader()}
{app_bar(back_href="tools.html", back_key="tools.backToTools", back_en="Back to Tools", title_key=title_key, title_en=title_en, mark=mark, extra_actions=extra_tools)}
  <main id="main" tabindex="-1">
{body}
  </main>
{footer_html()}
{settings_html()}
{scripts(*CORE, *extra_scripts, "src/js/app.js")}
</body>
</html>
"""
    (ROOT / filename).write_text(html, encoding="utf-8")


def extract_section(path: Path, start: str, end: str | None = None) -> str:
    text = path.read_text(encoding="utf-8")
    i = text.find(start)
    if i < 0:
        raise SystemExit(f"missing {start} in {path}")
    if end:
        j = text.find(end, i)
        if j < 0:
            raise SystemExit(f"missing {end} in {path}")
        return text[i:j]
    return text[i:]


def wrap_existing_tool(src_name: str, dest_name: str, **kwargs) -> None:
    src = ROOT / src_name
    text = src.read_text(encoding="utf-8")
    m = re.search(r"<main[^>]*>(.*)</main>", text, re.S)
    if not m:
        raise SystemExit(f"no main in {src_name}")
    inner = m.group(1).strip()
    # strip inline layout hacks
    inner = re.sub(r'\sstyle="padding-top:1\.25rem;padding-bottom:3rem;max-width:960px;margin:0 auto"', "", inner)
    body = f'    <section id="tools" class="tools-page tools-detail-page tools-miniapp" data-tool="{kwargs["tool"]}">\n{inner}\n    </section>'
    write_mini(dest_name, body=body, **{k: v for k, v in kwargs.items() if k != "body"})


def patch_common_html(path: Path, *, city: bool = False) -> None:
    text = path.read_text(encoding="utf-8")
    prefix = "../" if city else ""

    # Single stylesheet (keep city skin)
    text = re.sub(
        r'<link rel="stylesheet" href="(?:\.\./)?src/css/styles\.css[^"]*"\s*/?>\s*'
        r'(?:<link rel="stylesheet" href="(?:\.\./)?src/css/icons\.css[^"]*"\s*/?>\s*)?',
        f'<link rel="stylesheet" href="{prefix}src/css/styles.css" />\n',
        text,
        count=1,
    )
    # Drop extra weather sheets — now in the barrel
    text = re.sub(r'\s*<link rel="stylesheet" href="src/css/weather(?:-app)?\.css[^"]*"\s*/?>', "", text)

    # Replace first-paint IIFE
    text = re.sub(
        r"<script>\s*\(function \(\) \{\s*try \{\s*var p = JSON\.parse\(localStorage\.getItem\(\"jtg-preferences\".*?</script>",
        FIRST_PAINT,
        text,
        count=1,
        flags=re.S,
    )

    # Normalize script tags: strip cache-bust, insert core env + nav-return
    def rewrite_scripts(block: str) -> str:
        names = re.findall(r'src="([^"]+)"', block)
        cleaned = []
        for n in names:
            n = re.sub(r"\?v=[^\"']+", "", n)
            if n.endswith("nav-return.js") and "core/" not in n:
                n = n.replace("src/js/nav-return.js", "src/js/core/nav-return.js")
            if n not in cleaned:
                cleaned.append(n)
        # Insert env.js before nav-return if missing
        if not any(n.endswith("core/env.js") for n in cleaned):
            insert_at = next((i for i, n in enumerate(cleaned) if n.endswith("core/nav-return.js") or n.endswith("nav.js")), len(cleaned) - 1)
            cleaned.insert(insert_at, cleaned[0].rsplit("/", 1)[0].replace("data", "core") if False else (
                "../src/js/core/env.js" if city else "src/js/core/env.js"
            ))
        # Fix env path more carefully
        cleaned = [("../src/js/core/env.js" if city else "src/js/core/env.js") if n.endswith("core/env.js") else n for n in cleaned]
        if city:
            cleaned = [n if n.startswith("../") or n.startswith("http") else "../" + n for n in cleaned]
            cleaned = [n.replace("../src/js/src/js/", "../src/js/") for n in cleaned]
        # Dedup env
        seen = set()
        out = []
        for n in cleaned:
            if n in seen:
                continue
            seen.add(n)
            out.append(n)
        # Ensure order: i18n data, settings, i18n, units, env, nav-return, … app
        def key(n: str) -> int:
            order = [
                "data/i18n.js",
                "settings.js",
                "/i18n.js",
                "units.js",
                "core/env.js",
                "core/nav-return.js",
                "nav.js",
                "app.js",
            ]
            for i, needle in enumerate(order):
                if n.endswith(needle) or needle in n:
                    if needle == "/i18n.js" and n.endswith("data/i18n.js"):
                        continue
                    return i
            return 50
        # Don't fully sort — only make sure env is before nav-return and both exist
        if not any("core/env.js" in n for n in out):
            out.insert(max(0, len(out) - 2), ("../" if city else "") + "src/js/core/env.js")
        if not any("core/nav-return.js" in n for n in out):
            out.insert(len(out) - 1, ("../" if city else "") + "src/js/core/nav-return.js")
        # Remove currency.js from city pages
        if city:
            out = [n for n in out if not n.endswith("currency.js")]
        return "\n".join(f'  <script src="{n}" defer></script>' for n in out)

    text = re.sub(
        r"(?:  <script src=\"[^\"]+\" defer></script>\n)+",
        lambda m: rewrite_scripts(m.group(0)) + "\n",
        text,
    )

    # Weather attribution first-paint copy
    text = text.replace(
        "Data: U.S. forecasts &amp; alerts NWS · world &amp; extras Open-Meteo (CC BY 4.0). For guidance only — not for emergencies.",
        "Data: Open-Meteo (CC BY 4.0). Guidance only — not for emergencies.",
    )

    # Footer year placeholder
    text = re.sub(r"© 20\d{2} Japan Travel Guide", "© {year} Japan Travel Guide", text)

    path.write_text(text, encoding="utf-8")


def write_budget_packing() -> None:
    def extract_section_balanced(text: str, start_pat: str) -> str:
        start = text.find(start_pat)
        if start < 0:
            raise SystemExit(f"missing {start_pat}")
        depth = 0
        for m in re.finditer(r"</?section\b[^>]*>", text[start:]):
            if m.group(0).startswith("</"):
                depth -= 1
                if depth == 0:
                    return text[start : start + m.end()]
            else:
                depth += 1
        raise SystemExit(f"unclosed section {start_pat}")

    budget = (ROOT / "tools-budget.html").read_text(encoding="utf-8")
    m_text = extract_section_balanced(budget, '<section class="tool-card tool-card-wide budget-tool reveal" id="budget">')
    if "budget-total" not in m_text:
        raise SystemExit("budget section missing #budget-total")
    budget_body = (
        '    <section id="tools" class="tools-page tools-detail-page tools-miniapp" data-tool="budget" aria-labelledby="toolsTitle">\n'
        '      <h2 id="toolsTitle" class="visually-hidden" data-i18n="budget.title">Budget planner</h2>\n'
        '      <p class="tools-miniapp-sub reveal" data-i18n="budget.desc">Realistic Japan trip cost estimate from daily rates, rail, transfers, and a buffer. Planning figures only—not a quote.</p>\n'
        '      <div class="tools-miniapp-body">\n'
        f"{m_text}\n"
        "      </div>\n"
        "    </section>"
    )
    write_mini(
        "tools-budget.html",
        title="Budget · Japan Travel Guide",
        desc="Japan trip budget planner.",
        canonical_name="tools-budget.html",
        title_key="budget.title",
        title_en="Budget planner",
        mark=ICONS["budget"],
        body=budget_body,
        extra_scripts=("src/js/currency.js", "src/js/budget.js"),
        tool="budget",
    )

    packing = (ROOT / "tools-packing.html").read_text(encoding="utf-8")
    m = re.search(r'<section class="tool-card tool-card-wide reveal" id="packing">.*?</section>', packing, re.S)
    if not m:
        raise SystemExit("packing section missing")
    packing_body = (
        '    <section id="tools" class="tools-page tools-detail-page tools-miniapp" data-tool="packing" aria-labelledby="toolsTitle">\n'
        '      <h2 id="toolsTitle" class="visually-hidden" data-i18n="packing.title">Packing checklist</h2>\n'
        '      <p class="tools-miniapp-sub reveal" data-i18n="packing.desc">Tap items to check them off — your list is saved in this browser.</p>\n'
        '      <div class="tools-miniapp-body">\n'
        f"{m.group(0)}\n"
        "      </div>\n"
        "    </section>"
    )
    write_mini(
        "tools-packing.html",
        title="Packing · Japan Travel Guide",
        desc="Japan packing checklist.",
        canonical_name="tools-packing.html",
        title_key="packing.title",
        title_en="Packing",
        mark=ICONS["packing"],
        body=packing_body,
        extra_scripts=("src/js/packing.js",),
        tool="packing",
    )


def write_utilities_redirect_page() -> None:
    """Keep the old URL working as a combined utilities mini-app."""
    body = f"""    <section id="tools" class="tools-page tools-detail-page tools-miniapp" data-tool="utilities" aria-labelledby="toolsTitle">
      <h2 id="toolsTitle" class="visually-hidden" data-i18n="tools.utilitiesLabel">Utilities</h2>
      <p class="tools-miniapp-sub reveal" data-i18n="tools.utilitiesSub">Currency, clocks, tax, rail, and emergency numbers.</p>
      <div class="tools-miniapp-body">
{CURRENCY_BODY}
{CLOCK_BODY}
{TAX_BODY}
{RAIL_BODY}
{EMERGENCY_BODY}
      </div>
    </section>"""
    # Nested sections with duplicate ids would be bad. Keep original stacked cards instead.
    stacked = """    <section id="tools" class="tools-page tools-detail-page tools-miniapp" data-tool="utilities">
      <p class="tools-miniapp-sub reveal" data-i18n="tools.utilitiesSub">Currency, clocks, tax, rail, and emergency numbers.</p>
      <div class="tools-miniapp-body">
        <section class="tool-card tool-card-wide reveal" id="currency-tool">
          <div class="tool-label" data-i18n="tools.currencyLabel">Live currency converter</div>
          <p class="tool-sub" data-i18n="tools.currencySub">Daily rates via frankfurter.dev (JPY-centered).</p>
          <div class="tool-form currency-tool">
            <label class="tool-field"><span data-i18n="tools.amount">Amount</span>
              <input id="tool-amount" type="number" min="0" step="0.01" value="10000" inputmode="decimal" />
            </label>
            <label class="tool-field"><span data-i18n="tools.from">From</span>
              <select id="tool-from">
                <option value="JPY" selected>JPY</option>
                <option value="USD">USD</option><option value="EUR">EUR</option><option value="CNY">CNY</option>
                <option value="GBP">GBP</option><option value="KRW">KRW</option><option value="AUD">AUD</option>
                <option value="HKD">HKD</option><option value="SGD">SGD</option><option value="TWD">TWD</option>
                <option value="THB">THB</option><option value="CAD">CAD</option><option value="CHF">CHF</option>
              </select>
            </label>
            <button type="button" class="tool-swap" id="tool-swap" aria-label="Swap">⇄</button>
            <label class="tool-field"><span data-i18n="tools.to">To</span>
              <select id="tool-to">
                <option value="USD" selected>USD</option>
                <option value="JPY">JPY</option><option value="EUR">EUR</option><option value="CNY">CNY</option>
                <option value="GBP">GBP</option><option value="KRW">KRW</option><option value="AUD">AUD</option>
                <option value="HKD">HKD</option><option value="SGD">SGD</option><option value="TWD">TWD</option>
                <option value="THB">THB</option><option value="CAD">CAD</option><option value="CHF">CHF</option>
              </select>
            </label>
          </div>
          <div class="tool-result" id="tool-currency-result">—</div>
          <p class="tool-meta" id="tool-currency-meta"></p>
        </section>
        <section class="tool-card reveal">
          <div class="tool-label" data-i18n="tools.clockLabel">World clock</div>
          <p class="tool-sub" data-i18n="tools.clockSub">Japan uses one timezone (JST). Compare with home for calls and arrivals.</p>
          <div class="clock-list" id="world-clock-list"></div>
        </section>
        <section class="tool-card reveal">
          <div class="tool-label" data-i18n="tools.taxLabel">Japan consumption tax</div>
          <p class="tool-sub" data-i18n="tools.taxSub">Standard rate is typically 10% (some groceries 8%). Tipping is not expected.</p>
          <div class="tool-form stacked">
            <label class="tool-field"><span data-i18n="tools.taxBill">Price before tax (¥)</span>
              <input id="tax-bill" type="number" min="0" step="1" value="3000" inputmode="decimal" />
            </label>
            <label class="tool-field"><span data-i18n="tools.taxRate">Tax %</span>
              <select id="tax-rate">
                <option value="10" selected>10% — standard</option>
                <option value="8">8% — reduced (some food)</option>
                <option value="0">0% — tax-free eligible (if applicable)</option>
              </select>
            </label>
          </div>
          <div class="tool-result" id="tax-result">—</div>
          <p class="tool-meta" id="tax-meta"></p>
        </section>
        <section class="tool-card reveal">
          <div class="tool-label" data-i18n="tools.jrLabel">JR Pass sense-check</div>
          <div class="tool-form stacked">
            <label class="tool-field"><span data-i18n="tools.jrDays">Trip length (days)</span>
              <input id="jr-days" type="number" min="1" max="30" value="7" />
            </label>
            <label class="tool-field"><span data-i18n="tools.jrLegs">Long-distance rail legs (approx.)</span>
              <input id="jr-legs" type="number" min="0" max="40" value="4" />
            </label>
          </div>
          <div class="tool-result tool-result-sm" id="jr-result">—</div>
          <p class="tool-meta" id="jr-meta"></p>
        </section>
        <section class="tool-card reveal">
          <div class="tool-label" data-i18n="tools.railLabel">Shinkansen fare estimate</div>
          <div class="tool-form stacked">
            <label class="tool-field"><span data-i18n="tools.railRoute">Route</span>
              <select id="rail-route">
                <option value="tokyo-kyoto">Tokyo ↔ Kyoto</option>
                <option value="tokyo-osaka">Tokyo ↔ Osaka</option>
                <option value="tokyo-hiroshima">Tokyo ↔ Hiroshima</option>
                <option value="tokyo-fukuoka">Tokyo ↔ Fukuoka (Hakata)</option>
                <option value="tokyo-kanazawa">Tokyo ↔ Kanazawa</option>
                <option value="osaka-hiroshima">Osaka ↔ Hiroshima</option>
                <option value="osaka-fukuoka">Osaka ↔ Fukuoka</option>
                <option value="tokyo-nagoya">Tokyo ↔ Nagoya</option>
                <option value="tokyo-sendai">Tokyo ↔ Sendai</option>
              </select>
            </label>
            <label class="tool-field"><span data-i18n="tools.railTrips">Number of one-ways</span>
              <input id="rail-trips" type="number" min="1" max="20" value="2" />
            </label>
          </div>
          <div class="tool-result" id="rail-result">—</div>
          <p class="tool-meta" id="rail-meta"></p>
        </section>
        <section class="tool-card reveal" id="emergency-tool">
          <div class="tool-label" data-i18n="tools.emergencyLabel">Useful numbers in Japan</div>
          <ul class="tool-info-list">
            <li><strong>110</strong> — <span data-i18n="tools.emPolice">Police</span></li>
            <li><strong>119</strong> — <span data-i18n="tools.emFire">Fire &amp; ambulance</span></li>
            <li><strong>118</strong> — <span data-i18n="tools.emCoast">Coast Guard</span></li>
            <li><strong>0570-000-911</strong> — <span data-i18n="tools.emHelpline">Japan Helpline (English-friendly)</span></li>
            <li><strong>#7119</strong> — <span data-i18n="tools.emMedical">Non-emergency medical advice (many areas)</span></li>
          </ul>
        </section>
      </div>
    </section>"""
    write_mini(
        "tools-utilities.html",
        title="Travel utilities · Japan Travel Guide",
        desc="Currency, clocks, tax, rail, and emergency tools for Japan.",
        canonical_name="tools-utilities.html",
        title_key="tools.utilitiesLabel",
        title_en="Utilities",
        mark=ICON_TOOLS,
        body=stacked,
        extra_scripts=("src/js/currency.js", "src/js/tools.js"),
        tool="utilities",
    )


def main() -> None:
    write_budget_packing()
    write_tools_hub()
    write_mini(
        "tools-currency.html",
        title="Currency · Japan Travel Guide",
        desc="Live currency converter for travel in Japan (JPY-centered).",
        canonical_name="tools-currency.html",
        title_key="tools.currencyLabel",
        title_en="Currency",
        mark=ICONS["currency"],
        body=CURRENCY_BODY,
        extra_scripts=("src/js/currency.js", "src/js/tools.js"),
        tool="currency",
    )
    write_mini(
        "tools-clock.html",
        title="World Clock · Japan Travel Guide",
        desc="World clock with Japan Standard Time and key cities.",
        canonical_name="tools-clock.html",
        title_key="tools.clockLabel",
        title_en="World clock",
        mark=ICONS["clock"],
        body=CLOCK_BODY,
        extra_scripts=("src/js/tools.js",),
        tool="clock",
    )
    write_mini(
        "tools-tax.html",
        title="Japan tax · Japan Travel Guide",
        desc="Japan consumption tax calculator. Tipping is not expected.",
        canonical_name="tools-tax.html",
        title_key="tools.taxLabel",
        title_en="Consumption tax",
        mark=ICONS["tax"],
        body=TAX_BODY,
        extra_scripts=("src/js/tools.js",),
        tool="tax",
    )
    write_mini(
        "tools-rail.html",
        title="Rail planner · Japan Travel Guide",
        desc="JR Pass sense-check and shinkansen fare estimates.",
        canonical_name="tools-rail.html",
        title_key="tools.railHubLabel",
        title_en="Rail planner",
        mark=ICONS["rail"],
        body=RAIL_BODY,
        extra_scripts=("src/js/tools.js",),
        tool="rail",
    )
    write_mini(
        "tools-emergency.html",
        title="Useful numbers · Japan Travel Guide",
        desc="Emergency and traveler numbers to keep handy in Japan.",
        canonical_name="tools-emergency.html",
        title_key="tools.emergencyLabel",
        title_en="Useful numbers",
        mark=ICONS["emergency"],
        body=EMERGENCY_BODY,
        extra_scripts=("src/js/tools.js",),
        tool="emergency",
    )
    write_utilities_redirect_page()

    for name in (
        "index.html",
        "gallery.html",
        "privacy.html",
        "terms.html",
        "tools-weather.html",
    ):
        patch_common_html(ROOT / name)

    for city in (ROOT / "cities").glob("*.html"):
        patch_common_html(city, city=True)

    print("built tools hub + mini-apps and patched chrome")


if __name__ == "__main__":
    main()
