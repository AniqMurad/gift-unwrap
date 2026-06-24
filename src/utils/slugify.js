// Utility to create URL-friendly slugs from product names
export const generateSlug = (text) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

// Utility to find a product by slug
export const findProductBySlug = (products, slug) => {
  if (!products || !Array.isArray(products)) return null;
  return products.find((product) => generateSlug(product.name) === slug);
};

// Utility to find a blog post by slug
export const findBlogBySlug = (blogs, slug) => {
  if (!blogs || !Array.isArray(blogs)) return null;
  return blogs.find((blog) => generateSlug(blog.title) === slug);
};
