/**
 * Japan Travel Guide — gallery
 * DOM-first like the USA guide: HTML .gallery-item tiles are the source of truth.
 * Never rebuild the grid from JSON (that destroyed captions, video badges, and masonry).
 */
(function (global) {
  "use strict";

  const QUALITY_KEY = "jtg-gallery-quality";
  const ENV = (global.JTG && global.JTG.ENV) || {};

  function t(key, fallback) {
    if (global.JTG && global.JTG.i18n && typeof global.JTG.i18n.t === "function") {
      const v = global.JTG.i18n.t(key);
      if (v && v !== key) return v;
    }
    return fallback || key;
  }

  function getQuality() {
    try {
      const q = localStorage.getItem(QUALITY_KEY);
      if (q === "thumb" || q === "medium" || q === "full") return q;
    } catch (e) { /* ignore */ }
    return "medium";
  }

  function setQuality(q) {
    const normalized = q === "thumb" || q === "medium" || q === "full" ? q : "medium";
    try { localStorage.setItem(QUALITY_KEY, normalized); } catch (e) { /* ignore */ }
    return normalized;
  }

  function normalizeRelPath(p) {
    if (!p) return "";
    return String(p).trim().replace(/\\/g, "/").replace(/^\/+/, "");
  }

  function assetUrl(relPath) {
    const rel = normalizeRelPath(relPath);
    if (!rel) return "";
    if (/^https?:\/\//i.test(rel) || rel.indexOf("assets/") === 0) return rel;
    return "assets/gallery/" + rel.replace(/^\.?\/*assets\/gallery\//i, "");
  }

  function itemSlug(item) {
    if (!item) return "";
    if (item.dataset.id) return item.dataset.id;
    const cap = item.querySelector(".gallery-caption");
    const key = cap && cap.getAttribute("data-i18n");
    if (key) return key.replace(/^gallery\.item\./, "").replace(/\.caption$/, "");
    const img = item.querySelector("img");
    const full = (img && (img.getAttribute("data-full") || img.getAttribute("src") || "")) || "";
    return (full.split("/").pop() || "").replace(/\.[^.]+$/, "");
  }

  function itemToPhoto(el) {
    const img = el.querySelector("img");
    const cap = el.querySelector(".gallery-caption");
    const video = (img && img.getAttribute("data-video")) || el.getAttribute("data-video") || "";
    return {
      id: itemSlug(el),
      name: (cap && cap.textContent.trim()) || el.getAttribute("data-name") || (img && img.alt) || "",
      alt: (img && img.getAttribute("alt")) || "",
      time: el.getAttribute("data-date") || "",
      location: el.getAttribute("data-location") || "",
      city: el.getAttribute("data-city") || "",
      category: el.getAttribute("data-category") || "cities",
      thumb: img && (img.getAttribute("data-thumb") || img.getAttribute("src") || ""),
      medium: img && (img.getAttribute("data-medium") || img.getAttribute("data-thumb") || ""),
      original: img && (img.getAttribute("data-full") || img.getAttribute("data-medium") || ""),
      video: video || null,
      media: video || el.getAttribute("data-media") === "video" ? "video" : "photo",
      width: img ? parseFloat(img.getAttribute("width") || "") || 0 : 0,
      height: img ? parseFloat(img.getAttribute("height") || "") || 0 : 0,
    };
  }

  function pathFor(item, tier) {
    if (tier === "thumb") return item.thumb;
    if (tier === "medium") return item.medium || item.thumb || item.original;
    return item.original || item.medium || item.thumb;
  }

  function haystack(item) {
    const cap = item.querySelector(".gallery-caption");
    return [
      cap && cap.textContent,
      item.dataset.name,
      item.dataset.location,
      item.dataset.city,
      item.dataset.date,
      item.dataset.category,
      item.dataset.state,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
  }

  function dateSortKey(dateStr) {
    const s = String(dateStr || "").trim();
    if (!s) return 0;
    const months = {
      january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
      july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
    };
    let m = s.match(/^([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})$/);
    if (m) return Number(m[3]) * 10000 + (months[m[1].toLowerCase()] || 0) * 100 + Number(m[2]);
    m = s.match(/^([A-Za-z]+)\s+(\d{4})$/);
    if (m) return Number(m[2]) * 10000 + (months[m[1].toLowerCase()] || 0) * 100;
    m = s.match(/^(\d{4})-(\d{2})(?:-(\d{2}))?$/);
    if (m) return Number(m[1]) * 10000 + Number(m[2]) * 100 + Number(m[3] || 0);
    return 0;
  }

  /* ── Lightbox ── */
  function bindLightbox() {
    const lb = document.getElementById("lightbox");
    if (!lb) return null;

    const img = lb.querySelector(".lightbox__img");
    const progress = lb.querySelector(".lightbox__progress");
    const bar = lb.querySelector(".lightbox__progress-bar");
    const progressMsg = lb.querySelector("[data-lb-progress-msg]");
    const progressPct = lb.querySelector("[data-lb-progress-pct]");
    const title = lb.querySelector("[data-lb-title]");
    const meta = lb.querySelector("[data-lb-meta]");
    const counter = lb.querySelector("[data-lb-counter]");
    const btnClose = lb.querySelector("[data-lb-close]");
    const btnPrev = lb.querySelector("[data-lb-prev]");
    const btnNext = lb.querySelector("[data-lb-next]");
    const btnHd = lb.querySelector("[data-lb-hd]");
    const video = lb.querySelector("#lightboxVideo, .lightbox__video");

    let items = [];
    let index = 0;
    let xhr = null;
    let loadedTier = "";
    let objectUrl = null;
    let loadToken = 0;
    let lastFocusedThumb = null;
    let scrollLockY = 0;
    let bodyLocked = false;

    function revoke() {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
        objectUrl = null;
      }
    }

    function lockBodyScroll() {
      if (bodyLocked) return;
      scrollLockY = window.scrollY || window.pageYOffset || 0;
      document.body.style.position = "fixed";
      document.body.style.top = "-" + scrollLockY + "px";
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      bodyLocked = true;
    }

    function unlockBodyScroll() {
      if (!bodyLocked) return;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollLockY);
      bodyLocked = false;
    }

    function cancelLoad() {
      loadToken += 1;
      if (xhr) {
        try { xhr.abort(); } catch (e) { /* ignore */ }
        xhr = null;
      }
      if (img) {
        img.onload = null;
        img.onerror = null;
        img.classList.remove("is-loading");
      }
      revoke();
    }

    function stopVideo() {
      if (!video) return;
      try { video.pause(); } catch (e) { /* ignore */ }
      video.removeAttribute("src");
      try { video.load(); } catch (e2) { /* ignore */ }
      video.hidden = true;
    }

    function close() {
      if (!lb.classList.contains("is-open")) return;
      const restoreY = scrollLockY;
      lb.classList.remove("is-open");
      lb.setAttribute("aria-hidden", "true");
      cancelLoad();
      stopVideo();
      if (img) {
        img.hidden = false;
        img.removeAttribute("src");
        img.classList.remove("is-loaded", "is-loading");
      }
      if (progress) progress.classList.remove("is-active");
      loadedTier = "";
      unlockBodyScroll();
      if (lastFocusedThumb && typeof lastFocusedThumb.focus === "function") {
        try { lastFocusedThumb.focus({ preventScroll: true }); } catch (e) { lastFocusedThumb.focus(); }
      }
      try { window.scrollTo(0, restoreY); } catch (e) { /* ignore */ }
    }

    function setCaption(item) {
      if (title) title.textContent = item.name || "";
      if (meta) {
        meta.textContent = [item.location, item.time, item.city].filter(Boolean).join(" · ");
      }
      if (counter) counter.textContent = items.length ? index + 1 + " / " + items.length : "";
      if (btnPrev) btnPrev.hidden = items.length < 2;
      if (btnNext) btnNext.hidden = items.length < 2;
    }

    function updateHdBtn(item) {
      if (!btnHd) return;
      const hasFull = !!(item.original && item.original !== item.medium);
      btnHd.hidden = !(hasFull && loadedTier !== "full") || item.media === "video";
      btnHd.disabled = false;
      btnHd.classList.remove("is-loading");
    }

    function loadViaXhr(url, onDone, token) {
      if (token !== loadToken) return;
      if (progress) progress.classList.add("is-active");
      if (bar) bar.style.width = "0%";
      if (progressPct) progressPct.textContent = "0%";
      if (progressMsg) progressMsg.textContent = t("gallery.loadingPhoto", "Loading photo…");
      if (img) img.classList.add("is-loading");

      xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "blob";
      xhr.onprogress = function (e) {
        if (token !== loadToken) return;
        if (e.lengthComputable && bar) {
          const pct = Math.round((e.loaded / e.total) * 100);
          bar.style.width = pct + "%";
          if (progressPct) progressPct.textContent = pct + "%";
        }
      };
      xhr.onload = function () {
        if (token !== loadToken) return;
        if (xhr.status >= 200 && xhr.status < 300) {
          revoke();
          objectUrl = URL.createObjectURL(xhr.response);
          if (img) {
            img.onload = function () {
              if (token !== loadToken) return;
              img.classList.add("is-loaded");
              img.classList.remove("is-loading");
              if (progress) progress.classList.remove("is-active");
              if (onDone) onDone(true);
            };
            img.src = objectUrl;
          }
        } else if (onDone) onDone(false);
        xhr = null;
      };
      xhr.onerror = function () {
        if (token !== loadToken) return;
        if (img) {
          img.src = url;
          img.onload = function () {
            if (token !== loadToken) return;
            img.classList.add("is-loaded");
            img.classList.remove("is-loading");
            if (progress) progress.classList.remove("is-active");
            if (onDone) onDone(true);
          };
          img.onerror = function () {
            if (onDone) onDone(false);
          };
        }
        xhr = null;
      };
      xhr.send();
    }

    function loadTier(item, tier, token) {
      if (!img) return;
      img.classList.remove("is-loaded");
      img.alt = item.name || item.alt || "";
      const chain = tier === "thumb" ? ["thumb", "medium", "full"]
        : tier === "full" ? ["full", "medium", "thumb"]
        : ["medium", "thumb", "full"];
      const isFile = location.protocol === "file:";

      const tryTier = function (idx) {
        if (idx >= chain.length) {
          if (progress) progress.classList.remove("is-active");
          if (img) img.classList.remove("is-loading");
          updateHdBtn(item);
          return;
        }
        const name = chain[idx];
        const rel = pathFor(item, name);
        if (!rel) {
          tryTier(idx + 1);
          return;
        }
        const url = assetUrl(rel);
        if (name === "full" && !isFile) {
          loadViaXhr(url, function (ok) {
            if (ok) loadedTier = "full";
            else tryTier(idx + 1);
            updateHdBtn(item);
          }, token);
          return;
        }
        if (progress) progress.classList.remove("is-active");
        img.classList.add("is-loading");
        img.onload = function () {
          if (token !== loadToken) return;
          img.classList.add("is-loaded");
          img.classList.remove("is-loading");
          loadedTier = name === "full" ? "full" : name;
          updateHdBtn(item);
        };
        img.onerror = function () {
          if (token !== loadToken) return;
          tryTier(idx + 1);
        };
        img.src = url;
      };
      tryTier(0);
    }

    function show(i) {
      if (!items.length) return;
      cancelLoad();
      const token = loadToken;
      index = (i + items.length) % items.length;
      const item = items[index];
      setCaption(item);
      loadedTier = "";
      const isVideo = !!(item.video || item.media === "video");
      if (isVideo && video && item.video) {
        if (img) {
          img.hidden = true;
          img.removeAttribute("src");
        }
        video.hidden = false;
        video.src = assetUrl(item.video);
        if (btnHd) btnHd.hidden = true;
        if (progress) progress.classList.remove("is-active");
      } else {
        stopVideo();
        if (img) img.hidden = false;
        loadTier(item, getQuality(), token);
      }
      lb.classList.add("is-open");
      lb.setAttribute("aria-hidden", "false");
      lockBodyScroll();
    }

    if (btnClose) btnClose.addEventListener("click", close);
    if (btnPrev) btnPrev.addEventListener("click", function () { show(index - 1); });
    if (btnNext) btnNext.addEventListener("click", function () { show(index + 1); });
    if (btnHd) {
      btnHd.addEventListener("click", function () {
        const item = items[index];
        if (!item) return;
        cancelLoad();
        const token = loadToken;
        btnHd.classList.add("is-loading");
        btnHd.disabled = true;
        loadViaXhr(assetUrl(pathFor(item, "full")), function (ok) {
          if (ok) loadedTier = "full";
          updateHdBtn(item);
        }, token);
      });
    }
    lb.addEventListener("click", function (e) {
      if (e.target === lb) close();
    });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(index - 1);
      if (e.key === "ArrowRight") show(index + 1);
    });

    let touchStartX = 0;
    let touchStartY = 0;
    lb.addEventListener("touchstart", function (e) {
      touchStartX = e.changedTouches[0].clientX;
      touchStartY = e.changedTouches[0].clientY;
    }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2) {
        if (dx < 0) show(index + 1);
        else show(index - 1);
      }
    }, { passive: true });

    document.querySelectorAll("[data-gallery-quality]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const q = setQuality(btn.getAttribute("data-gallery-quality"));
        document.querySelectorAll("[data-gallery-quality]").forEach(function (b) {
          b.classList.toggle("is-active", b.getAttribute("data-gallery-quality") === q);
        });
        if (lb.classList.contains("is-open") && items[index]) {
          cancelLoad();
          loadTier(items[index], q, loadToken);
        }
      });
    });
    document.querySelectorAll("[data-gallery-quality]").forEach(function (b) {
      b.classList.toggle("is-active", b.getAttribute("data-gallery-quality") === getQuality());
    });

    return {
      open: function (list, startIndex, origin) {
        items = list;
        lastFocusedThumb = origin || document.activeElement;
        show(startIndex || 0);
      },
      close: close,
      isOpen: function () { return lb.classList.contains("is-open"); },
    };
  }

  /* ── Masonry (USA: reparent existing items, never rebuild) ── */
  function columnCount() {
    const w = window.innerWidth || 1200;
    if (w <= 520) return 1;
    if (w <= 900) return 2;
    return 3;
  }

  function estimateHeight(item, colWidth) {
    const img = item.querySelector("img");
    let ratio = 0.75;
    if (img) {
      const aw = parseFloat(img.getAttribute("width") || "") || 0;
      const ah = parseFloat(img.getAttribute("height") || "") || 0;
      if (aw > 0 && ah > 0) ratio = ah / aw;
    }
    return colWidth * ratio + 8;
  }

  let packSignature = "";

  function packMasonry(grid, ordered) {
    const items = ordered || Array.from(grid.querySelectorAll(".gallery-item"));
    if (!items.length) return;
    const n = Math.max(1, columnCount());
    const gap = n === 1 ? 12 : 14;
    const visible = [];
    const parked = [];
    items.forEach(function (item) {
      if (item.classList.contains("hidden") || item.classList.contains("load-error")) parked.push(item);
      else visible.push(item);
    });
    const sig = n + "|" + visible.map(itemSlug).join(",");
    let cols = Array.from(grid.querySelectorAll(":scope > .gallery-col"));
    if (cols.length === n && sig && sig === packSignature) return;
    packSignature = sig;

    while (cols.length < n) {
      const col = document.createElement("div");
      col.className = "gallery-col";
      col.setAttribute("role", "presentation");
      grid.appendChild(col);
      cols.push(col);
    }
    while (cols.length > n) {
      const doomed = cols.pop();
      while (doomed.firstChild) grid.appendChild(doomed.firstChild);
      doomed.remove();
    }
    cols = Array.from(grid.querySelectorAll(":scope > .gallery-col"));
    const gridW = grid.clientWidth || 900;
    const colWidth = Math.max(80, (gridW - gap * (n - 1)) / n);
    const heights = new Array(n).fill(0);
    const prevAnchor = grid.style.overflowAnchor;
    grid.style.overflowAnchor = "none";
    visible.forEach(function (item) {
      let shortest = 0;
      for (let i = 1; i < n; i += 1) {
        if (heights[i] < heights[shortest]) shortest = i;
      }
      cols[shortest].appendChild(item);
      heights[shortest] += estimateHeight(item, colWidth) + gap;
    });
    parked.forEach(function (item, i) {
      cols[i % n].appendChild(item);
    });
    Array.from(grid.children).forEach(function (child) {
      if (child.classList.contains("gallery-col")) return;
      if (child.classList.contains("gallery-item")) cols[0].appendChild(child);
    });
    grid.style.overflowAnchor = prevAnchor;
    grid.classList.add("gallery-grid--packed");
  }

  function compareItems(a, b, mode) {
    if (mode === "name") {
      return itemToPhoto(a).name.localeCompare(itemToPhoto(b).name);
    }
    if (mode === "time-asc" || mode === "time-desc") {
      const da = dateSortKey(a.dataset.date);
      const db = dateSortKey(b.dataset.date);
      if (da !== db) return mode === "time-desc" ? db - da : da - db;
      return itemToPhoto(a).name.localeCompare(itemToPhoto(b).name);
    }
    if (mode === "location") {
      return (a.dataset.location || "").localeCompare(b.dataset.location || "");
    }
    if (mode === "city") {
      return (a.dataset.city || "").localeCompare(b.dataset.city || "");
    }
    if (mode === "category") {
      return (a.dataset.category || "").localeCompare(b.dataset.category || "");
    }
    const oa = parseInt(a.dataset.order || "0", 10);
    const ob = parseInt(b.dataset.order || "0", 10);
    return oa - ob;
  }

  function applyAspect(item) {
    const img = item.querySelector("img");
    if (!img) return;
    const aw = parseFloat(img.getAttribute("width") || "") || 0;
    const ah = parseFloat(img.getAttribute("height") || "") || 0;
    if (aw > 0 && ah > 0) item.style.aspectRatio = aw + " / " + ah;
  }

  function watchLoad(item) {
    const img = item.querySelector("img");
    if (!img) return;
    applyAspect(item);
    const onOk = function () {
      item.classList.add("img-ready");
      img.classList.add("loaded");
      if (!item.style.aspectRatio && img.naturalWidth) {
        item.style.aspectRatio = img.naturalWidth + " / " + img.naturalHeight;
      }
    };
    const onErr = function () {
      if (img.dataset.fallbackTried === "1") {
        item.classList.add("load-error", "img-ready");
        return;
      }
      const jpeg = img.getAttribute("data-thumb") || "";
      if (jpeg && img.getAttribute("src") !== jpeg) {
        img.dataset.fallbackTried = "1";
        img.src = jpeg;
        return;
      }
      item.classList.add("load-error", "img-ready");
    };
    if (img.complete && img.naturalWidth > 0) onOk();
    else if (img.complete) onErr();
    else {
      img.addEventListener("load", onOk, { once: true });
      img.addEventListener("error", onErr, { once: true });
    }
  }

  function ensureVideoBadge(item) {
    if (item.getAttribute("data-media") !== "video" && !item.querySelector("img[data-video]")) return;
    if (item.querySelector(".gallery-video-badge")) return;
    const badge = document.createElement("span");
    badge.className = "gallery-video-badge";
    badge.setAttribute("aria-hidden", "true");
    badge.innerHTML = '<svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true"><path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14z"/></svg><span></span>';
    badge.querySelector("span").textContent = t("gallery.videoBadge", "Video");
    item.appendChild(badge);
  }

  function init() {
    const grid = document.getElementById("gallery-grid");
    if (!grid || grid.dataset.jtgGallery === "1") return;
    grid.dataset.jtgGallery = "1";

    const empty = document.getElementById("gallery-empty");
    const cityFilter = document.getElementById("gallery-city");
    const search = document.getElementById("gallery-search");
    const sortEl = document.getElementById("gallery-sort");
    const catBar = document.getElementById("gallery-filters");
    const countEl = document.getElementById("gallery-count");
    const lightbox = bindLightbox();

    const items = Array.from(grid.querySelectorAll(".gallery-item"));
    items.forEach(function (item, idx) {
      if (!item.dataset.order) item.dataset.order = String(idx + 1);
      if (!item.dataset.id) item.dataset.id = itemSlug(item);
      applyAspect(item);
      watchLoad(item);
      ensureVideoBadge(item);
      item.addEventListener("click", function () { openItem(item); });
      item.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openItem(item);
        }
      });
    });

    if (cityFilter) {
      const cities = Array.from(new Set(items.map(function (el) { return el.dataset.city; }).filter(Boolean))).sort();
      cities.forEach(function (c) {
        const opt = document.createElement("option");
        opt.value = c;
        opt.textContent = c;
        cityFilter.appendChild(opt);
      });
    }

    let activeCat = "all";
    let query = "";

    function matches(item) {
      if (item.classList.contains("load-error")) return false;
      if (activeCat !== "all" && (item.dataset.category || "cities") !== activeCat) return false;
      if (cityFilter && cityFilter.value && item.dataset.city !== cityFilter.value) return false;
      if (query && haystack(item).indexOf(query) < 0) return false;
      return true;
    }

    function visiblePhotos() {
      return items.filter(matches).sort(function (a, b) {
        return compareItems(a, b, sortEl ? sortEl.value : "time-desc");
      }).map(itemToPhoto);
    }

    function openItem(item) {
      if (!lightbox || item.classList.contains("hidden") || item.classList.contains("load-error")) return;
      const list = visiblePhotos();
      const slug = itemSlug(item);
      let idx = list.findIndex(function (p) { return p.id === slug; });
      if (idx < 0) idx = 0;
      lightbox.open(list, idx, item);
    }

    function updateCounts() {
      if (!catBar) return;
      const counts = { all: 0 };
      items.forEach(function (item) {
        if (item.classList.contains("load-error")) return;
        if (query && haystack(item).indexOf(query) < 0) return;
        if (cityFilter && cityFilter.value && item.dataset.city !== cityFilter.value) return;
        counts.all += 1;
        const c = item.dataset.category || "cities";
        counts[c] = (counts[c] || 0) + 1;
      });
      catBar.querySelectorAll("[data-filter]").forEach(function (btn) {
        const f = btn.getAttribute("data-filter");
        const badge = btn.querySelector(".gallery-filter__count");
        const n = counts[f] || 0;
        if (badge) badge.textContent = String(n);
        if (f !== "all" && n === 0) {
          btn.hidden = true;
        } else {
          btn.hidden = false;
        }
      });
    }

    function apply() {
      const mode = sortEl ? sortEl.value : "time-desc";
      const sorted = items.slice().sort(function (a, b) { return compareItems(a, b, mode); });
      let shown = 0;
      sorted.forEach(function (item) {
        const ok = matches(item);
        item.classList.toggle("hidden", !ok);
        if (ok) shown += 1;
      });
      if (countEl) {
        countEl.textContent = shown ? shown + " " + t("gallery.photoCount", "photos") : "";
      }
      const none = items.length === 0 || shown === 0;
      if (empty) empty.hidden = !none;
      grid.hidden = items.length === 0;
      packMasonry(grid, sorted);
      updateCounts();
    }

    if (catBar) {
      catBar.querySelectorAll("[data-filter]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          activeCat = btn.getAttribute("data-filter") || "all";
          catBar.querySelectorAll("[data-filter]").forEach(function (b) {
            const on = b === btn;
            b.classList.toggle("is-active", on);
            b.setAttribute("aria-pressed", on ? "true" : "false");
          });
          apply();
        });
      });
    }
    if (cityFilter) cityFilter.addEventListener("change", apply);
    if (search) {
      let timer = 0;
      search.addEventListener("input", function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
          query = (search.value || "").trim().toLowerCase();
          apply();
        }, 120);
      });
    }
    if (sortEl) sortEl.addEventListener("change", apply);

    window.addEventListener("jtg:i18n", function () {
      items.forEach(function (item) {
        const cap = item.querySelector(".gallery-caption");
        if (cap) item.setAttribute("aria-label", cap.textContent.trim());
        const badge = item.querySelector(".gallery-video-badge span:last-child");
        if (badge) badge.textContent = t("gallery.videoBadge", "Video");
      });
      apply();
    });

    let lastN = columnCount();
    let lastW = grid.clientWidth || 0;
    window.addEventListener("resize", function () {
      const n = columnCount();
      const w = grid.clientWidth || 0;
      if (n !== lastN || Math.abs(w - lastW) > 24) {
        lastN = n;
        lastW = w;
        packSignature = "";
        apply();
      }
    }, { passive: true });

    apply();

    /* Deep link: gallery.html?photo=slug */
    try {
      const param = (new URLSearchParams(location.search).get("photo") || "").trim().toLowerCase();
      if (param) {
        const match = items.find(function (item) {
          const slug = itemSlug(item).toLowerCase();
          const img = item.querySelector("img");
          const full = ((img && img.getAttribute("data-full")) || "").toLowerCase();
          const file = (full.split("/").pop() || "");
          const stem = file.replace(/\.[^.]+$/, "");
          return slug === param || file === param || stem === param || full.endsWith("/" + param);
        });
        if (match) {
          setTimeout(function () { openItem(match); }, 80);
        }
      }
    } catch (e) { /* ignore */ }
  }

  global.JTG = global.JTG || {};
  global.JTG.Gallery = { init: init };

  if (document.body && document.body.dataset.page === "gallery") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }
  }
})(window);
