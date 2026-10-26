export const getKeyGiftValues = (value) => {
  const values = Array.isArray(value) ? value : value ? [value] : [];
  return values
    .flatMap((item) => String(item).split(","))
    .map((item) => item.trim())
    .filter(Boolean);
};

export const hasKeyGift = (value, selectedValue) =>
  getKeyGiftValues(value).some(
    (item) => item.toLocaleLowerCase() === String(selectedValue).trim().toLocaleLowerCase(),
  );

export const keyGiftSearchText = (value) => getKeyGiftValues(value).join(" ");
