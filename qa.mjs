/** Interaction, accessibility and reduced-motion checks. */
import { chromium } from "playwright";
const BASE = process.env.BASE ?? "http://localhost:4210";
const b = await chromium.launch();
const errs = [];

// --- mobile menu: open, focus trap, Escape, focus restore -----------------
{
  const p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  p.on("pageerror", (e) => errs.push("mobile: " + e));
  p.on("console", (m) => m.type() === "error" && errs.push("mobile console: " + m.text()));
  await p.goto(BASE, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.getByRole("button", { name: /open menu/i }).click();
  await p.waitForTimeout(700);
  console.log("menu opens:          ", await p.locator("#mobile-menu").isVisible());
  console.log("body scroll locked:  ", await p.evaluate(() => getComputedStyle(document.body).overflow === "hidden"));
  await p.screenshot({ path: "screenshots/_qa-menu.png" });
  await p.keyboard.press("Escape");
  await p.waitForTimeout(300);
  console.log("Escape closes:       ", !(await p.locator("#mobile-menu").isVisible()));
  console.log("focus restored:      ", await p.evaluate(() => document.activeElement?.className) === "hdr__burger");
  // in-page anchors resolve
  const bad = await p.evaluate(() =>
    [...document.querySelectorAll('a[href^="#"]')]
      .map((a) => a.getAttribute("href"))
      .filter((h) => h !== "#" && !document.querySelector(h)),
  );
  console.log("broken anchors:      ", bad.length ? bad : "none");
  await p.close();
}

// --- reduced motion: nothing hidden --------------------------------------
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const p = await ctx.newPage();
  await p.goto(BASE, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(500);
  const hidden = await p.evaluate(() =>
    [...document.querySelectorAll(".reveal")].filter((e) => +getComputedStyle(e).opacity < 0.99).length,
  );
  console.log("reveals hidden (rm): ", hidden, hidden === 0 ? "(all visible)" : "<< PROBLEM");
  await p.screenshot({ path: "screenshots/_qa-reduced-motion.png" });
  await ctx.close();
}

// --- keyboard focus ring visible on the header CTA -----------------------
{
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  await p.goto(BASE, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  for (let i = 0; i < 3; i++) await p.keyboard.press("Tab");
  const f = await p.evaluate(() => {
    const a = document.activeElement;
    return { tag: a.tagName, text: a.textContent.trim().slice(0, 32), outline: getComputedStyle(a).outlineColor };
  });
  console.log("3rd tab stop:        ", JSON.stringify(f));
  await p.screenshot({ path: "screenshots/_qa-focus.png", clip: { x: 0, y: 0, width: 1440, height: 200 } });
  await p.close();
}

console.log("console/page errors: ", errs.length ? errs : "none");
await b.close();
