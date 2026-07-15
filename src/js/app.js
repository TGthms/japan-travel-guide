/**
 * Japan Travel Guide — client application bootstrap
 * Shared by index · gallery · tools · privacy · terms · cities/*
 *
 * Companion classic scripts (not ES modules), same model as the USA guide:
 *   · src/js/data/i18n.js      → JTG.TRANSLATIONS
 *   · src/js/data/fun-facts.js → JTG.FunFacts pool helpers (optional)
 *   · src/js/legal-i18n.js     → JTG.Legal
 *   · feature modules (settings, units, currency, budget, …)
 *
 * Design goals (aligned with USA guide core tech):
 *   · Never throw on missing APIs (IntersectionObserver, matchMedia, …)
 *   · Skip heavy work on constrained / mobile viewports
 *   · Preferences via safeStorage (localStorage with try/catch)
 *   · Motion: full | reduced | off (+ OS prefers-reduced-motion)
 */
(function (global) {
  "use strict";

  /* ── Capability / environment ── */
  function safeMatchMedia(query) {
    try {
      if (typeof window.matchMedia === "function") return window.matchMedia(query);
    } catch (e) { /* ignore */ }
    return {
      matches: false,
      media: query,
      addEventListener: function () {},
      removeEventListener: function () {},
      addListener: function () {},
      removeListener: function () {},
    };
  }

  function isConstrainedViewport() {
    try {
      const w = window.innerWidth || 0;
      const h = window.innerHeight || 0;
      if ((w > 0 && w <= 320) || (h > 0 && h <= 280)) return true;
      if (safeMatchMedia("(max-width: 320px), (max-height: 280px)").matches) return true;
      if (typeof navigator.deviceMemory === "number" && navigator.deviceMemory > 0 && navigator.deviceMemory < 1) {
        return true;
      }
    } catch (e) { /* ignore */ }
    return false;
  }

  function isMobileOrCoarsePointer() {
    try {
      if (safeMatchMedia("(max-width: 900px)").matches) return true;
      if (safeMatchMedia("(pointer: coarse)").matches) return true;
      if (
        typeof navigator.maxTouchPoints === "number" &&
        navigator.maxTouchPoints > 1 &&
        safeMatchMedia("(max-width: 1200px)").matches
      ) {
        return true;
      }
    } catch (e) { /* ignore */ }
    return false;
  }

  const ENV = {
    constrained: isConstrainedViewport(),
    mobile: isMobileOrCoarsePointer(),
    hasIO: typeof IntersectionObserver === "function",
    hasRAF: typeof requestAnimationFrame === "function",
    hasXHR: typeof XMLHttpRequest === "function",
    reduceMotion: safeMatchMedia("(prefers-reduced-motion: reduce)").matches,
  };

  try {
    if (ENV.mobile || ENV.constrained) {
      document.documentElement.setAttribute("data-mobile-lite", "true");
    }
  } catch (e) { /* ignore */ }

  window.addEventListener("unhandledrejection", function (e) {
    try {
      if (e && typeof e.preventDefault === "function") e.preventDefault();
    } catch (err) { /* ignore */ }
  });

  /* ── safeStorage ── */
  const memoryStore = {};
  const safeStorage = {
    get: function (key, fallback) {
      try {
        const v = localStorage.getItem(key);
        if (v == null) return fallback;
        return v;
      } catch (e) {
        return Object.prototype.hasOwnProperty.call(memoryStore, key)
          ? memoryStore[key]
          : fallback;
      }
    },
    set: function (key, value) {
      try {
        localStorage.setItem(key, String(value));
      } catch (e) {
        memoryStore[key] = String(value);
      }
    },
    getJSON: function (key, fallback) {
      try {
        const raw = this.get(key, null);
        if (raw == null) return fallback;
        return JSON.parse(raw);
      } catch (e) {
        return fallback;
      }
    },
    setJSON: function (key, obj) {
      try {
        this.set(key, JSON.stringify(obj));
      } catch (e) { /* ignore */ }
    },
    has: function (key) {
      try {
        return localStorage.getItem(key) != null;
      } catch (e) {
        return Object.prototype.hasOwnProperty.call(memoryStore, key);
      }
    },
  };

  /* ── Motion: full | reduced | off ── */
  const PREFS_KEY = "jtg-preferences";

  function loadPrefs() {
    const defaults = {
      lang: "en",
      distanceUnit: "km",
      tempUnit: "c",
      theme: "auto",
      motion: "full",
    };
    const stored = safeStorage.getJSON(PREFS_KEY, null);
    if (!stored || typeof stored !== "object") return Object.assign({}, defaults);
    const out = Object.assign({}, defaults, stored);
    if (out.motion !== "full" && out.motion !== "reduced" && out.motion !== "off") {
      // legacy: only full/reduced
      out.motion = out.motion === "reduced" ? "reduced" : "full";
    }
    return out;
  }

  function effectiveMotion(mode) {
    if (mode === "off") return "off";
    if (mode === "reduced" || ENV.reduceMotion) return "reduced";
    if (ENV.constrained) return "reduced";
    return "full";
  }

  function applyMotionAttrs(mode) {
    const eff = effectiveMotion(mode);
    document.documentElement.setAttribute("data-motion", mode);
    document.documentElement.setAttribute("data-motion-effective", eff);
    document.documentElement.setAttribute(
      "data-reduce-motion",
      eff === "off" || eff === "reduced" ? "true" : "false"
    );
  }

  function resolveTheme(theme) {
    if (theme === "auto") {
      return safeMatchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return theme === "dark" ? "dark" : "light";
  }

  /* ── Expose core on JTG ── */
  global.JTG = global.JTG || {};
  global.JTG.ENV = ENV;
  global.JTG.safeStorage = safeStorage;
  global.JTG.safeMatchMedia = safeMatchMedia;
  global.JTG.effectiveMotion = effectiveMotion;

  /* ── Bridge settings to use safeStorage + motion off ── */
  function enhanceSettings() {
    const S = global.JTG.Settings;
    if (!S) return;

    // Re-hydrate from safeStorage if settings used raw localStorage already
    try {
      const prefs = loadPrefs();
      S.prefs = Object.assign({}, S.prefs || {}, prefs);
      // Ensure motion off is a valid option going forward
      if (S.prefs.motion !== "full" && S.prefs.motion !== "reduced" && S.prefs.motion !== "off") {
        S.prefs.motion = "full";
      }
    } catch (e) { /* ignore */ }

    const origSet = S.set && S.set.bind(S);
    const origSetMany = S.setMany && S.setMany.bind(S);
    const origApply = S.applyAll && S.applyAll.bind(S);

    S.applyAll = function () {
      applyMotionAttrs(this.prefs.motion || "full");
      const theme = this.prefs.theme || "auto";
      document.documentElement.setAttribute("data-theme", resolveTheme(theme));
      document.documentElement.lang =
        this.prefs.lang === "zh-CN" ? "zh-CN" : this.prefs.lang || "en";
      // Persist via safeStorage
      safeStorage.setJSON(PREFS_KEY, this.prefs);
    };

    if (origSet) {
      S.set = function (key, value) {
        this.prefs[key] = value;
        safeStorage.setJSON(PREFS_KEY, this.prefs);
        this.applyAll();
        window.dispatchEvent(
          new CustomEvent("jtg:settings", {
            detail: { key: key, value: value, prefs: Object.assign({}, this.prefs) },
          })
        );
      };
    }

    if (origSetMany) {
      S.setMany = function (partial) {
        Object.assign(this.prefs, partial);
        safeStorage.setJSON(PREFS_KEY, this.prefs);
        this.applyAll();
        window.dispatchEvent(
          new CustomEvent("jtg:settings", {
            detail: { prefs: Object.assign({}, this.prefs) },
          })
        );
      };
    }

    // Init theme/motion early
    S.init = function () {
      this.prefs = loadPrefs();
      this.applyAll();
      const mq = safeMatchMedia("(prefers-color-scheme: dark)");
      const onScheme = function () {
        if (S.prefs.theme === "auto") S.applyAll();
      };
      if (mq.addEventListener) mq.addEventListener("change", onScheme);
      else if (mq.addListener) mq.addListener(onScheme);

      const mqMotion = safeMatchMedia("(prefers-reduced-motion: reduce)");
      const onMotion = function () {
        applyMotionAttrs(S.prefs.motion || "full");
      };
      if (mqMotion.addEventListener) mqMotion.addEventListener("change", onMotion);
      else if (mqMotion.addListener) mqMotion.addListener(onMotion);
    };
  }

  /* ── Loader (short) ── */
  function initLoader() {
    const loader = document.getElementById("loader");
    if (!loader) return;
    const hide = function () {
      loader.classList.add("is-done");
    };
    const delay =
      effectiveMotion((global.JTG.Settings && global.JTG.Settings.get("motion")) || "full") ===
      "full"
        ? ENV.mobile
          ? 200
          : 450
        : 0;
    if (document.readyState === "complete") {
      setTimeout(hide, delay);
    } else {
      window.addEventListener("load", function () {
        setTimeout(hide, delay);
      });
    }
    setTimeout(hide, 2000);
  }

  /* ── Boot feature modules (same order as legacy main.js) ── */
  function bootFeatures() {
    if (global.JTG.i18n) global.JTG.i18n.apply();
    if (global.JTG.Units) global.JTG.Units.applyAll();

    if (global.JTG.Nav) {
      global.JTG.Nav.initNav();
      global.JTG.Nav.initSettingsUI();
    }

    // Animations.init also had loader — we handle loader here; still call init
    if (global.JTG.Animations) {
      if (typeof global.JTG.Animations.observeReveals === "function") {
        global.JTG.Animations.observeReveals();
      }
      if (typeof global.JTG.Animations.initCounters === "function") {
        /* optional */
      }
      // Prefer full init if present (may re-hide loader — ok)
      if (typeof global.JTG.Animations.init === "function") {
        try {
          global.JTG.Animations.init();
        } catch (e) { /* ignore */ }
      }
    }

    if (global.JTG.Currency) global.JTG.Currency.fetchRates();

    const budgetRoot = document.getElementById("budget-planner");
    if (budgetRoot && global.JTG.Budget) global.JTG.Budget.bind(budgetRoot);

    const packing = document.getElementById("packing-list");
    if (packing && global.JTG.Packing) global.JTG.Packing.bind(packing);

    const faq = document.getElementById("faq-list");
    if (faq && global.JTG.FAQ) global.JTG.FAQ.bind(faq);

    const facts = document.getElementById("fun-fact-box");
    if (facts && global.JTG.FunFacts) global.JTG.FunFacts.bind(facts);

    const map = document.getElementById("japan-map");
    if (map && global.JTG.Map) global.JTG.Map.bind(map);

    const routes = document.getElementById("routes");
    if (routes && global.JTG.Routes) global.JTG.Routes.bind(routes);

    if (document.body.dataset.page === "gallery" && global.JTG.Gallery) {
      global.JTG.Gallery.init();
    }

    if (global.JTG.Tools && typeof global.JTG.Tools.init === "function") {
      // tools.js self-inits; ensure once
    }

    if (global.JTG.Legal && typeof global.JTG.Legal.init === "function") {
      global.JTG.Legal.init();
    }

    window.addEventListener("jtg:settings", function (e) {
      const key = e.detail && e.detail.key;
      if (!key || key === "distanceUnit" || key === "tempUnit") {
        if (global.JTG.Units) global.JTG.Units.applyAll();
      }
      if (!key || key === "lang") {
        if (global.JTG.i18n) global.JTG.i18n.apply();
      }
      if (!key || key === "motion") {
        applyMotionAttrs(
          (global.JTG.Settings && global.JTG.Settings.get("motion")) || "full"
        );
      }
    });
  }

  function boot() {
    enhanceSettings();
    if (global.JTG.Settings) global.JTG.Settings.init();
    initLoader();
    bootFeatures();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})(window);
