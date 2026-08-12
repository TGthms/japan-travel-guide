"use strict";
/**
 * Japan Travel Guide — core/env.js
 * Capability probes, safe media queries, loader. Classic (non-module) script.
 * Load first among core scripts, after data/i18n + settings + i18n engine.
 */

(function (global) {
  function safeMatchMedia(query) {
    try {
      if (typeof window.matchMedia === "function") return window.matchMedia(query);
    } catch (e) { /* some webviews throw on unknown queries */ }
    return {
      matches: false,
      media: query,
      addEventListener: function () {},
      removeEventListener: function () {},
      addListener: function () {},
      removeListener: function () {},
    };
  }

  function isConstrainedViewport() {
    try {
      var w = window.innerWidth || 0;
      var h = window.innerHeight || 0;
      if ((w > 0 && w <= 320) || (h > 0 && h <= 280)) return true;
      if (safeMatchMedia("(max-width: 320px), (max-height: 280px)").matches) return true;
      if (typeof navigator.deviceMemory === "number" && navigator.deviceMemory > 0 && navigator.deviceMemory < 1) {
        return true;
      }
    } catch (e) { /* ignore */ }
    return false;
  }

  function isMobileOrCoarsePointer() {
    try {
      if (safeMatchMedia("(max-width: 900px)").matches) return true;
      if (safeMatchMedia("(pointer: coarse)").matches) return true;
      if (
        typeof navigator.maxTouchPoints === "number" &&
        navigator.maxTouchPoints > 1 &&
        safeMatchMedia("(max-width: 1200px)").matches
      ) {
        return true;
      }
    } catch (e) { /* ignore */ }
    return false;
  }

  var ENV = {
    constrained: isConstrainedViewport(),
    mobile: isMobileOrCoarsePointer(),
    hasIO: typeof IntersectionObserver === "function",
    hasRAF: typeof requestAnimationFrame === "function",
    hasXHR: typeof XMLHttpRequest === "function",
    reduceMotion: safeMatchMedia("(prefers-reduced-motion: reduce)").matches,
    fileProtocol: location.protocol === "file:",
  };

  try {
    if (ENV.mobile || ENV.constrained) {
      document.documentElement.setAttribute("data-mobile-lite", "true");
    }
  } catch (e) { /* ignore */ }

  function raf(fn) {
    if (ENV.hasRAF) return requestAnimationFrame(fn);
    return setTimeout(function () { fn(Date.now()); }, 16);
  }

  function cancelRaf(id) {
    if (id == null) return;
    try {
      if (ENV.hasRAF) cancelAnimationFrame(id);
      else clearTimeout(id);
    } catch (e) { /* ignore */ }
  }

  function observeWhenVisible(elements, onVisible, options) {
    var list = elements && elements.length != null ? Array.from(elements) : [];
    if (!list.length) return null;
    if (!ENV.hasIO) {
      list.forEach(onVisible);
      return null;
    }
    try {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            onVisible(entry.target);
            try { obs.unobserve(entry.target); } catch (e) { /* ignore */ }
          }
        });
      }, options || { threshold: 0.08 });
      list.forEach(function (el) {
        try { obs.observe(el); } catch (e) { onVisible(el); }
      });
      return obs;
    } catch (e) {
      list.forEach(onVisible);
      return null;
    }
  }

  window.addEventListener("unhandledrejection", function (e) {
    try {
      var reason = e && "reason" in e ? e.reason : e;
      console.error("[JTG] Unhandled promise rejection:", reason);
      if (ENV.constrained && e && typeof e.preventDefault === "function") e.preventDefault();
    } catch (err) { /* ignore */ }
  });

  function dismissLoader() {
    var loader = document.getElementById("loader");
    if (!loader) return;
    loader.classList.add("is-done", "gone");
  }

  function initLoader() {
    var loader = document.getElementById("loader");
    if (!loader || loader.dataset.jtgLoader === "1") return;
    loader.dataset.jtgLoader = "1";
    if (ENV.constrained || ENV.mobile) {
      dismissLoader();
      return;
    }
    var body = document.body;
    var isMini = !!(body && (
      body.classList.contains("page-gallery") ||
      body.classList.contains("page-tools") ||
      body.classList.contains("page-legal") ||
      body.getAttribute("data-page") === "legal" ||
      body.getAttribute("data-page") === "privacy" ||
      body.getAttribute("data-page") === "terms"
    ));
    var delay = isMini ? 280 : 450;
    var hide = function () { try { dismissLoader(); } catch (e) { /* ignore */ } };
    if (document.readyState === "complete") setTimeout(hide, delay);
    else window.addEventListener("load", function () { setTimeout(hide, delay); });
    setTimeout(hide, 1800);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLoader);
  } else {
    initLoader();
  }

  global.JTG = global.JTG || {};
  global.JTG.ENV = ENV;
  global.JTG.safeMatchMedia = safeMatchMedia;
  global.JTG.raf = raf;
  global.JTG.cancelRaf = cancelRaf;
  global.JTG.observeWhenVisible = observeWhenVisible;
})(window);
