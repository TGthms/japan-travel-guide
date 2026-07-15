/**
 * Scroll reveals, animated counters, light mouse parallax
 */
(function (global) {
  "use strict";

  let observer;

  function motionOk() {
    // Prefer effective motion from app.js (full | reduced | off)
    const eff =
      document.documentElement.getAttribute("data-motion-effective") ||
      document.documentElement.getAttribute("data-motion") ||
      (global.JTG.Settings && global.JTG.Settings.get("motion")) ||
      "full";
    if (eff === "off" || eff === "reduced") return false;
    try {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return false;
      }
    } catch (e) { /* ignore */ }
    return true;
  }

  function observeReveals(root) {
    const scope = root || document;
    const els = scope.querySelectorAll(".reveal:not(.is-visible)");
    if (!motionOk()) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    if (!observer) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
    }
    els.forEach((el) => observer.observe(el));
  }

  function initCounters() {
    const counters = document.querySelectorAll("[data-counter]");
    if (!counters.length) return;

    const run = (el) => {
      const target = parseFloat(el.getAttribute("data-counter"));
      const suffix = el.getAttribute("data-counter-suffix") || "";
      const duration = 1400;
      if (!motionOk()) {
        el.textContent = target + suffix;
        return;
      }
      const start = performance.now();
      const from = 0;
      function frame(now) {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = Math.round(from + (target - from) * eased);
        el.textContent = val + suffix;
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((el) => io.observe(el));
  }

  function initParallax() {
    const layers = document.querySelectorAll("[data-parallax]");
    if (!layers.length || !motionOk()) return;

    let mx = 0;
    let my = 0;
    window.addEventListener(
      "mousemove",
      (e) => {
        mx = (e.clientX / window.innerWidth - 0.5) * 2;
        my = (e.clientY / window.innerHeight - 0.5) * 2;
        layers.forEach((el) => {
          const depth = parseFloat(el.getAttribute("data-parallax")) || 10;
          el.style.transform = `translate(${mx * depth}px, ${my * depth}px)`;
        });
      },
      { passive: true }
    );
  }

  function initLoader() {
    const loader = document.getElementById("loader");
    if (!loader) return;
    const hide = () => loader.classList.add("is-done");
    if (document.readyState === "complete") {
      setTimeout(hide, motionOk() ? 600 : 0);
    } else {
      window.addEventListener("load", () => setTimeout(hide, motionOk() ? 600 : 0));
    }
    // Safety
    setTimeout(hide, 2500);
  }

  function init() {
    initLoader();
    observeReveals();
    initCounters();
    initParallax();
  }

  global.JTG = global.JTG || {};
  global.JTG.Animations = { init, observeReveals, motionOk };
})(window);
