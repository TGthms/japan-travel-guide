/**
 * Suggested routes tab panels
 */
(function (global) {
  "use strict";

  function bind(root) {
    if (!root) return;
    // Re-query panels on each click so dynamically rendered itineraries work
    root.querySelectorAll("[data-route-tab]").forEach((tab) => {
      tab.addEventListener("click", () => {
        const id = tab.getAttribute("data-route-tab");
        root.querySelectorAll("[data-route-tab]").forEach((t) => {
          t.classList.toggle("is-active", t === tab);
          t.setAttribute("aria-selected", t === tab ? "true" : "false");
        });
        root.querySelectorAll("[data-route-panel]").forEach((p) => {
          p.classList.toggle(
            "is-active",
            p.getAttribute("data-route-panel") === id
          );
        });
      });
    });
  }

  global.JTG = global.JTG || {};
  global.JTG.Routes = { bind };
})(window);
