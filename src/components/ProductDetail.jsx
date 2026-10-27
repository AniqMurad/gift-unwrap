import { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Gift,
  Minus,
  Plus,
  Truck,
} from "lucide-react";
import LandingHeader from "./LandingHeader";
import LandingFooter from "./LandingFooter";
import { Testimonials } from "./LandingSections";
import FAQSection from "./ui/faq1";
import CartoonButton from "./ui/cartoon-button";
import NotificationBar from "./NotificationBar";
import RequestQuoteModal from "./RequestQuoteModal";
import { useCart } from "../context/CartContext";
import { fetchGreetingCards, fetchProductCollections } from "../config/api";
import { findProductBySlug, generateSlug } from "../utils/slugify";
import { getKeyGiftValues, keyGiftSearchText } from "../utils/keyGifts";
import {
  defaultGiftPackaging,
  getProductFaqContent,
} from "../config/productPageContent";
import packagingBox from "../assets/redesign/product/packaging-box.png";
import packagingKeepsake from "../assets/redesign/product/packaging-keepsake.svg";
import packagingWrapped from "../assets/redesign/product/packaging-wrapped.svg";
import packagingReady from "../assets/redesign/product/packaging-ready.svg";
import fallbackImage from "../assets/error.png";

const packagingIcons = [packagingKeepsake, packagingWrapped, packagingReady];

const categoryNames = {
  giftsForHer: "Gifts For Her",
  giftsForHim: "Gifts For Him",
  giftsForBabies: "Gifts For Babies",
  giftsForCompany: "Gifts For Companies",
  giftsForCompanies: "Gifts For Companies",
  giftsForEveryone: "Gifts For Everyone",
  giftsForWedding: "Wedding Gifts",
  giftsForReligions: "Religious Gifts",
  giftsForBirthday: "Birthday Gifts",
  flowerChocolate: "Sweets & Bouquets",
  FlowersChocolates: "Sweets & Bouquets",
};

const categoryRoutes = {
  giftsForHer: "/giftforher",
  giftsForHim: "/giftforhim",
  giftsForCompany: "/giftforcompanies",
  giftsForCompanies: "/giftforcompanies",
  giftsForWedding: "/giftforwedding",
  giftsForBirthday: "/Giftforbirthday",
};

const formatPrice = (value) =>
  new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 }).format(Number(value) || 0);

const getProductImages = (product) => {
  if (!product) return [];
  return [...new Set([...(product.images || []), product.image].filter(Boolean))];
};

const normalizeContents = (product) => {
  const contents = product?.whatsInside || product?.contents || product?.items;
  if (!Array.isArray(contents)) return [];

  return contents
    .map((item, index) => {
      if (typeof item === "string") {
        return { id: `content-${index}`, name: item, quantity: null, description: "" };
      }
      return {
        id: item.id || item._id || `content-${index}`,
        name: item.name || item.title || item.productName || "Included item",
        quantity: item.quantity ?? item.qty ?? null,
        description: item.description || item.details || "",
      };
    })
    .filter((item) => item.name);
};

const getStockLimit = (product) => {
  const value = product?.countInStock ?? product?.stock;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.max(0, Math.floor(parsed)) : 99;
};

const isUnavailableProduct = (product) =>
  product?.available === false ||
  product?.inStock === false ||
  getStockLimit(product) === 0;

