import axios from 'axios';
import { normalizeProductCollections } from '../lib/catalogRouting';

const API_BASE_URL = 'https://giftunwrapbackend.vercel.app/api';
// const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

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
