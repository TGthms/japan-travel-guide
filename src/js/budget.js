/**
 * Budget planner calculator + multi-currency display
 * All inputs priced in JPY per day (or fixed) then totaled
 */
(function (global) {
  "use strict";

  const RATES = {
    accommodation: {
      hostel: 3500,
      business: 9000,
      mid: 15000,
      luxury: 40000,
    },
    transport: {
      local: 1200,
      jrpass: 4500, // approx amortized daily for longer trips
      private: 8000,
    },
    food: {
      budget: 2500,
      mid: 5000,
      gourmet: 12000,
    },
    attractions: {
      light: 1500,
      standard: 3500,
      heavy: 7000,
    },
  };

  function calc(input) {
    const days = Math.max(1, parseInt(input.days, 10) || 1);
    const acc = RATES.accommodation[input.accommodation] || RATES.accommodation.mid;
    const tr = RATES.transport[input.transport] || RATES.transport.local;
    const food = RATES.food[input.food] || RATES.food.mid;
    const attr =
      RATES.attractions[input.attractions] || RATES.attractions.standard;

    const lodging = acc * days;
    const transport = tr * days;
    const meals = food * days;
    const sights = attr * days;
    const misc = Math.round(days * 1000);
    const total = lodging + transport + meals + sights + misc;

    return {
      days,
      lodging,
      transport,
      meals,
      sights,
      misc,
      total,
      perDay: Math.round(total / days),
    };
  }

  function bind(formRoot) {
    if (!formRoot) return;

    const daysEl = formRoot.querySelector("#budget-days");
    const accEl = formRoot.querySelector("#budget-acc");
    const trEl = formRoot.querySelector("#budget-transport");
    const foodEl = formRoot.querySelector("#budget-food");
    const attrEl = formRoot.querySelector("#budget-attr");
    const currencyEl = formRoot.querySelector("#budget-currency");
    const totalEl = formRoot.querySelector("#budget-total");
    const breakdownEl = formRoot.querySelector("#budget-breakdown");
    const noteEl = formRoot.querySelector("#budget-rates-note");

    function money(jpy, currency) {
      const Cur = global.JTG.Currency;
      if (!Cur) return `¥${jpy.toLocaleString()}`;
      if (currency === "JPY") return Cur.formatMoney(jpy, "JPY");
      const converted = Cur.jpyTo(jpy, currency);
      if (converted == null) return Cur.formatMoney(jpy, "JPY");
      return Cur.formatMoney(converted, currency);
    }

    function render() {
      const result = calc({
        days: daysEl && daysEl.value,
        accommodation: accEl && accEl.value,
        transport: trEl && trEl.value,
        food: foodEl && foodEl.value,
        attractions: attrEl && attrEl.value,
      });
      const currency = (currencyEl && currencyEl.value) || "JPY";

      if (totalEl) {
        totalEl.textContent = money(result.total, currency);
      }

      if (breakdownEl) {
        const t = global.JTG.i18n ? global.JTG.i18n.t.bind(global.JTG.i18n) : (k) => k;
        breakdownEl.innerHTML = `
          <div><span>${t("budget.lodging")}</span><strong>${money(result.lodging, currency)}</strong></div>
          <div><span>${t("budget.transportLine")}</span><strong>${money(result.transport, currency)}</strong></div>
          <div><span>${t("budget.meals")}</span><strong>${money(result.meals, currency)}</strong></div>
          <div><span>${t("budget.sights")}</span><strong>${money(result.sights, currency)}</strong></div>
          <div><span>${t("budget.misc")}</span><strong>${money(result.misc, currency)}</strong></div>
          <div><span>${t("budget.perDay")}</span><strong>${money(result.perDay, currency)}</strong></div>
        `;
      }

      if (noteEl && global.JTG.Currency) {
        const st = global.JTG.Currency.getState();
        const t = global.JTG.i18n ? global.JTG.i18n.t.bind(global.JTG.i18n) : (k) => k;
        const src =
          st.source === "live"
            ? t("budget.ratesLive")
            : st.source === "cache" || st.source === "stale"
              ? t("budget.ratesCached")
              : t("budget.ratesFallback");
        noteEl.textContent = `${src}${st.date && st.date !== "fallback" ? ` (${st.date})` : ""} · frankfurter.dev`;
      }
    }

    ["input", "change"].forEach((evt) => {
      formRoot.addEventListener(evt, render);
    });

    window.addEventListener("jtg:fx", render);
    window.addEventListener("jtg:i18n", render);
    render();
  }

  global.JTG = global.JTG || {};
  global.JTG.Budget = { calc, bind, RATES };
})(window);
