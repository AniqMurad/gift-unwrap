const SWEET_PRODUCT_TERMS = /\b(sweet|sweets|cake|cakes|chocolate|chocolates|brownie|brownies|cookie|cookies|dessert|desserts|candy|candies|truffle|truffles|confection|confections)\b|\bcakebouquets?\b|\bsweet treats?\b/i;
const FLORAL_PRODUCT_TERMS = /\b(flower|flowers|floral|bouquet|bouquets|bloom|blooms|rose|roses|sunflower|sunflowers)\b/i;

export const PRODUCT_CATALOGUE_URL = "https://giftunwrapbackend.vercel.app/api/products";
export const BLOG_CATALOGUE_URL = "https://giftunwrapbackend.vercel.app/api/blogs";
export const SITE_ORIGIN = "https://www.giftunwrap.com";

export const RETIRED_PATHS = new Set([
  "/giftforeveryone",
  "/giftforbabies",
  "/giftforreligions",
  "/flower-chocolate",
  "/customer-feedback",
  "/faqs",
  "/ordertracking",
]);

export const LEGACY_CATEGORY_ALIASES = Object.freeze({
  giftsForReligions: ["floralArrangements"],
  FlowersChocolates: ["floralArrangements", "sweetTreats"],
  flowerChocolate: ["floralArrangements", "sweetTreats"],
});

const CANONICAL_PRODUCT_OVERRIDES = Object.freeze({
  "anniversary-rose-promise": "floralArrangements",
});

export const generateSlug = (text) => {
  if (!text) return "";
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const findProductBySlug = (products, slug) => {
  if (!Array.isArray(products)) return null;
  return products.find((product) => generateSlug(product?.name) === slug) || null;
};

export const findBlogBySlug = (blogs, slug) => {
  if (!Array.isArray(blogs)) return null;
  return blogs.find((blog) => generateSlug(blog?.title) === slug) || null;
};

const productSearchText = (product = {}) => [
  product.name,
  ...(Array.isArray(product.keyGift) ? product.keyGift : [product.keyGift]),
  product.subcategory,
  product.shortDescription,
  product.longDescription,
  product.metaTitle,
  product.metaDescription,
].filter(Boolean).join(" ");

const findCategory = (collections, category) => (Array.isArray(collections) ? collections : [])
  .find((entry) => entry?.category === category);

const mergeProducts = (...productLists) => {
  const merged = new Map();
  productLists.flat().forEach((product) => {
    if (!product) return;
    const key = product.id != null
      ? `id:${product.id}`
      : product._id != null
        ? `_id:${product._id}`
        : `slug:${generateSlug(product.name)}`;
    if (!merged.has(key)) merged.set(key, product);
  });
  return [...merged.values()];
};

export const getCanonicalProductCategory = (sourceCategory, product = {}) => {
  const slug = generateSlug(product?.name || product?.slug);
  if (CANONICAL_PRODUCT_OVERRIDES[slug]) return CANONICAL_PRODUCT_OVERRIDES[slug];
  if (product?.canonicalCategory) return product.canonicalCategory;
  if (sourceCategory === "giftsForReligions") return "floralArrangements";
  if (sourceCategory === "FlowersChocolates" || sourceCategory === "flowerChocolate") {
    const text = productSearchText(product);
    const isSweet = SWEET_PRODUCT_TERMS.test(text);
    const isFloral = FLORAL_PRODUCT_TERMS.test(text);
    return isSweet && !isFloral ? "sweetTreats" : "floralArrangements";
  }
  return sourceCategory;
};

const withCanonicalCategory = (product, sourceCategory) => ({
  ...product,
  canonicalCategory: getCanonicalProductCategory(sourceCategory, product),
});

export const normalizeProductCollections = (collections) => {
  if (!Array.isArray(collections)) return [];

  const religious = findCategory(collections, "giftsForReligions");
  const mixed = findCategory(collections, "FlowersChocolates")
    || findCategory(collections, "flowerChocolate");
  const current = collections
    .filter((entry) => !["giftsForReligions", "FlowersChocolates", "flowerChocolate"].includes(entry?.category))
    .map((entry) => ({
      ...entry,
      products: (entry.products || []).map((product) => withCanonicalCategory(product, entry.category)),
    }));

  const floral = findCategory(current, "floralArrangements");
  const sweet = findCategory(current, "sweetTreats");
  const religiousProducts = (religious?.products || [])
    .map((product) => withCanonicalCategory(product, "giftsForReligions"));
  const mixedProducts = (mixed?.products || [])
    .map((product) => withCanonicalCategory(product, mixed.category));
  const floralFromMixed = mixedProducts.filter((product) => {
    const text = productSearchText(product);
    return FLORAL_PRODUCT_TERMS.test(text) || !SWEET_PRODUCT_TERMS.test(text);
  });
  const sweetFromMixed = mixedProducts.filter((product) => SWEET_PRODUCT_TERMS.test(productSearchText(product)));
  const normalized = current.filter((entry) => !["floralArrangements", "sweetTreats"].includes(entry.category));

  normalized.push({
    ...(floral || {}),
    category: "floralArrangements",
    products: mergeProducts(floral?.products || [], religiousProducts, floralFromMixed),
  });
  normalized.push({
    ...(sweet || {}),
    category: "sweetTreats",
    products: mergeProducts(sweet?.products || [], sweetFromMixed),
  });
  return normalized;
};

export const getProductCategoryCandidates = (category) => LEGACY_CATEGORY_ALIASES[category] || [category];

export const getCanonicalProductPath = (category, productOrSlug) => {
  const product = typeof productOrSlug === "string" ? { slug: productOrSlug } : (productOrSlug || {});
  const slug = generateSlug(product.name || product.slug);
  const canonicalCategory = getCanonicalProductCategory(category, product);
  return `/product/${encodeURIComponent(canonicalCategory)}/${encodeURIComponent(slug)}`;
};

export const resolveProductRoute = (collections, requestedCategory, productSlug) => {
  if (!Array.isArray(collections) || !requestedCategory || !productSlug) return null;

  const legacyCategory = Object.keys(LEGACY_CATEGORY_ALIASES)
    .find((candidate) => candidate.toLowerCase() === requestedCategory.toLowerCase());
  if (legacyCategory) {
    const legacyGroup = collections.find((entry) => entry?.category === legacyCategory);
    const legacyProduct = findProductBySlug(legacyGroup?.products, productSlug);
    if (!legacyProduct) return null;
    const product = withCanonicalCategory(legacyProduct, legacyCategory);
    return {
      product,
      canonicalCategory: product.canonicalCategory,
      canonicalPath: getCanonicalProductPath(legacyCategory, product),
    };
  }

  const normalizedCollections = normalizeProductCollections(collections);
  const requestedGroup = normalizedCollections.find(
    (entry) => entry?.category?.toLowerCase() === requestedCategory.toLowerCase(),
  );
  const product = findProductBySlug(requestedGroup?.products, productSlug);
  if (!product) return null;
  const canonicalCategory = getCanonicalProductCategory(requestedGroup.category, product);
  return {
    product,
    canonicalCategory,
    canonicalPath: getCanonicalProductPath(requestedGroup.category, product),
  };
};
