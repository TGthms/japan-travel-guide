/**
 * Public gallery — masonry grid, category filters, progressive lightbox
 * (medium first → optional full original with progress bar)
 */
(function (global) {
  "use strict";

  const QUALITY_KEY = "jtg-gallery-quality"; // thumb | medium | full
  let manifestVersionTag = "";

  function assetBase() {
    return "assets/gallery/";
  }

  function normalizeRelPath(p) {
    if (!p) return "";
    return String(p)
      .trim()
      .replace(/\\/g, "/")
      .replace(/^\.?\/*assets\/gallery\//i, "")
      .replace(/^\/+/, "");
  }

  function assetUrl(relPath) {
    const rel = normalizeRelPath(relPath);
    const url = assetBase() + rel;
    if (!manifestVersionTag) return url;
    const sep = url.includes("?") ? "&" : "?";
    return `${url}${sep}v=${encodeURIComponent(manifestVersionTag)}`;
  }

  function normalizeManifest(raw) {
    if (Array.isArray(raw)) {
      return { version: 1, updatedAt: null, photos: raw };
    }
    if (!raw || typeof raw !== "object") {
      return { version: 1, updatedAt: null, photos: [] };
    }
    const photos = Array.isArray(raw.photos) ? raw.photos : [];
    return {
      version: raw.version || 1,
      updatedAt: raw.updatedAt || null,
      photos,
    };
  }

  function getEmbeddedManifest() {
    const embedded = global.__JTG_GALLERY_MANIFEST;
    if (!embedded) return null;
    const data = normalizeManifest(embedded);
    if (Array.isArray(data.photos) && data.photos.length) return data;
    return null;
  }

  function getQuality() {
    try {
      const q = localStorage.getItem(QUALITY_KEY);
      if (q === "thumb" || q === "medium" || q === "full") return q;
      return "medium";
    } catch {
      return "medium";
    }
  }

  function setQuality(q) {
    const normalized = q === "thumb" || q === "medium" || q === "full" ? q : "medium";
    try {
      localStorage.setItem(QUALITY_KEY, normalized);
    } catch {
      /* ignore */
    }
  }

  async function loadManifest() {
    const embedded = getEmbeddedManifest();
    if (embedded) return embedded;
    const url = assetBase() + "gallery.json";
    const isFileProtocol = typeof location !== "undefined" && location.protocol === "file:";
    const urlWithBust = isFileProtocol ? url : `${url}?v=${Date.now()}`;
    try {
      const res = await fetch(urlWithBust, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load gallery.json (" + res.status + ")");
      return normalizeManifest(await res.json());
    } catch (err) {
      // file:// or offline: try XHR (some browsers allow it when fetch fails)
      const candidates = isFileProtocol ? [url, urlWithBust] : [urlWithBust, url];
      for (const candidate of candidates) {
        try {
          const data = await new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", candidate, true);
            xhr.onload = function () {
              if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 0) {
                try {
                  resolve(normalizeManifest(JSON.parse(xhr.responseText || "{}")));
                } catch (e) {
                  reject(e);
                }
              } else {
                reject(new Error("XHR " + xhr.status));
              }
            };
            xhr.onerror = function () {
              reject(new Error("XHR network error"));
            };
            xhr.send();
          });
          return data;
        } catch (e2) {
          // try next candidate
        }
      }
      const fallback = getEmbeddedManifest();
      if (fallback) return fallback;
      console.warn("[gallery] manifest unavailable", err);
      return { version: 1, photos: [], updatedAt: null };
    }
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function pathFor(item, tier) {
    if (tier === "thumb") return item.thumb;
    if (tier === "medium") return item.medium || item.thumb || item.original;
    return item.original || item.medium || item.thumb;
  }

  function tierFallbacks(startTier) {
    if (startTier === "thumb") return ["thumb", "medium", "full"];
    if (startTier === "full") return ["full", "medium", "thumb"];
    return ["medium", "thumb", "full"];
  }

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
      document.body.style.top = `-${scrollLockY}px`;
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

    function focusables() {
      return [btnClose, btnPrev, btnNext, btnHd].filter((el) => el && !el.hidden && !el.disabled);
    }

    function cancelLoad() {
      loadToken += 1;
      if (xhr) {
        xhr.abort();
        xhr = null;
      }
      if (img) {
        img.onload = null;
        img.onerror = null;
        img.classList.remove("is-loading");
      }
      revoke();
    }

    function close() {
      lb.classList.remove("is-open");
      lb.setAttribute("aria-hidden", "true");
      cancelLoad();
      if (img) {
        img.src = "";
        img.classList.remove("is-loaded", "is-loading");
      }
      if (progress) progress.classList.remove("is-active");
      loadedTier = "";
      unlockBodyScroll();
      if (lastFocusedThumb && typeof lastFocusedThumb.focus === "function") {
        try {
          lastFocusedThumb.focus({ preventScroll: true });
        } catch {
          lastFocusedThumb.focus();
        }
      }
    }

    function setCaption(item) {
      if (title) title.textContent = item.name || "";
      if (meta) {
        const bits = [item.location, item.time, item.city, item.category].filter(Boolean);
        meta.textContent = bits.join(" · ");
      }
      if (counter) counter.textContent = items.length ? `${index + 1} / ${items.length}` : "";
      if (btnPrev) btnPrev.hidden = items.length < 2;
      if (btnNext) btnNext.hidden = items.length < 2;
    }

    function updateHdBtn(item) {
      if (!btnHd) return;
      const hasFull = !!(item.original && item.original !== item.medium);
      const show = hasFull && loadedTier !== "full";
      btnHd.hidden = !show;
      btnHd.disabled = false;
      btnHd.classList.remove("is-loading");
    }

    function loadViaXhr(url, onDone, token) {
      if (token !== loadToken) return;
      if (progress) progress.classList.add("is-active");
      if (bar) bar.style.width = "0%";
      if (progressPct) progressPct.textContent = "0%";
      if (progressMsg) {
        const t = global.JTG.i18n ? global.JTG.i18n.t("gallery.loadingPhoto") : "Loading photo…";
        progressMsg.textContent = t;
      }
      if (img) img.classList.add("is-loading");

      xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "blob";
      xhr.onprogress = (e) => {
        if (token !== loadToken) return;
        if (e.lengthComputable && bar) {
          const pct = Math.round((e.loaded / e.total) * 100);
          bar.style.width = pct + "%";
          if (progressPct) progressPct.textContent = pct + "%";
        } else if (bar) {
          bar.style.width = "40%";
        }
      };
      xhr.onload = () => {
        if (token !== loadToken) return;
        if (xhr.status >= 200 && xhr.status < 300) {
          revoke();
          objectUrl = URL.createObjectURL(xhr.response);
          if (img) {
            img.onload = () => {
              if (token !== loadToken) return;
              img.classList.add("is-loaded");
              img.classList.remove("is-loading");
              if (progress) progress.classList.remove("is-active");
              if (bar) bar.style.width = "100%";
              if (progressPct) progressPct.textContent = "100%";
              if (onDone) onDone(true);
            };
            img.src = objectUrl;
          }
        } else {
          if (progress) progress.classList.remove("is-active");
          if (img) img.classList.remove("is-loading");
          if (onDone) onDone(false);
        }
        xhr = null;
      };
      xhr.onerror = () => {
        if (token !== loadToken) return;
        if (img) {
          img.src = url;
          img.onload = () => {
            if (token !== loadToken) return;
            img.classList.add("is-loaded");
            img.classList.remove("is-loading");
            if (progress) progress.classList.remove("is-active");
            if (onDone) onDone(true);
          };
          img.onerror = () => {
          if (token !== loadToken) return;
          img.classList.remove("is-loading");
          if (progress) progress.classList.remove("is-active");
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
      const chain = tierFallbacks(tier);
      const isFileProtocol = typeof location !== "undefined" && location.protocol === "file:";

      const complete = (ok, resolvedTier) => {
        if (ok) loadedTier = resolvedTier;
        updateHdBtn(item);
      };

      const tryTier = (idx) => {
        if (idx >= chain.length) {
          if (progress) progress.classList.remove("is-active");
          img.classList.remove("is-loading");
          complete(false, "");
          return;
        }
        const tierName = chain[idx];
        const rel = pathFor(item, tierName);
        if (!rel) {
          tryTier(idx + 1);
          return;
        }
        const url = assetUrl(rel);
        if (tierName === "full" && !isFileProtocol) {
          loadViaXhr(url, (ok) => {
          if (ok) {
            complete(true, "full");
          } else {
            tryTier(idx + 1);
          }
          }, token);
          return;
        }
        if (progress) progress.classList.remove("is-active");
        img.classList.add("is-loading");
        img.onload = () => {
          if (token !== loadToken) return;
          img.classList.add("is-loaded");
          img.classList.remove("is-loading");
          complete(true, tierName === "full" ? "full" : tierName);
        };
        img.onerror = () => {
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
      const quality = getQuality();
      loadedTier = "";
      loadTier(item, quality, token);
      lb.classList.add("is-open");
      lb.setAttribute("aria-hidden", "false");
      lockBodyScroll();
    }

    if (btnClose) btnClose.addEventListener("click", close);
    if (btnPrev) btnPrev.addEventListener("click", () => show(index - 1));
    if (btnNext) btnNext.addEventListener("click", () => show(index + 1));
    if (btnHd) {
      btnHd.addEventListener("click", () => {
        const item = items[index];
        if (!item) return;
        cancelLoad();
        const token = loadToken;
        btnHd.classList.add("is-loading");
        btnHd.disabled = true;
        loadViaXhr(assetUrl(pathFor(item, "full")), (ok) => {
          if (ok) loadedTier = "full";
          updateHdBtn(item);
        }, token);
      });
    }
    lb.addEventListener("click", (e) => {
      if (e.target === lb) close();
    });
    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(index - 1);
      if (e.key === "ArrowRight") show(index + 1);
      if (e.key === "Tab") {
        const controls = focusables();
        if (!controls.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    // Quality pills on page
    document.querySelectorAll("[data-gallery-quality]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const q = btn.getAttribute("data-gallery-quality");
        setQuality(q);
        document.querySelectorAll("[data-gallery-quality]").forEach((b) => {
          b.classList.toggle("is-active", b === btn);
        });
        if (lb.classList.contains("is-open") && items[index]) {
          cancelLoad();
          const token = loadToken;
          loadTier(items[index], q === "thumb" ? "thumb" : q === "full" ? "full" : "medium", token);
        }
      });
    });
    // Sync active quality pill
    document.querySelectorAll("[data-gallery-quality]").forEach((b) => {
      b.classList.toggle("is-active", b.getAttribute("data-gallery-quality") === getQuality());
    });

    return {
      open(list, startIndex, origin) {
        items = list;
        lastFocusedThumb = origin || document.activeElement;
        show(startIndex || 0);
      },
    };
  }

  function getMasonryColumnCount() {
    const w = window.innerWidth || 1200;
    if (w <= 520) return 1;
    if (w <= 900) return 2;
    return 3;
  }

  function estimateCardHeight(card, columnWidth) {
    const img = card.querySelector("img");
    let ratio = 0.75;
    if (img) {
      const w = parseFloat(img.getAttribute("width") || "") || img.naturalWidth || 0;
      const h = parseFloat(img.getAttribute("height") || "") || img.naturalHeight || 0;
      if (w > 0 && h > 0) ratio = h / w;
    }
    return columnWidth * ratio + 88;
  }

  function packGalleryMasonry(grid, cards) {
    grid.innerHTML = "";
    if (!cards.length) return;
    const count = getMasonryColumnCount();
    if (count <= 1) {
      cards.forEach((card) => grid.appendChild(card));
      return;
    }

    const columns = [];
    const heights = new Array(count).fill(0);
    const gap = count === 2 ? 14 : 16;
    const gridWidth = grid.clientWidth || grid.offsetWidth || 1000;
    const colWidth = Math.max(120, (gridWidth - gap * (count - 1)) / count);

    for (let i = 0; i < count; i += 1) {
      const col = document.createElement("div");
      col.className = "gallery-col";
      col.setAttribute("role", "presentation");
      columns.push(col);
      grid.appendChild(col);
    }

    cards.forEach((card) => {
      let shortest = 0;
      for (let i = 1; i < count; i += 1) {
        if (heights[i] < heights[shortest]) shortest = i;
      }
      columns[shortest].appendChild(card);
      heights[shortest] += estimateCardHeight(card, colWidth) + gap;
    });
  }

  function sortPhotos(photos, mode) {
    const arr = photos.slice();
    const parseMonthYear = (s) => {
      // rough sortable key from "July 2025"
      if (!s) return "";
      const months = {
        january: "01", february: "02", march: "03", april: "04",
        may: "05", june: "06", july: "07", august: "08",
        september: "09", october: "10", november: "11", december: "12",
      };
      const m = String(s).trim().match(/^([A-Za-z]+)\s+(\d{4})$/);
      if (!m) return s;
      const mo = months[m[1].toLowerCase()] || "00";
      return m[2] + mo;
    };
    if (mode === "name") {
      arr.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    } else if (mode === "time-asc") {
      arr.sort((a, b) => parseMonthYear(a.time).localeCompare(parseMonthYear(b.time)));
    } else if (mode === "time-desc") {
      arr.sort((a, b) => parseMonthYear(b.time).localeCompare(parseMonthYear(a.time)));
    } else if (mode === "location") {
      arr.sort((a, b) => (a.location || "").localeCompare(b.location || ""));
    } else if (mode === "city") {
      arr.sort((a, b) => (a.city || "").localeCompare(b.city || ""));
    } else if (mode === "category") {
      arr.sort((a, b) => (a.category || "").localeCompare(b.category || ""));
    } else {
      arr.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
    }
    return arr;
  }

  async function init() {
    const grid = document.getElementById("gallery-grid");
    const empty = document.getElementById("gallery-empty");
    const cityFilter = document.getElementById("gallery-city");
    const search = document.getElementById("gallery-search");
    const sortEl = document.getElementById("gallery-sort");
    const catBar = document.getElementById("gallery-filters");
    const countEl = document.getElementById("gallery-count");
    if (!grid) return;

    const lightbox = bindLightbox();
    let all = [];
    let activeCat = "all";

    try {
      const data = await loadManifest();
      manifestVersionTag = String(data.updatedAt || Date.now());
      all = Array.isArray(data.photos) ? data.photos : [];
      // migrate: ensure medium key falls back
      all.forEach((p) => {
        p.original = normalizeRelPath(p.original);
        p.medium = normalizeRelPath(p.medium);
        p.thumb = normalizeRelPath(p.thumb);
        if (!p.medium && p.thumb) p.medium = p.thumb;
        if (!p.thumb && p.medium) p.thumb = p.medium;
        if (!p.original && p.medium) p.original = p.medium;
        if (!p.category) p.category = "cities";
      });
    } catch (e) {
      console.warn(e);
      all = [];
    }

    if (cityFilter) {
      const cities = [...new Set(all.map((p) => p.city).filter(Boolean))].sort();
      cities.forEach((c) => {
        const opt = document.createElement("option");
        opt.value = c;
        opt.textContent = c;
        cityFilter.appendChild(opt);
      });
    }

    // Category counts
    if (catBar) {
      const counts = { all: all.length };
      all.forEach((p) => {
        const c = p.category || "cities";
        counts[c] = (counts[c] || 0) + 1;
      });
      catBar.querySelectorAll("[data-filter]").forEach((btn) => {
        const f = btn.getAttribute("data-filter");
        const badge = btn.querySelector(".gallery-filter__count");
        if (badge) badge.textContent = String(counts[f] || 0);
        btn.addEventListener("click", () => {
          activeCat = f;
          catBar.querySelectorAll("[data-filter]").forEach((b) => {
            const on = b === btn;
            b.classList.toggle("is-active", on);
            b.setAttribute("aria-pressed", on ? "true" : "false");
          });
          render();
        });
      });
    }

    function render() {
      const city = cityFilter ? cityFilter.value : "";
      const q = search ? search.value.trim().toLowerCase() : "";
      const sort = sortEl ? sortEl.value : "time-desc";

      let list = all.filter((p) => {
        if (activeCat !== "all" && (p.category || "cities") !== activeCat) return false;
        if (city && p.city !== city) return false;
        if (q) {
          const hay = [p.name, p.location, p.time, p.city, p.alt, p.category]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      });
      list = sortPhotos(list, sort);

      if (countEl) {
        const t = global.JTG.i18n ? global.JTG.i18n.t.bind(global.JTG.i18n) : (k) => k;
        countEl.textContent = list.length
          ? `${list.length} ${t("gallery.photoCount")}`
          : "";
      }

      if (!list.length) {
        if (empty) empty.hidden = false;
        grid.innerHTML = "";
        grid.hidden = true;
        return;
      }
      if (empty) empty.hidden = true;
      grid.hidden = false;

      const cards = [];
      list.forEach((item, i) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "gallery-card";
        btn.setAttribute("role", "listitem");
        const fallbackPaths = [item.thumb, item.medium, item.original]
          .map((p) => normalizeRelPath(p))
          .filter(Boolean)
          .filter((p, idx, arr) => arr.indexOf(p) === idx);
        const thumb = fallbackPaths.length ? assetUrl(fallbackPaths[0]) : "";
        btn.innerHTML = `
          <span class="gallery-card__media">
            <img class="gallery-card__thumb" src="${thumb}" alt="${escapeHtml(item.name || "")}" loading="lazy" decoding="async" />
            <span class="gallery-card__zoom" aria-hidden="true">＋</span>
          </span>
          <span class="gallery-card__body">
            <span class="gallery-card__name">${escapeHtml(item.name || "")}</span>
            <span class="gallery-card__meta">${escapeHtml([item.location, item.time].filter(Boolean).join(" · "))}</span>
          </span>
        `;
        const im = btn.querySelector("img");
        const media = btn.querySelector(".gallery-card__media");
        const fallbackLabel = global.JTG && global.JTG.i18n
          ? global.JTG.i18n.t("gallery.photoUnavailable")
          : "Photo unavailable";
        let sourceIndex = 0;
        const setCardError = () => {
          btn.classList.add("is-error");
          if (!media || media.querySelector(".gallery-card__placeholder")) return;
          const ph = document.createElement("span");
          ph.className = "gallery-card__placeholder";
          ph.innerHTML = '<span class="ph-icon" aria-hidden="true">🖼️</span><span class="ph-text"></span>';
          const t = ph.querySelector(".ph-text");
          if (t) t.textContent = fallbackLabel;
          media.appendChild(ph);
        };
        const tryNextSource = () => {
          sourceIndex += 1;
          if (!im || sourceIndex >= fallbackPaths.length) {
            setCardError();
            return;
          }
          im.src = assetUrl(fallbackPaths[sourceIndex]);
        };
        if (im) {
          if (!fallbackPaths.length) setCardError();
          im.addEventListener("load", () => {
            btn.classList.add("is-ready");
            btn.classList.remove("is-error");
            if (media && !media.style.aspectRatio && im.naturalWidth > 0 && im.naturalHeight > 0) {
              media.style.aspectRatio = `${im.naturalWidth} / ${im.naturalHeight}`;
            }
          });
          im.addEventListener("error", tryNextSource);
        }
        btn.addEventListener("click", () => lightbox && lightbox.open(list, i, btn));
        btn.classList.add("is-visible");
        cards.push(btn);
      });
      packGalleryMasonry(grid, cards);
    }

    if (cityFilter) cityFilter.addEventListener("change", render);
    if (search) search.addEventListener("input", render);
    if (sortEl) sortEl.addEventListener("change", render);
    window.addEventListener("jtg:i18n", render);
    let lastColumnCount = getMasonryColumnCount();
    window.addEventListener("resize", () => {
      const nextCount = getMasonryColumnCount();
      if (nextCount !== lastColumnCount) {
        lastColumnCount = nextCount;
        render();
      }
    }, { passive: true });
    window.addEventListener("orientationchange", () => {
      setTimeout(() => {
        lastColumnCount = getMasonryColumnCount();
        render();
      }, 120);
    }, { passive: true });
    render();
  }

  global.JTG = global.JTG || {};
  global.JTG.Gallery = { init, loadManifest };
})(window);
