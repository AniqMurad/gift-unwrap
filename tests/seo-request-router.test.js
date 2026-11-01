import test from "node:test";
import assert from "node:assert/strict";
import { resolveSeoRequest } from "../src/lib/seoRequestRouter.js";

const catalogue = [{
  category: "FlowersChocolates",
  products: [{ id: "rose", name: "Anniversary Rose Promise", keyGift: "bouquets" }],
}];
const blogs = [{ id: "blog", title: "A Useful Gift Guide" }];
const loaders = {
  loadProducts: async () => catalogue,
  loadBlogs: async () => blogs,
};

test("old indexed product URL permanently redirects and preserves its query", async () => {
  const result = await resolveSeoRequest(
    new URL("https://www.giftunwrap.com/product/FlowersChocolates/anniversary-rose-promise?utm_source=google&ref=old"),
    loaders,
  );
  assert.deepEqual(result, {
    type: "redirect",
    status: 301,
    location: "/product/floralArrangements/anniversary-rose-promise?utm_source=google&ref=old",
  });
});

test("preferred product URL renders without a redirect loop", async () => {
  const result = await resolveSeoRequest(
    new URL("https://www.giftunwrap.com/product/floralArrangements/anniversary-rose-promise"),
    loaders,
  );
  assert.equal(result.status, 200);
  assert.equal(result.type, "render");
});

test("missing products, blog posts, retired pages, and unknown paths are real 404s", async () => {
  const paths = [
    "/product/floralArrangements/not-a-product",
    "/blog/not-an-article",
    "/Giftforreligions",
    "/flower-chocolate",
    "/totally-not-a-page",
  ];
  for (const path of paths) {
    const result = await resolveSeoRequest(new URL(`https://www.giftunwrap.com${path}`), loaders);
    assert.equal(result.status, 404, path);
  }
});

test("valid collection and blog routes render", async () => {
  assert.equal((await resolveSeoRequest(new URL("https://www.giftunwrap.com/floral-arrangements"), loaders)).status, 200);
  assert.equal((await resolveSeoRequest(new URL("https://www.giftunwrap.com/blog/a-useful-gift-guide"), loaders)).status, 200);
});

test("catalogue failures are temporary errors, not false product or article deletions", async () => {
  const failedLoaders = {
    loadProducts: async () => { throw new Error("backend unavailable"); },
    loadBlogs: async () => { throw new Error("backend unavailable"); },
  };
  const product = await resolveSeoRequest(
    new URL("https://www.giftunwrap.com/product/floralArrangements/anniversary-rose-promise"),
    failedLoaders,
  );
  const blog = await resolveSeoRequest(
    new URL("https://www.giftunwrap.com/blog/a-useful-gift-guide"),
    failedLoaders,
  );
  assert.equal(product.status, 503);
  assert.equal(blog.status, 503);
});
