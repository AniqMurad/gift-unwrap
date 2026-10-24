import { Suspense, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ChevronRight, Search } from "lucide-react";
import LandingHeader from "../LandingHeader";
import brandLogo from "../../assets/redesign/nav-logo.png";
import footerPerson from "../../assets/redesign/footer-falling-girl.png";
import "../../styles/storefront-migration.css";
import { MigrationContext } from "./migration-context";

// Only the remaining legacy routes opt into this presentation layer.
export default function StorefrontPage({ children, kind = "content" }) {
  return <MigrationContext.Provider value={true}><div className={`gu-migrated gu-migrated--${kind}`}><Suspense fallback={<><StorefrontHeader /><StorefrontLoading /></>}>{children}</Suspense></div></MigrationContext.Provider>;
}

export function StorefrontHeader() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [signedIn, setSignedIn] = useState(() => Boolean(localStorage.getItem("token")));
  useEffect(() => {
    const refresh = () => setSignedIn(Boolean(localStorage.getItem("token")));
    window.addEventListener("authChanged", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("authChanged", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);
  const logout = () => {
    ["token", "user", "userId"].forEach((key) => localStorage.removeItem(key));
    window.dispatchEvent(new CustomEvent("authChanged"));
    navigate("/login");
  };
  return (
    <div className="gu-migration-header">
      <div className="gu-migration-nav-space"><LandingHeader /></div>
      <div className="gu-migration-utilities">
        <form role="search" onSubmit={(event) => {
          event.preventDefault();
          if (query.trim()) navigate(`/SearchOutput?query=${encodeURIComponent(query.trim())}`);
        }}>
          <input aria-label="Search gifts" placeholder="Search gifts" value={query} onChange={(event) => setQuery(event.target.value)} />
          <button type="submit" aria-label="Search"><Search size={18} /></button>
        </form>
        <nav aria-label="Customer account">
          <Link to={signedIn ? "/myAccount" : "/login"}>{signedIn ? "My account" : "Sign in"}</Link>
          <Link to={signedIn ? "/myAccount" : "/login"} state={{ activeTab: "orders" }}>Orders</Link>
          {signedIn ? <button type="button" onClick={logout}>Sign out</button> : <Link to="/signup">Register</Link>}
        </nav>
      </div>
    </div>
  );
}

export function StorefrontTitle({ title, title2, title2Route, titleHome, compact }) {
  if (!title) return null;
  return (
    <section className={`gu-migration-title${compact ? " gu-migration-title--compact" : ""}`}>
      <nav aria-label="Breadcrumb">
        {titleHome && <><Link to="/">{titleHome}</Link><ChevronRight size={14} aria-hidden="true" /></>}
        {title2 && <>{title2Route ? <Link to={title2Route}>{title2}</Link> : <span>{title2}</span>}<ChevronRight size={14} aria-hidden="true" /></>}
        <span aria-current="page">{title}</span>
      </nav>
      <h1>{title}</h1>
    </section>
  );
}

const footerGroups = [
  ["Explore", [["Shop Gifts", "/giftforeveryone"], ["Gifts for Her", "/giftforher"], ["Gifts for Him", "/giftforhim"], ["Gifts for Babies", "/Giftforbabies"], ["Wedding Gifts", "/giftforwedding"], ["Religious Gifts", "/Giftforreligions"], ["Flowers & Chocolate", "/flower-chocolate"], ["Corporate Gifts", "/giftforcompanies"], ["Build Your Own Gift Box", "/build-gift-box"]]],
  ["A little help", [["Contact us", "/contact-us"], ["Customer reviews", "/customer-feedback"], ["FAQs", "/faqs"], ["Gift guides", "/blog"], ["My account", "/myAccount"], ["Order tracking", "/OrderTracking"]]],
  ["The details", [["Shipping Policy", "/shipping-policy"], ["Privacy Policy", "/privacy-policy"], ["Refund & Return", "/refund-return-policy"], ["Terms & Conditions", "/terms-conditions"]]],
];

export function StorefrontFooter() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  return (
    <footer className="gu-migration-footer">
      <div className="gu-migration-footer-top">
        <div className="gu-migration-footer-about">
          <img className="gu-migration-footer-person" src={footerPerson} alt="" loading="lazy" />
          <h2>A Little About Gift Unwrap</h2>
          <p>Gift Unwrap helps you turn thoughtful gestures into happy memories. Discover curated hampers, build your own gift box, and send a little love to the people you cherish in Pakistan.</p>
          <address><a href="mailto:giftunwrap@gmail.com">giftunwrap@gmail.com</a><a href="tel:+923268927354">+92 326 8927354</a><span>Shop No. 226 PIB Colony near Jail Chowrangi, Karachi</span></address>
          <p className="mt-6">High Quality Product · Customer Service · Customization on all products</p>
        </div>
        {footerGroups.map(([heading, links]) => <nav key={heading} aria-label={heading}><h2>{heading}</h2>{links.map(([label, href]) => <Link key={href} to={href}>{label}</Link>)}</nav>)}
      </div>
      <div className="gu-migration-footer-bottom">
        <form onSubmit={(event) => { event.preventDefault(); navigate("/signup", { state: { prefillEmail: email.trim() } }); }}>
          <label htmlFor="gu-migration-newsletter">A little joy in your inbox</label>
          <p className="mb-4">Sign up for our newsletter and get 10% off your first purchase.</p>
          <div><input id="gu-migration-newsletter" type="email" required placeholder="Your email address" value={email} onChange={(event) => setEmail(event.target.value)} /><button type="submit" aria-label="Sign up with this email"><ArrowRight /></button></div>
        </form>
        <div className="gu-migration-social"><a href="https://www.instagram.com/gift_unwrap?igsh=NjQyeG5kb2gydWho&utm_source=qr" target="_blank" rel="noreferrer">Instagram ↗</a><a href="https://www.facebook.com/share/16PiPh8aS6/?mibextid=wwXIfr" target="_blank" rel="noreferrer">Facebook ↗</a><a href="https://wa.me/923268927354" target="_blank" rel="noreferrer">WhatsApp ↗</a></div>
        <p>Payment: Cash on delivery<br />©{new Date().getFullYear()} GiftUnwrap. All Rights Reserved.</p>
      </div>
      <div className="gu-migration-wordmark" aria-hidden="true">GIFTUNWRAP</div>
    </footer>
  );
}

export function StorefrontLoading() {
  return <div className="gu-migration-loading" role="status" aria-live="polite"><img src={brandLogo} alt="" /><span>Unwrapping something thoughtful…</span><span className="gu-migration-loading-line" /></div>;
}