const getPackagingContent = (product) => {
  if (product?.packaging?.items?.length) return product.packaging;
  const packagingSignals = [
    product?.name,
    product?.subcategory,
    keyGiftSearchText(product?.keyGift),
    product?.shortDescription,
    product?.longDescription,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return /\b(box|hamper)\b/.test(packagingSignals) ? defaultGiftPackaging : null;
};

const ProductDetail = () => {
  const { productSlug, category } = useParams();
  const location = useLocation();
  const { addToCart } = useCart();
  const addingRef = useRef(false);

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [requestError, setRequestError] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [relatedStart, setRelatedStart] = useState(0);
  const [activeInfoTab, setActiveInfoTab] = useState("contents");
  const [quantity, setQuantity] = useState(1);
  const [cards, setCards] = useState([]);
  const [cardsStatus, setCardsStatus] = useState("loading");
  const [cardStart, setCardStart] = useState(0);
  const [cardChoice, setCardChoice] = useState("without-card");
  const [selectedCard, setSelectedCard] = useState(null);
  const [messageMode, setMessageMode] = useState("write");
  const [messageDraft, setMessageDraft] = useState({ from: "", to: "", message: "" });
  const [messageErrors, setMessageErrors] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: "success", message: "" });

  const isCorporateGift = category === "giftsForCompany" || category === "giftsForCompanies";
  const categoryName = categoryNames[category] || category || "Gifts";
  const categoryRoute = categoryRoutes[category] || "/#featured-gifts";

  useEffect(() => {
    let active = true;
    const stateProduct = location.state?.productData;
    const stateMatches = stateProduct && stateProduct.category === category;

    setStatus(stateMatches ? "ready" : "loading");
    setRequestError("");
    setProduct(stateMatches ? { ...stateProduct, category } : null);
    setRelatedProducts([]);
    setRelatedStart(0);
    setQuantity(1);
    setActiveInfoTab("contents");
    setCardChoice("without-card");
    setSelectedCard(null);
    setMessageMode("write");
    setMessageDraft({ from: "", to: "", message: "" });
    setMessageErrors({});

    fetchProductCollections()
      .then(({ data }) => {
        if (!active) return;
        const groups = Array.isArray(data) ? data : [];
        const group = groups.find((item) => item.category === category);
        const found = group?.products
          ? findProductBySlug(group.products, productSlug)
          : null;

        if (found) {
          const authoritativeProduct = { ...found, category };
          setProduct(authoritativeProduct);
          setRelatedProducts(
            group.products
              .filter((item) => item.id !== found.id)
              .map((item) => ({ ...item, category })),
          );
          setStatus("ready");
          return;
        }

        if (stateMatches) {
          const groupProducts = group?.products || [];
          setRelatedProducts(
            groupProducts
              .filter((item) => item.id !== stateProduct.id)
              .map((item) => ({ ...item, category })),
          );
          setStatus("ready");
        } else {
          setStatus("missing");
        }
      })
      .catch(() => {
        if (!active) return;
        if (stateMatches) {
          setStatus("ready");
        } else {
          setRequestError("We couldn’t load this product right now. Please try again shortly.");
          setStatus("error");
        }
      });

    return () => {
      active = false;
    };
  }, [category, productSlug]);

  useEffect(() => {
    let active = true;
    setCardsStatus("loading");
    Promise.allSettled([fetchGreetingCards(), fetchProductCollections()])
      .then(([builderCardsResult, productCollectionsResult]) => {
        if (!active) return;

        const builderCards = builderCardsResult.status === "fulfilled" && Array.isArray(builderCardsResult.value.data)
          ? builderCardsResult.value.data.map((card) => ({
              ...card,
              id: card.id ?? card._id,
              source: "builder-card",
              image: card.image || card.images?.[0],
            }))
          : [];
        const productCollections = productCollectionsResult.status === "fulfilled" && Array.isArray(productCollectionsResult.value.data)
          ? productCollectionsResult.value.data
          : [];
        const greetingCardProducts = (productCollections.find((collection) => collection.category === "greetingCards")?.products || [])
          .map((card) => ({
            ...card,
            id: card.id ?? card._id,
            source: "product",
            productCategory: "greetingCards",
            image: card.image || card.images?.[0],
            design: card.subcategory || keyGiftSearchText(card.keyGift) || "Greeting card",
          }));
        const availableCards = [...builderCards, ...greetingCardProducts]
          .filter((card) => card.id && card.image && Number(card.price) > 0 && !isUnavailableProduct(card));

        setCards(availableCards);
        setCardStart(0);
        setCardsStatus(
          builderCardsResult.status === "fulfilled" || productCollectionsResult.status === "fulfilled"
            ? "ready"
            : "error",
        );
      })
      .catch(() => {
        if (!active) return;
        setCards([]);
        setCardsStatus("error");
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const images = getProductImages(product);
    setSelectedImage(images[0] || "");
  }, [product?.id]);

  useEffect(() => {
    if (!notification.show) return undefined;
    const timer = window.setTimeout(
      () => setNotification((current) => ({ ...current, show: false })),
      5000,
    );
    return () => window.clearTimeout(timer);
  }, [notification.show]);

  const images = useMemo(() => getProductImages(product), [product]);
  const contents = useMemo(() => normalizeContents(product), [product]);
  const faqContent = useMemo(() => getProductFaqContent(product, category), [product, category]);
  const stockLimit = getStockLimit(product);
  const unavailable = isUnavailableProduct(product);
  const reviewCount = product?.reviews?.length || 0;
  const averageRating = reviewCount
    ? product.reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / reviewCount
    : 0;

  const labels = useMemo(
    () =>
      [...new Set([product?.subcategory, ...getKeyGiftValues(product?.keyGift), categoryName].filter(Boolean))].slice(0, 3),
    [categoryName, product],
  );

  const visibleCards = useMemo(() => {
    const count = Math.min(5, cards.length);
    return Array.from({ length: count }, (_, index) => cards[(cardStart + index) % cards.length]);
  }, [cardStart, cards]);

  const visibleRelatedProducts = useMemo(() => {
    const count = Math.min(4, relatedProducts.length);
    return Array.from(
      { length: count },
      (_, index) => relatedProducts[(relatedStart + index) % relatedProducts.length],
    );
  }, [relatedProducts, relatedStart]);

  if (status === "loading") {
    return (
      <div className="gu-pdp-page">
        <div className="gu-pdp-header-shell"><LandingHeader variant="product" /></div>
        <main className="gu-pdp-state" aria-live="polite">
          <div className="gu-pdp-loading-card" />
          <p>Loading product details…</p>
        </main>
      </div>
    );
  }

  if (status === "missing" || status === "error" || !product) {
    return (
      <div className="gu-pdp-page">
        <div className="gu-pdp-header-shell"><LandingHeader variant="product" /></div>
        <main className="gu-pdp-state">
          <Gift aria-hidden="true" />
          <h1>{status === "missing" ? "We couldn’t find that gift" : "This gift is taking a moment"}</h1>
          <p>{requestError || "It may have moved or no longer be available."}</p>
          <a href={categoryRoute}>Browse {categoryName}</a>
        </main>
        <LandingFooter />
      </div>
    );
  }

  const selectedImageIndex = Math.max(0, images.indexOf(selectedImage));
  const moveGallery = (direction) => {
    if (images.length < 2) return;
    const nextIndex = (selectedImageIndex + direction + images.length) % images.length;
    setSelectedImage(images[nextIndex]);
  };

  const changeDraft = (field, value) => {
    setMessageDraft((current) => ({ ...current, [field]: value }));
    if (messageErrors[field]) {
      setMessageErrors((current) => ({ ...current, [field]: "" }));
    }
  };

  const chooseCard = (card) => {
    setSelectedCard(card);
    setCardChoice("card");
    setMessageErrors({});
  };

  const validatePersonalization = () => {
    if (cardChoice !== "card" || messageMode === "blank") {
      setMessageErrors({});
      return true;
    }

    const nextErrors = {};
    if (!messageDraft.from.trim()) nextErrors.from = "Please add the sender’s name.";
    if (!messageDraft.to.trim()) nextErrors.to = "Please add the recipient’s name.";
    if (!messageDraft.message.trim()) nextErrors.message = "Please write a message or choose Leave blank.";
    setMessageErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleAddToCart = () => {
    if (addingRef.current) return;
    if (isCorporateGift) {
      setShowQuoteModal(true);
      return;
    }
    if (unavailable) {
      setNotification({ show: true, type: "error", message: "This product is currently unavailable." });
      return;
    }
    if (!validatePersonalization()) return;

    const personalization = cardChoice === "card" && selectedCard
      ? {
          card: {
            id: selectedCard.id,
            name: selectedCard.name,
            design: selectedCard.design,
            image: selectedCard.image,
            price: Number(selectedCard.price) || 150,
            source: selectedCard.source || "product",
            productCategory: selectedCard.productCategory || "greetingCards",
          },
          messageMode,
          ...(messageMode === "write"
            ? {
                from: messageDraft.from.trim(),
                to: messageDraft.to.trim(),
                message: messageDraft.message.trim(),
              }
            : {}),
        }
      : null;

    const personalizationKey = personalization
      ? [
          personalization.card.id,
          personalization.messageMode,
          personalization.from || "",
          personalization.to || "",
          personalization.message || "",
        ].join("|")
      : "without-card";
    const cartKey = `${category}-${product.id}-${encodeURIComponent(personalizationKey)}`;

    addingRef.current = true;
    setIsAdding(true);
    try {
      addToCart({ ...product, category, quantity, cartKey, personalization });
      setNotification({
        show: true,
        type: "success",
        message: personalization
          ? "Added to cart with your card selection. Checkout will flag the current order-system limitation before submission."
          : `${product.name} (Qty: ${quantity}) added to cart.`,
      });
    } catch {
      setNotification({ show: true, type: "error", message: "We couldn’t add this gift to your cart. Please try again." });
    } finally {
      window.setTimeout(() => {
        addingRef.current = false;
        setIsAdding(false);
      }, 400);
    }
  };

  const canonicalUrl = `${window.location.origin}${location.pathname}`;
  const mainImage = selectedImage || images[0] || fallbackImage;
  const packaging = getPackagingContent(product);
  const shippingLabel = product.shippingTime || product.deliveryTime || product.shippingLabel || "Delivery confirmed at checkout";
  const metaTitle = product.metaTitle || `${product.name} | ${categoryName} | Gift Unwrap Pakistan`;
  const metaDescription = product.metaDescription || `${product.shortDescription || product.name} Shop this gift from Gift Unwrap Pakistan.`;

  return (
    <div className="gu-pdp-page">
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={images[0] || ""} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            image: images,
            description: product.shortDescription || product.longDescription || product.name,
            sku: String(product.id || product._id || productSlug),
            brand: { "@type": "Brand", name: "Gift Unwrap" },
            offers: {
              "@type": "Offer",
              priceCurrency: "PKR",
              price: Number(product.price) || 0,
              availability: unavailable
                ? "https://schema.org/OutOfStock"
                : "https://schema.org/InStock",
              url: canonicalUrl,
            },
            ...(reviewCount > 0 && {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: averageRating.toFixed(1),
                reviewCount,
              },
            }),
          })}
        </script>
      </Helmet>

      {notification.show && <NotificationBar type={notification.type} message={notification.message} />}
      <div className="gu-pdp-header-shell"><LandingHeader variant="product" /></div>

      <main>
        <section className="gu-pdp-hero" aria-labelledby="gu-pdp-title">
          <div className="gu-pdp-gallery" aria-label={`${product.name} image gallery`}>
            <div className="gu-pdp-thumbnails">
              {images.map((image, index) => (
                <button
                  className={selectedImage === image ? "is-active" : ""}
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  aria-label={`View ${product.name} image ${index + 1}`}
                  aria-pressed={selectedImage === image}
                >
                  <img src={image} alt="" decoding="async" />
                </button>
              ))}
            </div>
            <div className="gu-pdp-main-image">
              <img src={mainImage} alt={product.name} fetchPriority="high" decoding="async" />
              {images.length > 1 && (
                <div className="gu-pdp-gallery-controls">
                  <button type="button" onClick={() => moveGallery(-1)} aria-label="Previous product image"><ChevronLeft /></button>
                  <button type="button" onClick={() => moveGallery(1)} aria-label="Next product image"><ChevronRight /></button>
                </div>
              )}
            </div>
          </div>

          <div className="gu-pdp-purchase">
            <h1 id="gu-pdp-title">{product.name}</h1>
            {labels.length > 0 && (
              <div className="gu-pdp-perfect-for">
                <span>PERFECT FOR</span>
                <div>{labels.map((label) => <strong key={label}>{label}</strong>)}</div>
              </div>
            )}
            <div className="gu-pdp-price-row">
              <strong>{formatPrice(product.price)} PKR</strong>
              {Number(product.originalPrice) > Number(product.price) && (
                <del>{formatPrice(product.originalPrice)} PKR</del>
              )}
              {unavailable && <span className="gu-pdp-unavailable">Unavailable</span>}
            </div>
            <p className="gu-pdp-description">
              {product.shortDescription || product.longDescription || "Product details are being updated."}
            </p>

            <section className="gu-pdp-info-panel" aria-label="Product details">
              <div className="gu-pdp-info-tabs" role="tablist" aria-label="Product information">
                <button
                  className={activeInfoTab === "contents" ? "is-active" : ""}
                  type="button"
                  role="tab"
                  aria-selected={activeInfoTab === "contents"}
                  onClick={() => setActiveInfoTab("contents")}
                >
                  What’s inside
                </button>
                <button
                  className={activeInfoTab === "packaging" ? "is-active" : ""}
                  type="button"
                  role="tab"
                  aria-selected={activeInfoTab === "packaging"}
                  onClick={() => setActiveInfoTab("packaging")}
                >
                  How it’s packaged
                </button>
              </div>

              {activeInfoTab === "contents" ? (
                <div className="gu-pdp-contents" role="tabpanel">
                  {contents.length > 0 ? (
                    <ul>
                      {contents.map((item) => (
                        <li key={item.id}>
                          <span>{item.quantity ? `${item.quantity} ×` : "•"}</span>
                          <div><strong>{item.name}</strong>{item.description && <p>{item.description}</p>}</div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="gu-pdp-empty-contents">
                      <Gift aria-hidden="true" />
                      <div>
                        <strong>Detailed contents are not available for this product yet.</strong>
                        <p>Please review the photographs or <a href="https://wa.me/923268927354" target="_blank" rel="noreferrer">contact us on WhatsApp</a> before ordering.</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="gu-pdp-packaging" role="tabpanel">
                  {packaging ? (
                    <>
                      <img className="gu-pdp-packaging-image" src={packagingBox} alt="Gift Unwrap keepsake box with ribbon" />
                      <div className="gu-pdp-packaging-copy">
                        <p>{packaging.intro}</p>
                        {packaging.items.map((item, index) => (
                          <div className="gu-pdp-packaging-point" key={item.id || item.title}>
                            <img src={packagingIcons[index] || packagingReady} alt="" aria-hidden="true" />
                            <div><strong>{item.title}</strong><span>{item.description}</span></div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="gu-pdp-empty-contents gu-pdp-packaging-unavailable">
                      <Gift aria-hidden="true" />
                      <div>
                        <strong>Packaging details are not available for this product yet.</strong>
                        <p><a href="https://wa.me/923268927354" target="_blank" rel="noreferrer">Contact us on WhatsApp</a> if you would like to confirm how it will arrive.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>

            {!isCorporateGift && (
              <section className="gu-pdp-card-panel" aria-labelledby="gu-pdp-card-title">
                <div className="gu-pdp-card-heading">
                  <h2 id="gu-pdp-card-title">Add your card</h2>
                  <div>
                    <button type="button" aria-label="Previous greeting cards" disabled={cards.length <= 5} onClick={() => setCardStart((current) => (current - 1 + cards.length) % cards.length)}><ChevronLeft /></button>
                    <button type="button" aria-label="Next greeting cards" disabled={cards.length <= 5} onClick={() => setCardStart((current) => (current + 1) % cards.length)}><ChevronRight /></button>
                  </div>
                </div>

                <div className="gu-pdp-card-selection">
                  <div className="gu-pdp-card-picker" role="radiogroup" aria-label="Choose a greeting card">
                    {cardsStatus === "loading" && <p className="gu-pdp-card-status">Loading greeting cards…</p>}
                    {cardsStatus === "error" && <p className="gu-pdp-card-status">Greeting cards are unavailable right now. You can still send your gift without one.</p>}
                    {cardsStatus === "ready" && cards.length === 0 && <p className="gu-pdp-card-status">No greeting cards are currently in stock.</p>}
                    {visibleCards.map((card) => {
                      const active = cardChoice === "card" && selectedCard?.id === card.id;
                      return (
                        <button
                          className={active ? "is-active" : ""}
                          key={card.id ?? card._id}
                          type="button"
                          role="radio"
                          aria-checked={active}
                          onClick={() => chooseCard(card)}
                        >
                          <img src={card.image} alt={card.name} loading="lazy" decoding="async" />
                        </button>
                      );
                    })}
                  </div>

                  <label className="gu-pdp-without-card">
                    <input
                      type="radio"
                      name="card-choice"
                      checked={cardChoice === "without-card"}
                      onChange={() => { setCardChoice("without-card"); setMessageErrors({}); }}
                    />
                    <span>Send without a card</span>
                  </label>
                </div>

                {cardChoice === "card" && selectedCard && (
                  <div className="gu-pdp-message-editor">
                    <div className="gu-pdp-message-tabs" role="tablist" aria-label="Card message options">
                      <button className={messageMode === "write" ? "is-active" : ""} type="button" role="tab" aria-selected={messageMode === "write"} onClick={() => setMessageMode("write")}>Write a message</button>
                      <button className={messageMode === "blank" ? "is-active" : ""} type="button" role="tab" aria-selected={messageMode === "blank"} onClick={() => { setMessageMode("blank"); setMessageErrors({}); }}>Leave blank</button>
                    </div>
                    {messageMode === "write" && (
                      <div className="gu-pdp-message-fields">
                        <label>
                          <span>From <em>*</em></span>
                          <input value={messageDraft.from} maxLength={80} onChange={(event) => changeDraft("from", event.target.value)} aria-invalid={Boolean(messageErrors.from)} />
                          {messageErrors.from && <small>{messageErrors.from}</small>}
                        </label>
                        <label>
                          <span>To <em>*</em></span>
                          <input value={messageDraft.to} maxLength={80} onChange={(event) => changeDraft("to", event.target.value)} aria-invalid={Boolean(messageErrors.to)} />
                          {messageErrors.to && <small>{messageErrors.to}</small>}
                        </label>
                        <label className="gu-pdp-message-field">
                          <span>Message <em>*</em></span>
                          <textarea value={messageDraft.message} maxLength={300} onChange={(event) => changeDraft("message", event.target.value)} aria-invalid={Boolean(messageErrors.message)} />
                          <span className="gu-pdp-character-count">{messageDraft.message.length}/300</span>
                          {messageErrors.message && <small>{messageErrors.message}</small>}
                        </label>
                      </div>
                    )}
                  </div>
                )}
              </section>
            )}

            <div className="gu-pdp-buy-row">
              {!isCorporateGift && (
                <div className="gu-pdp-quantity" aria-label="Quantity selector">
                  <button type="button" onClick={() => setQuantity((current) => Math.max(1, current - 1))} disabled={quantity <= 1} aria-label="Decrease quantity"><Minus /></button>
                  <output aria-live="polite">{quantity}</output>
                  <button type="button" onClick={() => setQuantity((current) => Math.min(stockLimit, current + 1))} disabled={quantity >= stockLimit || unavailable} aria-label="Increase quantity"><Plus /></button>
                </div>
              )}
              <CartoonButton
                className="gu-pdp-add"
                color="#ff2b3a"
                disabled={unavailable || isAdding}
                label={isCorporateGift ? "Request a quote" : unavailable ? "Currently unavailable" : isAdding ? "Adding…" : "Add to cart"}
                onClick={handleAddToCart}
              />
            </div>

            <div className="gu-pdp-support-details">
              <div><Gift aria-hidden="true" /><span>Hand-packed</span></div>
              <i aria-hidden="true" />
              <div><Truck aria-hidden="true" /><span>{shippingLabel}</span></div>
            </div>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="gu-pdp-related" aria-labelledby="gu-pdp-related-title">
            <div className="gu-pdp-section-heading">
              <h2 id="gu-pdp-related-title">You might also love</h2>
            </div>
            <div className="gu-pdp-related-carousel">
              <button className="gu-pdp-related-arrow gu-pdp-related-arrow--previous" type="button" aria-label="Previous related products" disabled={relatedProducts.length <= 4} onClick={() => setRelatedStart((current) => (current - 1 + relatedProducts.length) % relatedProducts.length)}><ChevronLeft /></button>
              <div className="gu-pdp-related-grid">
                {visibleRelatedProducts.map((related) => (
                  <Link
                    className="gu-pdp-related-card"
                    key={`${related.category}-${related.id}`}
                    state={{ productData: related }}
                    to={`/product/${related.category}/${generateSlug(related.name)}`}
                  >
                    <span className="gu-pdp-related-image">
                      <img src={related.image || related.images?.[0] || fallbackImage} alt={related.name} loading="lazy" decoding="async" />
                    </span>
                    <span className="gu-pdp-related-copy">
                      <strong>{related.name}</strong>
                      <b>{formatPrice(related.price)} PKR</b>
                    </span>
                  </Link>
                ))}
              </div>
              <button className="gu-pdp-related-arrow gu-pdp-related-arrow--next" type="button" aria-label="Next related products" disabled={relatedProducts.length <= 4} onClick={() => setRelatedStart((current) => (current + 1) % relatedProducts.length)}><ChevronRight /></button>
            </div>
          </section>
        )}

        <Testimonials />
        {faqContent && <FAQSection {...faqContent} variant="product" />}
      </main>

      <LandingFooter />
      {isCorporateGift && <RequestQuoteModal isOpen={showQuoteModal} onClose={() => setShowQuoteModal(false)} product={product} />}
    </div>
  );
};

export default ProductDetail;
