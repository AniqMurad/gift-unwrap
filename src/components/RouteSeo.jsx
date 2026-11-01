import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { routeSeoMetadata } from "../config/seoMetadata";
import socialImage from "../assets/redesign/hero-gift-box.png";
import { SITE_ORIGIN } from "../lib/catalogRouting";

export default function RouteSeo() {
  const { pathname } = useLocation();
  const metadata = routeSeoMetadata[pathname.toLowerCase()];

  if (!metadata) return null;

  const canonicalPath = metadata.canonicalPath || (pathname === "/" ? "/" : pathname);
  const canonicalUrl = `${SITE_ORIGIN}${canonicalPath}`;

  return (
    <Helmet>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`${SITE_ORIGIN}${socialImage}`} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
}

