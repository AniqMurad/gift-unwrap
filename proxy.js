import { rewrite } from "@vercel/functions";
import {
  BLOG_CATALOGUE_URL,
  PRODUCT_CATALOGUE_URL,
} from "./src/lib/catalogRouting.js";
import { resolveSeoRequest } from "./src/lib/seoRequestRouter.js";

const errorPage = (status, heading, message) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>${status} | Gift Unwrap</title>
<style>body{margin:0;background:#fbf4e8;color:#111;font-family:Inter,Arial,sans-serif}.page{min-height:100vh;display:grid;place-items:center;padding:24px;text-align:center}.card{max-width:620px}h1{font-family:Georgia,serif;font-size:clamp(56px,12vw,112px);margin:0;color:#ff2b3a}h2{font-size:28px;margin:8px 0 12px}p{font-size:18px;line-height:1.5}a{display:inline-block;margin-top:16px;padding:12px 22px;border-radius:999px;background:#ff2b3a;color:#fff;text-decoration:none;font-weight:600}</style>
</head><body><main class="page"><div class="card"><h1>${status}</h1><h2>${heading}</h2><p>${message}</p><a href="/">Return to Gift Unwrap</a></div></main></body></html>`;

const fetchJson = async (url) => {
  const response = await fetch(url, {
    cache: "no-store",
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`Upstream responded with ${response.status}`);
  return response.json();
};

export default async function proxy(request) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method Not Allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
  }

  const decision = await resolveSeoRequest(request.url, {
    loadProducts: () => fetchJson(PRODUCT_CATALOGUE_URL),
    loadBlogs: () => fetchJson(BLOG_CATALOGUE_URL),
  });

  if (decision.type === "render") {
    return rewrite(new URL("/index.html", request.url));
  }
  if (decision.type === "redirect") {
    return new Response(null, {
      status: 301,
      headers: {
        Location: decision.location,
        "Cache-Control": "public, max-age=0, s-maxage=3600",
      },
    });
  }
  if (decision.type === "serviceUnavailable") {
    return new Response(
      errorPage(503, "Gift Unwrap is taking a moment", `We couldn’t load the ${decision.resource} right now. Please try again shortly.`),
      {
        status: 503,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-store",
          "Retry-After": "60",
          "X-Robots-Tag": "noindex",
        },
      },
    );
  }

  return new Response(
    errorPage(404, "Something is missing", `The requested ${decision.resource} could not be found.`),
    {
      status: 404,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=0, s-maxage=60",
        "X-Robots-Tag": "noindex",
      },
    },
  );
}
