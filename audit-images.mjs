/**
 * Production image audit.
 *
 * Reports, for every image the browser actually loads: the file it chose, that
 * file's real pixel width (from the network response, not from the DOM), the
 * rendered CSS box, the device pixels that box needs at this DPR, and the
 * resulting coverage. Also lists any image request that 404s.
 */
import { chromium } from "playwright";

const BASE = process.env.BASE ?? "http://localhost:4211";
const browser = await chromium.launch();

for (const [w, h, dpr] of [
  [1440, 900, 2],
  [390, 844, 3],
]) {
  const page = await browser.newPage({
    viewport: { width: w, height: h },
    deviceScaleFactor: dpr,
  });

  const failed = [];
  const sizes = new Map(); // url -> bytes
  page.on("response", async (r) => {
    if (r.request().resourceType() !== "image") return;
    if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`);
    try {
      sizes.set(r.url(), (await r.body()).length);
    } catch {}
  });
  page.on("requestfailed", (r) => {
    if (r.resourceType() === "image") failed.push(`FAILED ${r.url()}`);
  });

  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = "auto";
    for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.7) {
      scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 110));
    }
    scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);

  const rows = await page.evaluate(
    (dpr) =>
      [...document.images]
        .map((im) => {
          const r = im.getBoundingClientRect();
          const url = im.currentSrc || im.src;
          // real pixel width is encoded in the derivative filename: name-WIDTH.ext
          const m = url.match(/-(\d+)\.(webp|jpg|png)$/);
          return {
            url,
            file: url.split("/").pop(),
            filePx: m ? +m[1] : null,
            css: Math.round(r.width),
            dev: Math.round(r.width * dpr),
          };
        })
        .filter((r) => r.css > 0),
    dpr,
  );

  console.log(`\n=== ${w}px @${dpr}x ===`);
  console.log(
    "file".padEnd(26) + "filePx".padStart(7) + "cssW".padStart(7) +
    "devW".padStart(7) + "file/dev".padStart(10) + "  kB",
  );
  for (const r of rows) {
    const cov = r.filePx ? (r.filePx / r.dev).toFixed(2) : "  n/a";
    const kb = sizes.has(r.url) ? Math.round(sizes.get(r.url) / 1024) : "?";
    const flag = r.filePx && r.filePx / r.dev < 0.95 ? "  << under" : "";
    console.log(
      r.file.padEnd(26) +
        String(r.filePx ?? "-").padStart(7) +
        String(r.css).padStart(7) +
        String(r.dev).padStart(7) +
        String(cov).padStart(10) +
        `  ${kb}` +
        flag,
    );
  }
  console.log("broken image requests:", failed.length ? failed : "none");
  await page.close();
}

await browser.close();
