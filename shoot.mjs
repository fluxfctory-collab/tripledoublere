/**
 * Visual QA harness.
 *   node shoot.mjs            → full-page screenshots at every target width
 *   node shoot.mjs --frames   → only the three presentation frames
 * Also reports document scrollWidth vs viewport (horizontal-overflow check).
 */
import { chromium, devices } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE ?? "http://localhost:4173";
const OUT = "screenshots";
mkdirSync(OUT, { recursive: true });

const framesOnly = process.argv.includes("--frames");
const all = [
  { w: 1440, h: 900, name: "desktop-1440", dsf: 2 },
  { w: 1024, h: 800, name: "wide-1024", dsf: 1 },
  { w: 834, h: 1112, name: "tablet-834", dsf: 2 },
  { w: 768, h: 1024, name: "tablet-768", dsf: 1 },
  { w: 430, h: 932, name: "mobile-430", dsf: 2 },
  { w: 390, h: 844, name: "mobile-390", dsf: 3 },
  { w: 375, h: 812, name: "mobile-375", dsf: 1 },
  { w: 320, h: 720, name: "mobile-320", dsf: 1 },
];
const targets = framesOnly
  ? all.filter((t) => ["desktop-1440", "tablet-834", "mobile-390"].includes(t.name))
  : all;

const browser = await chromium.launch();
const report = [];

for (const t of targets) {
  const ctx = await browser.newContext({
    viewport: { width: t.w, height: t.h },
    deviceScaleFactor: t.dsf,
    userAgent: devices["Desktop Chrome"].userAgent,
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  // trip every reveal, then return to the top for a clean full-page capture
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = "auto"; // defeat smooth scroll
    const step = window.innerHeight * 0.7;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 200));
    document.documentElement.style.scrollBehavior = "";
  });
  await page.waitForTimeout(1100);

  const m = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    inner: window.innerWidth,
    height: document.body.scrollHeight,
    offenders: [...document.querySelectorAll("body *")]
      .filter((el) => el.getBoundingClientRect().right > window.innerWidth + 1)
      .slice(0, 6)
      .map((el) => `${el.tagName}.${el.className || "-"}`),
  }));

  await page.screenshot({ path: `${OUT}/${t.name}.png`, fullPage: true });
  report.push({
    name: t.name,
    overflow: m.scrollW - m.inner,
    pageHeight: m.height,
    offenders: m.offenders,
    errors,
  });
  await ctx.close();
}

await browser.close();
for (const r of report) {
  console.log(
    `${r.name.padEnd(14)} overflow:${String(r.overflow).padStart(4)}  h:${String(
      r.pageHeight,
    ).padStart(6)}  ${r.offenders.length ? "OFFENDERS " + r.offenders.join(", ") : ""}${
      r.errors.length ? "  ERRORS " + r.errors.join(" | ") : ""
    }`,
  );
}
