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
  [
    "distressed-listing-check/ads-src/ad-1-clearance.html",
    "distressed-listing-check/assets/ads/ad-1-clearance.png",
  ],
  [
    "distressed-listing-check/ads-src/ad-2-unsold.html",
    "distressed-listing-check/assets/ads/ad-2-unsold.png",
  ],
  [
    "distressed-listing-check/ads-src/ad-3-plan.html",
    "distressed-listing-check/assets/ads/ad-3-plan.png",
  ],
  [
    "offset-rate-cut/ads-src/ad-1-hidden-rate-cut.html",
    "offset-rate-cut/assets/ads/ad-1-hidden-rate-cut.png",
  ],
  [
    "offset-rate-cut/ads-src/ad-2-offset-fee.html",
    "offset-rate-cut/assets/ads/ad-2-offset-fee.png",
  ],
  [
    "offset-rate-cut/ads-src/ad-3-redraw-tradeoff.html",
    "offset-rate-cut/assets/ads/ad-3-redraw-tradeoff.png",
  ],
  [
    "savings-rate-trap/ads-src/ad-1-automatic-vs-conditional.html",
    "savings-rate-trap/assets/ads/ad-1-automatic-vs-conditional.png",
  ],
  [
    "savings-rate-trap/ads-src/ad-2-base-rate-trap.html",
    "savings-rate-trap/assets/ads/ad-2-base-rate-trap.png",
  ],
  [
    "savings-rate-trap/ads-src/ad-3-conditions-check.html",
    "savings-rate-trap/assets/ads/ad-3-conditions-check.png",
  ],
  [
    "switch-break-even/ads-src/ad-1-79-not-decision.html",
    "switch-break-even/assets/ads/ad-1-79-not-decision.png",
  ],
  [
    "switch-break-even/ads-src/ad-2-break-even.html",
    "switch-break-even/assets/ads/ad-2-break-even.png",
  ],
  [
    "switch-break-even/ads-src/ad-3-refi-falling.html",
    "switch-break-even/assets/ads/ad-3-refi-falling.png",
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
