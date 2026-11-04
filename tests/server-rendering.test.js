import test from "node:test";
import assert from "node:assert/strict";
import { createHandler } from "../server-dist/handler.js";
import { spawn } from "node:child_process";
import process from "node:process";

const product = { id: 901, name: "Anniversary Rose Promise", price: 1490, inStock: true, images: ["https://example.com/rose.jpg"], shortDescription: "Fresh roses chosen with care.", sizeOptions: [{ name: "Small", price: 1990 }, { name: "Large", price: 2990 }], showSizeOptions: true, reviews: [{ rating: 5 }] };
const personalizedProduct = {
  ...product,
  id: 905,
  name: "Friendship Photo Frame",
  price: 1590,
  requiresCustomerImages: true,
  customerImageLimit: 1,
};
const collections = [
  { category: "FlowersChocolates", products: [product] },
  { category: "giftsForHim", products: [{ ...product, id: 902, name: "Thoughtful Gift Box" }] },
  { category: "personalized", products: [personalizedProduct] },
];
const blogs = [{ id: 903, title: "A Thoughtful Gift Guide", subHeading: "Make their day personal", content: "## Choosing a gift\nChoose something they love.", mainImage: "https://example.com/guide.jpg" }];
const template = '<!doctype html><html><head><title>Generic title</title><link rel="stylesheet" href="/assets/app.css"></head><body><div id="root"></div><script type="module" src="/assets/app.js"></script></body></html>';

const structuredData = (html) => [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
  .map((match) => JSON.parse(match[1]));

const run = async (path, overrides = {}) => {
  const headers = {};
  const response = {
    setHeader(key, value) { headers[key] = value; },
    status(status) { this.statusCode = status; return this; },
    redirect(status, location) { this.statusCode = status; headers.Location = location; },
    end(html = "") { this.html = html; },
  };
  await createHandler({
    fetchData: async (url) => url.endsWith("/products") ? structuredClone(collections) : url.endsWith("/blogs") ? structuredClone(blogs) : [],
    readTemplate: async () => template,
    ...overrides,
  })({ method: "GET", query: { __path: path } }, response);
  return { ...response, headers };
};

test("product HTML contains visible catalogue content and matching canonical metadata before JavaScript", async () => {
  const page = await run("/product/floralArrangements/anniversary-rose-promise");
  assert.equal(page.statusCode, 200);
  const root = page.html.split('<script id="__STOREFRONT_DATA__"')[0];
  assert.match(root, /<h1[^>]*>Anniversary Rose Promise<\/h1>/);
  assert.match(root, /Fresh roses chosen with care/);
  assert.match(root, /1,990/);
  assert.match(root, /rel="canonical"[^>]*giftunwrap.com\/product\/floralArrangements\/anniversary-rose-promise/);
  assert.match(root, /application\/ld\+json/);
  assert.match(root, /og:title/);
  assert.match(root, /Add to cart/);
  assert.doesNotMatch(root, /Loading product details/);
  assert.equal((page.html.match(/<title/g) || []).length, 1);
  assert.equal(page.headers["Cache-Control"], "no-store");

  const [schema] = structuredData(page.html);
  assert.equal(schema["@type"], "Product");
  assert.equal(schema["@id"], "https://www.giftunwrap.com/product/floralArrangements/anniversary-rose-promise#product");
  assert.deepEqual(schema.image, ["https://example.com/rose.jpg"]);
  assert.equal(schema.offers.price, 1990);
  assert.equal(schema.offers.priceCurrency, "PKR");
  assert.equal(schema.offers.availability, "https://schema.org/InStock");
  assert.equal(schema.offers.url, "https://www.giftunwrap.com/product/floralArrangements/anniversary-rose-promise");
  assert.equal("aggregateRating" in schema, false);
});

test("homepage, collection and article initial HTML include their real content and navigation", async () => {
  const home = await run("/");
  const collection = await run("/floral-arrangements");
  const article = await run("/blog/a-thoughtful-gift-guide");
  for (const page of [home, collection, article]) assert.equal(page.statusCode, 200);
  assert.match(home.html, /Thoughtful Gift Box/);
  assert.match(home.html, /href="\/product\/giftsForHim\/thoughtful-gift-box"/);
  for (const page of [home, collection, article]) {
    const head = page.html.split("</head>")[0];
    assert.equal((head.match(/<title/g) || []).length, 1);
    assert.equal((head.match(/name="description"/g) || []).length, 1);
    assert.equal((head.match(/rel="canonical"/g) || []).length, 1);
  }
  assert.match(home.html, /href="\/blog\/a-thoughtful-gift-guide"/);
  assert.match(collection.html, /href="\/product\/floralArrangements\/anniversary-rose-promise"/);
  assert.match(article.html, /Choosing a gift/);
  assert.match(article.html, /Choose something they love/);

  const homeSchemas = structuredData(home.html);
  assert.deepEqual(homeSchemas.map((schema) => schema["@type"]), ["OnlineStore", "WebSite"]);
  const store = homeSchemas[0];
  assert.equal(store.address.streetAddress, "Shop No. 226 PIB Colony near Jail Chowrangi");
  assert.equal(store.address.addressLocality, "Karachi");
  assert.deepEqual(store.sameAs, ["https://www.instagram.com/gift_unwrap/"]);
  for (const unsupported of ["aggregateRating", "priceRange", "openingHours", "makesOffer"]) {
    assert.equal(unsupported in store, false);
  }
  assert.equal("contactOption" in store.contactPoint, false);
  assert.doesNotMatch(JSON.stringify(store), /24\/7|14-day|TollFree|nationwide shipping/i);
  assert.notEqual(store.logo, "https://www.giftunwrap.com/logo.png");
  assert.notEqual(store.image, "https://www.giftunwrap.com/hero-banner.jpg");

  const collectionSchemas = structuredData(collection.html);
  assert.equal(collectionSchemas.length, 1);
  assert.equal(collectionSchemas[0]["@type"], "CollectionPage");
  assert.equal(collectionSchemas[0].url, "https://www.giftunwrap.com/floral-arrangements");

  const articleSchemas = structuredData(article.html);
  assert.equal(articleSchemas.length, 1);
  assert.equal(articleSchemas[0]["@type"], "BlogPosting");
  assert.equal(articleSchemas[0].headline, "A Thoughtful Gift Guide");
  assert.equal(articleSchemas[0].url, "https://www.giftunwrap.com/blog/a-thoughtful-gift-guide");
});

test("personalized collection renders admin-managed products before and after hydration", async () => {
  const path = "/personalized-gifts";
  const page = await run(path);
  assert.equal(page.statusCode, 200);
  assert.match(page.html, /Friendship Photo Frame/);
  assert.doesNotMatch(page.html, />0 gifts</);

  const output = await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ["tests/hydrate-storefront.mjs"], { stdio: ["pipe", "pipe", "pipe"] });
    let log = "";
    child.stdout.on("data", (chunk) => { log += chunk; });
    child.stderr.on("data", (chunk) => { log += chunk; });
    child.on("error", reject);
    child.on("close", (code) => code === 0 ? resolve(log) : reject(new Error(log)));
    child.stdin.end(JSON.stringify({ html: page.html, path }));
  });
  assert.match(output, /Hydration.*passed/);
});

