import { Link } from "react-router-dom";
import { generateSlug } from "../../utils/slugify";

function getBlogDate(blog) {
  if (blog?.createdAt) {
    const date = new Date(blog.createdAt);
    if (!Number.isNaN(date.getTime())) {
      return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(date);
    }
  }

  if (blog?.authorDate?.includes("—")) {
    return blog.authorDate.split("—").pop().trim();
  }

  return blog?.authorDate || "";
}

function getBlogExcerpt(blog) {
  return blog?.subHeading || blog?.metaDescription || "";
}

export default function BlogArticleCard({ blog, featured = false, eager = false }) {
  const href = `/blog/${generateSlug(blog.title)}`;
  const date = getBlogDate(blog);
  const excerpt = getBlogExcerpt(blog);
  const HeadingTag = featured ? "h1" : "h3";

  return (
    <article className={`gu-blog-card${featured ? " gu-blog-card--featured" : ""}`}>
      <Link className="gu-blog-card-media" to={href} aria-label={`Read ${blog.title}`}>
        {blog.mainImage ? (
          <img
            src={blog.mainImage}
            alt={blog.title}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
          />
        ) : (
          <span className="gu-blog-card-media-fallback" role="img" aria-label={`No image available for ${blog.title}`}>
            GiftUnwrap
          </span>
        )}
      </Link>

      <div className="gu-blog-card-copy">
        {(blog.category || date) && (
          <p className="gu-blog-card-meta">
            {blog.category && <span>{blog.category}</span>}
            {blog.category && date && <i aria-hidden="true" />}
            {date && <time dateTime={blog.createdAt || undefined}>{date}</time>}
          </p>
        )}
        <HeadingTag><Link to={href}>{blog.title}</Link></HeadingTag>
        {excerpt && <p className="gu-blog-card-excerpt">{excerpt}</p>}
        <Link className="gu-blog-read-more" to={href}>Read More <span aria-hidden="true">→</span></Link>
      </div>
    </article>
  );
}
