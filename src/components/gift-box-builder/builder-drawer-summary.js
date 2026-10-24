import { getProductPrice, isUnavailable } from "./builder-utils.js";
import { getBuilderCardPrice, getBoxCapacity } from "./builder-card-state.js";

// A builder draft represents one completed box. Packaging never multiplies gifts.
export function getBuilderDrawerSummary(items, selectedBox, selectedCard = null) {
  const itemCount = items.reduce((sum, item) => sum + Number(item.quantity), 0);
  const giftsSubtotal = items.reduce((sum, item) => sum + getProductPrice(item) * Number(item.quantity), 0);
  const boxCost = selectedBox ? getProductPrice(selectedBox) : 0;
  const capacity = getBoxCapacity(selectedBox);
  const cardCost = selectedCard ? getBuilderCardPrice(selectedCard) : 0;
  return {
    itemCount,
    giftsSubtotal,
    boxCost,
    total: giftsSubtotal + boxCost + cardCost,
    boxQuantity: 1,
    boxConflict: Boolean(selectedBox && Number.isFinite(capacity) && itemCount > capacity),
    canContinue: items.length > 0 && !items.some((item) => isUnavailable(item, item.selectedColor)),
  };
}
