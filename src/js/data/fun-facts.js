/**
 * Fun facts rotator — large pool, one at a time, with transition animation
 */
(function (global) {
  "use strict";

  const FACT_COUNT = 48;

  function motionOk() {
    if (global.JTG && global.JTG.Animations && global.JTG.Animations.motionOk) {
      return global.JTG.Animations.motionOk();
    }
    const pref =
      (global.JTG.Settings && global.JTG.Settings.get("motion")) || "full";
    if (pref === "reduced") return false;
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function bind(box) {
    if (!box) return;
    const textEl = box.querySelector("[data-fact-text]");
    const btn = box.querySelector("[data-fact-refresh]");
    let last = -1;
    let busy = false;

    function pickIndex() {
      let idx = Math.floor(Math.random() * FACT_COUNT);
      if (idx === last && FACT_COUNT > 1) idx = (idx + 1) % FACT_COUNT;
      last = idx;
      return idx;
    }

    function setText(idx) {
      const t = global.JTG.i18n
        ? global.JTG.i18n.t.bind(global.JTG.i18n)
        : (k) => k;
      if (textEl) textEl.textContent = t(`funFacts.items.${idx}`);
    }

    function show(animated) {
      const idx = pickIndex();
      if (!textEl) return;

      if (!animated || !motionOk()) {
        textEl.classList.remove("is-out", "is-in");
        setText(idx);
        return;
      }

      if (busy) return;
      busy = true;
      box.classList.add("is-animating");
      if (btn) {
        btn.classList.remove("is-pulse");
        // reflow for re-trigger
        void btn.offsetWidth;
        btn.classList.add("is-pulse");
      }

      textEl.classList.remove("is-in");
      textEl.classList.add("is-out");

      window.setTimeout(() => {
        setText(idx);
        textEl.classList.remove("is-out");
        textEl.classList.add("is-in");
        box.classList.remove("is-animating");
        busy = false;
      }, 280);
    }

    if (btn) {
      btn.addEventListener("click", () => show(true));
    }

    // Language change: swap text without full exit if possible
    window.addEventListener("jtg:i18n", () => {
      if (last < 0) {
        show(false);
        return;
      }
      const t = global.JTG.i18n
        ? global.JTG.i18n.t.bind(global.JTG.i18n)
        : (k) => k;
      if (textEl) textEl.textContent = t(`funFacts.items.${last}`);
    });

    // Initial fact with entrance animation
    last = -1;
    const first = pickIndex();
    setText(first);
    if (motionOk() && textEl) {
      textEl.classList.add("is-in");
    }
  }

  global.JTG = global.JTG || {};
  global.JTG.FunFacts = { bind, FACT_COUNT };
})(window);
