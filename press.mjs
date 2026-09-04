/**
 * Renders press.html into the numbered Freelancer presentation images.
 *
 * Each board is loaded on its own (press.html?board=<id> hides the others) with
 * the viewport sized exactly to it, so every capture is a straight full-document
 * screenshot — no scrolling, no stitching, no clipped boards.
 */
import { chromium } from "playwright";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const types = {
  ".html": "text/html",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
};

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p === "/") p = "/press.html";
  const file = p.startsWith("/img/") ? path.join(root, "public", p) : path.join(root, p);
  if (!fs.existsSync(file)) return res.writeHead(404).end("404 " + p);
  res.writeHead(200, { "content-type": types[path.extname(file)] ?? "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(4322, r));

const boards = [
  ["b01", "01-cover-hero", 1920, 1080],
  ["b02", "02-desktop-overview", 1920, 1200],
  ["b03", "03-expertise-portfolio", 1920, 1200],
  ["b04", "04-approach-leadership", 1920, 1200],
  ["b05", "05-responsive-design", 1920, 1200],
];

const browser = await chromium.launch();

for (const [id, name, w, h] of boards) {
  const page = await browser.newPage({
    viewport: { width: w, height: h },
    deviceScaleFactor: 1,
  });
  const bad = [];
  page.on("requestfailed", (r) => bad.push(r.url()));
  page.on("response", (r) => r.status() >= 400 && bad.push(`${r.status()} ${r.url()}`));

  await page.goto(`http://localhost:4322/press.html?board=${id}`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() =>
    Promise.all([...document.images].map((i) => (i.decode ? i.decode().catch(() => {}) : null))),
  );
  await page.waitForTimeout(500);

  const buf = await page.screenshot({ fullPage: true });
  fs.writeFileSync(`screenshots/${name}.png`, buf);
  const kb = Math.round(buf.length / 1024);
  console.log(`${name.padEnd(24)} ${w}x${h}   ${kb} kB` + (bad.length ? "   BAD: " + bad.join(", ") : ""));
  await page.close();
}

await browser.close();
server.close();
