import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { routeSeoMetadata } from "../config/seoMetadata";
import socialImage from "../assets/redesign/hero-gift-box.png";
import { SITE_ORIGIN } from "../lib/catalogRouting";
import { isNoindexRoute } from "../lib/indexingPolicy";

export default function RouteSeo() {
  const { pathname } = useLocation();
  const metadata = routeSeoMetadata[pathname.toLowerCase()];
  const noindex = isNoindexRoute(pathname);

  if (!metadata && !noindex) return null;

  const canonicalPath = metadata?.canonicalPath || (pathname === "/" ? "/" : pathname);
  const canonicalUrl = `${SITE_ORIGIN}${canonicalPath}`;

  return (
    <Helmet>
      {noindex ? <meta name="robots" content="noindex, follow" /> : null}
      {metadata ? <title>{metadata.title}</title> : null}
      {metadata ? <meta name="description" content={metadata.description} /> : null}
      {metadata ? <link rel="canonical" href={canonicalUrl} /> : null}
      {metadata ? <meta property="og:url" content={canonicalUrl} /> : null}
      {metadata ? <meta property="og:title" content={metadata.title} /> : null}
      {metadata ? <meta property="og:description" content={metadata.description} /> : null}
      {metadata ? <meta property="og:type" content="website" /> : null}
      {metadata ? <meta property="og:image" content={`${SITE_ORIGIN}${socialImage}`} /> : null}
      {metadata ? <meta name="twitter:card" content="summary_large_image" /> : null}
    </Helmet>
  );
}

