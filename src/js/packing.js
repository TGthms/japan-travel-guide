/**
 * Interactive packing checklist with localStorage persistence + progress bar
 */
(function (global) {
  "use strict";

  const STORAGE_KEY = "jtg-packing";

  const DEFAULT_ITEMS = {
    documents: ["passport", "tickets", "jrpass", "insurance", "copies"],
    clothing: ["layers", "comfortableShoes", "rainJacket", "formalOption", "socks"],
    tech: ["phone", "adapter", "powerBank", "earbuds", "camera"],
    health: ["meds", "mask", "sanitizer", "sunscreen", "motion"],
    extras: ["cashYen", "toteBag", "phrasebook", "umbrella", "snacks"],
  };

  function allKeys() {
    const keys = [];
    Object.keys(DEFAULT_ITEMS).forEach((cat) => {
      DEFAULT_ITEMS[cat].forEach((id) => keys.push(`${cat}.${id}`));
    });
    return keys;
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  function saveState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function countProgress(state) {
    const keys = allKeys();
    const total = keys.length;
    let done = 0;
    keys.forEach((k) => {
      if (state[k]) done += 1;
    });
    return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
  }

  function updateProgress(state) {
    const t = global.JTG.i18n ? global.JTG.i18n.t.bind(global.JTG.i18n) : (k) => k;
    const { done, total, pct } = countProgress(state);

    const countEl = document.getElementById("packing-progress-count");
    const fillEl = document.getElementById("packing-progress-fill");
    const barEl = document.getElementById("packing-progress-bar");
    const hintEl = document.getElementById("packing-progress-hint");
    const wrap = document.getElementById("packing-progress");

    if (countEl) {
      countEl.textContent = `${done} / ${total}`;
    }
    if (fillEl) {
      fillEl.classList.toggle("is-complete", pct >= 100);
      fillEl.classList.toggle("is-started", pct > 0 && pct < 100);
      const w = pct + "%";
      // Ensure transition is visible even when width was 0 on first paint
      if (!fillEl.style.width) fillEl.style.width = "0%";
      requestAnimationFrame(function () {
        fillEl.style.width = w;
      });
    }
    if (barEl) {
      barEl.setAttribute("aria-valuenow", String(pct));
      barEl.setAttribute("aria-valuetext", `${done} of ${total} items packed, ${pct}%`);
    }
    if (hintEl) {
      if (pct >= 100) {
        hintEl.textContent = t("packing.progressDone");
      } else if (pct > 0) {
        // Prefer localized template if present
        const tmpl = t("packing.progressMid");
        hintEl.textContent =
          tmpl && tmpl !== "packing.progressMid"
            ? tmpl.replace("{pct}", String(pct)).replace("{done}", String(done)).replace("{total}", String(total))
            : `${pct}% packed — keep going.`;
      } else {
        hintEl.textContent = t("packing.progressStart");
      }
    }
    if (wrap) {
      wrap.classList.toggle("is-complete", pct >= 100);
      wrap.classList.toggle("is-started", pct > 0);
    }
  }

  function bind(container) {
    if (!container) return;
    let state = loadState();

    function render() {
      const t = global.JTG.i18n ? global.JTG.i18n.t.bind(global.JTG.i18n) : (k) => k;
      container.innerHTML = "";

      Object.keys(DEFAULT_ITEMS).forEach((cat) => {
        const catEl = document.createElement("div");
        catEl.className = "packing-cat reveal";
        const h = document.createElement("h3");
        h.textContent = t(`packing.cat.${cat}`);
        catEl.appendChild(h);

        DEFAULT_ITEMS[cat].forEach((id) => {
          const key = `${cat}.${id}`;
          const label = document.createElement("label");
          label.className = "packing-item" + (state[key] ? " is-checked" : "");
          const input = document.createElement("input");
          input.type = "checkbox";
          input.checked = !!state[key];
          input.addEventListener("change", () => {
            state[key] = input.checked;
            saveState(state);
            label.classList.toggle("is-checked", input.checked);
            updateProgress(state);
          });
          const span = document.createElement("span");
          span.textContent = t(`packing.item.${id}`);
          label.appendChild(input);
          label.appendChild(span);
          catEl.appendChild(label);
        });

        container.appendChild(catEl);
      });

      updateProgress(state);

      if (global.JTG.Animations && global.JTG.Animations.observeReveals) {
        global.JTG.Animations.observeReveals(container);
      }
    }

    const resetBtn = document.getElementById("packing-reset");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        state = {};
        saveState(state);
        render();
      });
    }

    const checkAllBtn = document.getElementById("packing-check-all");
    if (checkAllBtn) {
      checkAllBtn.addEventListener("click", () => {
        Object.keys(DEFAULT_ITEMS).forEach((cat) => {
          DEFAULT_ITEMS[cat].forEach((id) => {
            state[`${cat}.${id}`] = true;
          });
        });
        saveState(state);
        render();
      });
    }

    window.addEventListener("jtg:i18n", render);
    render();
  }

  global.JTG = global.JTG || {};
  global.JTG.Packing = { bind, DEFAULT_ITEMS, countProgress };
})(window);
