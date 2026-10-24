import { useCallback, useEffect, useRef, useState } from "react";
import { Facebook, Instagram } from "lucide-react";
import BlogArticleCard from "../components/blog/BlogArticleCard";
import LandingFooter from "../components/LandingFooter";
import LandingHeader from "../components/LandingHeader";
import { fetchBlogs } from "../config/api";
import newsletterArrow from "../assets/blog/newsletter-arrow.svg";
import newsletterAvatarOne from "../assets/blog/newsletter-avatar-1.png";
import newsletterAvatarTwo from "../assets/blog/newsletter-avatar-2.png";
import newsletterAvatarThree from "../assets/blog/newsletter-avatar-3.png";
import newsletterAvatarMore from "../assets/blog/newsletter-avatar-more.svg";
import "../styles/blog-landing.css";

const INITIAL_ARTICLE_COUNT = 6;

function NewsletterPanel() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const lastAttemptedEmail = useRef("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || normalizedEmail === lastAttemptedEmail.current) return;

    lastAttemptedEmail.current = normalizedEmail;
    setMessage("Newsletter signup is not available yet. Follow GiftUnwrap for the latest gifting ideas and updates.");
  };

  return (
    <aside className="gu-blog-newsletter" aria-labelledby="gu-blog-newsletter-title">
      <div className="gu-blog-newsletter-intro">
        <div>
          <h2 id="gu-blog-newsletter-title">Thoughtful Gifts, Fresh Ideas, and Updates</h2>
          <p>Get gifting inspiration, helpful guides, and the latest from GiftUnwrap, all in one place.</p>
        </div>
        <div className="gu-blog-newsletter-avatars" aria-hidden="true">
          <img src={newsletterAvatarOne} alt="" />
          <img src={newsletterAvatarTwo} alt="" />
          <img src={newsletterAvatarThree} alt="" />
          <img src={newsletterAvatarMore} alt="" />
        </div>
      </div>

      <form className="gu-blog-newsletter-form" onSubmit={handleSubmit}>
        <label htmlFor="gu-blog-newsletter-email">Email address</label>
        <input
          id="gu-blog-newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="Enter your email address"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (message) setMessage("");
          }}
        />
        <button type="submit">
          <span>Join the Newsletter</span>
          <img src={newsletterArrow} alt="" aria-hidden="true" />
        </button>
        {message && <p className="gu-blog-newsletter-status" role="status">{message}</p>}
      </form>

      <div className="gu-blog-newsletter-socials">
        <span>Follow us on:</span>
        <a href="https://www.instagram.com/gift_unwrap?igsh=NjQyeG5kb2gydWho&utm_source=qr" target="_blank" rel="noreferrer" aria-label="GiftUnwrap on Instagram"><Instagram aria-hidden="true" /></a>
        <a href="https://www.facebook.com/share/16PiPh8aS6/?mibextid=wwXIfr" target="_blank" rel="noreferrer" aria-label="GiftUnwrap on Facebook"><Facebook aria-hidden="true" /></a>
      </div>
    </aside>
  );
}

function BlogLoading() {
  return (
    <div className="gu-blog-loading" role="status" aria-live="polite">
      <span className="gu-blog-loading-mark" aria-hidden="true" />
      <p>Unwrapping the latest GiftUnwrap guides…</p>
    </div>
  );
}

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_ARTICLE_COUNT);

  const loadBlogs = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      const response = await fetchBlogs();
      setBlogs(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching published blogs:", error);
      setLoadError("We couldn’t load the gift guides. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);

  // The current public API returns published posts in newest-first order and
  // does not expose a featured flag, so the newest post is the documented
  // featured fallback. The remaining posts are progressively revealed below.
  const featuredBlog = blogs[0];
  const latestBlogs = blogs.slice(1);
  const visibleBlogs = latestBlogs.slice(0, visibleCount);
  const hasMore = visibleCount < latestBlogs.length;

  return (
    <div className="gu-blog-page">
      <main className="gu-blog-main">
        <section className="gu-blog-top" aria-label="Featured GiftUnwrap guide">
          <LandingHeader />
          {loading ? (
            <BlogLoading />
          ) : loadError ? (
            <div className="gu-blog-state" role="alert">
              <p>{loadError}</p>
              <button type="button" onClick={loadBlogs}>Try Again</button>
            </div>
          ) : blogs.length === 0 ? (
            <div className="gu-blog-state" role="status">
              <p>No published guides are available right now.</p>
            </div>
          ) : (
            <div className="gu-blog-top-grid">
              <BlogArticleCard blog={featuredBlog} featured eager />
              <NewsletterPanel />
            </div>
          )}
        </section>

        {!loading && !loadError && latestBlogs.length > 0 && (
          <section className="gu-blog-latest" aria-labelledby="gu-blog-latest-heading">
            <div className="gu-blog-latest-inner">
              <header className="gu-blog-latest-heading">
                <h2 id="gu-blog-latest-heading">Explore Our Latest Guides</h2>
                <p>Explore thoughtful gifting ideas, helpful tips, and inspiration for making every occasion feel special.</p>
              </header>

              <div className="gu-blog-grid">
                {visibleBlogs.map((blog) => <BlogArticleCard blog={blog} key={blog.id ?? blog._id} />)}
              </div>

              {hasMore && (
                <button
                  className="gu-blog-load-more"
                  type="button"
                  onClick={() => setVisibleCount((count) => Math.min(count + INITIAL_ARTICLE_COUNT, latestBlogs.length))}
                >
                  Load More
                </button>
              )}
            </div>
          </section>
        )}
      </main>
      <LandingFooter />
    </div>
  );
}
