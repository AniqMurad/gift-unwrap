# gift-unwrap — Frontend (CLAUDE.md)

Customer-facing storefront. React 19 + Vite 6 + React Router 7 + Tailwind CSS v4. Package name: `giftunwrap`.

If you're reading this from the outer `Gift-unwrap/` folder: the actual project (this file, `package.json`, `src/`) lives one level deeper at `gift-unwrap/` — a clone-inside-a-folder artifact, not intentional structure.

## Folder structure
- `src/pages/` — one component per route (`Home.jsx`, `Login.jsx`, `ShoppingCart.jsx`, `Checkout.jsx`, category pages like `Giftsforher.jsx`, policy pages, etc.) — 24+ files.
- `src/components/` — shared/feature components (`Navbar.jsx`, `Footer.jsx`, `ProductPage.jsx`, `ProductDetail.jsx`, form fields like `PasswordField.jsx`, etc.).
- `src/components/ui/` — lowercase-named shadcn/Radix primitives (`button.jsx`, `dialog.jsx`, `dropdown-menu.jsx`, `accordion.jsx`, `carousel.jsx`, `input.jsx`, `skeleton.jsx`), generated per `components.json` (style: "new-york", icon library: lucide).
- `src/context/` — `CartContext.jsx`, `WishlistContext.jsx` — global state.
- `src/config/api.js` — the only centralized API client (axios instance), currently just blog endpoints.
- `src/lib/utils.js` — `cn()` helper (clsx + tailwind-merge).
- `src/utils/slugify.js` — URL slug generation / product lookup helpers.
- Path alias `@/*` → `./src/*` (configured in `jsconfig.json` and `components.json`).

## Component naming
- Pages and shared components: PascalCase `.jsx` (`Home.jsx`, `ProductDetail.jsx`).
- `ui/` primitives only: lowercase `.jsx` (`button.jsx`), matching shadcn convention.
- No dedicated `hooks/` folder — the only custom hooks (`useCart`, `useWishlist`) are exported directly from their context files.

## State management
Context API only (no Redux/Zustand/Recoil).
- `CartContext` — cart persisted to `localStorage` (`cartItems` key); exposes `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`, `getTotalCartAmount`, `getTotalCartItems`. Items are matched by `id` **and** `category` together, not `id` alone.
- `WishlistContext` — session-only (no persistence); `toggleWishlist(product, category)` keys items as `` `${category}-${product.id}` ``.
- Provider order in `App.jsx`: `HelmetProvider` → `Router` → `WishlistProvider` → `CartProvider` → `Routes`.
- Auth state (`token`, `user`, `userId`, `username`) is read/written straight to `localStorage` from page components — there's no AuthContext.

## API call patterns
No single API layer — three different patterns coexist:
- `src/config/api.js` exports a few named functions (`fetchBlogs`, `fetchBlogById`) off a shared axios instance.
- Most pages call `axios.post/get(...)` directly with the full hardcoded URL (`https://giftunwrapbackend.vercel.app/api/...`) — see `Login.jsx`, `ForgetPassword.jsx`, `OrderHistory.jsx`.
- `SearchOutput.jsx` uses raw `fetch(...)` instead of axios.

Base URL is hardcoded in two places (`src/config/api.js` and inline per-call) — `https://giftunwrapbackend.vercel.app/api`, with a commented-out `http://localhost:5000/api` fallback. There's no env var for this yet. When adding new API calls, prefer extending `src/config/api.js` rather than another inline `axios.post(fullUrl, ...)`.

## Cloudinary
This frontend has **no Cloudinary integration** — zero references to `cloudinary` anywhere in `src/` (verified by search). It only ever renders whatever image URL the backend returns (e.g. `<img src={item.image} />`); static marketing imagery is imported from `src/assets/`. Any image-upload UI belongs in the admin portal, not here.

## Routing
React Router v7, single `<Routes>` tree in `App.jsx`, wrapped in `BrowserRouter`. Dynamic route: `/product/:category/:productSlug` → `ProductDetail`. ~30 routes total, one component per route, no nested/layout routes.

## Other notable conventions
- Analytics (`react-ga4`, `react-facebook-pixel`) initialized in `main.jsx` with hardcoded IDs; `AnalyticsTracker` in `App.jsx` logs pageviews on route change.
- `react-helmet-async` for per-page meta tags / JSON-LD schema (see `Home.jsx`).
- No `.env` files exist in this repo today — see root `CLAUDE.md` for the implications.
