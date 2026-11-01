export const SERVER_PAGE_PATHS = new Set([
  "/", "/blog", "/giftforher", "/giftforhim", "/giftforbirthday",
  "/giftforcompanies", "/giftforwedding", "/personalized-gifts",
  "/floral-arrangements", "/sweet-treats", "/greeting-cards",
]);

export const isServerPage = (pathname) => SERVER_PAGE_PATHS.has(pathname.toLowerCase().replace(/\/$/, "") || "/")
  || /^\/(product\/[^/]+\/[^/]+|blog\/[^/]+)\/?$/i.test(pathname);

// JSON in a script element must not allow catalogue text to close the element.
export const serializeSnapshot = (data) => JSON.stringify(data)
  .replaceAll("<", "\\u003c").replaceAll("\u2028", "\\u2028").replaceAll("\u2029", "\\u2029");
