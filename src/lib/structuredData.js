import { SITE_ORIGIN } from "./catalogRouting";

export const STORE_ID = `${SITE_ORIGIN}/#store`;
export const WEBSITE_ID = `${SITE_ORIGIN}/#website`;

export const toAbsoluteSiteUrl = (value) => {
  if (!value) return undefined;
  try {
    return new URL(String(value), SITE_ORIGIN).href;
  } catch {
    return undefined;
  }
};

export const buildStoreStructuredData = ({ logo, image }) => ({
  "@context": "https://schema.org",
  "@type": "OnlineStore",
  "@id": STORE_ID,
  name: "Gift Unwrap",
  url: `${SITE_ORIGIN}/`,
  logo: toAbsoluteSiteUrl(logo),
  image: toAbsoluteSiteUrl(image),
  description:
    "Send thoughtful gifts to loved ones in Pakistan. Explore curated hampers or build your own gift box. Check delivery availability for their city.",
  telephone: "+92 326 8927354",
  email: "giftunwrap@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shop No. 226 PIB Colony near Jail Chowrangi",
    addressLocality: "Karachi",
    addressCountry: "PK",
  },
  sameAs: ["https://www.instagram.com/gift_unwrap/"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: "+92 326 8927354",
    email: "giftunwrap@gmail.com",
  },
});

export const buildWebsiteStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE_ORIGIN}/`,
  name: "Gift Unwrap",
  publisher: { "@id": STORE_ID },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_ORIGIN}/searchoutput?query={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});

export const buildProductStructuredData = ({
  product,
  canonicalUrl,
  images,
  price,
  unavailable,
  productSlug,
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${canonicalUrl}#product`,
  name: product.name,
  image: images.map(toAbsoluteSiteUrl).filter(Boolean),
  description: product.shortDescription || product.longDescription || product.name,
  sku: String(product.id || product._id || productSlug),
  brand: { "@type": "Brand", name: "Gift Unwrap" },
  offers: {
    "@type": "Offer",
    "@id": `${canonicalUrl}#offer`,
    priceCurrency: "PKR",
    price: Number(price),
    availability: unavailable
      ? "https://schema.org/OutOfStock"
      : "https://schema.org/InStock",
    url: canonicalUrl,
    seller: { "@id": STORE_ID },
  },
});

export const buildCollectionStructuredData = ({ name, description, url }) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${url}#collection`,
  name,
  description,
  url,
  isPartOf: { "@id": WEBSITE_ID },
  publisher: { "@id": STORE_ID },
});

const validDate = (value) => {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? undefined : date.toISOString();
};

export const buildArticleStructuredData = ({ blog, title, description, url }) => {
  const image = toAbsoluteSiteUrl(blog.mainImage);
  const datePublished = validDate(blog.createdAt);
  const dateModified = validDate(blog.updatedAt);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: blog.title,
    name: title,
    description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(image ? { image } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    publisher: { "@id": STORE_ID },
  };
};
