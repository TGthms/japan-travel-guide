#!/usr/bin/env python3
"""
Private local Gallery Manager for Japan Travel Guide.

- Website-like admin UI (not linked from the public site)
- Accepts common photo formats; stores full images as high-quality JPEG
  (JPEG uploads kept as-is without re-encode when possible)
- Generates medium + thumb derivatives
- Writes assets/gallery/{originals,medium,thumbs,gallery.json}

Usage (from this directory):
  python3 -m venv .venv
  source .venv/bin/activate
  pip install -r requirements.txt
  python app.py

Then open http://127.0.0.1:8787
"""

from __future__ import annotations

import json
import re
import shutil
import uuid
from datetime import datetime, timezone
from io import BytesIO
from pathlib import Path

from flask import (
    Flask,
    flash,
    jsonify,
    redirect,
    render_template_string,
    request,
    send_from_directory,
    url_for,
)
from PIL import Image, ImageOps, UnidentifiedImageError

# Optional HEIC
try:
    from pillow_heif import register_heif_opener

    register_heif_opener()
    HEIF_OK = True
except Exception:
    HEIF_OK = False

APP_DIR = Path(__file__).resolve().parent
# tools/gallery_manager -> project root
ROOT = APP_DIR.parent.parent
GALLERY = ROOT / "assets" / "gallery"
ORIGINALS = GALLERY / "originals"
MEDIUM_DIR = GALLERY / "medium"
THUMBS = GALLERY / "thumbs"
MANIFEST = GALLERY / "gallery.json"
MANIFEST_JS = GALLERY / "gallery.manifest.js"

CITIES = [
    "Tokyo",
    "Kyoto",
    "Osaka",
    "Nara",
    "Hiroshima",
    "Yokohama",
    "Hakone",
    "Nikko",
    "Kanazawa",
    "Sapporo",
    "Fukuoka",
    "Kobe",
    "Nagasaki",
    "Okinawa",
    "Other",
]

THUMB_MAX = 600
MEDIUM_MAX = 1920
JPEG_QUALITY_FULL = 95  # only used when converting non-JPEG
# Keep source JPEG bytes when input is already JPEG

app = Flask(__name__)
app.secret_key = "jtg-local-gallery-manager-not-for-production"


def ensure_dirs() -> None:
    ORIGINALS.mkdir(parents=True, exist_ok=True)
    MEDIUM_DIR.mkdir(parents=True, exist_ok=True)
    THUMBS.mkdir(parents=True, exist_ok=True)
    if not MANIFEST.exists():
        save_manifest({"version": 1, "updatedAt": None, "photos": []})


def load_manifest() -> dict:
    ensure_dirs()
    try:
        data = json.loads(MANIFEST.read_text(encoding="utf-8"))
        if "photos" not in data:
            data["photos"] = []
        for p in data["photos"]:
            if not p.get("category"):
                p["category"] = "cities"
            if not p.get("medium"):
                if p.get("thumb"):
                    p["medium"] = f"medium/{Path(p['thumb']).name}"
                elif p.get("original"):
                    p["medium"] = f"medium/{Path(p['original']).name}"
        return data
    except Exception:
        return {"version": 1, "updatedAt": None, "photos": []}


