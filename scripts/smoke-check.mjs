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

if (errors.length) {
  console.error("SMOKE FAIL", errors.length);
  errors.slice(0, 40).forEach((e) => console.error(e));
  process.exit(1);
}
console.log("SMOKE OK", htmls.length, "html pages");
