import { getProductId, getStockLimit, isUnavailable } from "./builder-utils.js";

export const CARD_MESSAGE_LIMIT = 300;
export const emptyCardDetails = () => ({ blank: false, to: "", from: "", message: "" });

export function normalizeCardDetails(details = {}) {
  return {
    blank: details.blank === true,
    to: String(details.to || "").trim(),
    from: String(details.from || "").trim(),
    message: String(details.message || "").slice(0, CARD_MESSAGE_LIMIT).trim(),
  };
}

export function validateCardDetails(details) {
  if (details.blank) return {};
  return Object.fromEntries([['to', 'Enter the recipient’s name.'], ['from', 'Enter your name.'], ['message', 'Write a message or choose Leave Card Blank.']]
    .filter(([key]) => !String(details[key] || "").trim()));
}

// The deployed order API accepts a single cardMessage string, not extra fields.
// To/From travel in that supported field and are visible to fulfillment.
export function serializeCardMessage(details) {
  const saved = normalizeCardDetails(details);
  if (saved.blank) return "";
  return [`To: ${saved.to}`, `From: ${saved.from}`, "", saved.message].join("\n");
}

export function restoreCardDetails(saved, legacyMessage = "") {
  if (saved && typeof saved === "object") return normalizeCardDetails(saved);
  // Old drafts had only message text; preserve it and ask for names on edit.
  return { ...emptyCardDetails(), blank: !legacyMessage, message: String(legacyMessage).slice(0, CARD_MESSAGE_LIMIT) };
}

// Card has no price field in the current API; gift-box orders include it free.
// Keep all builder/checkout displays consistent with that server pricing rule.
export const getBuilderCardPrice = () => 0;

export const BOX_SIZE_ORDER = ["small", "medium", "large"];

export function getBoxSizeVariants(box) {
  if (Array.isArray(box?.sizeVariants) && box.sizeVariants.length) {
    return BOX_SIZE_ORDER.flatMap(size => {
      const variant = box.sizeVariants.find(entry => String(entry?.size || "").toLowerCase() === size);
      const price = Number(variant?.price);
      const capacity = Number(variant?.capacity);
      return variant && Number.isFinite(price) && price >= 0 && Number.isFinite(capacity) && capacity > 0
        ? [{ size, price, capacity }]
        : [];
    });
  }

  if (!box) return [];
  const legacySize = BOX_SIZE_ORDER.find(size => String(box.size || "").toLowerCase().includes(size)) || "small";
  return [{ size: legacySize, price: Number(box.price) || 0, capacity: box.capacity }];
}

export function applyBoxSizeVariant(box, requestedSize) {
  if (!box) return null;
  const variants = getBoxSizeVariants(box);
  const variant = variants.find(entry => entry.size === String(requestedSize || "").toLowerCase()) || variants[0];
  if (!variant) return box;
  return {
    ...box,
    selectedSize: variant.size,
    size: variant.size.replace(/^./, character => character.toUpperCase()),
    capacity: variant.capacity,
    price: variant.price,
  };
}

export function getBoxCapacity(box) {
  const value = String(box?.capacity ?? "").trim();
  const match = value.match(/^(\d+)(?:\s*[-–]\s*(\d+))?(?:\s*items?)?$/i);
  return match ? Number(match[2] || match[1]) : Infinity;
}

export function getBuilderStepError(step, items, box, card = null, details = emptyCardDetails()) {
  if (!items.length) return "Choose at least one goodie to continue.";
  if (items.some(item => isUnavailable(item, item.selectedColor) || item.quantity < 1 || item.quantity > getStockLimit(item, item.selectedColor))) return "Remove unavailable goodies or update their quantities to continue.";
  if (step < 2) return "";
  if (!box || isUnavailable(box, box.selectedColor)) return "Choose an available box to continue.";
  if (items.reduce((sum, item) => sum + Number(item.quantity), 0) > getBoxCapacity(box)) return "Your selected box is too small. Choose a larger box in step 2.";
  if (step >= 3 && card) {
    if (isUnavailable(card, card.selectedColor)) return "Your selected card is unavailable. Choose another design or continue without a card.";
    if (Object.keys(validateCardDetails(details)).length) return "Finish your card message or choose Leave Card Blank before completing your box.";
  }
  return "";
}

export function getPendingQuantityLimit(product, items, color) {
  const key = `${getProductId(product)}${color ? `_${color}` : ""}`;
  const existing = items.find(item => item.cartKey === key)?.quantity || 0;
  return isUnavailable(product, color) ? 0 : Math.max(0, getStockLimit(product, color) - existing);
}

export function giftItemOrderPayload(item) {
  return {
    id: item.id ?? item._id,
    // selectedColor is not persisted by the current Order schema. Preserve the
    // fulfillment choice in its supported name and image fields as well.
    name: item.selectedColor ? `${item.name} (${item.selectedColor})` : item.name,
    quantity: item.quantity,
    price: Number(item.price) || 0,
    image: item.image,
    category: item.category,
    selectedColor: item.selectedColor || null,
  };
}
