import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { routeSeoMetadata } from "../config/seoMetadata";

export default function RouteSeo() {
  const { pathname } = useLocation();
  const metadata = routeSeoMetadata[pathname.toLowerCase()];

  if (!metadata) return null;

  return (
    <Helmet>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
    </Helmet>
  );
}

