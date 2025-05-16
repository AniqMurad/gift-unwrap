import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SearchPageNavbar from '../components/SearchPageNavbar';
import Footer from '../components/Footer';
import ProductData from "../components/ProductData";
import { useCart } from '../context/CartContext';
import Navbar from './Navbar';

const ProductDetail = () => {
  const [selectedImage, setSelectedImage] = useState('');
  const { productId, category } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const { addToCart } = useCart();

  useEffect(() => {
    if (!category || !productId) {
      navigate('/');
      return;
    }

    const categoryProducts = ProductData[category];

    if (categoryProducts) {
      const foundProduct = categoryProducts.find(p => p.id.toString() === productId);
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(foundProduct.image || (foundProduct.images && foundProduct.images[0]) || ''); // Initialize selectedImage
        return;
      }
    }
    // If product not found, navigate to a 404 page or home
    console.warn(`Product not found for category: ${category}, id: ${productId}`);
    navigate('/'); // Or a dedicated 404 page
  }, [productId, category, navigate]);

  if (!product) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const handleIncreaseQuantity = () => {
    setQuantity(prevQty => prevQty + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQty => prevQty - 1);
    }
  };

  // --- 3. Implement handleAddToCart ---
  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity });
      // Optionally, show a success message/toast notification
      alert(`${product.name} (Qty: ${quantity}) added to cart!`);
    }
  };

  // --- 4. Implement handleBuyNow ---
  const handleBuyNow = () => {
    if (product) {
      addToCart({ ...product, quantity });
      navigate('/ShoppingCart'); // Ensure this route matches your shopping cart page route
    }
  };

  return (
    <div>
      <Navbar showSearchInput={false} bgColor="#FBF4E8" />
      <SearchPageNavbar title={product.name} titleHome="Home" backgroundColor='#FBF4E8' />

      <div className="container mx-auto px-16 py-12">
        {/* Product Detail Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Left: Product Images */}
          <div className="space-y-6 md:space-y-8">
            <div className="bg-gray-50 p-4 md:p-8 rounded-lg flex items-center justify-center aspect-square">
              <img
                src={selectedImage || product.image || (product.images && product.images[0]) || 'https://via.placeholder.com/600'}
                alt={product.name}
                className="w-full h-full object-contain max-h-[500px] md:max-h-[600px]"
              />
            </div>

            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 md:gap-4">
                {product.images.map((imgSrc, index) => (
                  <div
                    key={index}
                    className={`border p-1 md:p-2 rounded cursor-pointer aspect-square ${selectedImage === imgSrc ? 'border-black' : 'border-gray-200 hover:border-gray-400'}`}
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
          <div className="space-y-5 md:space-y-6">
            <h1 className="text-2xl md:text-3xl font-bold text-[#1F1F1F]">{product.name}</h1>

            <div className="flex items-center gap-4">
              <span className="text-xl md:text-2xl font-semibold text-red-500">Rs {product.price.toFixed(2)}</span>
              {/* Add original price and discount if applicable */}
            </div>

            <div className="text-[#696C70] border-b border-gray-200 pb-4 md:pb-6 text-sm md:text-base">
              <p>{product.ShortDescription || "No short description available."}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 pt-4">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  className="px-3 md:px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-l-md"
                  onClick={handleDecreaseQuantity}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-3 md:px-4 py-2 text-center w-10 md:w-12">{quantity}</span>
                <button
                  className="px-3 md:px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-r-md"
                  onClick={handleIncreaseQuantity}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                {/* --- 5. Attach handlers to buttons --- */}
                <button
                  onClick={handleAddToCart}
                  className="w-full sm:w-auto px-8 md:px-12 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition text-sm font-medium"
                >
                  Add to Cart
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full sm:w-auto px-8 md:px-12 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition text-sm font-medium"
                >
                  Buy Now
                </button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-md p-4 mt-6 md:mt-8 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2.05-2.05A1 1 0 015.71 14h7.29zM13 16l-2-2m2 2l2-2m-2 2v-2m0 0h4.586a1 1 0 00.707-.293l2.828-2.828a1 1 0 000-1.414l-2.828-2.828A1 1 0 0017.586 6H13" />
                </svg>
                <span>Free shipping over Rs 130</span> {/* Updated threshold */}
              </div>
              <div className="flex items-center gap-3 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 15v-1a4 4 0 00-4-4H8m0 0l4 4m-4-4l4-4m-4 4H4" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>30-day returns</span>
              </div>
            </div>
            
            <div className="mt-32">
              <div className="flex border-b border-gray-200">
                <button
                  className={`py-3 px-6 font-medium ${activeTab === 'description' ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-black'}`}
                  onClick={() => setActiveTab('description')}
                >
                  Description
                </button>
                <button
                  className={`py-3 px-6 font-medium ${activeTab === 'reviews' ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-black'}`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Reviews ({product.reviews ? product.reviews.length : 0})
                </button>
                <button
                  className={`py-3 px-6 font-medium ${activeTab === 'shipping' ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-black'}`}
                  onClick={() => setActiveTab('shipping')}
                >
                  Shipping & Returns
                </button>
              </div>

              <div className="py-8 text-gray-700 leading-relaxed">
                {activeTab === 'description' && (
                  <div>
                    <p>
                      {product.LongDescription || "Detailed description not available."}
                    </p>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    {product.reviews && product.reviews.length > 0 ? (
                      product.reviews.map((review, index) => (
                        <div key={index} className="border-b last:border-b-0 py-4">
                          <p className="font-semibold">{review.author}</p>
                          <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                          <p className="mt-1">{review.comment}</p>
                          {/* Add star rating if available */}
                        </div>
                      ))
                    ) : (
                      <p>No reviews yet for this product.</p>
                    )}
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <div>
                    <h4 className="font-semibold mb-2">Shipping Information:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Free standard shipping on orders over Rs 130.</li>
                      <li>Express shipping available for an additional fee.</li>
                      <li>Most orders ship within 1-2 business days.</li>
                    </ul>
                    <h4 className="font-semibold mt-4 mb-2">Return Policy:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>30-day return window for unused items in original packaging.</li>
                      <li>Return shipping is free for defective or incorrect items.</li>
                      <li>Contact customer service for return authorization and instructions.</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>



        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {ProductData[category] && ProductData[category]
              .filter(p => p.id.toString() !== productId) // Exclude current product
              .slice(0, 4) // Limit to 4 related products
              .map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                  onClick={() => navigate(`/product/${category}/${relatedProduct.id}`)}
                >
                  <div className="bg-gray-50 p-4 aspect-square flex items-center justify-center">
                    <img
                      src={relatedProduct.image || (relatedProduct.images && relatedProduct.images[0]) || 'https://via.placeholder.com/200'}
                      alt={relatedProduct.name}
                      className="w-full h-full object-contain transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-sm truncate" title={relatedProduct.name}>{relatedProduct.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-semibold text-red-500">Rs {relatedProduct.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;