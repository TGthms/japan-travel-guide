/**
 * DEPRECATED — use app.js
 * Kept so any old bookmark/docs that load main.js still boot the site.
 * All pages should load: settings → i18n → features → app.js
 */
(function (global) {
  "use strict";
  // If app.js already defined boot path, do nothing.
  // app.js self-boots on DOMContentLoaded; this file is a no-op shim.
  if (global.JTG && global.JTG.__bootedViaApp) return;
  // Fallback: if only main.js is loaded (legacy), try a minimal boot later.
  function legacyHint() {
    if (!global.JTG || !global.JTG.Settings) {
      console.warn(
        "[JTG] main.js is deprecated. Load src/js/app.js after feature modules."
      );
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", legacyHint);
  } else {
    legacyHint();
  }
})(window);
