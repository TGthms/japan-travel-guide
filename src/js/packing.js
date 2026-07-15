/**
 * Interactive packing checklist with localStorage persistence
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
          });
          const span = document.createElement("span");
          span.textContent = t(`packing.item.${id}`);
          label.appendChild(input);
          label.appendChild(span);
          catEl.appendChild(label);
        });

        container.appendChild(catEl);
      });

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
  global.JTG.Packing = { bind, DEFAULT_ITEMS };
})(window);
