/**
 * Production smoke checks (no browser). Run: node scripts/smoke-check.mjs
 */
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

function walk(dir, pred, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === ".git" || name === "node_modules" || name === "tools") continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, pred, out);
    else if (pred(p)) out.push(p);
  }
  return out;
}

const htmls = walk(root, (p) => p.endsWith(".html"));

for (const f of htmls) {
  const t = fs.readFileSync(f, "utf8");
  const rel = path.relative(root, f);
  const n = (t.match(/<!DOCTYPE/gi) || []).length;
  if (n !== 1) errors.push(`${rel}: doctype count ${n}`);
  if (!t.includes("google-site-verification")) errors.push(`${rel}: missing google verification`);
  if (!t.includes('href="') || !t.includes("src/css/styles.css")) {
    errors.push(`${rel}: missing styles.css barrel`);
  }
  if (t.includes("src/css/icons.css")) errors.push(`${rel}: icons.css should come from the barrel`);
  if (/\?v=/.test(t)) errors.push(`${rel}: leftover cache-bust query`);
  if (!t.includes("core/env.js") && !rel.startsWith("docs/")) {
    errors.push(`${rel}: missing core/env.js`);
  }
  if (!t.includes("core/nav-return.js") && !rel.startsWith("docs/")) {
    errors.push(`${rel}: missing core/nav-return.js`);
  }
}

for (const j of walk(path.join(root, "src/js"), (p) => p.endsWith(".js"))) {
  try {
    execSync(`node --check "${j}"`, { stdio: "pipe" });
  } catch (e) {
    errors.push(`syntax ${path.relative(root, j)}`);
  }
}

const must = [
  "tools.html",
  "tools-weather.html",
  "tools-budget.html",
  "tools-packing.html",
  "tools-currency.html",
  "tools-clock.html",
  "tools-tax.html",
  "tools-rail.html",
  "tools-emergency.html",
  "src/js/core/env.js",
  "src/js/core/nav-return.js",
  "src/js/weather.js",
  "src/js/weather-contract.js",
  "src/css/styles.css",
  "src/css/site.css",
  "src/css/chrome.css",
  "src/css/tools.css",
  "src/css/weather.css",
  "robots.txt",
  "sitemap.xml",
];
for (const m of must) {
  if (!fs.existsSync(path.join(root, m))) errors.push(`missing ${m}`);
}

const tools = fs.readFileSync(path.join(root, "tools.html"), "utf8");
if (!tools.includes("tools-hub-grid")) errors.push("tools.html: missing hub grid");
if (!tools.includes("tools-hub-card")) errors.push("tools.html: missing hub cards");
for (const href of [
  "tools-weather.html",
  "tools-budget.html",
  "tools-packing.html",
  "tools-currency.html",
  "tools-clock.html",
  "tools-tax.html",
  "tools-rail.html",
  "tools-emergency.html",
]) {
  if (!tools.includes(`href="${href}"`)) errors.push(`tools.html: missing card ${href}`);
}
if (tools.includes('id="budget-days"')) errors.push("tools.html: hub should not embed the budget planner");

const weather = fs.readFileSync(path.join(root, "tools-weather.html"), "utf8");
if (/NWS/.test(weather)) errors.push("tools-weather.html: leftover NWS copy");
if (!weather.includes("Open-Meteo")) errors.push("tools-weather.html: missing Open-Meteo attribution");
if (!weather.includes('id="weatherList"')) errors.push("tools-weather.html: missing #weatherList");
if (!weather.includes('id="weatherSearch"')) errors.push("tools-weather.html: missing #weatherSearch");
if (!weather.includes("weather-contract.js")) errors.push("tools-weather.html: missing weather-contract.js");
if (!weather.includes("gallery-app-back")) errors.push("tools-weather.html: missing back chrome");

const currency = fs.readFileSync(path.join(root, "tools-currency.html"), "utf8");
if (!currency.includes('id="tool-amount"')) errors.push("tools-currency.html: missing #tool-amount");
if (!currency.includes('href="tools.html"')) errors.push("tools-currency.html: back should target tools.html");

