import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import {
  DetailEyeIcon,
  CartIcon,
  CloseIcon,
} from "./icons";
import { useCart } from "../context/CartContext";
import { getCanonicalProductPath } from "../lib/catalogRouting";
import RequestQuoteModal from "./RequestQuoteModal";
import BuilderMessageModal from "./gift-box-builder/BuilderMessageModal";
import { emptyCardDetails } from "./gift-box-builder/builder-card-state";
import fallbackImage from "../assets/error.png";

const EMPTY_CARD_DETAILS = emptyCardDetails();

const formatPrice = (value) =>
  new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 }).format(
    Number(value) || 0,
  );

const Product = ({ product, columns, variant = "default", eager = false, directPurchaseOnly = false }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const messageReturnFocusRef = useRef(null);

  if (!product) return null;

  const category = product.category || "unknown";
  const isCorporateGift = category === "giftsForCompany";
  const isStandaloneGreetingCard = directPurchaseOnly && category === "greetingCards";
  const imageSrc = product.image || product.images?.[0] || fallbackImage;
  const productHref = getCanonicalProductPath(category, product);
  const currentPrice = Number(product.price);
  const compareAtPrice = Number(product.originalPrice);
  const hasValidDiscount =
    Number.isFinite(compareAtPrice) &&
    Number.isFinite(currentPrice) &&
    compareAtPrice > currentPrice &&
    currentPrice > 0;
  const discountPercentage = hasValidDiscount
    ? Math.round(((compareAtPrice - currentPrice) / compareAtPrice) * 100)
    : 0;
  const isUnavailable =
    product.available === false ||
    product.inStock === false ||
    Number(product.stock) === 0;

  const handleNavigateToDetail = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (productHref && category !== "unknown") {
      navigate(productHref, {
        state: { productData: product },
      });
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (isUnavailable) return;
    if (isCorporateGift) {
      setShowQuoteModal(true);
    } else if (isStandaloneGreetingCard) {
      messageReturnFocusRef.current = e.currentTarget;
      setShowMessageModal(true);
    } else {
      addToCart(product);
      window.scrollTo(0, 0);
    }
  };

  const handleGreetingCardSave = (_card, details) => {
    const personalization = details.blank
      ? { messageMode: "blank" }
      : {
          messageMode: "write",
          to: details.to,
          from: details.from,
          message: details.message,
        };
    const personalizationKey = [
      personalization.messageMode,
      personalization.to || "",
      personalization.from || "",
      personalization.message || "",
    ].join("|");

    addToCart({
      ...product,
      category,
      image: imageSrc,
      quantity: 1,
      cartKey: `greeting-card-${product.id}-${encodeURIComponent(personalizationKey)}`,
      personalization,
    });
    setShowMessageModal(false);
    window.scrollTo(0, 0);
  };

  const containerWidthClass =
    columns === 5
      ? "w-auto"
      : "w-full max-w-[160px] sm:max-w-[200px] lg:max-w-[320px]";

  const ImagePreviewModal = showImagePreview
    ? ReactDOM.createPortal(
        <div className="fixed inset-0 z-[9999] bg-black bg-opacity-80 flex items-center justify-center p-4">
          <div className="relative max-w-full max-h-full">
            <button
              onClick={() => setShowImagePreview(false)}
              className="absolute top-3 right-3 bg-white p-2 rounded-full z-10 shadow-md hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Close Preview"
            >
              <CloseIcon className="w-5 h-5 text-black cursor-pointer" />
            </button>
            <img
              src={imageSrc}
              alt={product.name}
              onError={(event) => {
                event.currentTarget.src = fallbackImage;
              }}
              className="max-w-full max-h-[90vh] object-contain rounded-xl"
            />
          </div>
        </div>,
        document.body
      )
    : null;

  if (variant === "collection") {
    return (
      <>
        <article className="gu-collection-product">
          <div className="gu-collection-product-media">
            {directPurchaseOnly ? (
              <button
                type="button"
                className="gu-collection-product-link"
                onClick={handleAddToCart}
                disabled={isUnavailable}
                aria-label={isUnavailable ? `${product.name} is sold out` : `Personalize and add ${product.name} to cart`}
              >
                <img
                  src={imageSrc}
                  alt={product.name}
                  loading={eager ? "eager" : "lazy"}
                  fetchPriority={eager ? "high" : "auto"}
                  decoding="async"
                  width="335"
                  height="335"
                  onError={(event) => {
                    event.currentTarget.src = fallbackImage;
                  }}
                />
              </button>
            ) : (
              <Link
                className="gu-collection-product-link"
                to={productHref}
                state={{ productData: product }}
                aria-label={`View ${product.name}`}
              >
                <img
                  src={imageSrc}
                  alt={product.name}
                  loading={eager ? "eager" : "lazy"}
                  fetchPriority={eager ? "high" : "auto"}
                  decoding="async"
                  width="335"
                  height="335"
                  onError={(event) => {
                    event.currentTarget.src = fallbackImage;
                  }}
                />
              </Link>
            )}

            {hasValidDiscount && <span className="gu-collection-sale">SALE</span>}
            {isUnavailable && <span className="gu-collection-sold-out">Sold out</span>}

            <div className="gu-collection-product-actions">
              <button
                type="button"
                onClick={() => setShowImagePreview(true)}
                aria-label={`Preview ${product.name}`}
              >
                <DetailEyeIcon />
              </button>
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isUnavailable}
                aria-label={isUnavailable ? `${product.name} is sold out` : isStandaloneGreetingCard ? `Personalize and add ${product.name} to cart` : `Add ${product.name} to cart`}
              >
                <CartIcon />
              </button>
            </div>
          </div>

          {directPurchaseOnly ? (
            <div className="gu-collection-product-copy">
              <h2>{product.name}</h2>
              <p>
                <strong>{formatPrice(currentPrice)} PKR</strong>
                {hasValidDiscount && (
                  <>
                    <del>{formatPrice(compareAtPrice)} PKR</del>
                    <span>-{discountPercentage}%</span>
                  </>
                )}
              </p>
            </div>
          ) : (
            <Link
              className="gu-collection-product-copy"
              to={productHref}
              state={{ productData: product }}
            >
              <h2>{product.name}</h2>
              <p>
                <strong>{formatPrice(currentPrice)} PKR</strong>
                {hasValidDiscount && (
                  <>
                    <del>{formatPrice(compareAtPrice)} PKR</del>
                    <span>-{discountPercentage}%</span>
                  </>
                )}
              </p>
            </Link>
          )}
        </article>

        {ImagePreviewModal}
        {showMessageModal && (
          <BuilderMessageModal
            card={product}
            savedDetails={EMPTY_CARD_DETAILS}
            onSave={handleGreetingCardSave}
            onClose={() => setShowMessageModal(false)}
            returnFocus={messageReturnFocusRef.current}
            submitLabel="Add to Cart"
          />
        )}
      </>
    );
  }

  return (
    <>
      <div
        className={`${containerWidthClass} group mb-6 cursor-pointer`}
        onClick={handleNavigateToDetail}
      >
        <div className="relative bg-[#FBF4E8] rounded-[24px] overflow-hidden">
          <img
            src={imageSrc}
            alt={product.name}
            loading="lazy"
            decoding="async"
            onError={(event) => {
              event.currentTarget.src = fallbackImage;
            }}
            className="w-full h-auto aspect-[3/4] object-cover rounded-[16px] transition-transform duration-300 group-hover:scale-105"
          />

          {/* Desktop hover buttons */}
          <div className="absolute inset-0 items-center justify-center z-10 hidden lg:flex">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2 sm:space-x-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setShowImagePreview(true);
                }}
                className="p-2 sm:p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Preview Image"
              >
                <DetailEyeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
              </button>

              {isCorporateGift ? (
                <button
                  onClick={handleAddToCart}
                  className="px-4 py-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors cursor-pointer text-black font-semibold text-sm"
                  aria-label="Request Quote"
                >
                  Request Quote
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="p-2 sm:p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors cursor-pointer"
                  aria-label="Add to Cart"
                >
                  <CartIcon className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                </button>
              )}
            </div>
          </div>

          {hasValidDiscount && (
            <p className="bg-red-400 font-semibold px-2 sm:px-3 py-1 text-xs text-white w-max rounded-[36px] absolute top-[8px] sm:top-[10px] left-[8px] sm:left-[10px] z-20">
              SALE
            </p>
          )}

        </div>

        <div className="mt-3 sm:mt-4">
          <p className="font-medium text-gray-800 hover:text-black transition-colors truncate text-sm sm:text-base">
            {product.name}
          </p>
          <div className="flex items-center gap-2 text-xs sm:text-sm mt-1">
            <span className="font-semibold text-black">PKR {product.price}</span>
          </div>
      
      <RequestQuoteModal
        isOpen={showQuoteModal}
        onClose={() => setShowQuoteModal(false)}
        product={product}
      />
        </div>
      </div>

      {ImagePreviewModal}
    </>
  );
};

export default Product;
