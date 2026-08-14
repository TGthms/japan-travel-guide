/**
 * Unit test of the shipped weather contract (Open-Meteo only).
 * Loads src/js/weather-contract.js — the same file pages load.
 */
import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

const contractSrc = fs.readFileSync(path.join(root, "src/js/weather-contract.js"), "utf8");
const sandbox = { window: {}, globalThis: {} };
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
vm.runInContext(contractSrc, sandbox);
const C = sandbox.JTG && sandbox.JTG.WeatherContract;
if (!C) errors.push("WeatherContract missing after loading shipped weather-contract.js");
else {
  if (C.provider !== "open-meteo") errors.push("provider is " + C.provider);
  if (C.isLikelyUs({ country: "United States", lat: 40, lon: -74 }) !== false) {
    errors.push("isLikelyUs must always be false on the Japan build");
  }
  if (C.shouldFetchNwsAlerts() !== false) errors.push("shouldFetchNwsAlerts must be false");
  if (!String(C.attribution).includes("Open-Meteo")) errors.push("attribution missing Open-Meteo");
  if (/NWS|National Weather Service/i.test(String(C.attribution))) {
    errors.push("attribution still mentions NWS");
  }
  if (!String(C.forecastBase).includes("open-meteo.com")) errors.push("forecastBase not Open-Meteo");
}

const html = fs.readFileSync(path.join(root, "tools-weather.html"), "utf8");
if (!html.includes('id="weatherList"')) errors.push("tools-weather.html missing #weatherList");
if (!html.includes('id="weatherSearch"')) errors.push("tools-weather.html missing #weatherSearch");
if (!html.includes("weather-contract.js")) errors.push("tools-weather.html must load weather-contract.js");
if (/NWS|National Weather Service/i.test(html)) errors.push("tools-weather.html user copy mentions NWS");
if (!html.includes("Open-Meteo")) errors.push("tools-weather.html missing Open-Meteo");

const wx = fs.readFileSync(path.join(root, "src/js/weather.js"), "utf8");
if (!/return \[\];/.test(wx) || !wx.includes("async function loadNwsAlerts")) {
  errors.push("loadNwsAlerts must short-circuit to []");
}

if (errors.length) {
  console.error("WEATHER CONTRACT FAIL");
  errors.forEach((e) => console.error(" -", e));
  process.exit(1);
}
console.log("WEATHER CONTRACT OK", C.provider);