test("server snapshots are request isolated and script-safe", async () => {
  const malicious = { ...product, shortDescription: '</script><script>alert("catalogue")</script>' };
  const [first, second] = await Promise.all([
    run("/product/floralArrangements/anniversary-rose-promise", { fetchData: async () => [{ category: "FlowersChocolates", products: [malicious] }] }),
    run("/product/floralArrangements/anniversary-rose-promise"),
  ]);
  assert.equal(first.statusCode, 200);
  assert.doesNotMatch(first.html, /<script>alert/);
  assert.match(first.html, /\\u003c\/script>/);
  assert.doesNotMatch(second.html, /catalogue&quot;|alert\(/);
});

test("SSR preserves permanent redirects, missing content and temporary failure responses", async () => {
  const redirect = await run("/product/FlowersChocolates/anniversary-rose-promise?ref=old");
  assert.equal(redirect.statusCode, 301);
  assert.equal(redirect.headers.Location, "/product/floralArrangements/anniversary-rose-promise?ref=old");
  assert.equal((await run("/product/floralArrangements/missing")).statusCode, 404);
  assert.equal((await run("/blog/missing")).statusCode, 404);
  const unavailable = await run("/product/floralArrangements/anniversary-rose-promise", { fetchData: async () => { throw new Error("offline"); } });
  assert.equal(unavailable.statusCode, 503);
  assert.equal(unavailable.headers["Retry-After"], "60");
});

test("server HTML hydrates without mismatches and preserves shopping controls", async () => {
  const path = "/product/floralArrangements/anniversary-rose-promise";
  const variant = { ...product, showSizeOptions: true };
  const page = await run(path, { fetchData: async () => [{ category: "FlowersChocolates", products: [variant] }] });
  assert.equal(page.statusCode, 200);
  const output = await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ["tests/hydrate-storefront.mjs"], { stdio: ["pipe", "pipe", "pipe"] });
    let log = "";
    child.stdout.on("data", (chunk) => { log += chunk; });
    child.stderr.on("data", (chunk) => { log += chunk; });
    child.on("error", reject);
    child.on("close", (code) => code === 0 ? resolve(log) : reject(new Error(log)));
    child.stdin.end(JSON.stringify({ html: page.html, path }));
  });
  assert.match(output, /Hydration.*passed/);
});
