const RETIRED_PATHS = [
  "/giftforeveryone",
  "/giftforbabies",
  "/giftforreligions",
  "/flower-chocolate",
  "/customer-feedback",
  "/faqs",
  "/ordertracking",
];

const decodeHtmlAttribute = (value) => value
  .replaceAll("&amp;", "&")
  .replaceAll("&quot;", '"')
  .replaceAll("&#39;", "'");

export const isRetiredPath = (pathname) => {
  const normalized = pathname.replace(/\/+$/, "").toLowerCase() || "/";
  return RETIRED_PATHS.includes(normalized);
};

export const extractInternalLinks = (html, pageUrl, origin) => {
  const links = new Set();
  const hrefPattern = /<a\b[^>]*\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi;

  for (const match of html.matchAll(hrefPattern)) {
    const href = decodeHtmlAttribute(match[1] ?? match[2] ?? match[3] ?? "").trim();
    if (!href || href.startsWith("#") || /^(?:mailto|tel|javascript|data):/i.test(href)) continue;

    try {
      const url = new URL(href, pageUrl);
      if (url.origin !== origin) continue;
      url.hash = "";
      links.add(url.href);
    } catch {
      // Invalid href values cannot be crawled and are ignored here.
    }
  }

  return [...links];
};

const request = async (url, attempts = 3) => {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        redirect: "manual",
        headers: { "user-agent": "GiftUnwrap-Internal-Link-Check/1.0" },
        signal: AbortSignal.timeout(20_000),
      });
      if (response.status < 500 || attempt === attempts) return response;
    } catch (error) {
      if (attempt === attempts) throw error;
    }
  }
  throw new Error(`Unable to request ${url}`);
};

const sitemapUrls = async (origin) => {
  const response = await request(`${origin}/sitemap.xml`);
  if (!response.ok) throw new Error(`Sitemap returned HTTP ${response.status}`);
  const xml = await response.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
};

export const crawlInternalLinks = async (baseUrl, { maxPages = 500 } = {}) => {
  const origin = new URL(baseUrl).origin;
  const seeds = await sitemapUrls(origin);
  const queue = [...new Set([`${origin}/`, ...seeds])];
  const queued = new Set(queue);
  const checked = new Map();
  const sources = new Map();
  const broken = [];
  const redirects = [];
  const retiredLinks = [];

  while (queue.length && checked.size < maxPages) {
    const url = queue.shift();
    let response;
    try {
      response = await request(url);
    } catch (error) {
      broken.push({ url, status: "request-error", source: sources.get(url), detail: error.message });
      continue;
    }

    checked.set(url, response.status);
    const pathname = new URL(url).pathname;
    if (isRetiredPath(pathname)) retiredLinks.push({ url, source: sources.get(url) });

    if (response.status >= 300 && response.status < 400) {
      redirects.push({ url, status: response.status, location: response.headers.get("location"), source: sources.get(url) });
      continue;
    }
    if (!response.ok) {
      broken.push({ url, status: response.status, source: sources.get(url) });
      continue;
    }

    if (!(response.headers.get("content-type") || "").includes("text/html")) continue;
    const html = await response.text();
    for (const link of extractInternalLinks(html, url, origin)) {
      const linkUrl = new URL(link);
      if (isRetiredPath(linkUrl.pathname)) retiredLinks.push({ url: link, source: url });
      if (queued.has(link)) continue;
      queued.add(link);
      sources.set(link, url);
      queue.push(link);
    }
  }

  return { origin, checked, broken, redirects, retiredLinks, limitReached: queue.length > 0 };
};

export const verifyRetiredRoutes = async (baseUrl) => {
  const origin = new URL(baseUrl).origin;
  const results = [];
  for (const path of RETIRED_PATHS) {
    const response = await request(`${origin}${path}`);
    results.push({ path, status: response.status });
  }
  return results;
};

const run = async () => {
  const baseUrl = process.argv[2] || "https://www.giftunwrap.com";
  const result = await crawlInternalLinks(baseUrl);
  const retiredRoutes = await verifyRetiredRoutes(baseUrl);
  const badRetiredStatuses = retiredRoutes.filter(({ status }) => status !== 404);

  console.log(JSON.stringify({
    origin: result.origin,
    checked: result.checked.size,
    broken: result.broken,
    redirects: result.redirects,
    retiredLinks: result.retiredLinks,
    retiredRoutes,
    limitReached: result.limitReached,
  }, null, 2));

  if (result.broken.length || result.redirects.length || result.retiredLinks.length || badRetiredStatuses.length || result.limitReached) {
    process.exitCode = 1;
  }
};

if (import.meta.url === `file://${process.argv[1]}`) {
  run().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}

