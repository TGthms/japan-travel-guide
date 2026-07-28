/**
 * Public gallery — masonry grid, category filters, progressive lightbox
 * (medium first → optional full original with progress bar)
 */
(function (global) {
  "use strict";

  const QUALITY_KEY = "jtg-gallery-quality"; // medium | full
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
      return q === "full" ? "full" : "medium";
    } catch {
      return "medium";
    }
  }

  function setQuality(q) {
    try {
      localStorage.setItem(QUALITY_KEY, q);
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

    function revoke() {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
        objectUrl = null;
      }
    }

    function close() {
      lb.classList.remove("is-open");
      lb.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (xhr) {
        xhr.abort();
        xhr = null;
      }
      revoke();
      if (img) {
        img.src = "";
        img.classList.remove("is-loaded", "is-loading");
      }
      if (progress) progress.classList.remove("is-active");
      loadedTier = "";
    }

    function setCaption(item) {
      if (title) title.textContent = item.name || "";
      if (meta) {
        const bits = [item.location, item.time, item.city, item.category].filter(Boolean);
        meta.textContent = bits.join(" · ");
      }
      if (counter) counter.textContent = items.length ? `${index + 1} / ${items.length}` : "";
    }

    function updateHdBtn(item) {
      if (!btnHd) return;
      const hasFull = !!(item.original && item.original !== item.medium);
      const show = hasFull && loadedTier !== "full";
      btnHd.hidden = !show;
      btnHd.disabled = false;
      btnHd.classList.remove("is-loading");
    }

    function loadViaXhr(url, onDone) {
      if (xhr) xhr.abort();
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
        if (e.lengthComputable && bar) {
          const pct = Math.round((e.loaded / e.total) * 100);
          bar.style.width = pct + "%";
          if (progressPct) progressPct.textContent = pct + "%";
        } else if (bar) {
          bar.style.width = "40%";
        }
      };
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          revoke();
          objectUrl = URL.createObjectURL(xhr.response);
          if (img) {
            img.onload = () => {
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
        if (img) {
          img.src = url;
          img.onload = () => {
            img.classList.add("is-loaded");
            img.classList.remove("is-loading");
            if (progress) progress.classList.remove("is-active");
            if (onDone) onDone(true);
          };
        }
        xhr = null;
      };
      xhr.send();
    }

    function loadTier(item, tier) {
      const rel = pathFor(item, tier);
      if (!rel || !img) return;
      img.classList.remove("is-loaded");
      img.alt = item.name || item.alt || "";
      const url = assetUrl(rel);
      // Medium can load directly (smaller); full uses XHR progress
      if (tier === "full" || getQuality() === "full") {
        loadViaXhr(url, (ok) => {
          if (ok) loadedTier = tier === "full" || !item.medium ? "full" : tier;
          updateHdBtn(item);
        });
      } else {
        if (progress) progress.classList.remove("is-active");
        img.classList.add("is-loading");
        img.onload = () => {
          img.classList.add("is-loaded");
          img.classList.remove("is-loading");
          loadedTier = "medium";
          updateHdBtn(item);
        };
        img.onerror = () => {
          // fallback to original
          loadViaXhr(assetUrl(pathFor(item, "full")), (ok) => {
            if (ok) loadedTier = "full";
            updateHdBtn(item);
          });
        };
        img.src = url;
      }
    }

    function show(i) {
      if (!items.length) return;
      index = (i + items.length) % items.length;
      const item = items[index];
      setCaption(item);
      const preferFull = getQuality() === "full";
      loadedTier = "";
      loadTier(item, preferFull ? "full" : "medium");
      lb.classList.add("is-open");
      lb.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    if (btnClose) btnClose.addEventListener("click", close);
    if (btnPrev) btnPrev.addEventListener("click", () => show(index - 1));
    if (btnNext) btnNext.addEventListener("click", () => show(index + 1));
    if (btnHd) {
      btnHd.addEventListener("click", () => {
        const item = items[index];
        if (!item) return;
        btnHd.classList.add("is-loading");
        btnHd.disabled = true;
        loadViaXhr(assetUrl(pathFor(item, "full")), (ok) => {
          if (ok) loadedTier = "full";
          updateHdBtn(item);
        });
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
          loadTier(items[index], q === "full" ? "full" : "medium");
        }
      });
    });
    // Sync active quality pill
    document.querySelectorAll("[data-gallery-quality]").forEach((b) => {
      b.classList.toggle("is-active", b.getAttribute("data-gallery-quality") === getQuality());
    });

    return {
      open(list, startIndex) {
        items = list;
        show(startIndex || 0);
      },
    };
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

      grid.innerHTML = "";
      if (!list.length) {
        if (empty) empty.hidden = false;
        grid.hidden = true;
        return;
      }
      if (empty) empty.hidden = true;
      grid.hidden = false;

      list.forEach((item, i) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "gallery-card";
        btn.setAttribute("role", "listitem");
        const thumb = assetUrl(item.thumb || item.medium || item.original);
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
        if (im) {
          im.addEventListener("load", () => btn.classList.add("is-ready"));
          im.addEventListener("error", () => btn.classList.add("is-error"));
        }
        btn.addEventListener("click", () => lightbox && lightbox.open(list, i));
        grid.appendChild(btn);
        // staggered reveal
        requestAnimationFrame(() => {
          btn.classList.add("is-visible");
        });
      });
    }

    if (cityFilter) cityFilter.addEventListener("change", render);
    if (search) search.addEventListener("input", render);
    if (sortEl) sortEl.addEventListener("change", render);
    window.addEventListener("jtg:i18n", render);
    render();
  }

  global.JTG = global.JTG || {};
  global.JTG.Gallery = { init, loadManifest };
})(window);
