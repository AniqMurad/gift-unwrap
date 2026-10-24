import test from "node:test";
import assert from "node:assert/strict";
import { CARD_MESSAGE_LIMIT, emptyCardDetails, normalizeCardDetails, validateCardDetails, serializeCardMessage, restoreCardDetails, getBoxCapacity, getBuilderStepError, getPendingQuantityLimit, giftItemOrderPayload } from "./builder-card-state.js";
import { getBuilderDrawerSummary } from "./builder-drawer-summary.js";
import { getStockLimit, isUnavailable } from "./builder-utils.js";

const details = { blank: false, to: "Ali", from: "Sara", message: "Happy birthday!" };
const gift = { id: 17, cartKey: "17", name: "Mug", price: 500, quantity: 2, stockLimit: 10, image: "mug.png", category: "mugs" };
const box = { id: 2, name: "Medium", price: 300, capacity: "3-5 items" };
const card = { id: 3, name: "Birthday card", image: "card.png" };

test("personalized cards require all three non-whitespace fields", () => {
  assert.deepEqual(Object.keys(validateCardDetails(emptyCardDetails())), ["to", "from", "message"]);
  assert.deepEqual(Object.keys(validateCardDetails({ to: " \t", from: "\n", message: "  " })), ["to", "from", "message"]);
  assert.deepEqual(validateCardDetails(details), {});
});

test("blank cards bypass validation and never serialize stale text", () => {
  const blank = { ...details, blank: true };
  assert.deepEqual(validateCardDetails(blank), {});
  assert.equal(serializeCardMessage(blank), "");
  assert.equal(normalizeCardDetails(blank).message, details.message);
  assert.equal(serializeCardMessage({ ...blank, blank: false }), "To: Ali\nFrom: Sara\n\nHappy birthday!");
});

test("message normalization caps pasted/legacy content at 300 characters", () => {
  const saved = normalizeCardDetails({ ...details, message: "A".repeat(450), to: " Ali ", from: " Sara " });
  assert.equal(saved.message.length, CARD_MESSAGE_LIMIT);
  assert.equal(saved.to, "Ali");
  assert.equal(saved.from, "Sara");
});

test("pending edits do not mutate saved card data", () => {
  const saved = Object.freeze({ ...details });
  const draft = { ...saved, to: "Changed", blank: true };
  normalizeCardDetails(draft);
  assert.deepEqual(saved, details);
});

test("structured card details survive draft restoration, including blank toggle text", () => {
  const saved = { ...details, blank: true };
  assert.deepEqual(restoreCardDetails(JSON.parse(JSON.stringify(saved))), saved);
  assert.equal(serializeCardMessage(restoreCardDetails(saved)), "");
});

test("legacy message drafts keep their text and require names before completion", () => {
  const restored = restoreCardDetails(null, "Existing birthday message");
  assert.equal(restored.message, "Existing birthday message");
  assert.equal(restored.blank, false);
  assert.deepEqual(Object.keys(validateCardDetails(restored)), ["to", "from"]);
  assert.equal(restoreCardDetails(null, "").blank, true);
});

test("step progression requires goodies, then compatible available packaging", () => {
  assert.match(getBuilderStepError(1, [], null), /goodie/);
  assert.equal(getBuilderStepError(1, [gift], null), "");
  assert.match(getBuilderStepError(2, [gift], null), /available box/);
  assert.match(getBuilderStepError(2, [gift], { ...box, inStock: false }), /available box/);
  assert.match(getBuilderStepError(2, [{ ...gift, quantity: 6 }], box), /too small/);
  assert.equal(getBuilderStepError(2, [gift], box), "");
});

test("cards remain optional, while selected cards must have saved valid details", () => {
  assert.equal(getBuilderStepError(3, [gift], box, null), "");
  assert.match(getBuilderStepError(3, [gift], box, card), /Finish your card/);
  assert.equal(getBuilderStepError(3, [gift], box, card, details), "");
  assert.equal(getBuilderStepError(3, [gift], box, card, { ...emptyCardDetails(), blank: true }), "");
  assert.match(getBuilderStepError(3, [gift], box, { ...card, inStock: false }, details), /card is unavailable/);
});

test("capacity supports actual API range strings without inventing limits", () => {
  assert.equal(getBoxCapacity(box), 5);
  assert.equal(getBoxCapacity({ capacity: "3–8 items" }), 8);
  assert.equal(getBoxCapacity({ capacity: 4 }), 4);
  assert.equal(getBoxCapacity({ capacity: "Small" }), Infinity);
});

test("missing inventory is not accidentally treated as zero stock", () => {
  assert.equal(getStockLimit({ cartKey: "17", quantity: 2 }), 10);
  assert.equal(getStockLimit({ stock: null, inventory: "", maxQuantity: 4 }), 4);
  assert.equal(getStockLimit({ stock: 0 }), 0);
});

test("modal quantity accounts for existing selection and variant-specific availability", () => {
  const product = { id: 17, stock: 8, colorVariants: [{ color: "Red", stock: 4 }, { color: "Blue", inStock: false }] };
  assert.equal(getPendingQuantityLimit(product, [gift], null), 6);
  assert.equal(getPendingQuantityLimit(product, [{ ...gift, cartKey: "17_Red", quantity: 3 }], "Red"), 1);
  assert.equal(getPendingQuantityLimit(product, [{ ...gift, cartKey: "17_Red", quantity: 4 }], "Red"), 0);
  assert.equal(isUnavailable(product, "Blue"), true);
  assert.equal(getPendingQuantityLimit(product, [], "Blue"), 0);
});

test("drawer totals include one box and follow the API's free-card pricing rule", () => {
  assert.equal(getBuilderDrawerSummary([gift], box, card).total, 1300);
  assert.equal(getBuilderDrawerSummary([gift], box, { ...card, id: 4 }).total, 1300);
  assert.equal(getBuilderDrawerSummary([gift], { ...box, price: 700 }, card).total, 1700);
  assert.equal(getBuilderDrawerSummary([gift], box, card).itemCount, 2);
});

test("order serialization preserves IDs, quantities, images, and variant in supported fulfillment fields", () => {
  const payload = giftItemOrderPayload({ ...gift, selectedColor: "Red", image: "red.png" });
  assert.equal(payload.id, 17);
  assert.equal(payload.quantity, 2);
  assert.equal(payload.name, "Mug (Red)");
  assert.equal(payload.image, "red.png");
  assert.equal(payload.selectedColor, "Red");
  assert.equal(serializeCardMessage(details), "To: Ali\nFrom: Sara\n\nHappy birthday!");
});
