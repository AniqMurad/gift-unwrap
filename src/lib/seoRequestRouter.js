import {
  findBlogBySlug,
  resolveProductRoute,
  RETIRED_PATHS,
} from "./catalogRouting.js";

export const VALID_APP_PATHS = new Set([
  "/",
  "/blog",
  "/contact-us",
  "/error",
  "/coming-soon",
  "/giftforher",
  "/giftforhim",
  "/forgetpassword",
  "/login",
  "/signup",
  "/myaccount",
  "/giftforcompanies",
  "/giftforwedding",
  "/giftforbirthday",
  "/personalized-gifts",
  "/greeting-cards",
  "/floral-arrangements",
  "/sweet-treats",
  "/checkout",
  "/shoppingcart",
  "/searchoutput",
  "/order-confirmation",
  "/shipping-policy",
  "/privacy-policy",
  "/refund-return-policy",
  "/terms-conditions",
  "/build-gift-box",
]);

const serviceUnavailable = (resource) => ({
  type: "serviceUnavailable",
  status: 503,
  resource,
});

const notFound = (resource = "page") => ({ type: "notFound", status: 404, resource });

const safeDecode = (value) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return "";
  }
};

export async function resolveSeoRequest(requestUrl, loaders) {
  const url = requestUrl instanceof URL ? requestUrl : new URL(requestUrl);
  const pathname = url.pathname;
  const normalizedPath = pathname.length > 1 && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;
  const lowerPath = normalizedPath.toLowerCase();

  if (RETIRED_PATHS.has(lowerPath)) return notFound("page");

  const productMatch = normalizedPath.match(/^\/product\/([^/]+)\/([^/]+)$/i);
  if (productMatch) {
    let collections;
    try {
      collections = await loaders.loadProducts();
    } catch {
      return serviceUnavailable("product catalogue");
    }

    const category = safeDecode(productMatch[1]);
    const slug = safeDecode(productMatch[2]);
    const resolution = resolveProductRoute(collections, category, slug);
    if (!resolution) return notFound("product");

    if (normalizedPath !== resolution.canonicalPath || pathname !== normalizedPath) {
      return {
        type: "redirect",
        status: 301,
        location: `${resolution.canonicalPath}${url.search}`,
      };
    }
    return { type: "render", status: 200, resource: "product" };
  }

  if (lowerPath.startsWith("/product/")) return notFound("product");

  const blogMatch = normalizedPath.match(/^\/blog\/([^/]+)$/i);
  if (blogMatch) {
    let blogs;
    try {
      blogs = await loaders.loadBlogs();
    } catch {
      return serviceUnavailable("blog catalogue");
    }
    const slug = safeDecode(blogMatch[1]);
    if (!findBlogBySlug(blogs, slug)) return notFound("blog article");
    if (pathname !== normalizedPath) {
      return { type: "redirect", status: 301, location: `${normalizedPath}${url.search}` };
    }
    return { type: "render", status: 200, resource: "blog article" };
  }

  if (lowerPath.startsWith("/blog/")) return notFound("blog article");
  if (VALID_APP_PATHS.has(lowerPath)) {
    if (pathname !== normalizedPath) {
      return { type: "redirect", status: 301, location: `${normalizedPath}${url.search}` };
    }
    return { type: "render", status: 200, resource: "page" };
  }

  return notFound("page");
}
