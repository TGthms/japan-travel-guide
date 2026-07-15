/**
 * Live FX rates via frankfurter.dev (ECB-based)
 * Base: JPY → USD, EUR, CNY, GBP with localStorage cache
 */
(function (global) {
  "use strict";

  const CACHE_KEY = "jtg-fx-cache";
  const CACHE_MS = 12 * 60 * 60 * 1000; // 12 hours
  const API =
    "https://api.frankfurter.dev/v1/latest?base=JPY&symbols=USD,EUR,CNY,GBP,KRW,AUD,CAD,CHF,HKD,SGD,THB,TWD";

  /** Fallback mid-ish rates if network fails and no cache (approx JPY → X) */
  const FALLBACK = {
    date: "fallback",
    rates: {
      USD: 0.0067,
      EUR: 0.0061,
      CNY: 0.048,
      GBP: 0.0052,
      KRW: 9.2,
      AUD: 0.01,
      CAD: 0.009,
      CHF: 0.0059,
      HKD: 0.052,
      SGD: 0.009,
      THB: 0.24,
      TWD: 0.21,
    },
  };

  let state = {
    date: null,
    rates: { ...FALLBACK.rates },
    source: "fallback",
  };

  function readCache() {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (!data || !data.fetchedAt || !data.rates) return null;
      if (Date.now() - data.fetchedAt > CACHE_MS) return null;
      return data;
    } catch {
      return null;
    }
  }

  function writeCache(payload) {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ ...payload, fetchedAt: Date.now() })
    );
  }

  function applyRates(rates, date, source) {
    state = { rates: { ...rates }, date, source };
    window.dispatchEvent(
      new CustomEvent("jtg:fx", { detail: { ...state } })
    );
  }

  async function fetchRates() {
    const cached = readCache();
    if (cached) {
      applyRates(cached.rates, cached.date, "cache");
    }

    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error("FX HTTP " + res.status);
      const data = await res.json();
      if (!data.rates) throw new Error("No rates");
      applyRates(data.rates, data.date, "live");
      writeCache({ rates: data.rates, date: data.date });
      return state;
    } catch (err) {
      if (!cached) {
        // try stale cache without TTL
        try {
          const raw = localStorage.getItem(CACHE_KEY);
          if (raw) {
            const data = JSON.parse(raw);
            applyRates(data.rates, data.date, "stale");
            return state;
          }
        } catch {
          /* ignore */
        }
        applyRates(FALLBACK.rates, FALLBACK.date, "fallback");
      }
      console.warn("[JTG] FX fetch failed, using", state.source, err);
      return state;
    }
  }

  function jpyTo(amountJpy, currency) {
    if (currency === "JPY") return amountJpy;
    const rate = state.rates[currency];
    if (!rate) return null;
    return amountJpy * rate;
  }

  function formatMoney(amount, currency) {
    try {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency,
        maximumFractionDigits: currency === "JPY" ? 0 : 2,
      }).format(amount);
    } catch {
      return `${amount.toFixed(currency === "JPY" ? 0 : 2)} ${currency}`;
    }
  }

  function getState() {
    return { ...state, rates: { ...state.rates } };
  }

  global.JTG = global.JTG || {};
  global.JTG.Currency = {
    fetchRates,
    jpyTo,
    formatMoney,
    getState,
  };
})(window);
