import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await p.goto("http://localhost:4203", { waitUntil: "networkidle" });
await p.evaluate(() => document.fonts.ready);
await p.evaluate(async () => {
  document.documentElement.style.scrollBehavior = "auto";
  for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.7) {
    scrollTo(0, y); await new Promise(r => setTimeout(r, 90));
  }
  scrollTo(0, 0);
});
await p.waitForTimeout(800);
const g = await p.evaluate(() => {
  const out = {};
  for (const sel of [".hero", ".intro", ".expertise", ".portfolio", ".approach", ".about", ".closing", ".foot"]) {
    const el = document.querySelector(sel);
    out[sel.slice(1)] = { top: Math.round(el.offsetTop), h: Math.round(el.offsetHeight) };
  }
  out.total = document.documentElement.scrollHeight;
  return out;
});
console.log(JSON.stringify(g, null, 1));
await b.close();
