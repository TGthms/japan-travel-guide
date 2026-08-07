/**
 * Contextual Back for mini-app pages (gallery / tools / legal)
 * Ported from USA guide nav-return pattern (session stamp + scroll restore).
 *
 * Stamps: jtg-return-v1 = { from, scrollY, at }
 * - Guide (index) or city pages stamp "guide" when leaving for gallery/tools
 * - tools.html stamps "tools" when opening (for future mini-apps)
 * - Mini-app "Back" rewrites to index or tools and restores guide scroll when possible
 */
(function (global) {
  "use strict";

  var KEY = "jtg-return-v1";
  var MAX_AGE_MS = 1000 * 60 * 60 * 6; // 6h

  function safeParse(raw) {
    try {
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function readStamp() {
    try {
      var data = safeParse(sessionStorage.getItem(KEY));
      if (!data || !data.at) return null;
      if (Date.now() - data.at > MAX_AGE_MS) {
        sessionStorage.removeItem(KEY);
        return null;
      }
      return data;
    } catch (e) {
      return null;
    }
  }

  function writeStamp(from, scrollY) {
    try {
      sessionStorage.setItem(
        KEY,
        JSON.stringify({
          from: from || "guide",
          scrollY: typeof scrollY === "number" ? scrollY : 0,
          at: Date.now(),
        })
      );
    } catch (e) {
      /* ignore */
    }
  }

  function clearStamp() {
    try {
      sessionStorage.removeItem(KEY);
    } catch (e) {
      /* ignore */
    }
  }

  function isGuidePage() {
    var p = document.body && document.body.getAttribute("data-page");
    return p === "home" || p === "city";
  }

  function isToolsHub() {
    return document.body && document.body.getAttribute("data-page") === "tools";
  }

  function isMiniApp() {
    var p = document.body && document.body.getAttribute("data-page");
    return p === "gallery" || p === "tools" || p === "legal" || p === "privacy" || p === "terms";
  }

  /** Stamp when user navigates from guide → gallery/tools */
  function bindOutboundStamps() {
    if (!isGuidePage()) return;
    document.querySelectorAll('a[href$="gallery.html"], a[href$="tools.html"]').forEach(function (a) {
      a.addEventListener("click", function () {
        writeStamp("guide", window.scrollY || 0);
      });
    });
  }

  /** Tools hub: stamp so a future deep page can return to tools */
  function bindToolsHubStamp() {
    if (!isToolsHub()) return;
    document.querySelectorAll('a[href$="gallery.html"]').forEach(function (a) {
      a.addEventListener("click", function () {
        writeStamp("tools", 0);
      });
    });
  }

  function applyBackChrome() {
    var back = document.querySelector("a.gallery-app-back");
    if (!back) return;

    var stamp = readStamp();
    var label = back.querySelector("[data-i18n], .gallery-app-back-label, span:not([aria-hidden])");

    // tools hub always returns to guide
    if (isToolsHub()) {
      back.setAttribute("href", "index.html");
      return;
    }

    if (!stamp) return;

    if (stamp.from === "guide") {
      back.setAttribute("href", "index.html");
      if (label && !label.getAttribute("data-i18n")) {
        /* keep i18n markup */
      }
      back.addEventListener(
        "click",
        function () {
          try {
            sessionStorage.setItem("jtg-restore-scroll", String(stamp.scrollY || 0));
          } catch (e) {}
          clearStamp();
        },
        { once: true }
      );
    } else if (stamp.from === "tools") {
      back.setAttribute("href", "tools.html");
      back.addEventListener(
        "click",
        function () {
          clearStamp();
        },
        { once: true }
      );
    }
  }

  function restoreGuideScroll() {
    if (!isGuidePage()) return;
    try {
      var y = sessionStorage.getItem("jtg-restore-scroll");
      if (y == null) return;
      sessionStorage.removeItem("jtg-restore-scroll");
      var n = parseInt(y, 10);
      if (!isNaN(n) && n > 0) {
        requestAnimationFrame(function () {
          window.scrollTo(0, n);
        });
      }
    } catch (e) {
      /* ignore */
    }
  }

  function apply() {
    bindOutboundStamps();
    bindToolsHubStamp();
    applyBackChrome();
    restoreGuideScroll();
  }

  global.JTG = global.JTG || {};
  global.JTG.NavReturn = { apply: apply, writeStamp: writeStamp, readStamp: readStamp };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply);
  } else {
    apply();
  }

  window.addEventListener("jtg:i18n", function () {
    applyBackChrome();
  });
})(window);
