import { Suspense, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronRight, Search } from "lucide-react";
import LandingHeader from "../LandingHeader";
import LandingFooter from "../LandingFooter";
import brandLogo from "../../assets/redesign/nav-logo.png";
import "../../styles/storefront-migration.css";
import { MigrationContext } from "./migration-context";

// Only the remaining legacy routes opt into this presentation layer.
export default function StorefrontPage({ children, kind = "content" }) {
  return <MigrationContext.Provider value={true}><div className={`gu-migrated gu-migrated--${kind}`}><Suspense fallback={<><StorefrontHeader /><StorefrontLoading /></>}>{children}</Suspense></div></MigrationContext.Provider>;
}

export function StorefrontHeader({ showUtilities = true }) {
  const location = useLocation();
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
  const utilitiesVisible = showUtilities && location.pathname.toLowerCase() !== "/checkout";
  return (
    <div className="gu-migration-header">
      <div className="gu-migration-nav-space"><LandingHeader /></div>
      {utilitiesVisible && <div className="gu-migration-utilities">
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
      </div>}
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

export function StorefrontFooter({ staticMode = false }) {
  return <LandingFooter staticMode={staticMode} />;
}

export function StorefrontLoading() {
  return <div className="gu-migration-loading" role="status" aria-live="polite"><img src={brandLogo} alt="" /><span>Unwrapping something thoughtful…</span><span className="gu-migration-loading-line" /></div>;
}
