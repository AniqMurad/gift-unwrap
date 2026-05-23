import axios from 'axios';

const API_BASE_URL = 'https://giftunwrapbackend.vercel.app/api';
// const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Blog APIs
export const fetchBlogs = () => api.get('/blogs/admin/all');
export const fetchBlogById = (blogId) => api.get(`/blogs/${blogId}`);

export default api;
