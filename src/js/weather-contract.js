/**
 * Japan weather contract — Open-Meteo only.
 * Loaded before weather.js. Tests import this file as the shipped source of truth.
 */
(function (global) {
  "use strict";
  global.JTG = global.JTG || {};
  global.JTG.WeatherContract = {
    provider: "open-meteo",
    attribution: "Data: Open-Meteo (CC BY 4.0). Guidance only — not for emergencies.",
    isLikelyUs: function () {
      return false;
    },
    shouldFetchNwsAlerts: function () {
      return false;
    },
    forecastBase: "https://api.open-meteo.com/v1/forecast",
    geocodeBase: "https://geocoding-api.open-meteo.com/v1/search",
    airBase: "https://air-quality-api.open-meteo.com/v1/air-quality",
  };
})(typeof window !== "undefined" ? window : globalThis);
