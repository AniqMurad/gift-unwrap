import axios from 'axios';

const API_BASE_URL = 'https://giftunwrapbackend.vercel.app/api';
// const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

const SWEET_PRODUCT_TERMS = /\b(cake|cakes|chocolate|chocolates|brownie|brownies|cookie|cookies|dessert|desserts|candy|candies|truffle|truffles|confection|confections)\b|\bsweet treats?\b/i;
const FLORAL_PRODUCT_TERMS = /\b(flower|flowers|floral|bouquet|bouquets|bloom|blooms|rose|roses|sunflower|sunflowers)\b/i;

const productSearchText = (product) => [
  product.name,
  ...(Array.isArray(product.keyGift) ? product.keyGift : [product.keyGift]),
  product.subcategory,
  product.shortDescription,
  product.longDescription,
  product.metaTitle,
  product.metaDescription,
].filter(Boolean).join(' ');

const mergeProducts = (...productLists) => {
  const merged = new Map();
  productLists.flat().forEach((product) => {
    const key = product.id != null ? `id:${product.id}` : `_id:${product._id}`;
    if (!merged.has(key)) merged.set(key, product);
  });
  return [...merged.values()];
};

const normalizeProductCollections = (collections) => {
  if (!Array.isArray(collections)) return [];

  const religious = collections.find((entry) => entry.category === 'giftsForReligions');
  const mixed = collections.find((entry) => entry.category === 'FlowersChocolates');
  if (!religious && !mixed) return collections;

  const current = collections.filter((entry) => !['giftsForReligions', 'FlowersChocolates'].includes(entry.category));
  const floral = current.find((entry) => entry.category === 'floralArrangements');
  const sweet = current.find((entry) => entry.category === 'sweetTreats');
  const mixedProducts = mixed?.products || [];
  const floralFromMixed = mixedProducts.filter((product) => {
    const text = productSearchText(product);
    return FLORAL_PRODUCT_TERMS.test(text) || !SWEET_PRODUCT_TERMS.test(text);
  });
  const sweetFromMixed = mixedProducts.filter((product) => SWEET_PRODUCT_TERMS.test(productSearchText(product)));
  const floralProducts = mergeProducts(floral?.products || [], religious?.products || [], floralFromMixed);
  const sweetProducts = mergeProducts(sweet?.products || [], sweetFromMixed);
  const normalized = current.filter((entry) => !['floralArrangements', 'sweetTreats'].includes(entry.category));

  normalized.push({ ...(floral || {}), category: 'floralArrangements', products: floralProducts });
  normalized.push({ ...(sweet || {}), category: 'sweetTreats', products: sweetProducts });
  return normalized;
};

// Blog APIs
// The public storefront must only receive published articles. The admin route
// includes drafts and is intentionally reserved for the admin application.
export const fetchBlogs = () => api.get('/blogs');
export const fetchProductCollections = () => api.get('/products').then((response) => ({
  ...response,
  data: normalizeProductCollections(response.data),
}));
export const fetchGreetingCards = () => api.get('/cards');

export default api;
