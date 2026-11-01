import { readFile } from "node:fs/promises";
import { render } from "../src/entry-server.jsx";
import { BLOG_CATALOGUE_URL, PRODUCT_CATALOGUE_URL, SITE_ORIGIN, normalizeProductCollections, resolveProductRoute } from "../src/lib/catalogRouting.js";
import { resolveSeoRequest } from "../src/lib/seoRequestRouter.js";
import { isServerPage, serializeSnapshot } from "../src/lib/serverPages.js";

export { default as StorefrontApp } from "../src/App";

const fetchCatalogue = async (url) => {
  const response = await fetch(url, { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(15000), cache: "no-store" });
  if (!response.ok) throw new Error(`Catalogue returned ${response.status}`);
  const data = await response.json();
  if (!Array.isArray(data)) throw new Error("Invalid catalogue response");
  return data;
};

export function createHandler({ fetchData = fetchCatalogue, renderPage = render, readTemplate = () => readFile(new URL("../dist/index.html", import.meta.url), "utf8") } = {}) {
return async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("Content-Type", "text/html; charset=utf-8");
  if (!["GET", "HEAD"].includes(request.method)) {
    response.setHeader("Allow", "GET, HEAD");
    return response.status(405).end();
  }
  const path = request.query?.__path;
  if (typeof path !== "string" || !path.startsWith("/") || path.startsWith("//")) return response.status(400).end("Invalid storefront path");
  const url = new URL(path, SITE_ORIGIN);
  if (url.origin !== SITE_ORIGIN || !isServerPage(url.pathname)) return response.status(404).end("Page not found");
  let productsPromise;
  let blogsPromise;
  const loadProducts = () => productsPromise ||= fetchData(PRODUCT_CATALOGUE_URL);
  const loadBlogs = () => blogsPromise ||= fetchData(BLOG_CATALOGUE_URL);
  try {
    const decision = await resolveSeoRequest(url, { loadProducts, loadBlogs });
    if (decision.type === "redirect") return response.redirect(301, decision.location);
    if (decision.type !== "render") {
      response.setHeader("X-Robots-Tag", "noindex");
      if (decision.status === 503) response.setHeader("Retry-After", "60");
      return response.status(decision.status).end(`<!doctype html><html lang="en"><head><meta name="robots" content="noindex"><title>${decision.status} | Gift Unwrap</title></head><body><main><h1>${decision.status}</h1><p>${decision.status === 404 ? "This page could not be found." : "Please try again shortly."}</p><a href="/">Return to Gift Unwrap</a></main></body></html>`);
    }
    const lower = url.pathname.toLowerCase();
    const data = { url: `${url.pathname}${url.search}` };
    await Promise.all([
      (lower === "/" || !lower.startsWith("/blog")) ? loadProducts().then((products) => { data.collections = normalizeProductCollections(products); }) : null,
      (lower === "/" || lower.startsWith("/blog")) ? loadBlogs().then((blogs) => { data.blogs = blogs; }) : null,
    ]);
    if (lower === "/greeting-cards") data.cards = await fetchData("https://giftunwrapbackend.vercel.app/api/cards");
    if (lower.startsWith("/product/")) {
      const [, , category, slug] = url.pathname.split("/");
      const resolved = resolveProductRoute(await loadProducts(), decodeURIComponent(category), decodeURIComponent(slug));
      data.product = { ...resolved.product, category: resolved.canonicalCategory };
      data.relatedProducts = (data.collections.find((group) => group.category === resolved.canonicalCategory)?.products || [])
        .filter((product) => (product.id ?? product._id) !== (data.product.id ?? data.product._id))
        .map((product) => ({ ...product, category: product.canonicalCategory || resolved.canonicalCategory }));
    }
    const template = await readTemplate();
    const page = await renderPage(data.url, data);
    const html = template.replace(/<title>[^<]*<\/title>/, "")
      .replace("</head>", `${page.head}</head>`)
      .replace('<div id="root"></div>', `<div id="root">${page.html}</div><script id="__STOREFRONT_DATA__" type="application/json">${serializeSnapshot(data)}</script>`);
    return response.status(200).end(request.method === "HEAD" ? undefined : html);
  } catch (error) {
    console.error("Storefront rendering failed", error);
    response.setHeader("Retry-After", "60");
    response.setHeader("X-Robots-Tag", "noindex");
    return response.status(503).end('<!doctype html><html lang="en"><head><meta name="robots" content="noindex"><title>Temporarily unavailable | Gift Unwrap</title></head><body><main><h1>Please try again shortly</h1><p>We could not load this page right now.</p><a href="/">Return to Gift Unwrap</a></main></body></html>');
  }
};
}

export default createHandler();
