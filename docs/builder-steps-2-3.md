# Revised builder Steps 2 and 3

## Implementation

- `src/pages/BuildGiftBox.jsx`: connects the revised steps, pending editors, committed greeting details, local draft restoration, quantity validation, checkout summary and duplicate-click submission guards.
- `src/components/gift-box-builder/BuilderCatalogueStep.jsx`, `BuilderHero.jsx`, `BuilderStepTwo.jsx`, `BuilderStepThree.jsx`: shared four-column box/card catalogue and progress navigation. At 1920 CSS pixels, the 1720px content area yields 400px square panels with 40px horizontal gaps. Unsupported catalogue filters are omitted.
- `BuilderModal.jsx`, `BuilderProductModal.jsx`, `BuilderMessageModal.jsx`: existing Radix primitives, pending product quantity and variant selection, required To/From/message validation, blank cards, 300-character limit, focus restoration, scroll locking and short-screen scrolling.
- `BuilderStepOne.jsx`: product names now open the new details modal; the existing portrait grid is retained.
- `BuilderGiftDrawer.jsx`, `builder-drawer-summary.js`: selected card, saved message editing/removal and consistent totals.
- `builder-card-state.js`, `builder-utils.js`: card serialization, step/stock/capacity validation and fulfillment payload mapping. Missing stock values no longer accidentally become zero.
- `src/styles/builder-catalogue.css`, `builder-modals.css`, `builder-step-one.css`, `builder-gift-drawer.css`: scoped styles and responsive adaptations; shared global defaults are unchanged.
- `src/assets/gift-box-builder/modal-close.svg`, `step2-active-box.png`, `step3-active-card.png`, `step3-connector-one.svg`, `step3-connector-two.svg`: local Figma assets. No sample catalogue photography is used.
- `builder-card-state.test.mjs`: 13 additional logic tests, alongside the 7 existing drawer tests.

## Existing backend contract

- Cards have no price field in the current Card schema. The gift-box order controller charges for goodies and packaging, not cards. The UI therefore retains the existing free-card rule instead of displaying sample Figma prices.
- The API persists one `cardMessage` string, not separate recipient/sender/blank fields. Personalized cards serialize `To`, `From` and message into this supported field. A blank card keeps `selectedCard` and sends an empty message. The controller omits that empty string when storing the order. Structured editor details remain in the local draft; they are not claimed as separate server fields.
- The current order controller does not store `selectedColor`. Goodie IDs and the existing selectedColor payload remain intact; the chosen variant is also recorded in the supported item name and image fields so fulfillment can identify it.
- Boxes do not expose selectable variants in the current catalogue schema. Their actual design, size, image and price are preserved.
- Complete Box continues to the existing Step 4 shipping/order flow, not the unrelated standard storefront cart. No new cart or order API was introduced.
- Synchronous client guards prevent repeated Add/Save/Complete clicks and concurrent order requests. The backend has no idempotency-key contract, so exactly-once server processing following an ambiguous network failure is not guaranteed by this frontend change.

## Checks and limits

Production Vite build, targeted ESLint and all 20 builder logic tests pass. The project has no dedicated type-check script; the build compiles the JSX/TSX dependency graph but is not a full TypeScript type check.

Read-only catalogue requests return arrays with 3 goodies, 1 box and 1 card at implementation time. Empty grid positions are intentional; records are not duplicated. The fresh local server serves the updated builder modules.

No order was submitted, and no browser or screenshot review, deployment, or push was performed.
