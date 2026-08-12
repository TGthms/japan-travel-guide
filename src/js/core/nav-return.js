"use strict";
/**
 * Japan Travel Guide — cross-page return context (scroll + Back chrome)
 * Path-based, like the USA guide. Hub is tools.html; minis are tools-*.html.
 * City pages stamp as "city" so Tools/Gallery can return to that city.
 */

(function (global) {
  var KEY = "jtg-return-v1";
  var MAX_AGE_MS = 2 * 60 * 60 * 1000;
  var MAX_PARENT_DEPTH = 6;

  var TOOL_SHORT = {
    weather: { en: "Weather", ja: "天気", "zh-CN": "天气" },
    budget: { en: "Budget", ja: "予算", "zh-CN": "预算" },
    packing: { en: "Packing", ja: "持ち物", "zh-CN": "行李" },
    currency: { en: "Currency", ja: "通貨", "zh-CN": "货币" },
    clock: { en: "World Clock", ja: "世界時計", "zh-CN": "世界时钟" },
    tax: { en: "Tax", ja: "消費税", "zh-CN": "消费税" },
    rail: { en: "Rail", ja: "鉄道", "zh-CN": "铁路" },
    emergency: { en: "Emergency", ja: "緊急連絡先", "zh-CN": "紧急电话" },
    utilities: { en: "Utilities", ja: "ユーティリティ", "zh-CN": "实用工具" }
  };

  var CITY_SHORT = {
    tokyo: { en: "Tokyo", ja: "東京", "zh-CN": "东京" },
    kyoto: { en: "Kyoto", ja: "京都", "zh-CN": "京都" },
    osaka: { en: "Osaka", ja: "大阪", "zh-CN": "大阪" },
    nara: { en: "Nara", ja: "奈良", "zh-CN": "奈良" },
    hiroshima: { en: "Hiroshima", ja: "広島", "zh-CN": "广岛" },
    yokohama: { en: "Yokohama", ja: "横浜", "zh-CN": "横滨" },
    hakone: { en: "Hakone", ja: "箱根", "zh-CN": "箱根" },
    nikko: { en: "Nikko", ja: "日光", "zh-CN": "日光" },
    kanazawa: { en: "Kanazawa", ja: "金沢", "zh-CN": "金泽" },
    sapporo: { en: "Sapporo", ja: "札幌", "zh-CN": "札幌" },
    fukuoka: { en: "Fukuoka", ja: "福岡", "zh-CN": "福冈" },
    kobe: { en: "Kobe", ja: "神戸", "zh-CN": "神户" },
    nagasaki: { en: "Nagasaki", ja: "長崎", "zh-CN": "长崎" },
    okinawa: { en: "Okinawa", ja: "沖縄", "zh-CN": "冲绳" }
  };

  function pathOf(href) {
    try {
      return new URL(href, location.href).pathname.replace(/\\/g, "/");
    } catch (e) {
      return String(href || "");
    }
  }

  function fileOf(p) {
    p = pathOf(p);
    var parts = p.split("/").filter(Boolean);
    return parts.length ? parts[parts.length - 1] : "";
  }

  function isToolsHubPath(p) {
    return /\/tools\.html$/i.test(p || "") || fileOf(p).toLowerCase() === "tools.html";
  }

  function isToolMiniAppPath(p) {
    return /\/tools-[a-z0-9-]+\.html$/i.test(p || "");
  }

  function isGalleryPath(p) {
    return /\/gallery\.html$/i.test(p || "");
  }

  function isLegalPath(p) {
    return /\/(privacy|terms)\.html$/i.test(p || "");
  }

  function isCityPath(p) {
    return /\/cities\/[a-z0-9-]+\.html$/i.test(p || "");
  }

  function isHomePath(p) {
    p = pathOf(p || "");
    if (!p || p === "/") return true;
    if (/\/index\.html$/i.test(p)) return true;
    if (/\/$/.test(p)) return true;
    var f = fileOf(p);
    if (f && !/\.html?$/i.test(f) && !isToolsHubPath(p) && !isToolMiniAppPath(p) && !isGalleryPath(p) && !isLegalPath(p) && !isCityPath(p)) {
      return true;
    }
    return false;
  }

  function isGuidePath(p) {
    return isHomePath(p) || isCityPath(p);
  }

  function isAppChromePage(p) {
    return isGuidePath(p) || isToolsHubPath(p) || isToolMiniAppPath(p) || isGalleryPath(p) || isLegalPath(p);
  }

  function toolIdFromPath(p) {
    var m = fileOf(p).toLowerCase().match(/^tools-([a-z0-9-]+)\.html$/);
    return m ? m[1] : null;
  }

  function cityIdFromPath(p) {
    var m = pathOf(p).toLowerCase().match(/\/cities\/([a-z0-9-]+)\.html$/);
    return m ? m[1] : null;
  }

  function cityHrefFromPath(p) {
    var id = cityIdFromPath(p);
    return id ? "cities/" + id + ".html" : "index.html";
  }

  function langCode() {
    try {
      if (global.JTG && global.JTG.Settings && typeof global.JTG.Settings.get === "function") {
        return global.JTG.Settings.get("lang") || "en";
      }
    } catch (e) { /* ignore */ }
    return document.documentElement.lang || "en";
  }

  function dictText(key, fallback) {
    try {
      if (global.JTG && global.JTG.i18n && typeof global.JTG.i18n.t === "function") {
        var v = global.JTG.i18n.t(key);
        if (v && v !== key) return v;
      }
    } catch (e) { /* ignore */ }
    return fallback;
  }

  function pickLangMap(map, id) {
    if (!map || !map[id]) return id || "";
    var L = langCode();
    return map[id][L] || map[id].en || id;
  }

  function backToNamed(name) {
    var L = langCode();
    if (L === "zh-CN" || L === "zh") return "返回" + name;
    if (L === "ja") return name + "に戻る";
    return "Back to " + name;
  }

  function readReturn() {
    try {
      var raw = sessionStorage.getItem(KEY);
      if (!raw) return null;
      var o = JSON.parse(raw);
      var ts = o && (o.ts || o.at);
      if (!o || !ts || Date.now() - ts > MAX_AGE_MS) return null;
      if (!o.ts && o.at) o.ts = o.at;
      if (o.from && !o.label) o.label = o.from;
      return o;
    } catch (e) {
      return null;
    }
  }

  function writeReturn(obj) {
    try {
      sessionStorage.setItem(KEY, JSON.stringify(obj));
    } catch (e) { /* private mode */ }
  }

  function clearReturn() {
    try { sessionStorage.removeItem(KEY); } catch (e) { /* ignore */ }
  }

  function cloneAsParent(ret, depth) {
    if (!ret || !ret.label || depth > MAX_PARENT_DEPTH) return null;
    return {
      label: ret.label,
      href: ret.href || "",
      toolId: ret.toolId || "",
      cityId: ret.cityId || "",
      scrollY: typeof ret.scrollY === "number" ? ret.scrollY : 0,
      parent: ret.parent ? cloneAsParent(ret.parent, depth + 1) : null,
      ts: ret.ts || Date.now()
    };
  }

  function originFromHere() {
    var p = pathOf(location.href);
    if (isHomePath(p)) return { label: "guide", href: "index.html" };
    if (isCityPath(p)) {
      return { label: "city", href: cityHrefFromPath(p), cityId: cityIdFromPath(p) || "" };
    }
    if (isToolsHubPath(p)) return { label: "tools", href: "tools.html" };
    if (isToolMiniAppPath(p)) {
      var id = toolIdFromPath(p);
      return { label: "tool", href: fileOf(p) || ("tools-" + id + ".html"), toolId: id || "" };
    }
    if (isGalleryPath(p)) return { label: "gallery", href: "gallery.html" };
    if (isLegalPath(p)) return { label: "legal", href: fileOf(p) || "privacy.html" };
    return null;
  }

  function isBackChromeLink(a) {
    if (!a || !a.classList) return false;
    return a.classList.contains("gallery-app-back") || a.classList.contains("gallery-app-footer-home");
  }

  function writeGuideScrollRestore(ret) {
    if (ret && (ret.label === "guide" || ret.label === "city") && typeof ret.scrollY === "number" && ret.scrollY > 0) {
      writeReturn({
        label: ret.label,
        href: ret.href || (ret.label === "city" ? cityHrefFromPath(ret.href) : "index.html"),
        cityId: ret.cityId || "",
        scrollY: ret.scrollY,
        ts: Date.now(),
        pendingScrollRestore: true
      });
      return;
    }
    clearReturn();
  }

  function popReturnOnBack(targetHref) {
    var ret = readReturn();
    var destFile = fileOf(targetHref).toLowerCase();
    var destPath = pathOf(targetHref);

    if (isGuidePath(destPath)) {
      if (ret && (ret.label === "guide" || ret.label === "city")) {
        writeGuideScrollRestore(ret);
        return;
      }
      if (ret && ret.parent && (ret.parent.label === "guide" || ret.parent.label === "city")) {
        writeGuideScrollRestore(ret.parent);
        return;
      }
      clearReturn();
      return;
    }

    if (ret && ret.href && String(ret.href).toLowerCase().split("/").pop() === destFile) {
      if (ret.parent && ret.parent.label) {
        var p = cloneAsParent(ret.parent, 0);
        if (p) {
          p.ts = Date.now();
          writeReturn(p);
          return;
        }
      }
      clearReturn();
      return;
    }

    if (ret && ret.parent && ret.parent.label) {
      var p2 = cloneAsParent(ret.parent, 0);
      if (p2) {
        p2.ts = Date.now();
        writeReturn(p2);
        return;
      }
    }
    clearReturn();
  }

  function stampOutbound(targetHref) {
    var from = originFromHere();
    if (!from) return;
    var dest = pathOf(targetHref);
    var here = pathOf(location.href);
    if (!dest || dest === here) return;
    if (!isAppChromePage(dest)) return;

    if (from.label === "tool" && isToolsHubPath(dest)) return;

    if (from.label === "tools" && isGuidePath(dest)) {
      clearReturn();
      return;
    }

    var prev = readReturn();

    if (isGuidePath(dest) && prev && (prev.label === "guide" || prev.label === "city")) {
      return;
    }

    if (from.label === "guide" || from.label === "city") {
      writeReturn({
        from: here,
        href: from.href,
        scrollY: Math.round(window.scrollY || window.pageYOffset || 0),
        label: from.label,
        toolId: "",
        cityId: from.cityId || "",
        parent: null,
        ts: Date.now(),
        to: dest
      });
      return;
    }

    var parent = null;
    if (prev && prev.label) {
      var sameOrigin = prev.label === from.label &&
        String(prev.href || "").toLowerCase() === String(from.href || "").toLowerCase();
      if (!sameOrigin) parent = cloneAsParent(prev, 0);
      else if (prev.parent) parent = cloneAsParent(prev.parent, 0);
    }

    writeReturn({
      from: here,
      href: from.href,
      scrollY: Math.round(window.scrollY || window.pageYOffset || 0),
      label: from.label,
      toolId: from.toolId || "",
      cityId: from.cityId || "",
      parent: parent,
      ts: Date.now(),
      to: dest
    });
  }

  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
    if (!a) return;
    if (a.target === "_blank" || a.hasAttribute("download")) return;
    var href = a.getAttribute("href");
    if (!href || href.charAt(0) === "#" || /^(mailto|tel|javascript):/i.test(href)) return;
    try {
      var u = new URL(href, location.href);
      if (u.origin === location.origin && pathOf(u.href) === pathOf(location.href) && u.hash) return;
    } catch (err) { /* continue */ }

    if (isBackChromeLink(a)) {
      popReturnOnBack(href);
      return;
    }
    stampOutbound(href);
  }, true);

  function setChromeLink(el, href, i18nKey, enLabel, plainLabel) {
    if (!el) return;
    el.setAttribute("href", href);
    var text = plainLabel != null ? plainLabel : dictText(i18nKey, enLabel);
    if (i18nKey) el.setAttribute("data-i18n-aria", i18nKey);
    else el.removeAttribute("data-i18n-aria");
    el.setAttribute("aria-label", text);
    var labelEl = el.querySelector(".gallery-app-back-label") ||
      el.querySelector("[data-i18n]") ||
      null;
    if (labelEl) {
      if (i18nKey && !plainLabel) labelEl.setAttribute("data-i18n", i18nKey);
      else labelEl.removeAttribute("data-i18n");
      labelEl.textContent = text;
    }
  }

  function applyGuideChrome(back, footer) {
    setChromeLink(back, "index.html", "tools.backToGuide", "Back to the guide");
    if (footer) setChromeLink(footer, "index.html", "tools.backToGuide", "Back to the guide");
  }

  function applyToolsChrome(back, footer) {
    setChromeLink(back, "tools.html", "tools.backToTools", "Back to Tools");
    if (footer) setChromeLink(footer, "tools.html", "tools.backToTools", "Back to Tools");
  }

  function applyGalleryChrome(back, footer) {
    var label = dictText("gallery.backToGallery", "Back to Gallery");
    setChromeLink(back, "gallery.html", "gallery.backToGallery", "Back to Gallery", label);
    if (footer) setChromeLink(footer, "gallery.html", "gallery.backToGallery", "Back to Gallery", label);
  }

  function applyCityChrome(back, footer, ret) {
    var href = (ret && ret.href) || "index.html";
    if (!/^cities\/[a-z0-9-]+\.html$/i.test(href)) {
      applyGuideChrome(back, footer);
      return;
    }
    var id = (ret && ret.cityId) || cityIdFromPath(href) || "";
    var name = pickLangMap(CITY_SHORT, id) || dictText("nav.destinations", "Guide");
    var label = backToNamed(name);
    setChromeLink(back, href, null, label, label);
    if (footer) setChromeLink(footer, href, null, label, label);
  }

  function applyToolChrome(back, footer, ret) {
    var href = (ret && ret.href) || "tools.html";
    if (!/^tools-[a-z0-9-]+\.html$/i.test(href)) {
      applyToolsChrome(back, footer);
      return;
    }
    var toolId = (ret && ret.toolId) || toolIdFromPath(href) || "";
    var name = pickLangMap(TOOL_SHORT, toolId) || toolId;
    var label = backToNamed(name);
    setChromeLink(back, href, null, label, label);
    if (footer) setChromeLink(footer, href, null, label, label);
  }

  function applyStampChrome(back, footer, ret, opts) {
    opts = opts || {};
    if (!ret || !ret.label) return false;
    var hereFile = fileOf(pathOf(location.href)).toLowerCase();
    if (ret.href && String(ret.href).toLowerCase().split("/").pop() === hereFile) return false;

    if (ret.label === "guide") {
      applyGuideChrome(back, footer);
      return true;
    }
    if (ret.label === "city") {
      applyCityChrome(back, footer, ret);
      return true;
    }
    if (ret.label === "tools") {
      if (opts.forbidTools) return false;
      applyToolsChrome(back, footer);
      return true;
    }
    if (ret.label === "gallery") {
      if (opts.forbidGallery) return false;
      applyGalleryChrome(back, footer);
      return true;
    }
    if (ret.label === "tool") {
      if (opts.forbidTool) return false;
      applyToolChrome(back, footer, ret);
      return true;
    }
    if (ret.label === "legal") {
      applyGuideChrome(back, footer);
      return true;
    }
    return false;
  }

  function normalizeStampForCurrentPage() {
    var hereFile = fileOf(pathOf(location.href)).toLowerCase();
    if (!hereFile) return;
    var guard = 0;
    while (guard++ < MAX_PARENT_DEPTH) {
      var ret = readReturn();
      if (!ret || !ret.href) return;
      if (String(ret.href).toLowerCase().split("/").pop() !== hereFile) return;
      if (ret.parent && ret.parent.label) {
        var p = cloneAsParent(ret.parent, 0);
        if (p) {
          p.ts = Date.now();
          writeReturn(p);
          continue;
        }
      }
      clearReturn();
      return;
    }
  }

  function cleanStampOnGuide() {
    if (!isGuidePath(pathOf(location.href))) return;
    var ret = readReturn();
    if (!ret) return;
    if ((ret.label === "guide" || ret.label === "city") && (ret.pendingScrollRestore || (typeof ret.scrollY === "number" && ret.scrollY > 0))) {
      return;
    }
    clearReturn();
  }

  function referrerIsGuide() {
    try {
      var refPath = document.referrer ? pathOf(document.referrer) : "";
      return !!(refPath && isGuidePath(refPath));
    } catch (e) {
      return false;
    }
  }

  function applyReturnChrome() {
    var back = document.querySelector("a.gallery-app-back");
    var footer = document.querySelector("a.gallery-app-footer-home");
    if (!back && !footer) {
      cleanStampOnGuide();
      return;
    }

    normalizeStampForCurrentPage();
    cleanStampOnGuide();

    var here = pathOf(location.href);
    var ret = readReturn();

    if (isToolsHubPath(here)) {
      if (ret && ret.label === "gallery") applyGalleryChrome(back, footer);
      else if (ret && ret.label === "city") applyCityChrome(back, footer, ret);
      else {
        setChromeLink(back, "index.html", "tools.backToGuide", "Back to the guide");
        if (footer) setChromeLink(footer, "index.html", "tools.backToGuide", "Back to the guide");
      }
      return;
    }

    if (isToolMiniAppPath(here)) {
      var staleTools = ret && ret.label === "tools" && !ret.parent;
      if (referrerIsGuide() && (!ret || staleTools)) {
        var ref = document.referrer ? pathOf(document.referrer) : "";
        var cityHref = isCityPath(ref) ? cityHrefFromPath(ref) : "index.html";
        writeReturn({
          label: isCityPath(ref) ? "city" : "guide",
          href: cityHref,
          cityId: cityIdFromPath(ref) || "",
          scrollY: 0,
          parent: null,
          ts: Date.now(),
          to: here
        });
        if (isCityPath(ref)) applyCityChrome(back, footer, { href: cityHref, cityId: cityIdFromPath(ref) });
        else applyGuideChrome(back, footer);
        return;
      }
      if (applyStampChrome(back, footer, ret, {})) return;
      if (referrerIsGuide()) {
        applyGuideChrome(back, footer);
        return;
      }
      applyToolsChrome(back, footer);
      return;
    }

    if (isGalleryPath(here)) {
      if (applyStampChrome(back, footer, ret, { forbidGallery: true })) return;
      applyGuideChrome(back, footer);
      return;
    }

    if (isLegalPath(here)) {
      if (applyStampChrome(back, footer, ret, {})) return;
      applyGuideChrome(back, footer);
    }
  }

  function restoreGuideScroll() {
    if (!isGuidePath(pathOf(location.href))) return;
    var ret = readReturn();
    if (!ret || (ret.label !== "guide" && ret.label !== "city") || typeof ret.scrollY !== "number") return;
    if (!ret.scrollY && !ret.pendingScrollRestore) return;
    try {
      if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    } catch (e) { /* ignore */ }
    var y = ret.scrollY || 0;
    if (!y) return;
    try {
      ret.scrollY = 0;
      delete ret.pendingScrollRestore;
      writeReturn(ret);
    } catch (e2) { /* ignore */ }
    var apply = function () {
      try { window.scrollTo(0, y); } catch (e3) { /* ignore */ }
    };
    requestAnimationFrame(function () { requestAnimationFrame(apply); });
    window.addEventListener("load", apply, { once: true });
  }

  function apply() {
    applyReturnChrome();
    restoreGuideScroll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply);
  } else {
    apply();
  }

  window.addEventListener("load", applyReturnChrome);
  window.addEventListener("jtg:i18n", applyReturnChrome);
  window.addEventListener("jtg:settings", function (e) {
    var key = e && e.detail && e.detail.key;
    if (!key || key === "lang") applyReturnChrome();
  });

  global.JTG = global.JTG || {};
  global.JTG.NavReturn = {
    apply: applyReturnChrome,
    read: readReturn,
    stamp: stampOutbound,
    pop: popReturnOnBack,
    clear: clearReturn
  };
})(window);
