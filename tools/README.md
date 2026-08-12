# Gallery Manager

Local mini-app for bulk-adding trip **photos and videos** to this site — **no hand-editing HTML**, no manual thumbnails.

Public gallery is **DOM-first**: items live in `gallery.html` (`#gallery-grid`). The manager writes those HTML tiles plus derivatives.

## Layout

| Asset | Path |
|---|---|
| Full / original | `assets/gallery/originals/{slug}.jpeg` |
| Medium (lightbox) | `assets/gallery/medium/{slug}.jpeg` |
| Thumb (grid) | `assets/gallery/thumbs/{slug}.jpeg` |
| Optional WebP | same folders, `.webp` sidecar (Pillow) |
| Videos | `assets/gallery/videos/{slug}.{ext}` (copied as-is) |
| Captions (ja / zh-CN) | `src/js/data/i18n.js` flat keys `gallery.item.{slug}.caption` |
| Fallback catalog | `assets/gallery/gallery.json` (regenerated from HTML) |

Categories: `cities`, `temples`, `shrines`, `nature`, `food`, `neon`, `travel`, `culture`.

## Videos

- Drop **MP4 / MOV / M4V / WebM** alongside photos.
- Files are copied as-is. Large files (≥ 40 MB) show a warning.
- A cover frame is extracted with macOS Quick Look (`qlmanage`). You can override with a still.
- Tiles show a **Video** badge; the lightbox plays the file.

## Quick start (browser UI)

From the project root:

```bash
cd /path/to/japan-travel-guide
python3 tools/gallery_manager.py
```

Or double-click `Add Photos.command`.

Browser opens **http://127.0.0.1:8787**. Then:

1. Defaults are optional — leave category empty for mixed trips.
2. Auto-detect fills date and location from EXIF / GPS (Japan place fallback).
3. Drop photos or videos. Set a Japan category on every item.
4. **Add all to gallery** writes originals + medium + thumb + HTML + i18n + `gallery.json`.
5. In **Library**, search/filter, **Save** metadata, or **Remove**. Save keeps the existing `data-full` path.

Stop with **Ctrl+C**.

`gallery.html` must keep this comment **inside** `#gallery-grid`:

```html
    <!-- GALLERY_MANAGER_INSERT -->
```

## CLI

```bash
python3 tools/gallery_manager.py --cli ~/Pictures/japan-trip \
    --category cities --location "Tokyo" --date "August 12, 2026"
python3 tools/gallery_manager.py --list
python3 tools/gallery_manager.py --rebuild-media
python3 tools/gallery_manager.py --remove welcometojapan
```

Requires Python 3.9+ and macOS `sips`. Pillow is optional (WebP + orientation bake).

## Legacy Flask app

`tools/gallery_manager/` is a leftover JSON-only writer. Do **not** use it to add photos. The public site reads HTML items, not that Flask pipeline.
