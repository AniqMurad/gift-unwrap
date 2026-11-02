import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { extractInternalLinks, isRetiredPath } from "../scripts/crawl-internal-links.mjs";

const retiredUrlPattern = /\/(?:giftforeveryone|Giftforbabies|Giftforreligions|flower-chocolate|customer-feedback|faqs|OrderTracking)(?:[/?#"'\s]|$)/i;

test("internal link extraction resolves local links and ignores external protocols", () => {
  const links = extractInternalLinks(`
    <a href="/greeting-cards?occasion=thankyou">Cards</a>
    <a href="../floral-arrangements#bouquets">Flowers</a>
    <a href="https://example.com/elsewhere">External</a>
    <a href="mailto:giftunwrap@gmail.com">Email</a>
  `, "https://www.giftunwrap.com/blog/guide", "https://www.giftunwrap.com");

  assert.deepEqual(links, [
    "https://www.giftunwrap.com/greeting-cards?occasion=thankyou",
    "https://www.giftunwrap.com/floral-arrangements",
  ]);
});

test("retired route matching is case-insensitive and exact", () => {
  assert.equal(isRetiredPath("/Giftforreligions"), true);
  assert.equal(isRetiredPath("/OrderTracking/"), true);
  assert.equal(isRetiredPath("/giftforreligions-inspired-guide"), false);
  assert.equal(isRetiredPath("/floral-arrangements"), false);
});

test("public navigation inventories do not advertise retired routes", async () => {
  const files = await Promise.all([
    readFile(new URL("../src/components/hoverSubOptions.jsx", import.meta.url), "utf8"),
    readFile(new URL("../public/llms.txt", import.meta.url), "utf8"),
  ]);

  for (const source of files) assert.doesNotMatch(source, retiredUrlPattern);
  assert.match(files[0], /\/greeting-cards\?occasion=thankyou/);
  assert.match(files[1], /\/floral-arrangements/);
  assert.match(files[1], /\/sweet-treats/);
});

