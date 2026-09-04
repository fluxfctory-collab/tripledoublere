import { chromium } from "playwright";
const BASE = process.env.BASE ?? "http://localhost:5173";
const b = await chromium.launch();
for (const [w, dpr] of [[1440, 2], [390, 3]]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 }, deviceScaleFactor: dpr });
  await p.goto(BASE, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.evaluate(async () => {
    document.documentElement.style.scrollBehavior = "auto";
    for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.7) {
      scrollTo(0, y); await new Promise(r => setTimeout(r, 90));
    }
    scrollTo(0, 0);
  });
  await p.waitForTimeout(800);
  const rows = await p.evaluate((dpr) => [...document.images].map(im => {
    const r = im.getBoundingClientRect();
    return {
      src: (im.currentSrc || im.src).split("/").pop(),
      nat: im.naturalWidth,
      css: Math.round(r.width),
      dev: Math.round(r.width * dpr),
    };
  }).filter(r => r.css > 0), dpr);
  console.log(`\n=== ${w}px @${dpr}x ===`);
  console.log("served".padEnd(26), "natural  cssW  deviceW  nat/css  served/device");
  for (const r of rows) {
    const ratio = (r.nat / r.css).toFixed(2);
    const cover = (r.nat / r.dev).toFixed(2);
    const flag = r.nat / r.dev < 0.75 ? "  << UNDER-RESOLVED" : "";
    console.log(r.src.padEnd(26), String(r.nat).padStart(6), String(r.css).padStart(6), String(r.dev).padStart(8), ratio.padStart(8), cover.padStart(13), flag);
  }
  await p.close();
}
await b.close();
