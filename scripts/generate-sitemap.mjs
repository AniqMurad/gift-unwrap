import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import {
  BLOG_CATALOGUE_URL,
  generateSlug,
  getCanonicalProductPath,
  normalizeProductCollections,
  PRODUCT_CATALOGUE_URL,
  SITE_ORIGIN,
} from "../src/lib/catalogRouting.js";

export const INDEXABLE_STATIC_PATHS = [
  "/",
  "/giftforher",
  "/giftforhim",
  "/Giftforbirthday",
  "/giftforwedding",
  "/giftforcompanies",
  "/personalized-gifts",
  "/floral-arrangements",
  "/sweet-treats",
  "/greeting-cards",
  "/build-gift-box",
  "/blog",
  "/contact-us",
  "/shipping-policy",
  "/privacy-policy",
  "/refund-return-policy",
  "/terms-conditions",
];

const NON_DETAIL_CATEGORIES = new Set(["greetingCards"]);

const fetchJson = async (url) => {
  const response = await fetch(url, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`${url} returned HTTP ${response.status}`);
  return response.json();
};

const escapeXml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&apos;");

export const buildSitemapUrls = (rawCollections, blogs) => {
  const urls = new Set(INDEXABLE_STATIC_PATHS.map((path) => `${SITE_ORIGIN}${path}`));
  const collections = normalizeProductCollections(rawCollections);

  collections.forEach((collection) => {
    if (NON_DETAIL_CATEGORIES.has(collection.category)) return;
    (collection.products || []).forEach((product) => {
      urls.add(`${SITE_ORIGIN}${getCanonicalProductPath(collection.category, product)}`);
    });
  });

  (Array.isArray(blogs) ? blogs : []).forEach((blog) => {
    const slug = generateSlug(blog?.title);
    if (slug) urls.add(`${SITE_ORIGIN}/blog/${slug}`);
  });

  return [...urls];
};

export const renderSitemap = (urls) => [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`),
  "</urlset>",
  "",
].join("\n");

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];

if (isDirectRun) {
  const [collections, blogs] = await Promise.all([
    fetchJson(PRODUCT_CATALOGUE_URL),
    fetchJson(BLOG_CATALOGUE_URL),
  ]);
  const sitemapPath = fileURLToPath(new URL("../public/sitemap.xml", import.meta.url));
  const urls = buildSitemapUrls(collections, blogs);
  await writeFile(sitemapPath, renderSitemap(urls), "utf8");
  process.stdout.write(`Wrote ${urls.length} canonical URLs to ${sitemapPath}\n`);
}
