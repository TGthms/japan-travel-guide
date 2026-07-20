/**
 * Sticky nav, mobile menu sheet, active section highlight,
 * scroll progress, settings panel open/close
 */
(function (global) {
  "use strict";

  function ensureScrim() {
    var existing = document.querySelector(".nav-menu-scrim");
    if (existing) return existing;
    var scrim = document.createElement("div");
    scrim.className = "nav-menu-scrim";
    scrim.setAttribute("aria-hidden", "true");
    document.body.appendChild(scrim);
    return scrim;
  }

  function initNav() {
    var header = document.querySelector(".site-header");
    var toggle = document.querySelector(".nav__toggle");
    var links = document.querySelector(".nav__links");
    var progress = document.getElementById("scroll-progress");
    var sectionLinks = document.querySelectorAll('.nav__links a[href^="#"]');
    var scrim = null;

    function setMenuOpen(open) {
      if (!links || !toggle) return;
      links.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("nav-menu-open", open);
      if (!scrim) scrim = ensureScrim();
      scrim.classList.toggle("is-open", open);
      scrim.setAttribute("aria-hidden", open ? "false" : "true");
    }

    function closeMenu() {
      setMenuOpen(false);
    }

    if (toggle && links) {
      scrim = ensureScrim();

      toggle.addEventListener("click", function (e) {
        e.stopPropagation();
        var open = !links.classList.contains("is-open");
        setMenuOpen(open);
      });

      links.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", closeMenu);
      });

      scrim.addEventListener("click", closeMenu);

      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && links.classList.contains("is-open")) {
          closeMenu();
          toggle.focus();
        }
      });

      // Close when resizing to desktop layout
      var mq = window.matchMedia("(min-width: 1101px)");
      function onBp(e) {
        if (e.matches) closeMenu();
      }
      if (typeof mq.addEventListener === "function") mq.addEventListener("change", onBp);
      else if (typeof mq.addListener === "function") mq.addListener(onBp);
    }

    function onScroll() {
      var y = window.scrollY || document.documentElement.scrollTop;
      if (header) header.classList.toggle("is-scrolled", y > 12);

      if (progress) {
        var doc = document.documentElement;
        var max = doc.scrollHeight - doc.clientHeight;
        var pct = max > 0 ? (y / max) * 100 : 0;
        progress.style.width = pct + "%";
      }

      if (sectionLinks.length) {
        var current = "";
        document.querySelectorAll("section[id]").forEach(function (sec) {
          var top = sec.offsetTop - 120;
          if (y >= top) current = sec.id;
        });
        sectionLinks.forEach(function (a) {
          var href = a.getAttribute("href") || "";
          a.classList.toggle("is-active", href === "#" + current);
        });
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initSettingsUI() {
    var openBtns = document.querySelectorAll("[data-open-settings]");
    var overlay = document.getElementById("settings-overlay");
    var panel = document.getElementById("settings-panel");
    var closeBtns = document.querySelectorAll("[data-close-settings]");

    function open() {
      // Don't stack settings over mobile nav sheet
      var links = document.querySelector(".nav__links");
      var toggle = document.querySelector(".nav__toggle");
      if (links) links.classList.remove("is-open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-menu-open");
      var scrim = document.querySelector(".nav-menu-scrim");
      if (scrim) {
        scrim.classList.remove("is-open");
        scrim.setAttribute("aria-hidden", "true");
      }

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

    openBtns.forEach(function (b) {
      b.addEventListener("click", open);
    });
    closeBtns.forEach(function (b) {
      b.addEventListener("click", close);
    });
    if (overlay) overlay.addEventListener("click", close);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });

    function syncButtons() {
      var S = global.JTG.Settings;
      if (!S) return;
      document.querySelectorAll("[data-setting]").forEach(function (btn) {
        var key = btn.getAttribute("data-setting");
        var val = btn.getAttribute("data-value");
        btn.classList.toggle("is-active", String(S.get(key)) === val);
      });
    }

    document.querySelectorAll("[data-setting]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var key = btn.getAttribute("data-setting");
        var val = btn.getAttribute("data-value");
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
  global.JTG.Nav = { initNav: initNav, initSettingsUI: initSettingsUI };
})(window);
