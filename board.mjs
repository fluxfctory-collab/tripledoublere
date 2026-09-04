/** Renders board.html (served from the repo root) to screenshots/submission-board.png. */
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
  if (p === "/") p = "/board.html";
  // /img/* lives under public/ in the source tree
  const file = p.startsWith("/img/")
    ? path.join(root, "public", p)
    : path.join(root, p);
  if (!fs.existsSync(file)) {
    res.writeHead(404).end("nope");
    return;
  }
  res.writeHead(200, { "content-type": types[path.extname(file)] ?? "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});

await new Promise((r) => server.listen(4321, r));

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 3060, height: 2000 },
  deviceScaleFactor: 1,
});
await page.goto("http://localhost:4321/board.html", { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(600);
await page.screenshot({ path: "screenshots/submission-board.png", fullPage: true });
const h = await page.evaluate(() => document.body.scrollHeight);
console.log("board", 3060, "x", h);
await browser.close();
server.close();
