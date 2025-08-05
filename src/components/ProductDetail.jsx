import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import SearchPageNavbar from "../components/SearchPageNavbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import Navbar from "./Navbar";
import axios from "axios";
import Product from "../components/Product";
import NotificationBar from "../components/NotificationBar";

const ProductDetail = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const { productId, category } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useCart();
  const [notification, setNotification] = useState({
    show: false,
    type: "success",
    message: "",
  });
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Auto-hide notification after 3 seconds
  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification((prev) => ({ ...prev, show: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  const showNotification = (type, message) => {
    setNotification({
      show: true,
      type,
      message,
    });
  };

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      let currentProduct = null;

      const productFromState = location.state?.productData;
      if (
        productFromState &&
        productFromState.id.toString() === productId &&
        productFromState.category === category
      ) {
        setProduct(productFromState);
        setSelectedImage(
          productFromState.image ||
            (productFromState.images && productFromState.images[0]) ||
            ""
        );
        currentProduct = productFromState;
      } else {
        try {
          const response = await axios.get(
            `https://giftunwrapbackend.vercel.app/api/products/${category}/${productId}`
          );
          console.log(
            `Fetched product ${category}/${productId}:`,
            response.data
          );
          setProduct(response.data);
          setSelectedImage(
            response.data.image ||
              (response.data.images && response.data.images[0]) ||
              ""
          );
          currentProduct = response.data;
        } catch (err) {
          console.error(
            `Failed to fetch product ${category}/${productId}:`,
            err
          );
          setProduct(null);
        }
      }
      setQuantity(1);
      window.scrollTo(0, 0);

      if (currentProduct) {
        try {
          const response = await axios.get(
            "https://giftunwrapbackend.vercel.app/api/products"
          );
          const categoryData = response.data.find(
            (item) => item.category === category
          );
          if (categoryData && categoryData.products) {
            const filteredRelated = categoryData.products.filter(
              (p) => p.id !== currentProduct.id
            );

            const shuffled = filteredRelated.sort(() => 0.5 - Math.random());
            setRelatedProducts(shuffled.slice(0, 4));
          }
        } catch (err) {
          console.error("Failed to fetch related products:", err);
        }
      }
    };

    fetchProductAndRelated();
  }, [productId, category, navigate, location.state]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading product details...
      </div>
    );
  }

  const handleIncreaseQuantity = () => {
    setQuantity((prevQty) => prevQty + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQty) => prevQty - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity });
      showNotification(
        "success",
        `${product.name} (Qty: ${quantity}) added to cart!`
      );
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart({ ...product, quantity });
      navigate("/ShoppingCart");
    }
  };

  console.log(product.reviews);
  return (
    <div>
      {notification.show && (
        <NotificationBar
          type={notification.type}
          message={notification.message}
        />
      )}
      <Navbar showSearchInput={false} bgColor="#FBF4E8" />
      <SearchPageNavbar
        title={product.name}
        titleHome="Home"
        backgroundColor="#FBF4E8"
      />

      <div className="container mx-auto px-4 sm:px-8 lg:px-16 py-4 sm:py-6 lg:py-12">
        {/* Product Detail Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-10 xl:gap-16">
          {/* Left: Product Images */}
          <div className="space-y-0 sm:space-y-2 lg:space-y-6">
            {/* Main Image with carousel controls on mobile */}
            <div className="bg-gray-50 p-2 sm:p-4 lg:p-8 rounded-lg flex items-center justify-center relative">
              {/* Mobile carousel arrows */}
              {product.images && product.images.length > 1 && (
                <>
                  <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 text-gray-500 bg-white bg-opacity-70 rounded-full sm:hidden"
                    style={{ left: 0 }}
                    onClick={() => {
                      const currentIdx = product.images.indexOf(
                        selectedImage || product.images[0]
                      );
                      const prevIdx =
                        (currentIdx - 1 + product.images.length) %
                        product.images.length;
                      setSelectedImage(product.images[prevIdx]);
                    }}
                    aria-label="Previous image"
                    disabled={product.images.length < 2}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 text-gray-500 bg-white bg-opacity-70 rounded-full sm:hidden"
                    style={{ right: 0 }}
                    onClick={() => {
                      const currentIdx = product.images.indexOf(
                        selectedImage || product.images[0]
                      );
                      const nextIdx = (currentIdx + 1) % product.images.length;
                      setSelectedImage(product.images[nextIdx]);
                    }}
                    aria-label="Next image"
                    disabled={product.images.length < 2}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}
              <img
                src={
                  selectedImage ||
                  product.image ||
                  (product.images && product.images[0]) ||
                  "https://via.placeholder.com/600"
                }
                alt={product.name}
                className="w-full h-full object-contain max-h-[200px] sm:max-h-[300px] lg:max-h-[500px] xl:max-h-[600px] cursor-pointer"
                onClick={() => setIsFullscreen(true)}
              />
              {/* Fullscreen Modal */}
              {isFullscreen && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
                  onClick={() => setIsFullscreen(false)}
                >
                  <img
                    src={
                      selectedImage ||
                      product.image ||
                      (product.images && product.images[0]) ||
                      "https://via.placeholder.com/600"
                    }
                    alt={product.name}
                    className="max-h-[90vh] max-w-[95vw] object-contain rounded shadow-lg"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button
                    className="absolute top-4 right-4 text-white bg-black bg-opacity-60 rounded-full p-2 hover:bg-opacity-80 focus:outline-none"
                    onClick={() => setIsFullscreen(false)}
                    aria-label="Close fullscreen"
                    style={{ zIndex: 60 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Thumbnails for sm+ screens only */}
            {product.images && product.images.length > 1 && (
              <div className="hidden sm:grid grid-cols-4 gap-3 lg:gap-4">
                {product.images.map((imgSrc, index) => (
                  <div
                    key={index}
                    className={`border p-2 rounded cursor-pointer aspect-square ${
                      selectedImage === imgSrc
                        ? "border-black"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                    onMouseEnter={() => setSelectedImage(imgSrc)}
                    onClick={() => setSelectedImage(imgSrc)}
                  >
                    <img
                      src={imgSrc}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="space-y-3 sm:space-y-4 lg:space-y-6">
            <h1 className="text-lg sm:text-xl lg:text-3xl font-bold text-[#1F1F1F]">
              {product.name}
            </h1>

            <div className="flex items-center gap-4">
              <span className="text-lg sm:text-xl lg:text-2xl font-semibold text-red-500">
                PKR {product.price ? Math.floor(product.price) : "N/A"}
              </span>
            </div>

            <div className="text-[#696C70] border-b border-gray-200 pb-3 sm:pb-4 lg:pb-6 text-sm sm:text-base">
              <p>
                {product.shortDescription || "No short description available."}
              </p>
            </div>

            {/* Customization Message - Desktop only */}
            <div className="hidden sm:block bg-blue-50 border border-blue-200 rounded-md p-3 sm:p-4">
              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="text-blue-700 text-sm sm:text-base">
                  <p className="font-medium mb-1">Need customization?</p>
                  <p>
                    Feel free to contact us before or after placing your order,
                    we are here to help! We will also reach out shortly to
                    confirm your preferences.
                  </p>
                  <p className="mt-2">
                    You can call or WhatsApp us at{" "}
                    <strong>+92 313 0216931</strong>. Just tap below:
                  </p>
                  <p className="mt-1">
                    <a
                      href="tel:+923130216931"
                      className="underline hover:text-blue-900 mr-4"
                    >
                      Call Now
                    </a>
                    |
                    <a
                      href="https://wa.me/923130216931"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-green-800 ml-4"
                    >
                      WhatsApp Now
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Quantity and Buttons Section - Compact on mobile */}
            <div className="flex gap-3 sm:gap-4 lg:gap-6 pt-2 sm:pt-4">
              <div className="flex items-center justify-center sm:justify-start border border-gray-300 rounded-md w-fit mx-auto sm:mx-0">
                <button
                  className="px-3 sm:px-4 py-2 cursor-pointer text-gray-500 hover:bg-gray-100 rounded-l-md text-lg sm:text-base"
                  onClick={handleDecreaseQuantity}
                  aria-label="Decrease quantity"
                >
                  –
                </button>
                <span className="px-3 sm:px-4 py-2 text-center w-12 sm:w-14">
                  {quantity}
                </span>
                <button
                  className="px-3 sm:px-4 py-2 cursor-pointer text-gray-500 hover:bg-gray-100 rounded-r-md text-lg sm:text-base"
                  onClick={handleIncreaseQuantity}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <div className="flex gap-3 w-full">
                <button
                  onClick={handleAddToCart}
                  className="w-full px-0 sm:px-8 lg:px-12 cursor-pointer py-3 sm:py-4 bg-black text-white rounded-md hover:bg-gray-800 transition text-sm sm:text-base font-medium"
                >
                  Add to Cart
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full px-0 sm:px-8 lg:px-12 cursor-pointer py-3 sm:py-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition text-sm sm:text-base font-medium"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Customization Message - Mobile only, after buttons */}
            <div className="block sm:hidden bg-blue-50 border border-blue-200 rounded-md p-3 mt-3">
              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="text-blue-700 text-sm">
                  <p className="font-medium mb-1">Need customization?</p>
                  <p>
                    Feel free to contact us before or after placing your order,
                    we are here to help! We will also reach out shortly to
                    confirm your preferences.
                  </p>
                  <p className="mt-2">
                    You can also call or WhatsApp us at{" "}
                    <strong>+92 313 0216931</strong>. Just tap below:
                  </p>
                  <p className="mt-1">
                    <a
                      href="tel:+923130216931"
                      className="underline hover:text-blue-900 mr-4"
                    >
                      Call Now
                    </a>
                    |
                    <a
                      href="https://wa.me/923130216931"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-green-800 ml-4"
                    >
                      WhatsApp Now
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-md p-3 sm:p-4 mt-6 sm:mt-7 lg:mt-8 space-y-2 sm:space-y-3">
              <div className="flex items-center gap-3 text-xs sm:text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2.05-2.05A1 1 0 015.71 14h7.29zM13 16l-2-2m2 2l2-2m-2 2v-2m0 0h4.586a1 1 0 00.707-.293l2.828-2.828a1 1 0 000-1.414l-2.828-2.828A1 1 0 0017.586 6H13"
                  />
                </svg>
                <span>Free shipping on orders over PKR 4000</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 15v-1a4 4 0 00-4-4H8m0 0l4 4m-4-4l4-4m-4 4H4"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <span>30-day returns</span>
              </div>
            </div>

            <div className="mt-16 sm:mt-20 lg:mt-32">
              <div className="flex border-b border-gray-200 overflow-x-auto">
                <button
                  className={`py-2 sm:py-3 px-3 sm:px-6 cursor-pointer font-medium whitespace-nowrap text-sm sm:text-base ${
                    activeTab === "description"
                      ? "border-b-2 border-black text-black"
                      : "text-gray-500 hover:text-black"
                  }`}
                  onClick={() => setActiveTab("description")}
                >
                  Description
                </button>
                <button
                  className={`py-2 sm:py-3 px-3 sm:px-6 cursor-pointer font-medium whitespace-nowrap text-sm sm:text-base ${
                    activeTab === "reviews"
                      ? "border-b-2 border-black text-black"
                      : "text-gray-500 hover:text-black"
                  }`}
                  onClick={() => setActiveTab("reviews")}
                >
                  Reviews ({product.reviews ? product.reviews.length : 0})
                </button>
                <button
                  className={`py-2 sm:py-3 px-3 sm:px-6 cursor-pointer font-medium whitespace-nowrap text-sm sm:text-base ${
                    activeTab === "shipping"
                      ? "border-b-2 border-black text-black"
                      : "text-gray-500 hover:text-black"
                  }`}
                  onClick={() => setActiveTab("shipping")}
                >
                  Shipping & Returns
                </button>
              </div>

              <div className="py-4 sm:py-6 lg:py-8 text-gray-700 leading-relaxed text-sm sm:text-base">
                {activeTab === "description" && (
                  <div>
                    <p>
                      {product.longDescription ||
                        "Detailed description not available."}
                    </p>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-6">
                    {product.reviews && product.reviews.length > 0 ? (
                      product.reviews.map((review, index) => (
                        <div
                          key={index}
                          className="border-b pb-4 last:border-none"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-sm sm:text-base">
                                <strong>Username:</strong> {review.username}
                              </p>
                              {review.createdAt && (
                                <span className="text-xs text-gray-500 block mb-1">
                                  {new Date(
                                    review.createdAt
                                  ).toLocaleDateString(undefined, {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center">
                              <strong>Rating:</strong>
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill={
                                    i < review.rating ? "currentColor" : "none"
                                  }
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  className={`h-5 w-5 ${
                                    i < review.rating
                                      ? "text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1}
                                    d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.62 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z"
                                  />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <p className="mt-2 text-sm sm:text-base text-gray-700">
                            <strong>Comment:</strong> {review.comment}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">
                        No reviews yet for this product.
                      </p>
                    )}
                  </div>
                )}

                {activeTab === "shipping" && (
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-sm sm:text-base">
                        Shipping Information:
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
                        <li>Free shipping on orders over PKR 4000.</li>
                        <li>
                          Express shipping available for an additional fee.
                        </li>
                        <li>Most orders ship within 1-2 business days.</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-sm sm:text-base">
                        Return Policy:
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
                        <li>
                          30-day return window for unused items in original
                          packaging.
                        </li>
                        <li>
                          Return shipping is free for defective or incorrect
                          items.
                        </li>
                        <li>
                          Contact customer service for return authorization and
                          instructions.
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* You May Also Like Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-12 sm:mt-14 lg:mt-16">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
              {relatedProducts.map((p) => (
                <Product
                  key={p.id}
                  product={{ ...p, category: category }}
                  columns={4}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
