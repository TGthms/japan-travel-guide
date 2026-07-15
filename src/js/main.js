/**
 * Application bootstrap — load order:
 * settings → i18n → units → features → page-specific
 */
(function (global) {
  "use strict";

  function boot() {
    const S = global.JTG.Settings;
    if (S) S.init();

    if (global.JTG.i18n) global.JTG.i18n.apply();
    if (global.JTG.Units) global.JTG.Units.applyAll();

    if (global.JTG.Nav) {
      global.JTG.Nav.initNav();
      global.JTG.Nav.initSettingsUI();
    }

    if (global.JTG.Animations) global.JTG.Animations.init();

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

    // Re-apply units when settings change
    window.addEventListener("jtg:settings", (e) => {
      const key = e.detail && e.detail.key;
      if (!key || key === "distanceUnit" || key === "tempUnit" || !e.detail.key) {
        if (global.JTG.Units) global.JTG.Units.applyAll();
      }
      if (!key || key === "lang") {
        if (global.JTG.i18n) global.JTG.i18n.apply();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})(window);
