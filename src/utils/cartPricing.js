export const FREE_SHIPPING_THRESHOLD = 5000;
export const DEFAULT_GREETING_CARD_PRICE = 150;

export const getCartItemCardPrice = (item) => {
  if (!item?.personalization?.card) return 0;

  const configuredPrice = Number(item.personalization.card.price);
  return Number.isFinite(configuredPrice) && configuredPrice > 0
    ? configuredPrice
    : DEFAULT_GREETING_CARD_PRICE;
};

export const getCartItemUnitPrice = (item) =>
  (Number(item?.price) || 0) + getCartItemCardPrice(item);

export const getCartItemLinePrice = (item) =>
  getCartItemUnitPrice(item) * (Number(item?.quantity) || 1);
