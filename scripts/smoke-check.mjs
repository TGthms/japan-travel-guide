/**
 * Production smoke checks (no browser). Run: node scripts/smoke-check.mjs
 */
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
function walk(dir, pred, out=[]) {
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
  const n = (t.match(/<!DOCTYPE/gi) || []).length;
  if (n !== 1) errors.push(`${f}: doctype count ${n}`);
  if (!t.includes("google-site-verification")) errors.push(`${f}: missing google verification`);
}
for (const j of walk(root + "/src/js", (p) => p.endsWith(".js"))) {
  try { execSync(`node --check "${j}"`, { stdio: "pipe" }); }
  catch (e) { errors.push(`syntax ${j}`); }
}
const must = ["tools-weather.html", "src/js/weather.js", "src/css/weather.css", "robots.txt", "sitemap.xml"];
for (const m of must) {
  if (!fs.existsSync(path.join(root, m))) errors.push(`missing ${m}`);
}
const sm = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
if (!sm.includes("traveljapan.pages.dev")) errors.push("sitemap host");
if (!sm.includes("tools-weather.html")) errors.push("sitemap weather");
if (errors.length) {
  console.error("SMOKE FAIL", errors.length);
  errors.slice(0, 30).forEach((e) => console.error(e));
  process.exit(1);
}
console.log("SMOKE OK", htmls.length, "html pages");
