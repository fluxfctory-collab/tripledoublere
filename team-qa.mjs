import { chromium } from "playwright";
const BASE = process.env.BASE ?? "http://localhost:4217";
const b = await chromium.launch();

// --- desktop: 6 cards, hover reveals, keyboard reveals -------------------
{
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  await p.goto(BASE, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.evaluate(() => document.querySelector("#about").scrollIntoView());
  await p.waitForTimeout(900);
  const cards = p.locator(".person");
  console.log("cards:", await cards.count());
  console.log("names:", await p.locator(".person__name").allInnerTexts());
  console.log("cols :", await p.evaluate(() => getComputedStyle(document.querySelector(".about__people")).gridTemplateColumns.split(" ").length));
  console.log("greyscale filter:", await p.evaluate(() => getComputedStyle(document.querySelector(".person__img")).filter));
  // hover reveal
  await cards.nth(4).locator(".person__btn").hover();
  await p.waitForTimeout(600);
  console.log("hover bio opacity:", await p.evaluate(() => getComputedStyle(document.querySelectorAll(".person__bio")[4]).opacity));
  await p.screenshot({ path: "screenshots/_team-desktop.png", clip: await p.locator(".about__people").boundingBox() });
  await p.close();
}

// --- mobile: tap toggles, aria-expanded flips ----------------------------
{
  const p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, hasTouch: true, isMobile: true });
  await p.goto(BASE, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.evaluate(() => document.querySelector("#about").scrollIntoView());
  await p.waitForTimeout(900);
  const btn = p.locator(".person__btn").nth(1);
  await btn.scrollIntoViewIfNeeded();
  console.log("mobile expanded before:", await btn.getAttribute("aria-expanded"));
  await btn.tap();
  await p.waitForTimeout(600);
  console.log("mobile expanded after :", await btn.getAttribute("aria-expanded"));
  console.log("mobile bio opacity    :", await p.evaluate(() => getComputedStyle(document.querySelectorAll(".person__bio")[1]).opacity));
  console.log("cue text              :", await p.locator(".person__cue").nth(1).innerText());
  await p.screenshot({ path: "screenshots/_team-mobile.png", clip: await p.locator(".person").nth(1).boundingBox() });
  await btn.tap();
  await p.waitForTimeout(400);
  console.log("mobile expanded closed:", await btn.getAttribute("aria-expanded"));
  await p.close();
}
await b.close();
