/**
 * Settings & preferences — language, units, theme, motion
 * Persists to localStorage and broadcasts changes via CustomEvent
 */
(function (global) {
  "use strict";

  const STORAGE_KEY = "jtg-preferences";

  const DEFAULTS = {
    lang: "en",
    distanceUnit: "km",
    tempUnit: "c",
    theme: "auto",
    motion: "full",
  };

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...DEFAULTS };
      return { ...DEFAULTS, ...JSON.parse(raw) };
    } catch {
      return { ...DEFAULTS };
    }
  }

  function save(prefs) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch (e) {
      /* private mode / quota — in-memory prefs still apply */
    }
  }

  function resolveTheme(theme) {
    if (theme === "auto") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return theme;
  }

  function applyTheme(theme) {
    const resolved = resolveTheme(theme);
    document.documentElement.setAttribute("data-theme", resolved);
  }

  function applyMotion(motion) {
    if (motion !== "full" && motion !== "reduced" && motion !== "off") motion = "full";
    document.documentElement.setAttribute("data-motion", motion);
    var osReduce = false;
    try {
      osReduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    } catch (e) { /* ignore */ }
    var constrained = !!(global.JTG && global.JTG.ENV && global.JTG.ENV.constrained);
    var eff = motion === "off" ? "off" : (motion === "full" ? (constrained ? "reduced" : "full") : (motion === "reduced" ? "reduced" : (osReduce ? "reduced" : "full")));
    document.documentElement.setAttribute("data-motion-effective", eff);
  }

  const Settings = {
    prefs: load(),

    get(key) {
      return this.prefs[key];
    },

    set(key, value) {
      this.prefs[key] = value;
      save(this.prefs);
      this.applyAll();
      window.dispatchEvent(
        new CustomEvent("jtg:settings", { detail: { key, value, prefs: { ...this.prefs } } })
      );
    },

    setMany(partial) {
      Object.assign(this.prefs, partial);
      save(this.prefs);
      this.applyAll();
      window.dispatchEvent(
        new CustomEvent("jtg:settings", { detail: { prefs: { ...this.prefs } } })
      );
    },

    applyAll() {
      applyTheme(this.prefs.theme);
      applyMotion(this.prefs.motion);
      document.documentElement.lang =
        this.prefs.lang === "zh-CN" ? "zh-CN" : this.prefs.lang;
    },

    init() {
      this.applyAll();
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const onScheme = () => {
        if (this.prefs.theme === "auto") applyTheme("auto");
      };
      if (mq.addEventListener) mq.addEventListener("change", onScheme);
      else if (mq.addListener) mq.addListener(onScheme);
    },
  };

  global.JTG = global.JTG || {};
  global.JTG.Settings = Settings;
})(window);
