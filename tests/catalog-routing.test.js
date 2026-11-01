import test from "node:test";
import assert from "node:assert/strict";
import {
  getCanonicalProductPath,
  normalizeProductCollections,
  resolveProductRoute,
} from "../src/lib/catalogRouting.js";

const catalogue = [
  {
    category: "FlowersChocolates",
    products: [
      { id: "rose", name: "Anniversary Rose Promise", keyGift: "bouquets" },
      { id: "cake", name: "Chocolate Kisses Forever Box", keyGift: "cakebouquets" },
      { id: "combo", name: "Sweet Blooms Celebration", keyGift: "cakebouquets" },
    ],
  },
  {
    category: "giftsForReligions",
    products: [{ id: "eid", name: "Eid Noir Bouquet" }],
  },
  {
    category: "floralArrangements",
    products: [{ id: "current", name: "Sunflower Duo" }],
  },
  { category: "sweetTreats", products: [{ id: "sweet", name: "Three Milk Cake" }] },
];

test("catalogue migration preserves products while assigning one preferred URL", () => {
  const normalized = normalizeProductCollections(catalogue);
  const floral = normalized.find((entry) => entry.category === "floralArrangements");
  const sweet = normalized.find((entry) => entry.category === "sweetTreats");

  assert.ok(floral.products.some((product) => product.id === "rose"));
  assert.ok(floral.products.some((product) => product.id === "eid"));
  assert.ok(sweet.products.some((product) => product.id === "cake"));
  assert.ok(sweet.products.some((product) => product.id === "combo"));
  assert.equal(
    getCanonicalProductPath("FlowersChocolates", catalogue[0].products[0]),
    "/product/floralArrangements/anniversary-rose-promise",
  );
});

test("legacy and canonical catalogue routes resolve to the same preferred URL", () => {
  const legacy = resolveProductRoute(catalogue, "FlowersChocolates", "anniversary-rose-promise");
  const canonical = resolveProductRoute(catalogue, "floralArrangements", "anniversary-rose-promise");

  assert.equal(legacy.canonicalPath, "/product/floralArrangements/anniversary-rose-promise");
  assert.equal(canonical.canonicalPath, legacy.canonicalPath);
  assert.equal(legacy.product.id, canonical.product.id);
});

test("similar names remain distinct catalogue products", () => {
  const distinct = [{
    category: "floralArrangements",
    products: [
      { id: 1, name: "Rose Promise" },
      { id: 2, name: "Rose Promise Deluxe" },
    ],
  }];
  const normalized = normalizeProductCollections(distinct);
  assert.equal(normalized.find((entry) => entry.category === "floralArrangements").products.length, 2);
});
