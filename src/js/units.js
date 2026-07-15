/**
 * Distance & temperature unit conversion helpers
 * All source data should be stored in km / °C
 */
(function (global) {
  "use strict";

  const KM_TO_MI = 0.621371;

  function toDistance(km, unit) {
    const u =
      unit ||
      (global.JTG.Settings && global.JTG.Settings.get("distanceUnit")) ||
      "km";
    if (u === "mi") return km * KM_TO_MI;
    return km;
  }

  function formatDistance(km, opts) {
    const u =
      (opts && opts.unit) ||
      (global.JTG.Settings && global.JTG.Settings.get("distanceUnit")) ||
      "km";
    const val = toDistance(km, u);
    const digits = opts && opts.digits != null ? opts.digits : val >= 100 ? 0 : 1;
    const n = Number(val).toFixed(digits);
    const label = u === "mi" ? "mi" : "km";
    return `${n} ${label}`;
  }

  function cToF(c) {
    return (c * 9) / 5 + 32;
  }

  function toTemp(c, unit) {
    const u =
      unit ||
      (global.JTG.Settings && global.JTG.Settings.get("tempUnit")) ||
      "c";
    if (u === "f") return cToF(c);
    return c;
  }

  function formatTemp(c, opts) {
    const u =
      (opts && opts.unit) ||
      (global.JTG.Settings && global.JTG.Settings.get("tempUnit")) ||
      "c";
    const val = toTemp(c, u);
    const digits = opts && opts.digits != null ? opts.digits : 0;
    const n = Number(val).toFixed(digits);
    const label = u === "f" ? "°F" : "°C";
    return `${n}${label}`;
  }

  function formatTempRange(cMin, cMax, opts) {
    return `${formatTemp(cMin, opts)} – ${formatTemp(cMax, opts)}`;
  }

  /** Refresh all [data-distance-km] and [data-temp-c] / [data-temp-c-min] elements */
  function applyAll(root) {
    const scope = root || document;
    scope.querySelectorAll("[data-distance-km]").forEach((el) => {
      const km = parseFloat(el.getAttribute("data-distance-km"));
      if (Number.isNaN(km)) return;
      const digits = el.dataset.digits != null ? parseInt(el.dataset.digits, 10) : undefined;
      el.textContent = formatDistance(km, { digits });
    });

    scope.querySelectorAll("[data-temp-c]").forEach((el) => {
      const c = parseFloat(el.getAttribute("data-temp-c"));
      if (Number.isNaN(c)) return;
      el.textContent = formatTemp(c);
    });

    scope.querySelectorAll("[data-temp-c-min][data-temp-c-max]").forEach((el) => {
      const a = parseFloat(el.getAttribute("data-temp-c-min"));
      const b = parseFloat(el.getAttribute("data-temp-c-max"));
      if (Number.isNaN(a) || Number.isNaN(b)) return;
      el.textContent = formatTempRange(a, b);
    });
  }

  global.JTG = global.JTG || {};
  global.JTG.Units = {
    toDistance,
    formatDistance,
    toTemp,
    formatTemp,
    formatTempRange,
    applyAll,
  };
})(window);
