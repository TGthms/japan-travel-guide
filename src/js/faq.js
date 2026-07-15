/**
 * FAQ accordion
 */
(function (global) {
  "use strict";

  function bind(list) {
    if (!list) return;
    list.querySelectorAll(".faq-item").forEach((item) => {
      const btn = item.querySelector(".faq-item__q");
      if (!btn) return;
      btn.addEventListener("click", () => {
        const open = item.classList.contains("is-open");
        list.querySelectorAll(".faq-item.is-open").forEach((other) => {
          if (other !== item) {
            other.classList.remove("is-open");
            const b = other.querySelector(".faq-item__q");
            if (b) b.setAttribute("aria-expanded", "false");
          }
        });
        item.classList.toggle("is-open", !open);
        btn.setAttribute("aria-expanded", open ? "false" : "true");
      });
    });
  }

  global.JTG = global.JTG || {};
  global.JTG.FAQ = { bind };
})(window);
