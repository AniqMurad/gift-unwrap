import test from "node:test";
import assert from "node:assert/strict";
import { getBuilderDrawerSummary } from "./builder-drawer-summary.js";

const gift = (overrides = {}) => ({ cartKey: "gift", price: 125, quantity: 2, stockLimit: 10, ...overrides });

test("empty draft has no gift count or box charge and cannot continue", () => {
  assert.deepEqual(getBuilderDrawerSummary([], null), {
    itemCount: 0, giftsSubtotal: 0, boxCost: 0, total: 0,
    boxQuantity: 1, boxConflict: false, canContinue: false,
  });
});

test("Step 1 can continue with goodies before packaging is selected", () => {
  const result = getBuilderDrawerSummary([gift()], null);
  assert.equal(result.canContinue, true);
  assert.equal(result.itemCount, 2);
  assert.equal(result.total, 250);
  assert.equal(result.boxCost, 0);
});

test("count sums gift quantities, never packaging or distinct product rows", () => {
  const result = getBuilderDrawerSummary([gift(), gift({ cartKey: "other", quantity: 3, price: "200" })], { price: "350" });
  assert.equal(result.itemCount, 5);
  assert.equal(result.giftsSubtotal, 850);
  assert.equal(result.boxCost, 350);
  assert.equal(result.total, 1200);
  assert.equal(result.boxQuantity, 1);
});

test("quantity updates, variant removal, and box replacement recalculate from current props", () => {
  const red = gift({ cartKey: "gift_red", selectedColor: "red" });
  const blue = gift({ cartKey: "gift_blue", selectedColor: "blue", price: 150 });
  assert.equal(getBuilderDrawerSummary([red, blue], { price: 300 }).total, 850);
  assert.equal(getBuilderDrawerSummary([red, { ...blue, quantity: 3 }], { price: 300 }).total, 1000);
  assert.equal(getBuilderDrawerSummary([red], { price: 400 }).total, 650);
  assert.equal(getBuilderDrawerSummary([red], null).total, 250);
  assert.equal(getBuilderDrawerSummary([], { price: 400 }).canContinue, false);
});

test("unavailable selected goodies block both next-step actions", () => {
  for (const overrides of [{ stockLimit: 0 }, { inStock: false }, { available: false }]) {
    assert.equal(getBuilderDrawerSummary([gift(overrides)], null).canContinue, false);
  }
});

test("undersized saved packaging warns without blocking progression to Pick a Box", () => {
  const result = getBuilderDrawerSummary([gift({ quantity: 4 })], { price: 200, capacity: 3 });
  assert.equal(result.boxConflict, true);
  assert.equal(result.canContinue, true);
  assert.equal(getBuilderDrawerSummary([gift()], { price: 200, capacity: 3 }).boxConflict, false);
});

test("packaging metadata does not multiply gift quantities or totals", () => {
  const result = getBuilderDrawerSummary([gift()], { price: 300, quantity: 20 });
  assert.equal(result.total, 550);
  assert.equal(result.boxQuantity, 1);
  assert.equal(result.itemCount, 2);
});
