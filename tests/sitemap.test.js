import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { buildSitemapUrls, renderSitemap } from "../scripts/generate-sitemap.mjs";

const collections = [
  {
    category: "FlowersChocolates",
    products: [
      { id: "rose", name: "Anniversary Rose Promise", keyGift: "bouquets" },
      { id: "cake", name: "Chocolate Kisses Forever Box", keyGift: "cakebouquets" },
    ],
  },
  { category: "greetingCards", products: [{ id: "card", name: "Sending You Love" }] },
];

test("sitemap builder emits unique canonical product and article URLs", () => {
  const urls = buildSitemapUrls(collections, [{ title: "A Useful Gift Guide" }]);
  assert.equal(urls.length, new Set(urls).size);
  assert.ok(urls.includes("https://www.giftunwrap.com/product/floralArrangements/anniversary-rose-promise"));
  assert.ok(urls.includes("https://www.giftunwrap.com/product/sweetTreats/chocolate-kisses-forever-box"));
  assert.ok(urls.includes("https://www.giftunwrap.com/blog/a-useful-gift-guide"));
  assert.ok(!urls.some((url) => url.includes("/product/FlowersChocolates/")));
  assert.ok(!urls.some((url) => url.includes("/product/greetingCards/")));
});

test("rendered sitemap does not invent last-modified values", () => {
  const xml = renderSitemap(["https://www.giftunwrap.com/"]);
  assert.match(xml, /<urlset/);
  assert.doesNotMatch(xml, /<lastmod>/);
});

test("checked-in sitemap excludes retired, missing, redirected, and duplicate URLs", async () => {
  const xml = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.equal(urls.length, new Set(urls).size);
  assert.ok(!urls.some((url) => /\/(giftforeveryone|Giftforbabies|Giftforreligions|flower-chocolate|customer-feedback|faqs|OrderTracking)(?:\/|$)/i.test(url)));
  assert.ok(!urls.some((url) => url.includes("/product/FlowersChocolates/")));
  assert.ok(!urls.some((url) => url.endsWith("/our-love-story-in-flowers")));
  assert.ok(!urls.some((url) => url.endsWith("/happy-blooms-happy-hearts")));
});
