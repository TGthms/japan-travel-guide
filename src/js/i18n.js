/**
 * i18n engine — applies data-i18n / data-i18n-placeholder / data-i18n-aria
 * Dictionary lives in translations.js as JTG.TRANSLATIONS
 */
(function (global) {
  "use strict";

  function getDict(lang) {
    const all = global.JTG && global.JTG.TRANSLATIONS;
    if (!all) return {};
    return all[lang] || all.en || {};
  }

  function resolve(dict, key) {
    if (!key) return "";
    // Flat keys (USA manager style): "gallery.item.slug.caption"
    if (dict && Object.prototype.hasOwnProperty.call(dict, key)) {
      return dict[key];
    }
    const parts = key.split(".");
    let cur = dict;
    for (const p of parts) {
      if (cur == null || typeof cur !== "object") return null;
      cur = cur[p];
    }
    return cur == null ? null : cur;
  }

  function t(key, lang) {
    const L = lang || (global.JTG.Settings && global.JTG.Settings.get("lang")) || "en";
    const val = resolve(getDict(L), key);
    if (val != null) return val;
    const fallback = resolve(getDict("en"), key);
    return fallback != null ? fallback : key;
  }

  function apply(root) {
    const scope = root || document;
    const lang = (global.JTG.Settings && global.JTG.Settings.get("lang")) || "en";

    const year = String(new Date().getFullYear());
    function withYear(val) {
      if (val == null) return val;
      return String(val).replace(/\{year\}/g, year).replace(/©\s*20\d{2}\b/g, "© " + year);
    }

    function hasTranslation(key, val) {
      return val != null && val !== "" && val !== key;
    }

    scope.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val = withYear(t(key, lang));
      if (!hasTranslation(key, val)) return;
      if (el.dataset.i18nHtml === "true") el.innerHTML = val;
      else el.textContent = val;
    });

    scope.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      const val = t(key, lang);
      if (hasTranslation(key, val)) el.setAttribute("placeholder", val);
    });

    scope.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      const val = t(key, lang);
      if (hasTranslation(key, val)) el.setAttribute("aria-label", val);
    });

    scope.querySelectorAll("[data-i18n-title]").forEach((el) => {
      const key = el.getAttribute("data-i18n-title");
      const val = t(key, lang);
      if (hasTranslation(key, val)) el.setAttribute("title", val);
    });

    window.dispatchEvent(new CustomEvent("jtg:i18n", { detail: { lang } }));
  }

  global.JTG = global.JTG || {};
  global.JTG.i18n = { t, apply, getDict };
})(window);
