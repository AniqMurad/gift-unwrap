import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import {
  HeartIcon2,
  HeartIcon3,
  DetailEyeIcon,
  CartIcon,
  CloseIcon,
} from "./icons";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const Product = ({ product, columns }) => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [showImagePreview, setShowImagePreview] = useState(false);

  if (!product) return null;

  const category = product.category || "unknown";
  const id = product.id || "no-id";

  const isInWishlist = wishlist.some(
    (item) => item.id === id && item.category === category
  );

  const handleNavigateToDetail = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("Navigating to:", `/product/${category}/${id}`);
    if (id !== "no-id" && category !== "unknown") {
      navigate(`/product/${category}/${id}`, {
        state: { productData: product },
      });
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product);
    window.scrollTo(0, 0);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    toggleWishlist(product, category);
  };

  const containerWidthClass =
    columns === 5
      ? "w-auto"
      : "w-full max-w-[160px] sm:max-w-[200px] lg:max-w-[300px]";

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
              src={product.image || (product.images && product.images[0])}
              alt={product.name}
              className="max-w-full max-h-[90vh] object-contain rounded-xl"
            />
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <div
        className={`${containerWidthClass} group mb-6 cursor-pointer`}
        onClick={handleNavigateToDetail}
      >
        <div className="relative bg-[#FBF4E8] rounded-[24px] overflow-hidden">
          <img
            src={product.image || (product.images && product.images[0])}
            alt={product.name}
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

              <button
                onClick={handleAddToCart}
                className="p-2 sm:p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Add to Cart"
              >
                <CartIcon className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
              </button>
            </div>
          </div>

          {product.discountPercentage > 0 && (
            <p className="bg-red-400 font-semibold px-2 sm:px-3 py-1 text-xs text-white w-max rounded-[36px] absolute top-[8px] sm:top-[10px] left-[8px] sm:left-[10px] z-20">
              SALE
            </p>
          )}

          <button
            className={`p-1 rounded-full absolute top-[8px] sm:top-[10px] right-[8px] sm:right-[10px] cursor-pointer transition-all duration-300 z-20 ${
              isInWishlist ? "bg-[#DB4444]" : "bg-white"
            }`}
            onClick={handleWishlistClick}
            aria-label="Toggle Wishlist"
          >
            {isInWishlist ? <HeartIcon3 /> : <HeartIcon2 />}
          </button>
        </div>

        <div className="mt-3 sm:mt-4">
          <p className="font-medium text-gray-800 hover:text-black transition-colors truncate text-sm sm:text-base">
            {product.name}
          </p>
          <div className="flex items-center gap-2 text-xs sm:text-sm mt-1">
            <span className="font-semibold text-black">PKR {product.price}</span>
          </div>
        </div>
      </div>

      {ImagePreviewModal}
    </>
  );
};

export default Product;