const budget = fs.readFileSync(path.join(root, "tools-budget.html"), "utf8");
if (!budget.includes('id="budget-planner"')) errors.push("tools-budget.html: missing #budget-planner");
if (!budget.includes('id="budget-total"')) errors.push("tools-budget.html: missing #budget-total");
if (!budget.includes('id="budget-breakdown"')) errors.push("tools-budget.html: missing #budget-breakdown");

const packing = fs.readFileSync(path.join(root, "tools-packing.html"), "utf8");
if (!packing.includes('id="packing-list"')) errors.push("tools-packing.html: missing #packing-list");

const navReturn = fs.readFileSync(path.join(root, "src/js/core/nav-return.js"), "utf8");
if (!navReturn.includes("isToolsHubPath") || !navReturn.includes("isToolMiniAppPath")) {
  errors.push("nav-return: missing path-based hub/mini detection");
}

const barrel = fs.readFileSync(path.join(root, "src/css/styles.css"), "utf8");
if (!barrel.includes("@import url(\"./site.css\")")) errors.push("styles.css: missing site.css import");
if (!barrel.includes("chrome.css")) errors.push("styles.css: missing chrome.css import");

const sm = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
if (!sm.includes("traveljapan.pages.dev")) errors.push("sitemap host");
for (const page of [
  "tools-weather.html",
  "tools-currency.html",
  "tools-rail.html",
  "tools-budget.html",
]) {
  if (!sm.includes(page)) errors.push(`sitemap missing ${page}`);
}

const tokyo = fs.readFileSync(path.join(root, "cities/tokyo.html"), "utf8");
if (tokyo.includes("currency.js")) errors.push("cities/tokyo.html should not load currency.js");

const gallery = fs.readFileSync(path.join(root, "gallery.html"), "utf8");
if (!gallery.includes('id="gallery-grid"')) errors.push("gallery.html: missing #gallery-grid");
if (!gallery.includes("GALLERY_MANAGER_INSERT")) errors.push("gallery.html: missing manager insert marker");
if ((gallery.match(/class="gallery-item"/g) || []).length < 1) errors.push("gallery.html: no .gallery-item tiles");
const galJs = fs.readFileSync(path.join(root, "src/js/gallery.js"), "utf8");
if (galJs.includes("gallery-card")) errors.push("gallery.js must stay DOM-first (no .gallery-card rebuild)");
if (!galJs.includes("gallery-item")) errors.push("gallery.js: missing .gallery-item handling");
if (!galJs.includes("?photo") && !galJs.includes("get(\"photo\")")) errors.push("gallery.js: missing ?photo= deep link");

const gm = fs.readFileSync(path.join(root, "tools/gallery_manager.py"), "utf8");
if (!gm.includes("ORIGINALS_DIR")) errors.push("gallery_manager: missing ORIGINALS_DIR");
if (gm.includes("US_PLACES")) errors.push("gallery_manager: leftover US_PLACES");
if (!gm.includes("JP_PLACES")) errors.push("gallery_manager: missing JP_PLACES");
if (!gm.includes("assets/gallery/originals/")) errors.push("gallery_manager: data-full must point at originals/");

try {
  execSync("node scripts/test-weather-contract.mjs", { cwd: root, stdio: "pipe" });
} catch (e) {
  errors.push("weather-contract unit test failed");
}

