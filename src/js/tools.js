/**
 * Japan Travel Tools — currency, clocks, tax, JR Pass, rail cost, emergencies
 */
(function (global) {
  "use strict";

  const CLOCKS = [
    { id: "tokyo", tz: "Asia/Tokyo", labelKey: "tools.tzTokyo" },
    { id: "osaka", tz: "Asia/Tokyo", labelKey: "tools.tzOsaka", note: "JST" },
    { id: "sapporo", tz: "Asia/Tokyo", labelKey: "tools.tzSapporo", note: "JST" },
    { id: "naha", tz: "Asia/Tokyo", labelKey: "tools.tzNaha", note: "JST" },
    { id: "shanghai", tz: "Asia/Shanghai", labelKey: "tools.tzShanghai" },
    { id: "seoul", tz: "Asia/Seoul", labelKey: "tools.tzSeoul" },
    { id: "sydney", tz: "Australia/Sydney", labelKey: "tools.tzSydney" },
    { id: "london", tz: "Europe/London", labelKey: "tools.tzLondon" },
    { id: "newyork", tz: "America/New_York", labelKey: "tools.tzNewYork" },
    { id: "utc", tz: "UTC", labelKey: "tools.tzUtc" },
  ];

  // Approximate JR Pass-style prices (ordinary, as of tourist research — indicative only)
  const JR_PASS = {
    7: 50000,
    14: 80000,
    21: 100000,
  };

  // Simplified shinkansen one-way adult nozomi/hikari-ish averages (JPY)
  const RAIL_LEGS = {
    "tokyo-kyoto": 13500,
    "tokyo-osaka": 14000,
    "tokyo-hiroshima": 19000,
    "tokyo-fukuoka": 23000,
    "tokyo-kanazawa": 14500,
    "tokyo-sendai": 11000,
    "osaka-hiroshima": 10000,
    "osaka-fukuoka": 15000,
    "tokyo-nagoya": 10500,
  };

  function t(key) {
    return global.JTG && global.JTG.i18n ? global.JTG.i18n.t(key) : key;
  }

  function formatJPY(n) {
    try {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "JPY",
        maximumFractionDigits: 0,
      }).format(n);
    } catch {
      return "¥" + Math.round(n).toLocaleString();
    }
  }

  function initCurrency() {
    const amount = document.getElementById("tool-amount");
    const from = document.getElementById("tool-from");
    const to = document.getElementById("tool-to");
    const swap = document.getElementById("tool-swap");
    const result = document.getElementById("tool-currency-result");
    const meta = document.getElementById("tool-currency-meta");
    if (!amount || !from || !to || !result) return;

    async function ensureRates() {
      if (global.JTG.Currency) await global.JTG.Currency.fetchRates();
    }

    function convert() {
      const Cur = global.JTG.Currency;
      if (!Cur) return;
      const a = parseFloat(amount.value) || 0;
      const f = from.value;
      const tt = to.value;
      // Rates stored as JPY → X. Convert via JPY.
      const st = Cur.getState();
      const rates = { JPY: 1, ...(st.rates || {}) };

      function toJpy(val, cur) {
        if (cur === "JPY") return val;
        const r = rates[cur];
        if (!r) return null;
        return val / r;
      }
      function fromJpy(val, cur) {
        if (cur === "JPY") return val;
        const r = rates[cur];
        if (!r) return null;
        return val * r;
      }

      const jpy = toJpy(a, f);
      if (jpy == null) {
        result.textContent = "—";
        return;
      }
      const out = fromJpy(jpy, tt);
      if (out == null) {
        result.textContent = "—";
        return;
      }
      try {
        result.textContent = new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: tt,
          maximumFractionDigits: tt === "JPY" ? 0 : 2,
        }).format(out);
      } catch {
        result.textContent = out.toFixed(tt === "JPY" ? 0 : 2) + " " + tt;
      }
      if (meta) {
        const src =
          st.source === "live"
            ? t("budget.ratesLive")
            : st.source === "cache" || st.source === "stale"
              ? t("budget.ratesCached")
              : t("budget.ratesFallback");
        meta.textContent =
          `${src}${st.date && st.date !== "fallback" ? " (" + st.date + ")" : ""} · frankfurter.dev`;
      }
    }

    if (swap) {
      swap.addEventListener("click", () => {
        const a = from.value;
        from.value = to.value;
        to.value = a;
        convert();
      });
    }
    ["input", "change"].forEach((ev) => {
      amount.addEventListener(ev, convert);
      from.addEventListener(ev, convert);
      to.addEventListener(ev, convert);
    });
    window.addEventListener("jtg:fx", convert);
    window.addEventListener("jtg:i18n", convert);
    ensureRates().then(convert);
  }

  function initClocks() {
    const list = document.getElementById("world-clock-list");
    if (!list) return;

    function render() {
      const now = new Date();
      list.innerHTML = CLOCKS.map((c) => {
        let timeStr = "—";
        try {
          timeStr = new Intl.DateTimeFormat(undefined, {
            timeZone: c.tz,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          }).format(now);
        } catch {
          /* ignore */
        }
        const label = t(c.labelKey);
        return `<div class="clock-row"><span><strong>${label}</strong></span><span class="clock-time">${timeStr}</span></div>`;
      }).join("");
    }

    render();
    window.addEventListener("jtg:i18n", render);
    setInterval(render, 1000);
  }

  function initTax() {
    const bill = document.getElementById("tax-bill");
    const rate = document.getElementById("tax-rate");
    const result = document.getElementById("tax-result");
    const meta = document.getElementById("tax-meta");
    if (!bill || !rate || !result) return;

    function run() {
      const b = parseFloat(bill.value) || 0;
      const r = parseFloat(rate.value) || 0;
      const tax = b * (r / 100);
      const total = b + tax;
      result.textContent = `${formatJPY(total)}`;
      if (meta) {
        meta.textContent = `${t("tools.taxOnly")}: ${formatJPY(tax)} · ${t("tools.preTax")}: ${formatJPY(b)}`;
      }
    }
    ["input", "change"].forEach((ev) => {
      bill.addEventListener(ev, run);
      rate.addEventListener(ev, run);
    });
    window.addEventListener("jtg:i18n", run);
    run();
  }

  function initJrPass() {
    const days = document.getElementById("jr-days");
    const legs = document.getElementById("jr-legs");
    const result = document.getElementById("jr-result");
    const meta = document.getElementById("jr-meta");
    if (!days || !legs || !result) return;

    function run() {
      const d = parseInt(days.value, 10) || 7;
      const n = Math.max(0, parseInt(legs.value, 10) || 0);
      // pick closest pass tier
      let passCost = JR_PASS[7];
      let passDays = 7;
      if (d > 7 && d <= 14) {
        passCost = JR_PASS[14];
        passDays = 14;
      } else if (d > 14) {
        passCost = JR_PASS[21];
        passDays = 21;
      }
      const avgLeg = 13000;
      const individual = n * avgLeg;
      const save = individual - passCost;
      result.textContent =
        save > 0
          ? `${t("tools.jrWorthIt")} · ${t("tools.jrSave")} ${formatJPY(save)}`
          : `${t("tools.jrMaybeNot")} · ${t("tools.jrDiff")} ${formatJPY(Math.abs(save))}`;
      if (meta) {
        meta.textContent = `${t("tools.jrPassEst")} (${passDays}d): ${formatJPY(passCost)} · ${t("tools.jrTicketsEst")}: ${formatJPY(individual)} · ${t("tools.jrDisclaimer")}`;
      }
    }
    ["input", "change"].forEach((ev) => {
      days.addEventListener(ev, run);
      legs.addEventListener(ev, run);
    });
    window.addEventListener("jtg:i18n", run);
    run();
  }

  function initRail() {
    const route = document.getElementById("rail-route");
    const trips = document.getElementById("rail-trips");
    const result = document.getElementById("rail-result");
    const meta = document.getElementById("rail-meta");
    if (!route || !trips || !result) return;

    function run() {
      const key = route.value;
      const n = Math.max(1, parseInt(trips.value, 10) || 1);
      const base = RAIL_LEGS[key] || 12000;
      const total = base * n;
      result.textContent = formatJPY(total);
      if (meta) {
        meta.textContent = `${t("tools.railOneWay")}: ~${formatJPY(base)} · ${t("tools.railDisclaimer")}`;
      }
    }
    ["input", "change"].forEach((ev) => {
      route.addEventListener(ev, run);
      trips.addEventListener(ev, run);
    });
    window.addEventListener("jtg:i18n", run);
    run();
  }

  function init() {
    if (!document.body.classList.contains("page-tools") && document.body.dataset.page !== "tools") {
      return;
    }
    initCurrency();
    initClocks();
    initTax();
    initJrPass();
    initRail();
  }

  global.JTG = global.JTG || {};
  global.JTG.Tools = { init };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(window);
