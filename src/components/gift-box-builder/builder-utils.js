export const getProductId = (product) => String(product?.builderKey ?? product?.id ?? product?._id ?? "");

export const getProductPrice = (product) => Number(product?.price) || 0;

export const getProductSearchText = (product, keys) => keys
  .flatMap((key) => {
    const value = product?.[key];
    return Array.isArray(value) ? value : [value];
  })
  .filter(Boolean)
  .join(" ")
  .toLowerCase();

export const formatPrice = (value) => `${Math.round(Number(value) || 0).toLocaleString("en-PK")} PKR`;

export const getStockLimit = (product, selectedColor) => {
  const variant = selectedColor
    ? product?.colorVariants?.find((entry) => entry.color === selectedColor)
    : null;
  const candidates = [
    product?.stockLimit,
    variant?.stock,
    variant?.quantity,
    product?.stock,
    product?.inventory,
    product?.cartKey ? null : product?.quantity,
    product?.maxQuantity,
  ];
  const explicitLimit = candidates.find((value) => value !== null && value !== undefined && value !== "" && Number.isFinite(Number(value)));
  return Math.max(0, Math.min(Number(explicitLimit ?? 10), 10));
};

export const isUnavailable = (product, selectedColor) => {
  if (product?.inStock === false || product?.available === false) return true;
  const variant = product?.colorVariants?.find((entry) => entry.color === selectedColor);
  if (variant?.inStock === false || variant?.available === false) return true;
  return getStockLimit(product, selectedColor) === 0;
};
