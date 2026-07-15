/**
 * Sticky nav, mobile menu, active section highlight,
 * scroll progress, settings panel open/close
 */
(function (global) {
  "use strict";

  function initNav() {
    const header = document.querySelector(".site-header");
    const toggle = document.querySelector(".nav__toggle");
    const links = document.querySelector(".nav__links");
    const progress = document.getElementById("scroll-progress");
    const sectionLinks = document.querySelectorAll('.nav__links a[href^="#"]');

    if (toggle && links) {
      toggle.addEventListener("click", () => {
        const open = links.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      links.querySelectorAll("a").forEach((a) => {
        a.addEventListener("click", () => {
          links.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }

    function onScroll() {
      const y = window.scrollY || document.documentElement.scrollTop;
      if (header) header.classList.toggle("is-scrolled", y > 12);

      if (progress) {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const pct = max > 0 ? (y / max) * 100 : 0;
        progress.style.width = pct + "%";
      }

      // Active section
      if (sectionLinks.length) {
        let current = "";
        document.querySelectorAll("section[id]").forEach((sec) => {
          const top = sec.offsetTop - 120;
          if (y >= top) current = sec.id;
        });
        sectionLinks.forEach((a) => {
          const href = a.getAttribute("href") || "";
          a.classList.toggle("is-active", href === "#" + current);
        });
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initSettingsUI() {
    const openBtns = document.querySelectorAll("[data-open-settings]");
    const overlay = document.getElementById("settings-overlay");
    const panel = document.getElementById("settings-panel");
    const closeBtns = document.querySelectorAll("[data-close-settings]");

    function open() {
      if (overlay) overlay.classList.add("is-open");
      if (panel) panel.classList.add("is-open");
      document.body.style.overflow = "hidden";
      syncButtons();
    }

    function close() {
      if (overlay) overlay.classList.remove("is-open");
      if (panel) panel.classList.remove("is-open");
      document.body.style.overflow = "";
    }

    openBtns.forEach((b) => b.addEventListener("click", open));
    closeBtns.forEach((b) => b.addEventListener("click", close));
    if (overlay) overlay.addEventListener("click", close);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });

    function syncButtons() {
      const S = global.JTG.Settings;
      if (!S) return;
      document.querySelectorAll("[data-setting]").forEach((btn) => {
        const key = btn.getAttribute("data-setting");
        const val = btn.getAttribute("data-value");
        btn.classList.toggle("is-active", String(S.get(key)) === val);
      });
    }

    document.querySelectorAll("[data-setting]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-setting");
        const val = btn.getAttribute("data-value");
        global.JTG.Settings.set(key, val);
        if (key === "lang" && global.JTG.i18n) global.JTG.i18n.apply();
        if ((key === "distanceUnit" || key === "tempUnit") && global.JTG.Units) {
          global.JTG.Units.applyAll();
        }
        syncButtons();
      });
    });

    window.addEventListener("jtg:settings", syncButtons);
    syncButtons();
  }

  global.JTG = global.JTG || {};
  global.JTG.Nav = { initNav, initSettingsUI };
})(window);