def save_manifest(data: dict) -> None:
    ensure_dirs()
    data["updatedAt"] = datetime.now(timezone.utc).isoformat()
    MANIFEST.write_text(
        json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    MANIFEST_JS.write_text(
        "window.__JTG_GALLERY_MANIFEST = "
        + json.dumps(data, ensure_ascii=False, indent=2)
        + ";\n",
        encoding="utf-8",
    )


def slugify(name: str) -> str:
    s = name.strip().lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = s.strip("-") or "photo"
    return s[:60]


def is_jpeg_file(filename: str, raw: bytes) -> bool:
    lower = filename.lower()
    if lower.endswith((".jpg", ".jpeg")):
        return True
    # magic bytes
    return raw[:3] == b"\xff\xd8\xff"


def open_image(raw: bytes) -> Image.Image:
    img = Image.open(BytesIO(raw))
    img = ImageOps.exif_transpose(img)
    return img


def make_thumb(img: Image.Image, dest: Path) -> None:
    thumb = img.copy()
    thumb.thumbnail((THUMB_MAX, THUMB_MAX), Image.Resampling.LANCZOS)
    if thumb.mode not in ("RGB", "L"):
        thumb = thumb.convert("RGB")
    elif thumb.mode == "L":
        thumb = thumb.convert("RGB")
    thumb.save(dest, format="JPEG", quality=82, optimize=True)


def make_medium(img: Image.Image, dest: Path) -> None:
    medium = img.copy()
    medium.thumbnail((MEDIUM_MAX, MEDIUM_MAX), Image.Resampling.LANCZOS)
    if medium.mode not in ("RGB", "L"):
        medium = medium.convert("RGB")
    elif medium.mode == "L":
        medium = medium.convert("RGB")
    medium.save(dest, format="JPEG", quality=82, optimize=True)


def store_photo(
    raw: bytes,
    original_filename: str,
    name: str,
    time_label: str,
    location: str,
    city: str,
) -> dict:
    photo_id = uuid.uuid4().hex[:12]
    base = f"{slugify(name)}-{photo_id}"
    original_rel = f"originals/{base}.jpg"
    medium_rel = f"medium/{base}.jpg"
    thumb_rel = f"thumbs/{base}.jpg"
    original_path = GALLERY / original_rel
    medium_path = GALLERY / medium_rel
    thumb_path = GALLERY / thumb_rel

    img = open_image(raw)

    # Full image: keep JPEG bytes as-is; convert other formats to high-quality JPEG
    if is_jpeg_file(original_filename, raw):
        original_path.write_bytes(raw)
        # still need image for thumb
    else:
        if img.mode not in ("RGB", "L"):
            rgb = img.convert("RGB")
        elif img.mode == "L":
            rgb = img.convert("RGB")
        else:
            rgb = img
        # High quality conversion — no further recompression pipeline
        rgb.save(original_path, format="JPEG", quality=JPEG_QUALITY_FULL, subsampling=0)

    source = img if img.mode in ("RGB", "L") else img.convert("RGB")
    make_medium(source, medium_path)
    make_thumb(source, thumb_path)

    alt = name  # alt text defaults to photo name
    return {
        "id": photo_id,
        "name": name,
        "alt": alt,
        "time": time_label,
        "location": location,
        "city": city,
        "category": "cities",
        "original": original_rel,
        "medium": medium_rel,
        "thumb": thumb_rel,
        "sortOrder": 0,
        "createdAt": datetime.now(timezone.utc).isoformat(),
    }


PAGE = r"""
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Gallery Manager (Private)</title>
  <style>
    :root {
      --bg: #0f1118; --card: #1a1d2a; --text: #f2f0ec; --muted: #a09a94;
      --accent: #e88a9e; --accent2: #c9a227; --border: rgba(255,255,255,.08);
      --danger: #ff5c7a; --ok: #5ddea0;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0; font-family: system-ui, sans-serif; background: var(--bg); color: var(--text);
      line-height: 1.5;
    }
    header {
      padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border);
      display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap;
      background: linear-gradient(90deg, rgba(232,138,158,.15), rgba(201,162,39,.1));
    }
    header h1 { margin: 0; font-size: 1.25rem; }
    header .badge {
      font-size: .75rem; padding: .25rem .6rem; border-radius: 999px;
      background: rgba(255,92,122,.2); color: #ffb3c1; border: 1px solid rgba(255,92,122,.35);
    }
    main { max-width: 1100px; margin: 0 auto; padding: 1.5rem; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
    @media (max-width: 800px) { .grid { grid-template-columns: 1fr; } }
    .card {
      background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 1.25rem;
    }
    h2 { margin: 0 0 1rem; font-size: 1.05rem; }
    label { display: block; font-size: .85rem; color: var(--muted); margin: .6rem 0 .3rem; }
    input, select, textarea {
      width: 100%; padding: .65rem .75rem; border-radius: 10px; border: 1px solid var(--border);
      background: #12141e; color: var(--text);
    }
    input[type=file] { padding: .5rem; }
    .btn {
      display: inline-flex; align-items: center; gap: .4rem; border: none; cursor: pointer;
      padding: .7rem 1.1rem; border-radius: 999px; font-weight: 600; margin-top: .85rem;
    }
    .btn-primary { background: linear-gradient(135deg, #e88a9e, #c41e3a); color: #fff; }
    .btn-ghost { background: transparent; color: var(--text); border: 1px solid var(--border); }
    .btn-danger { background: rgba(255,92,122,.15); color: #ff8aa0; border: 1px solid rgba(255,92,122,.3); }
    .flash { padding: .75rem 1rem; border-radius: 10px; margin-bottom: 1rem; }
    .flash.ok { background: rgba(93,222,160,.12); border: 1px solid rgba(93,222,160,.3); }
    .flash.err { background: rgba(255,92,122,.12); border: 1px solid rgba(255,92,122,.3); }
    table { width: 100%; border-collapse: collapse; font-size: .9rem; }
    th, td { text-align: left; padding: .65rem .4rem; border-bottom: 1px solid var(--border); vertical-align: top; }
    th { color: var(--muted); font-weight: 600; font-size: .78rem; text-transform: uppercase; letter-spacing: .04em; }
    .thumb { width: 72px; height: 54px; object-fit: cover; border-radius: 8px; background: #000; }
    .muted { color: var(--muted); font-size: .85rem; }
    .row-actions { display: flex; flex-wrap: wrap; gap: .4rem; }
    .row-actions form { display: inline; }
    .meta-path { font-family: ui-monospace, monospace; font-size: .75rem; color: var(--muted); }
    .edit-grid { display: grid; grid-template-columns: 1fr 1fr; gap: .5rem; }
    @media (max-width: 600px) { .edit-grid { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <header>
    <div>
      <h1>📷 Gallery Manager</h1>
      <p class="muted" style="margin:.25rem 0 0">Private local tool · writes into <code>assets/gallery/</code></p>
    </div>
    <span class="badge">NOT PUBLIC · localhost only</span>
  </header>
  <main>
    {% with messages = get_flashed_messages(with_categories=true) %}
      {% for cat, msg in messages %}
        <div class="flash {{ 'ok' if cat == 'ok' else 'err' }}">{{ msg }}</div>
      {% endfor %}
    {% endwith %}

    <div class="grid">
      <section class="card">
        <h2>Upload photos</h2>
        <p class="muted">Accepts JPEG, PNG, WebP, GIF, BMP, TIFF{% if heif %}, HEIC/HEIF{% endif %}. Non-JPEG files are converted to high-quality JPEG. Existing JPEGs are stored without re-encoding. Thumbs are compressed separately.</p>
        <form method="post" action="{{ url_for('upload') }}" enctype="multipart/form-data">
          <label>Files</label>
          <input type="file" name="files" accept="image/*,.heic,.heif" multiple required />
          <label>Default display name (optional — uses filename if empty)</label>
          <input type="text" name="name" placeholder="e.g. Senso-ji Gate" />
          <label>Time (e.g. July 2025)</label>
          <input type="text" name="time" placeholder="July 2025" value="{{ default_time }}" />
          <label>Location</label>
          <input type="text" name="location" placeholder="Asakusa, Tokyo" />
          <label>City / region</label>
          <select name="city">
            {% for c in cities %}
              <option value="{{ c }}">{{ c }}</option>
            {% endfor %}
          </select>
          <button class="btn btn-primary" type="submit">Upload & process</button>
        </form>
      </section>

      <section class="card">
        <h2>Library status</h2>
        <p><strong>{{ photos|length }}</strong> photo(s) in <span class="meta-path">{{ manifest_path }}</span></p>
        <p class="muted">Public site reads this manifest from <code>gallery.html</code>. Alt text = photo name (editable below).</p>
        <p class="muted">HEIC support: {{ 'enabled' if heif else 'not installed (pip install pillow-heif)' }}</p>
        <a class="btn btn-ghost" href="{{ url_for('index') }}">Refresh</a>
      </section>
    </div>

    <section class="card" style="margin-top:1.25rem">
      <h2>Manage photos</h2>
      {% if not photos %}
        <p class="muted">No photos yet. Upload above to get started.</p>
      {% else %}
      <div style="overflow-x:auto">
        <table>
          <thead>
            <tr>
              <th>Thumb</th>
              <th>Details</th>
              <th>Order</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {% for p in photos %}
            <tr>
              <td>
                <img class="thumb" src="{{ url_for('gallery_file', relpath=p.thumb) }}" alt="{{ p.name }}" />
              </td>
              <td>
                <form method="post" action="{{ url_for('update_photo', photo_id=p.id) }}">
                  <div class="edit-grid">
                    <div>
                      <label>Name / alt</label>
                      <input name="name" value="{{ p.name }}" required />
                    </div>
                    <div>
                      <label>Time</label>
                      <input name="time" value="{{ p.time }}" placeholder="July 2025" />
                    </div>
                    <div>
                      <label>Location</label>
                      <input name="location" value="{{ p.location }}" />
                    </div>
                    <div>
                      <label>City</label>
                      <select name="city">
                        {% for c in cities %}
                          <option value="{{ c }}" {% if p.city == c %}selected{% endif %}>{{ c }}</option>
                        {% endfor %}
                      </select>
                    </div>
                  </div>
                  <p class="meta-path">{{ p.original }}</p>
                  <button class="btn btn-primary" type="submit">Save</button>
                </form>
              </td>
              <td style="width:110px">
                <form method="post" action="{{ url_for('update_photo', photo_id=p.id) }}">
                  <input type="hidden" name="name" value="{{ p.name }}" />
                  <input type="hidden" name="time" value="{{ p.time }}" />
                  <input type="hidden" name="location" value="{{ p.location }}" />
                  <input type="hidden" name="city" value="{{ p.city }}" />
                  <label>sortOrder</label>
                  <input type="number" name="sortOrder" value="{{ p.sortOrder or 0 }}" />
                  <button class="btn btn-ghost" type="submit">Set</button>
                </form>
              </td>
              <td>
                <div class="row-actions">
                  <form method="post" action="{{ url_for('delete_photo', photo_id=p.id) }}" onsubmit="return confirm('Delete this photo?');">
                    <button class="btn btn-danger" type="submit">Delete</button>
                  </form>
                </div>
              </td>
            </tr>
            {% endfor %}
          </tbody>
        </table>
      </div>
      {% endif %}
    </section>
  </main>
</body>
</html>
"""


@app.route("/")
def index():
    ensure_dirs()
    data = load_manifest()
    photos = sorted(data["photos"], key=lambda p: (p.get("sortOrder") or 0, p.get("name") or ""))
    now = datetime.now()
    default_time = now.strftime("%B %Y")
    return render_template_string(
        PAGE,
        photos=photos,
        cities=CITIES,
        heif=HEIF_OK,
        manifest_path=str(MANIFEST),
        default_time=default_time,
    )


@app.route("/gallery/<path:relpath>")
def gallery_file(relpath: str):
    """Serve gallery assets for admin previews only."""
    return send_from_directory(GALLERY, relpath)


@app.post("/upload")
def upload():
    ensure_dirs()
    files = request.files.getlist("files")
    if not files:
        flash("No files selected.", "err")
        return redirect(url_for("index"))

    default_name = (request.form.get("name") or "").strip()
    time_label = (request.form.get("time") or "").strip() or datetime.now().strftime("%B %Y")
    location = (request.form.get("location") or "").strip()
    city = (request.form.get("city") or "Other").strip()

    data = load_manifest()
    max_order = max([p.get("sortOrder") or 0 for p in data["photos"]], default=0)
    added = 0
    errors = []

    for f in files:
        if not f or not f.filename:
            continue
        raw = f.read()
        if not raw:
            errors.append(f"{f.filename}: empty file")
            continue
        name = default_name or Path(f.filename).stem.replace("_", " ").replace("-", " ")
        try:
            photo = store_photo(raw, f.filename, name, time_label, location, city)
            max_order += 10
            photo["sortOrder"] = max_order
            data["photos"].append(photo)
            added += 1
        except UnidentifiedImageError:
            errors.append(f"{f.filename}: not a recognized image")
        except Exception as e:
            errors.append(f"{f.filename}: {e}")

    save_manifest(data)
    if added:
        flash(f"Uploaded {added} photo(s).", "ok")
    if errors:
        flash("Some files failed: " + "; ".join(errors[:5]), "err")
    return redirect(url_for("index"))


@app.post("/photo/<photo_id>/update")
def update_photo(photo_id: str):
    data = load_manifest()
    for p in data["photos"]:
        if p.get("id") == photo_id:
            p["name"] = (request.form.get("name") or p.get("name") or "").strip()
            p["alt"] = p["name"]  # alt tracks name
            p["time"] = (request.form.get("time") or "").strip()
            p["location"] = (request.form.get("location") or "").strip()
            p["city"] = (request.form.get("city") or p.get("city") or "Other").strip()
            p["category"] = p.get("category") or "cities"
            if not p.get("medium"):
                p["medium"] = f"medium/{Path(p.get('original') or p.get('thumb') or 'photo.jpg').name}"
            try:
                p["sortOrder"] = int(request.form.get("sortOrder") or p.get("sortOrder") or 0)
            except ValueError:
                pass
            save_manifest(data)
            flash("Photo updated.", "ok")
            return redirect(url_for("index"))
    flash("Photo not found.", "err")
    return redirect(url_for("index"))


@app.post("/photo/<photo_id>/delete")
def delete_photo(photo_id: str):
    data = load_manifest()
    keep = []
    deleted = None
    for p in data["photos"]:
        if p.get("id") == photo_id:
            deleted = p
        else:
            keep.append(p)
    if not deleted:
        flash("Photo not found.", "err")
        return redirect(url_for("index"))

    for key in ("original", "medium", "thumb"):
        rel = deleted.get(key)
        if rel:
            path = GALLERY / rel
            if path.exists():
                try:
                    path.unlink()
                except OSError:
                    pass
    data["photos"] = keep
    save_manifest(data)
    flash("Photo deleted.", "ok")
    return redirect(url_for("index"))


@app.get("/api/manifest")
def api_manifest():
    return jsonify(load_manifest())


def main():
    ensure_dirs()
    print("=" * 60)
    print("Japan Travel Guide — PRIVATE Gallery Manager")
    print(f"Gallery path: {GALLERY}")
    print("Open: http://127.0.0.1:8787")
    print("Do not expose this port publicly.")
    print("=" * 60)
    # Bind localhost only
    app.run(host="127.0.0.1", port=8787, debug=False)


if __name__ == "__main__":
    main()
