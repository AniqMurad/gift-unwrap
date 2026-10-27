import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowLeft, Menu, Search, X } from "lucide-react";
import { createPortal } from "react-dom";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import useScrollAwareNavigation from "../hooks/useScrollAwareNavigation";
import brandLogo from "../assets/redesign/nav-logo.png";
import floatingLogoBowFill from "../assets/redesign/nav-logo-floating-group-2.svg";
import floatingLogoBowOutline from "../assets/redesign/nav-logo-floating-group-3.svg";
import floatingLogoUnwrap from "../assets/redesign/nav-logo-floating-unwrap.svg";
import floatingLogoFrameFill from "../assets/redesign/nav-logo-floating-vector-2.svg";
import floatingLogoFrameOutline from "../assets/redesign/nav-logo-floating-vector-3.svg";
import floatingLogoBackdrop from "../assets/redesign/nav-logo-floating-vector-7.svg";
import caretDown from "../assets/redesign/caret-down.svg";
import cartIcon from "../assets/redesign/cart.svg";
import { CloseIcon } from "./icons";
import CartoonButton from "./ui/cartoon-button";
import { getCartItemCardPrice, getCartItemLinePrice } from "../utils/cartPricing";

const recipientMenus = {
  him: {
    heading: "Gifts for Him",
    route: "/giftforhim",
    viewLabel: "View Gifts for Him",
    children: [
      ["Father", "father"],
      ["Brother", "brother"],
      ["Boyfriend", "boyfriend"],
      ["Son", "son"],
      ["Husband", "husband"],
      ["Friend", "friend"],
    ],
  },
  her: {
    heading: "Gifts for Her",
    route: "/giftforher",
    viewLabel: "View Gifts for Her",
    children: [
      ["Mother", "mum"],
      ["Sister", "sister"],
      ["Girlfriend", "girlfriend"],
      ["Daughter", "daughter"],
      ["Wife", "wife"],
      ["Friend", "friend"],
    ],
  },
};

const shopGiftItems = [
  { label: "Gifts for Him", submenu: "him" },
  { label: "Gifts for Her", submenu: "her" },
  { label: "Birthday Gifts", route: "/Giftforbirthday" },
  { label: "Personalized Gifts", route: "/personalized-gifts" },
  { label: "Greeting Cards", route: "/greeting-cards" },
];

const navItems = [
  { label: "Floral Arrangements", route: "/floral-arrangements" },
  { label: "Sweet Treats", route: "/sweet-treats" },
  { label: "Greeting Cards", route: "/greeting-cards" },
  { label: "Build Your Own Gift Box", route: "/build-gift-box" },
];

const mobileLinks = [
  { label: "Gifts for Him", route: "/giftforhim" },
  { label: "Gifts for Her", route: "/giftforher" },
  { label: "Birthday Gifts", route: "/Giftforbirthday" },
  { label: "Personalized Gifts", route: "/personalized-gifts" },
  { label: "Greeting Cards", route: "/greeting-cards" },
  ...navItems.slice(0, 2),
  navItems[3],
];

const BrandMark = () => {
  return (
    <Link
      className="gu-brand-mark"
      aria-label="Gift Unwrap home"
      to="/"
    >
      <img className="gu-brand-mark-image gu-brand-mark-image--default" src={brandLogo} alt="Gift Unwrap" />
      <span className="gu-brand-mark-floating" aria-hidden="true">
        <span className="gu-brand-mark-floating-canvas">
          <img className="gu-brand-mark-layer gu-brand-mark-layer--backdrop" src={floatingLogoBackdrop} alt="" />
          <img className="gu-brand-mark-layer gu-brand-mark-layer--bow-outline" src={floatingLogoBowOutline} alt="" />
          <span className="gu-brand-mark-floating-gift">Gift</span>
          <img className="gu-brand-mark-layer gu-brand-mark-layer--unwrap" src={floatingLogoUnwrap} alt="" />
          <img className="gu-brand-mark-layer gu-brand-mark-layer--frame-outline" src={floatingLogoFrameOutline} alt="" />
          <img className="gu-brand-mark-layer gu-brand-mark-layer--frame-fill" src={floatingLogoFrameFill} alt="" />
          <img className="gu-brand-mark-layer gu-brand-mark-layer--bow-fill" src={floatingLogoBowFill} alt="" />
        </span>
      </span>
    </Link>
  );
};

