/**
 * Detailed Japan trip budget planner
 * Daily rates + once-per-trip add-ons, multi-currency, tips, ranges
 */
(function (global) {
  "use strict";

  const STORAGE_KEY = "jtg-budget-v2";

  /** Midpoint daily/once rates in JPY (planning averages, not quotes) */
  const RATES = {
    accommodation: {
      hostel: 4000,
      business: 10000,
      mid: 17000,
      ryokan: 32000,
      luxury: 50000,
    },
    transport: {
      local: 1100,
      pass: 2000,
      active: 3200,
      taxi: 7500,
    },
    food: {
      budget: 3000,
      mid: 5500,
      nice: 10000,
      gourmet: 18000,
    },
    attractions: {
      light: 1500,
      standard: 4000,
      heavy: 9000,
    },
    railLeg: {
      shinkansen: 13000,
      highway: 5000,
      pass: 9000, // effective amortized per long leg when using JR Pass style
      flight: 12000,
    },
    airport: {
      train: 3000, // per person RT
      express: 6000,
      taxi: 20000, // shared RT vehicle — divided by travelers later carefully
    },
    sim: {
      none: 0,
      esim: 3500,
      premium: 6000,
    },
    season: {
      low: 0.92,
      shoulder: 1.0,
      peak: 1.18,
    },
  };

  const PRESETS = {
    backpacker: {
      accommodation: "hostel",
      rooms: 1,
      transport: "local",
      food: "budget",
      attractions: "light",
      railStyle: "highway",
      airport: "train",
      sim: "esim",
      buffer: "10",
      season: "shoulder",
    },
    balanced: {
      accommodation: "mid",
      rooms: 1,
      transport: "pass",
      food: "mid",
      attractions: "standard",
      railStyle: "shinkansen",
      airport: "express",
      sim: "esim",
      buffer: "10",
      season: "shoulder",
    },
    comfort: {
      accommodation: "mid",
      rooms: 1,
      transport: "active",
      food: "nice",
      attractions: "standard",
      railStyle: "shinkansen",
      airport: "express",
      sim: "premium",
      buffer: "15",
      season: "shoulder",
    },
    luxury: {
      accommodation: "luxury",
      rooms: 1,
      transport: "taxi",
      food: "gourmet",
      attractions: "heavy",
      railStyle: "shinkansen",
      airport: "taxi",
      sim: "premium",
      buffer: "15",
      season: "peak",
    },
  };

  function clamp(n, min, max) {
    n = Number(n);
    if (!isFinite(n)) n = min;
    return Math.min(max, Math.max(min, n));
  }

  function suggestedRailLegs(cities) {
    const c = clamp(cities, 1, 10);
    return Math.max(0, (c - 1) * 2);
  }

  function calc(input) {
    const days = clamp(input.days, 1, 90);
    const travelers = clamp(input.travelers, 1, 12);
    const cities = clamp(input.cities, 1, 10);
    const rooms = clamp(input.rooms, 1, 6);
    let railLegs = input.railLegs;
    if (railLegs === "" || railLegs == null) railLegs = suggestedRailLegs(cities);
    railLegs = clamp(railLegs, 0, 20);

    const seasonMult = RATES.season[input.season] || 1;
    const accNight = RATES.accommodation[input.accommodation] || RATES.accommodation.mid;
    const cityTransportDay = RATES.transport[input.transport] || RATES.transport.pass;
    const foodDay = RATES.food[input.food] || RATES.food.mid;
    const attrDay = RATES.attractions[input.attractions] || RATES.attractions.standard;
    const railPerLeg = RATES.railLeg[input.railStyle] || RATES.railLeg.shinkansen;
    const simTrip = RATES.sim[input.sim] || 0;
    const bufferPct = clamp(input.buffer, 0, 30) / 100;

    // Lodging: per room per night × rooms × days × season
    const lodging = Math.round(accNight * rooms * days * seasonMult);

    // Per-person daily costs × travelers × days
    const transportLocal = Math.round(cityTransportDay * travelers * days);
    const meals = Math.round(foodDay * travelers * days * (input.season === "peak" ? 1.05 : 1));
    const sights = Math.round(attrDay * travelers * days);

    // Long-distance: per person per leg
    const rail = Math.round(railPerLeg * railLegs * travelers);

    // Airport: train/express per person; taxi shared
    let airport = 0;
    if (input.airport === "taxi") {
      airport = Math.round(RATES.airport.taxi * Math.max(1, Math.ceil(travelers / 3)));
    } else {
      const pp = RATES.airport[input.airport] || RATES.airport.train;
      airport = Math.round(pp * travelers);
    }

    const connectivity = Math.round(simTrip * travelers);
    const pocket = Math.round(800 * days * travelers); // small cash / vending / souvenirs baseline

    const subtotal =
      lodging + transportLocal + meals + sights + rail + airport + connectivity + pocket;
    const contingency = Math.round(subtotal * bufferPct);
    const total = subtotal + contingency;
    const perPerson = Math.round(total / travelers);
    const perDay = Math.round(total / days);
    const perPersonPerDay = Math.round(total / travelers / days);

    const lines = [
      { key: "lodging", amount: lodging },
      { key: "meals", amount: meals },
      { key: "transportLocal", amount: transportLocal },
      { key: "rail", amount: rail },
      { key: "sights", amount: sights },
      { key: "airport", amount: airport },
      { key: "connectivity", amount: connectivity },
      { key: "pocket", amount: pocket },
      { key: "contingency", amount: contingency },
    ].filter((l) => l.amount > 0);

    // Range: lean (−12%) / plan / stretch (+18%)
    const lean = Math.round(total * 0.88);
    const stretch = Math.round(total * 1.18);

    return {
      days,
      travelers,
      cities,
      rooms,
      railLegs,
      lodging,
      transportLocal,
      meals,
      sights,
      rail,
      airport,
      connectivity,
      pocket,
      contingency,
      bufferPct,
      subtotal,
      total,
      perPerson,
      perDay,
      perPersonPerDay,
      lines,
      lean,
      stretch,
      seasonMult,
    };
  }

  function loadSaved() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function saveInputs(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* ignore */
    }
  }

  function bind(formRoot) {
    if (!formRoot) return;

    const $ = (id) => document.getElementById(id);
    const fields = {
      days: $("budget-days"),
      travelers: $("budget-travelers"),
      cities: $("budget-cities"),
      season: $("budget-season"),
      accommodation: $("budget-acc"),
      rooms: $("budget-rooms"),
      transport: $("budget-transport"),
      food: $("budget-food"),
      attractions: $("budget-attr"),
      railLegs: $("budget-rail-legs"),
      railStyle: $("budget-rail-style"),
      airport: $("budget-airport"),
      sim: $("budget-sim"),
      buffer: $("budget-buffer"),
      currency: $("budget-currency"),
    };

    const totalEl = $("budget-total");
    const metaEl = $("budget-meta");
    const rangeEl = $("budget-range");
    const breakdownEl = $("budget-breakdown");
    const tipsEl = $("budget-tips");
    const noteEl = $("budget-rates-note");
    const presetsRoot = $("budget-presets");

    let syncingRailFromCities = false;
    let lastCities = fields.cities ? Number(fields.cities.value) : 3;

    // Restore
    const saved = loadSaved();
    if (saved) {
      Object.keys(fields).forEach((k) => {
        if (fields[k] && saved[k] != null) fields[k].value = saved[k];
      });
      lastCities = fields.cities ? Number(fields.cities.value) : lastCities;
    }

    function t(key) {
      return global.JTG && global.JTG.i18n ? global.JTG.i18n.t(key) : key;
    }

    function money(jpy, currency) {
      const Cur = global.JTG.Currency;
      if (!Cur) return "¥" + Math.round(jpy).toLocaleString();
      if (currency === "JPY") return Cur.formatMoney(jpy, "JPY");
      const converted = Cur.jpyTo(jpy, currency);
      if (converted == null) return Cur.formatMoney(jpy, "JPY");
      return Cur.formatMoney(converted, currency);
    }

    function readInput() {
      return {
        days: fields.days && fields.days.value,
        travelers: fields.travelers && fields.travelers.value,
        cities: fields.cities && fields.cities.value,
        season: fields.season && fields.season.value,
        accommodation: fields.accommodation && fields.accommodation.value,
        rooms: fields.rooms && fields.rooms.value,
        transport: fields.transport && fields.transport.value,
        food: fields.food && fields.food.value,
        attractions: fields.attractions && fields.attractions.value,
        railLegs: fields.railLegs && fields.railLegs.value,
        railStyle: fields.railStyle && fields.railStyle.value,
        airport: fields.airport && fields.airport.value,
        sim: fields.sim && fields.sim.value,
        buffer: fields.buffer && fields.buffer.value,
      };
    }

    function buildTips(input, result) {
      const tips = [];
      if (result.railLegs >= 3 && input.railStyle === "shinkansen" && result.days >= 7) {
        tips.push(t("budget.tipJrPass"));
      }
      if (input.season === "peak") {
        tips.push(t("budget.tipPeak"));
      }
      if (result.travelers >= 2 && result.rooms === 1 && input.accommodation !== "hostel") {
        tips.push(t("budget.tipShareRoom"));
      }
      if (input.food === "budget") {
        tips.push(t("budget.tipKonbini"));
      }
      if (input.transport === "taxi") {
        tips.push(t("budget.tipTaxi"));
      }
      if (result.cities >= 4 && result.days < result.cities * 2) {
        tips.push(t("budget.tipSlowDown"));
      }
      if (result.bufferPct < 0.1) {
        tips.push(t("budget.tipBuffer"));
      }
      if (tips.length === 0) {
        tips.push(t("budget.tipDefault"));
      }
      return tips.slice(0, 4);
    }

    function lineLabel(key) {
      const map = {
        lodging: "budget.lodging",
        meals: "budget.meals",
        transportLocal: "budget.transportLocal",
        rail: "budget.rail",
        sights: "budget.sights",
        airport: "budget.airportLine",
        connectivity: "budget.connectivity",
        pocket: "budget.pocket",
        contingency: "budget.contingency",
      };
      return t(map[key] || key);
    }

    function render() {
      const input = readInput();
      saveInputs(
        Object.assign({}, input, {
          currency: fields.currency && fields.currency.value,
        })
      );

      const result = calc(input);
      const currency = (fields.currency && fields.currency.value) || "JPY";

      if (totalEl) totalEl.textContent = money(result.total, currency);

      if (metaEl) {
        metaEl.innerHTML =
          '<div class="budget-meta-item"><span>' +
          t("budget.perPerson") +
          "</span><strong>" +
          money(result.perPerson, currency) +
          "</strong></div>" +
          '<div class="budget-meta-item"><span>' +
          t("budget.perDay") +
          "</span><strong>" +
          money(result.perDay, currency) +
          "</strong></div>" +
          '<div class="budget-meta-item"><span>' +
          t("budget.perPersonDay") +
          "</span><strong>" +
          money(result.perPersonPerDay, currency) +
          "</strong></div>";
      }

      if (rangeEl) {
        rangeEl.innerHTML =
          '<div class="budget-range__item budget-range__item--lean"><span data-i18n-skip="1">' +
          t("budget.rangeLean") +
          '</span><strong>' +
          money(result.lean, currency) +
          "</strong></div>" +
          '<div class="budget-range__item budget-range__item--plan is-active"><span>' +
          t("budget.rangePlan") +
          "</span><strong>" +
          money(result.total, currency) +
          "</strong></div>" +
          '<div class="budget-range__item budget-range__item--stretch"><span>' +
          t("budget.rangeStretch") +
          "</span><strong>" +
          money(result.stretch, currency) +
          "</strong></div>";
      }

      if (breakdownEl) {
        const maxLine = Math.max.apply(
          null,
          result.lines.map((l) => l.amount).concat([1])
        );
        breakdownEl.innerHTML = result.lines
          .map(function (line) {
            const pct = Math.round((line.amount / result.total) * 100);
            const bar = Math.round((line.amount / maxLine) * 100);
            return (
              '<div class="budget-line">' +
              '<div class="budget-line__top">' +
              "<span>" +
              lineLabel(line.key) +
              '</span><strong>' +
              money(line.amount, currency) +
              "</strong></div>" +
              '<div class="budget-line__track" aria-hidden="true"><span class="budget-line__fill" style="width:' +
              bar +
              '%"></span></div>' +
              '<div class="budget-line__pct">' +
              pct +
              "% " +
              t("budget.ofTotal") +
              "</div></div>"
            );
          })
          .join("");
      }

      if (tipsEl) {
        tipsEl.innerHTML = buildTips(input, result)
          .map(function (tip) {
            return "<li>" + tip + "</li>";
          })
          .join("");
      }

      if (noteEl && global.JTG.Currency) {
        const st = global.JTG.Currency.getState();
        const src =
          st.source === "live"
            ? t("budget.ratesLive")
            : st.source === "cache" || st.source === "stale"
              ? t("budget.ratesCached")
              : t("budget.ratesFallback");
        noteEl.textContent =
          src +
          (st.date && st.date !== "fallback" ? " (" + st.date + ")" : "") +
          " · frankfurter.dev";
      }
    }

    // Auto-update rail legs when cities change (if user hadn't customized much)
    if (fields.cities) {
      fields.cities.addEventListener("change", function () {
        const c = Number(fields.cities.value);
        if (fields.railLegs && (syncingRailFromCities || Number(fields.railLegs.value) === suggestedRailLegs(lastCities))) {
          fields.railLegs.value = String(suggestedRailLegs(c));
        }
        lastCities = c;
      });
    }

    // Presets
    if (presetsRoot) {
      presetsRoot.querySelectorAll("[data-preset]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          const key = btn.getAttribute("data-preset");
          const preset = PRESETS[key];
          if (!preset) return;
          presetsRoot.querySelectorAll("[data-preset]").forEach(function (b) {
            b.classList.toggle("is-active", b === btn);
          });
          Object.keys(preset).forEach(function (k) {
            const map = {
              accommodation: "accommodation",
              rooms: "rooms",
              transport: "transport",
              food: "food",
              attractions: "attractions",
              railStyle: "railStyle",
              airport: "airport",
              sim: "sim",
              buffer: "buffer",
              season: "season",
            };
            const fieldKey = map[k] || k;
            if (fields[fieldKey]) fields[fieldKey].value = preset[k];
          });
          if (fields.railLegs && fields.cities) {
            fields.railLegs.value = String(suggestedRailLegs(fields.cities.value));
          }
          render();
        });
      });
    }

    formRoot.addEventListener("input", render);
    formRoot.addEventListener("change", render);
    // Also listen on currency which is inside formRoot
    window.addEventListener("jtg:fx", render);
    window.addEventListener("jtg:i18n", render);
    render();
  }

  global.JTG = global.JTG || {};
  global.JTG.Budget = { calc, bind, RATES, PRESETS };
})(window);
