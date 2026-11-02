# Storefront server rendering

## Scope

The homepage, product pages, catalogue collections, blog index and published
articles use request-time React rendering. Utility pages (cart, checkout,
account and builder) retain their existing client rendering. There is no
user-agent detection and no alternate crawler-only page.

`proxy.js` sends supported paths to `api/render.js`. The function uses the
existing shared request resolver for canonical redirects and missing-content
decisions, then renders the same `App` through `StaticRouter`. Its catalogue
loads are memoized per request, never across visitors. Invalid and unavailable
catalogues must not become successful empty product pages.

The build generates `dist/` for browser assets and `server-dist/` for the
function's React bundle. Vercel packages the server bundle and HTML template
using the `includeFiles` rule. Do not put the server bundle in the public asset
directory. The function must be verified on a Vercel preview before release.

## HTML and browser takeover

The response contains visible content, product links and page metadata. React
19 metadata is moved into the document head and deduplicated. Product JSON-LD
remains in its component, with safe JSON serialization. The public catalogue
snapshot is serialized safely outside `#root`; the client hydrates from that
same snapshot instead of starting with loading skeletons or refetching it.

Snapshots are restricted to the initial document URL and discarded after SPA
navigation. Subsequent routes use the existing fetching behavior. Cart data,
authentication and customer details are never part of the server snapshot.
Cart restoration waits until the lazy route has hydrated, and persistence waits
until restoration completes, so a saved cart is not overwritten by the public
empty state. Analytics is loaded only from the client entry.

## Freshness and failures

HTML uses `Cache-Control: no-store` and upstream reads bypass caching. Each new
document request therefore uses current public catalogue data. This deliberately
trades some response latency for a simple freshness rule. Assets retain their
existing hashed immutable caching. Edge HTML caching should only be introduced
with a documented revalidation/invalidation strategy and measurements.

Upstream reads have a 15-second timeout; rendering has a 10-second timeout and
the Vercel function has a 30-second limit. Required homepage requests run in
parallel. Upstream or rendering failures return a noncached 503 with Retry-After,
not a false 404. Real missing products/articles retain 404, and aliases retain
301 with query preservation.

## Validation

1. Run `npm ci`, `npm test`, and `npm run build`.
2. Inspect raw preview responses for `/`, `/floral-arrangements`, a canonical
   product, and `/blog/best-eid-gift-ideas`. Verify visible content occurs before
   the snapshot script and metadata occurs inside `head`.
3. Check 301 aliases, genuine 404s, utility routes and emitted static assets.
4. In a real browser, check hydration errors, existing-cart restoration, size
   and colour changes, greeting-card messages, add-to-cart and checkout navigation,
   collection filters, article navigation and mobile layout.
5. Repeat essential HTTP and browser checks on production after release.

Automated tests cover representative initial HTML, metadata uniqueness,
script escaping, request isolation, routing/error behavior, and simulated DOM
hydration with cart restoration, size pricing, cards and add-to-cart. These do
not replace Vercel packaging and real-browser preview checks.

This change does not approve or revise existing business schema claims, policy
copy, or retired links within backend articles. Those are separate audit tasks.