const stills = [
  "dest-hiroshima.jpg",
  "dest-yokohama.jpg",
  "dest-nikko.jpg",
  "dest-kanazawa.jpg",
  "dest-sapporo.jpg",
  "dest-fukuoka.jpg",
  "dest-nagasaki.jpg",
  "dest-okinawa.jpg",
  "season-spring.jpg",
  "season-summer.jpg",
  "season-autumn.jpg",
  "season-winter.jpg",
  "food-sushi.jpg",
  "food-ramen.jpg",
  "food-street.jpg",
  "food-kaiseki.jpg",
  "food-wagyu.jpg",
  "food-sweets.jpg",
  "tip-etiquette.jpg",
  "tip-cash.jpg",
  "tip-transit.jpg",
  "tip-sim.jpg",
  "transport-shinkansen.jpg",
  "transport-ic.jpg",
  "transport-jrpass.jpg",
];
for (const s of stills) {
  const p = path.join(root, "ai-images", s);
  if (!fs.existsSync(p) || fs.statSync(p).size < 8000) {
    errors.push(`ai-images/${s} missing or too small`);
  }
}

const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
for (const s of stills) {
  if (!index.includes(`ai-images/${s}`)) errors.push(`index.html missing ai-images/${s}`);
}
if (!index.includes("privacy.html#generated-images")) {
  errors.push("index.html footer missing generated-images credit");
}
if (!index.includes("footer.generatedArt")) {
  errors.push("index.html missing footer.generatedArt");
}

for (const city of [
  "hiroshima",
  "yokohama",
  "nikko",
  "kanazawa",
  "sapporo",
  "fukuoka",
  "nagasaki",
  "okinawa",
]) {
  const html = fs.readFileSync(path.join(root, `cities/${city}.html`), "utf8");
  if (!html.includes(`ai-images/dest-${city}.jpg`)) {
    errors.push(`cities/${city}.html missing dest still`);
  }
  if (!html.includes("city-hero--with-photo")) {
    errors.push(`cities/${city}.html missing with-photo hero`);
  }
}

const realHeroes = [
  ["tokyo", "Tokyo.jpg"],
  ["kyoto", "Kyoto.jpg"],
  ["osaka", "Osaka.jpg"],
  ["nara", "Nara.jpg"],
  ["hakone", "Hakone.jpg"],
  ["kobe", "Kobe.jpg"],
];
for (const [city, file] of realHeroes) {
  const html = fs.readFileSync(path.join(root, `cities/${city}.html`), "utf8");
  if (!html.includes(`assets/gallery/main/${file}`)) {
    errors.push(`cities/${city}.html must keep real hero photo`);
  }
  if (html.includes("ai-images/")) {
    errors.push(`cities/${city}.html should not use generated stills`);
  }
}

for (const [city, file] of realHeroes) {
  const p = path.join(root, "assets/gallery/main", file);
  if (!fs.existsSync(p)) errors.push(`missing real hero ${file}`);
}

if (gallery.includes("ai-images/")) errors.push("gallery.html must not use generated stills");
if (!gallery.includes("assets/gallery/originals/")) {
  errors.push("gallery.html missing originals path");
}
const originals = [
  "artworkattheairport.jpeg",
  "birdshapedcloudchasingthesettingsun.jpeg",
  "mountfujifromairplane.jpeg",
  "viewfromtokyoskytree.jpeg",
  "welcome.jpeg",
  "welcomemessage.jpeg",
  "welcometojapan.jpeg",
];
for (const o of originals) {
  const p = path.join(root, "assets/gallery/originals", o);
  if (!fs.existsSync(p)) errors.push(`missing gallery original ${o}`);
  if (!gallery.includes(o)) errors.push(`gallery.html missing original ${o}`);
}

const legalJs = fs.readFileSync(path.join(root, "src/js/legal-i18n.js"), "utf8");
if (!legalJs.includes('id: "generated-images"')) {
  errors.push("legal-i18n: missing generated-images section id");
}
if (!/AI-generated/i.test(legalJs)) {
  errors.push("legal-i18n: missing AI-generated disclosure");
}

const i18nJs = fs.readFileSync(path.join(root, "src/js/data/i18n.js"), "utf8");
if (!i18nJs.includes("generatedArt")) errors.push("i18n missing footer.generatedArt");

if (errors.length) {
  console.error("SMOKE FAIL", errors.length);
  errors.slice(0, 40).forEach((e) => console.error(e));
  process.exit(1);
}
console.log("SMOKE OK", htmls.length, "html pages");