const LandingHeader = ({ variant = "default" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, removeFromCart, getTotalCartAmount, getTotalCartItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openNavigationMenu, setOpenNavigationMenu] = useState("");
  const [shopMenuLevel, setShopMenuLevel] = useState("root");
  const [shopMenuDirection, setShopMenuDirection] = useState("forward");
  const [shopMenuHeight, setShopMenuHeight] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartPosition, setCartPosition] = useState(null);
  const [hasKeyboardFocus, setHasKeyboardFocus] = useState(false);
  const keyboardInputRef = useRef(false);
  const headerRef = useRef(null);
  const shopTriggerRef = useRef(null);
  const shopMenuPanelRef = useRef(null);
  const shopMenuContentRef = useRef(null);
  const shopMenuFirstItemRef = useRef(null);
  const shopMenuBackRef = useRef(null);
  const pendingShopMenuFocusRef = useRef("");
  const cartButtonRef = useRef(null);
  const cartPanelRef = useRef(null);
  const previousCartCount = useRef(getTotalCartItems());
  const interactionLocked = isCartOpen || isMobileMenuOpen || Boolean(openNavigationMenu) || hasKeyboardFocus;
  const navigationState = useScrollAwareNavigation({
    interactionLocked,
    routeKey: location.pathname,
  });
  const isFloating = navigationState !== "initial";
  const isHidden = navigationState === "hidden";

  useEffect(() => {
    const handleKeyboardInput = (event) => {
      if (event.key === "Tab") keyboardInputRef.current = true;
    };
    const handlePointerInput = () => {
      keyboardInputRef.current = false;
      setHasKeyboardFocus(false);
    };

    document.addEventListener("keydown", handleKeyboardInput, true);
    document.addEventListener("pointerdown", handlePointerInput, true);
    return () => {
      document.removeEventListener("keydown", handleKeyboardInput, true);
      document.removeEventListener("pointerdown", handlePointerInput, true);
    };
  }, []);

  const closeCart = useCallback(() => {
    setIsCartOpen(false);
    requestAnimationFrame(() => cartButtonRef.current?.focus({ preventScroll: true }));
  }, []);

  const closeNavigationMenu = useCallback((restoreFocus = false) => {
    setOpenNavigationMenu("");
    setShopMenuLevel("root");
    setShopMenuDirection("forward");
    setShopMenuHeight(null);
    pendingShopMenuFocusRef.current = "";
    if (restoreFocus) {
      requestAnimationFrame(() => shopTriggerRef.current?.focus({ preventScroll: true }));
    }
  }, []);

  const openShopMenu = () => {
    setIsCartOpen(false);
    setIsMobileMenuOpen(false);
    setShopMenuLevel("root");
    setShopMenuDirection("forward");
    pendingShopMenuFocusRef.current = "first";
    setOpenNavigationMenu("Shop Gifts");
  };

  const toggleShopMenu = () => {
    if (openNavigationMenu === "Shop Gifts") {
      closeNavigationMenu();
      return;
    }
    openShopMenu();
  };

  useEffect(() => {
    const currentCount = getTotalCartItems();
    if (currentCount > previousCartCount.current) {
      closeNavigationMenu();
      setIsMobileMenuOpen(false);
      setIsCartOpen(true);
    }
    previousCartCount.current = currentCount;
  }, [cartItems, closeNavigationMenu, getTotalCartItems]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key !== "Escape") return;
      if (isCartOpen) {
        closeCart();
      } else if (openNavigationMenu) {
        closeNavigationMenu(true);
      } else if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [closeCart, closeNavigationMenu, isCartOpen, isMobileMenuOpen, openNavigationMenu]);

  useEffect(() => {
    closeNavigationMenu();
    setIsMobileMenuOpen(false);
  }, [closeNavigationMenu, location.pathname, location.search]);

  useEffect(() => {
    if (!openNavigationMenu) return undefined;

    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const currentPaddingRight = Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${currentPaddingRight + scrollbarWidth}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [openNavigationMenu]);

  useEffect(() => {
    const closeDesktopMenuOnMobile = () => {
      if (window.innerWidth <= 1180) closeNavigationMenu();
    };
    window.addEventListener("resize", closeDesktopMenuOnMobile);
    return () => window.removeEventListener("resize", closeDesktopMenuOnMobile);
  }, [closeNavigationMenu]);

  useLayoutEffect(() => {
    if (!openNavigationMenu || !shopMenuContentRef.current) return undefined;

    const measure = () => {
      const contentHeight = shopMenuContentRef.current?.offsetHeight || 0;
      setShopMenuHeight(contentHeight + 56);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(shopMenuContentRef.current);
    return () => observer.disconnect();
  }, [openNavigationMenu, shopMenuLevel]);

  useEffect(() => {
    if (!openNavigationMenu || !pendingShopMenuFocusRef.current) return;
    const focusTarget = pendingShopMenuFocusRef.current === "back"
      ? shopMenuBackRef.current
      : shopMenuFirstItemRef.current;
    pendingShopMenuFocusRef.current = "";
    requestAnimationFrame(() => focusTarget?.focus({ preventScroll: true }));
  }, [openNavigationMenu, shopMenuLevel]);

  useLayoutEffect(() => {
    if (!isCartOpen) {
      setCartPosition(null);
      return undefined;
    }

    const updatePosition = () => {
      const trigger = cartButtonRef.current;
      if (!trigger) return;
      const triggerRect = trigger.getBoundingClientRect();
      const isMobile = window.innerWidth <= 640;
      const edge = isMobile ? 16 : 24;
      const gap = 8;
      const width = Math.min(480, window.innerWidth - (edge * 2));
      const left = Math.max(edge, Math.min(triggerRect.right - width, window.innerWidth - edge - width));
      const top = triggerRect.bottom + gap;
      const maxHeight = Math.max(180, window.innerHeight - top - edge);
      const next = { left, top, width, maxHeight };
      setCartPosition((current) => current
        && current.left === next.left
        && current.top === next.top
        && current.width === next.width
        && current.maxHeight === next.maxHeight
        ? current
        : next);
    };

    const frame = requestAnimationFrame(updatePosition);
    const resizeObserver = new ResizeObserver(updatePosition);
    resizeObserver.observe(document.body);
    const mutationObserver = new MutationObserver(updatePosition);
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [cartItems.length, isCartOpen]);

  useEffect(() => {
    if (isCartOpen && cartPosition) cartPanelRef.current?.focus({ preventScroll: true });
  }, [cartPosition, isCartOpen]);

  const goTo = (route) => {
    setIsMobileMenuOpen(false);
    closeNavigationMenu();
    navigate(route);
  };

  const openRecipientMenu = (submenu) => {
    setShopMenuDirection("forward");
    pendingShopMenuFocusRef.current = "back";
    setShopMenuLevel(submenu);
  };

  const returnToShopMenu = () => {
    setShopMenuDirection("back");
    pendingShopMenuFocusRef.current = "first";
    setShopMenuLevel("root");
  };

  const handleSearch = () => {
    const query = searchTerm.trim();
    if (!query) return;
    setIsMobileMenuOpen(false);
    navigate(`/SearchOutput?query=${encodeURIComponent(query)}`);
  };

  const shopSubmenu = recipientMenus[shopMenuLevel];

  return (
    <>
    {openNavigationMenu && createPortal(
      <button
        className="gu-nav-backdrop"
        type="button"
        aria-label="Close navigation menu"
        onClick={() => closeNavigationMenu(true)}
      />,
      document.body,
    )}
    <header
      ref={headerRef}
      aria-hidden={isHidden || undefined}
      className={`gu-landing-header gu-landing-header--${variant}${isFloating ? " gu-landing-header--floating" : ""}${isHidden ? " gu-landing-header--floating-hidden" : isFloating ? " gu-landing-header--floating-visible" : ""}${openNavigationMenu ? " gu-landing-header--menu-open" : ""}`}
      inert={isHidden || undefined}
      onFocusCapture={() => {
        if (keyboardInputRef.current) setHasKeyboardFocus(true);
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHasKeyboardFocus(false);
      }}
    >
      <BrandMark />
      <div className="gu-desktop-navigation" aria-label="Main navigation">
        <div className="gu-audience-switcher" aria-label="Shopping type">
          <Link className={location.pathname === "/giftforcompanies" ? "" : "is-active"} to="/personalized-gifts" onClick={() => closeNavigationMenu()}>Personalized</Link>
          <Link className={location.pathname === "/giftforcompanies" ? "is-active" : ""} to="/giftforcompanies" onClick={() => closeNavigationMenu()}>Corporate</Link>
        </div>
        <nav className="gu-nav-links">
          <div className="gu-nav-item gu-nav-item--shop">
            <button
              ref={shopTriggerRef}
              className={openNavigationMenu === "Shop Gifts" ? "is-menu-active" : ""}
              type="button"
              aria-controls="gu-shop-gifts-menu"
              aria-expanded={openNavigationMenu === "Shop Gifts"}
              aria-haspopup="menu"
              onClick={toggleShopMenu}
            >
              <span>Shop Gifts</span>
              <img className="gu-nav-trigger-caret" src={caretDown} alt="" aria-hidden="true" />
            </button>
            {openNavigationMenu === "Shop Gifts" && (
              <div
                ref={shopMenuPanelRef}
                id="gu-shop-gifts-menu"
                className="gu-nav-dropdown"
                role="menu"
                aria-label={shopSubmenu?.heading || "Shop Gifts"}
                style={shopMenuHeight ? { height: `${shopMenuHeight}px` } : undefined}
              >
                <div
                  ref={shopMenuContentRef}
                  key={shopMenuLevel}
                  className={`gu-nav-menu-content gu-nav-menu-content--${shopMenuDirection}`}
                >
                  {shopMenuLevel === "root" ? shopGiftItems.map((item, index) => (
                    item.submenu ? (
                      <button
                        ref={index === 0 ? shopMenuFirstItemRef : undefined}
                        className="gu-nav-menu-row"
                        type="button"
                        role="menuitem"
                        key={item.label}
                        onClick={() => openRecipientMenu(item.submenu)}
                      >
                        <span>{item.label}</span>
                        <img src={caretDown} alt="" aria-hidden="true" />
                      </button>
                    ) : (
                      <Link
                        ref={index === 0 ? shopMenuFirstItemRef : undefined}
                        className="gu-nav-menu-row"
                        role="menuitem"
                        to={item.route}
                        key={item.label}
                        onClick={() => closeNavigationMenu()}
                      >
                        <span>{item.label}</span>
                      </Link>
                    )
                  )) : (
                    <>
                      <button
                        ref={shopMenuBackRef}
                        className="gu-nav-menu-back"
                        type="button"
                        role="menuitem"
                        aria-label="Back to Shop Gifts"
                        onClick={returnToShopMenu}
                      >
                        <ArrowLeft aria-hidden="true" />
                        <span>Back</span>
                      </button>
                      <p className="gu-nav-menu-heading">{shopSubmenu.heading}</p>
                      <Link className="gu-nav-menu-view-all" role="menuitem" to={shopSubmenu.route} onClick={() => closeNavigationMenu()}>
                        {shopSubmenu.viewLabel}
                      </Link>
                      {shopSubmenu.children.map(([label, profile]) => (
                        <Link
                          className="gu-nav-menu-row"
                          role="menuitem"
                          to={`${shopSubmenu.route}?profile=${profile}`}
                          key={profile}
                          onClick={() => closeNavigationMenu()}
                        >
                          <span>{label}</span>
                        </Link>
                      ))}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
          {navItems.map((item) => (
            <Link
              className={location.pathname === item.route ? "is-current" : ""}
              key={item.label}
              to={item.route}
              onClick={() => closeNavigationMenu()}
            >
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="gu-header-actions">
        <button ref={cartButtonRef} className="gu-round-action gu-cart-action" type="button" aria-label={`Shopping cart with ${getTotalCartItems()} items`} aria-expanded={isCartOpen} aria-haspopup="dialog" onClick={() => {
          if (isCartOpen) closeCart();
          else {
            closeNavigationMenu();
            setIsMobileMenuOpen(false);
            setIsCartOpen(true);
          }
        }}>
          <img src={cartIcon} alt="" aria-hidden="true" />
          {getTotalCartItems() > 0 && <span className="gu-action-count">{getTotalCartItems()}</span>}
        </button>
        <button className="gu-mobile-menu-trigger" type="button" aria-label="Open menu" aria-expanded={isMobileMenuOpen} onClick={() => {
          closeNavigationMenu();
          setIsCartOpen(false);
          setIsMobileMenuOpen((open) => !open);
        }}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="gu-mobile-menu">
          <div className="gu-mobile-search">
            <input value={searchTerm} aria-label="Search gifts" placeholder="Search gifts" onChange={(event) => setSearchTerm(event.target.value)} onKeyDown={(event) => event.key === "Enter" && handleSearch()} />
            <button type="button" aria-label="Submit search" onClick={handleSearch}><Search size={20} /></button>
          </div>
          <button className="is-active" type="button" onClick={() => goTo("/personalized-gifts")}>Personalized</button>
          <button type="button" onClick={() => goTo("/giftforcompanies")}>Corporate</button>
          {mobileLinks.map((item) => <button key={`${item.label}-${item.route}`} type="button" onClick={() => goTo(item.route)}>{item.label}</button>)}
        </div>
      )}
      {isCartOpen && createPortal(
        <>
          <button className="gu-cart-backdrop" type="button" aria-label="Close cart" onClick={closeCart} />
          <aside ref={cartPanelRef} className="gu-cart-panel" role="dialog" aria-modal="true" aria-label="Shopping cart" tabIndex={-1} style={cartPosition || { visibility: "hidden" }}>
            <div className="gu-cart-heading">
              <h2>Shopping Cart ({getTotalCartItems()})</h2>
              <button type="button" aria-label="Close cart" onClick={closeCart}><X size={22} /></button>
            </div>
            {cartItems.length === 0 ? <p className="gu-empty-cart">Your cart is empty.</p> : (
              <div className="gu-cart-items">
                {cartItems.map((item) => (
                  <article className="gu-cart-item" key={item.cartKey || `${item.category}-${item.id}`}>
                    <img src={item.image || item.images?.[0]} alt={item.name} loading="lazy" />
                    <div>
                      <h3>{item.name}</h3>
                      <p>Qty: {item.quantity}</p>
                      {item.personalization?.card && <p className="gu-cart-personalization">Card: {item.personalization.card.name} (+PKR {getCartItemCardPrice(item)})</p>}
                    </div>
                    <strong>PKR {getCartItemLinePrice(item)}</strong>
                    <button type="button" aria-label={`Remove ${item.name} from cart`} onClick={() => removeFromCart(item.id, item.category, item.cartKey)}><CloseIcon className="h-4 w-4" /></button>
                  </article>
                ))}
              </div>
            )}
            {cartItems.length > 0 && (
              <div className="gu-cart-footer">
                <div><span>Subtotal</span><strong>PKR {getTotalCartAmount()}</strong></div>
                <CartoonButton
                  className="gu-cart-checkout"
                  color="#ff2b3a"
                  label="View Cart & Checkout"
                  onClick={() => { setIsCartOpen(false); navigate("/ShoppingCart"); }}
                />
                <button className="gu-cart-continue" type="button" onClick={closeCart}>Continue Shopping</button>
              </div>
            )}
          </aside>
        </>,
        document.body,
      )}
    </header>
    </>
  );
};

export default LandingHeader;
