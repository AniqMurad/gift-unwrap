export const NOINDEX_ROUTE_PATHS = new Set([
  "/checkout",
  "/shoppingcart",
  "/myaccount",
  "/login",
  "/signup",
  "/forgetpassword",
  "/searchoutput",
  "/order-confirmation",
]);

export const normalizeIndexingPath = (pathname) =>
  (pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname).toLowerCase() || "/";

export const isNoindexRoute = (pathname) => NOINDEX_ROUTE_PATHS.has(normalizeIndexingPath(pathname));

export const canonicalNoindexPath = (pathname) => {
  const normalized = normalizeIndexingPath(pathname);
  return NOINDEX_ROUTE_PATHS.has(normalized) ? normalized : null;
};
