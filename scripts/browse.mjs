#!/usr/bin/env node
// Reusable headless-Chromium driver for manually verifying Storybook stories.
// Usage:
//   node scripts/browse.mjs <storyId> [--viewport=WIDTHxHEIGHT] [--click=<selector>] [--screenshot=/tmp/out.png]
//   node scripts/browse.mjs --url=<full-url> ...
//
// Examples:
//   node scripts/browse.mjs demos-app-layout--default --screenshot=/tmp/out.png
//   node scripts/browse.mjs demos-app-layout--mobile-viewport --click=".ul-navbar__sidebar_toggle" --screenshot=/tmp/open.png
//   node scripts/browse.mjs components-navigation-navbar--default --html=".ul-navbar__logo"
//
// Requires: Storybook dev server already running (npm run storybook), default http://localhost:6006.

import { chromium } from 'playwright';

const args = process.argv.slice(2);
const positional = args.filter((a) => !a.startsWith('--'));
const flags = Object.fromEntries(
  args
    .filter((a) => a.startsWith('--'))
    .map((a) => {
      const [k, ...rest] = a.slice(2).split('=');
      return [k, rest.join('=') || true];
    })
);

const storyId = positional[0];
const baseUrl = flags.url ?? (storyId
  ? `http://localhost:6006/iframe.html?id=${storyId}&viewMode=story`
  : null);

if (!baseUrl) {
  console.error('Usage: node scripts/browse.mjs <storyId> [--screenshot=path] [--click=selector] [--html=selector]');
  process.exit(1);
}

const [width, height] = (flags.viewport ?? '1280x800').split('x').map(Number);

const browser = await chromium.launch({ args: ['--no-sandbox'] });
const page = await (await browser.newContext({ viewport: { width, height } })).newPage();

const consoleErrors = [];
page.on('console', (msg) => {
  if (msg.type() === 'error') consoleErrors.push(msg.text());
});
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto(baseUrl, { waitUntil: 'networkidle' });
await page.waitForTimeout(500);

if (flags.click) {
  await page.locator(flags.click).first().click();
  await page.waitForTimeout(400);
}

if (flags.html) {
  const html = await page.locator(flags.html).first().evaluate((el) => el.innerHTML);
  console.log(`--- innerHTML of "${flags.html}" ---`);
  console.log(html);
}

if (flags.screenshot) {
  await page.screenshot({ path: flags.screenshot });
  console.log('screenshot saved:', flags.screenshot);
}

if (consoleErrors.length) {
  console.log('console errors:', JSON.stringify(consoleErrors, null, 2));
}

await browser.close();
