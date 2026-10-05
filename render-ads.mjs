import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(fileURLToPath(import.meta.url));
const ads = [
  ["ads-src/ad-1-inflation-4pc.html", "assets/ads/ad-1-inflation-4pc.png"],
  ["ads-src/ad-2-grocery-bill.html", "assets/ads/ad-2-grocery-bill.png"],
  ["ads-src/ad-3-prices-up.html", "assets/ads/ad-3-prices-up.png"],
  [
    "negative-equity-check/ads-src/ad-1-five-percent-deposit.html",
    "negative-equity-check/assets/ads/ad-1-five-percent-deposit.png",
  ],
  [
    "negative-equity-check/ads-src/ad-2-bought-at-peak.html",
    "negative-equity-check/assets/ads/ad-2-bought-at-peak.png",
  ],
  [
    "negative-equity-check/ads-src/ad-3-lvr-shift.html",
    "negative-equity-check/assets/ads/ad-3-lvr-shift.png",
  ],
];

await mkdir(path.join(root, "assets/ads"), { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1080 }, deviceScaleFactor: 1 });

for (const [source, target] of ads) {
  await mkdir(path.dirname(path.join(root, target)), { recursive: true });
  await page.goto(`file://${path.join(root, source)}`, { waitUntil: "networkidle" });
  await page.screenshot({
    path: path.join(root, target),
    type: "png",
    fullPage: false,
    clip: { x: 0, y: 0, width: 1080, height: 1080 },
  });
  console.log(`Rendered ${target}`);
}

await browser.close();
