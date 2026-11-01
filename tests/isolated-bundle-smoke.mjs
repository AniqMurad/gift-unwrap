import assert from "node:assert/strict";
import { createHandler } from "../server-dist/handler.js";

assert.equal(process.env.NODE_PATH, undefined, "The isolated smoke test must not inherit NODE_PATH");

const product = {
  id: 901,
  name: "Anniversary Rose Promise",
  price: 1990,
  inStock: true,
  images: ["https://example.com/rose.jpg"],
  shortDescription: "Fresh roses chosen with care.",
};
const collections = [{ category: "FlowersChocolates", products: [product] }];
const handler = createHandler({
  fetchData: async (url) => url.endsWith("/products") ? collections : [],
});
const headers = {};
const response = {
  statusCode: 0,
  html: "",
  setHeader(key, value) { headers[key] = value; },
  status(code) { this.statusCode = code; return this; },
  redirect(code, location) { this.statusCode = code; headers.Location = location; },
  end(html = "") { this.html = html || ""; },
};

await handler(
  { method: "GET", query: { __path: "/product/floralArrangements/anniversary-rose-promise" } },
  response,
);

assert.equal(response.statusCode, 200);
assert.match(response.html, /<h1[^>]*>Anniversary Rose Promise<\/h1>/);
assert.match(response.html, /rel="canonical"[^>]*\/product\/floralArrangements\/anniversary-rose-promise/);
assert.match(response.html, /name="description"/);
console.log("Isolated SSR import and product request passed without node_modules");
