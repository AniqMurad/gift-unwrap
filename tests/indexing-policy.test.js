import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import proxy from "../proxy.js";
import { isNoindexRoute } from "../src/lib/indexingPolicy.js";

const utilityPaths = [
  "/checkout",
  "/shoppingcart",
  "/myaccount",
  "/login",
  "/signup",
  "/forgetpassword",
  "/searchoutput",
  "/order-confirmation",
];

test("checkout, cart, account, authentication, search, and confirmation routes are noindex", () => {
  for (const path of utilityPaths) assert.equal(isNoindexRoute(path), true, path);
  assert.equal(isNoindexRoute("/floral-arrangements"), false);
  assert.equal(isNoindexRoute("/blog"), false);
});

test("proxy exposes noindex through the HTTP response while keeping public pages indexable", async () => {
  for (const path of utilityPaths) {
    const response = await proxy(new Request(`https://www.giftunwrap.com${path}`));
    assert.equal(response.headers.get("x-robots-tag"), "noindex, follow", path);
    assert.match(response.headers.get("x-middleware-rewrite") || "", /\/index\.html$/);
  }

  const publicResponse = await proxy(new Request("https://www.giftunwrap.com/contact-us"));
  assert.equal(publicResponse.headers.get("x-robots-tag"), null);
});

test("robots.txt does not block utility routes before crawlers can process noindex", async () => {
  const robots = await readFile(new URL("../public/robots.txt", import.meta.url), "utf8");
  assert.doesNotMatch(robots, /^Disallow:\s*\/(?:checkout|shoppingcart|myaccount|login|signup|forgetpassword|searchoutput|order-confirmation)\s*$/gim);
  assert.match(robots, /Sitemap: https:\/\/www\.giftunwrap\.com\/sitemap\.xml/);
});
