/**
 * Interactive Japan map — lat/lon markers + side panel highlighting
 */
(function (global) {
  "use strict";

  function bind(svgRoot) {
    if (!svgRoot) return;

    const section = svgRoot.closest("#map") || document;
    const markers = svgRoot.querySelectorAll("[data-city]");
    const links = section.querySelectorAll(".map-city-link[data-city]");

    function setActive(city, on) {
      markers.forEach((el) => {
        if (el.getAttribute("data-city") === city) {
          el.classList.toggle("is-active", on);
        }
      });
      links.forEach((el) => {
        if (el.getAttribute("data-city") === city) {
          el.classList.toggle("is-active", on);
        }
      });
    }

    function clearActive() {
      markers.forEach((el) => el.classList.remove("is-active"));
      links.forEach((el) => el.classList.remove("is-active"));
    }

    markers.forEach((el) => {
      const city = el.getAttribute("data-city");
      const go = () => {
        const href = el.getAttribute("data-href") || `cities/${city}.html`;
        window.location.href = href;
      };
      el.addEventListener("click", go);
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          go();
        }
      });
      el.addEventListener("mouseenter", () => setActive(city, true));
      el.addEventListener("mouseleave", clearActive);
      el.addEventListener("focus", () => setActive(city, true));
      el.addEventListener("blur", clearActive);
      if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "0");
      if (!el.getAttribute("role")) el.setAttribute("role", "link");
    });

    links.forEach((link) => {
      const city = link.getAttribute("data-city");
      link.addEventListener("mouseenter", () => setActive(city, true));
      link.addEventListener("mouseleave", clearActive);
      link.addEventListener("focus", () => setActive(city, true));
      link.addEventListener("blur", clearActive);
    });
  }

  global.JTG = global.JTG || {};
  global.JTG.Map = { bind };
})(window);
