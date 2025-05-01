import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SearchPageNavbar from '../components/SearchPageNavbar';
import Footer from '../components/Footer';
import ProductData from "../components/ProductData";

const ProductDetail = () => {
  const [selectedImage, setSelectedImage] = useState('');
  const { productId, category } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    console.log("Category:", category);
    console.log("Product ID:", productId);

    if (!category || !productId) {
      navigate('/');
      return;
    }

    const categoryProducts = ProductData[category];
    console.log("Category Products:", categoryProducts);

    if (categoryProducts) {
      const foundProduct = categoryProducts.find(p => p.id.toString() === productId);
      console.log("Found Product:", foundProduct);
      if (foundProduct) {
        setProduct(foundProduct);
        return;
      }
    }

    navigate('/');
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
  console.log("Category:", category);
  console.log("Product ID:", productId);
  return (
    <div>
      <SearchPageNavbar title={product.name} titleHome="Home" backgroundColor='#FBF4E8' />

      <div className="container mx-auto px-16 py-12">
        {/* Product Detail Section */}
        <div className="grid grid-cols-2 gap-16">
          {/* Left: Product Images */}
          <div className="space-y-8">
            <div className="bg-gray-50 p-8 rounded-lg flex items-center justify-center">
              <img
                src={selectedImage || product.image || (product.images && product.images[0])}
                alt={product.name}
                className="w-full h-auto object-contain max-h-[600px]"
              />
            </div>

            {/* Thumbnails - Add if you have multiple images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images && product.images.map((imgSrc, index) => (
                <div
                  key={index}
                  className="border border-gray-200 p-2 rounded cursor-pointer"
                  onMouseEnter={() => setSelectedImage(imgSrc)} // <-- when hover
                  onClick={() => setSelectedImage(imgSrc)}      // <-- when click
                >
                  <img
                    src={imgSrc}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-[#1F1F1F]">{product.name}</h1>

            {/* Price Section */}
            <div className="flex items-center gap-4">
              <span className="text-2xl font-semibold">Rs {product.price}</span>
            </div>

            {/* Description */}
            <div className="text-[#696C70] border-b border-gray-200 pb-6">
              <p>{product.ShortDescription}</p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  className="px-4 py-2 text-gray-500 hover:bg-gray-100"
                  onClick={handleDecreaseQuantity}
                >
                  -
                </button>
                <span className="px-4 py-2 text-center w-12">{quantity}</span>
                <button
                  className="px-4 py-2 text-gray-500 hover:bg-gray-100"
                  onClick={handleIncreaseQuantity}
                >
                  +
                </button>
              </div>

              <button className="px-12 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition">
                Add to Cart
              </button>

              <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Delivery Info */}
            <div className="border border-gray-200 rounded-md p-4 mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Free shipping over $50</span>
              </div>
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>30-day returns</span>
              </div>
            </div>

            {/* Product Details Tabs */}
            <div className="mt-16">
              <div className="flex border-b border-gray-200">
                <button
                  className={`py-3 px-6 font-medium ${activeTab === 'description' ? 'border-b-2 border-black' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('description')}
                >
                  Description
                </button>
                <button
                  className={`py-3 px-6 font-medium ${activeTab === 'reviews' ? 'border-b-2 border-black' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Reviews
                </button>
                <button
                  className={`py-3 px-6 font-medium ${activeTab === 'shipping' ? 'border-b-2 border-black' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('shipping')}
                >
                  Shipping & Returns
                </button>
              </div>

              <div className="py-8">
                {activeTab === 'description' && (
                  <div>
                    <p className="text-[#696C70]">
                      {product.LongDescription}
                    </p>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <p className="text-[#696C70]">Customer reviews will appear here.</p>
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <div>
                    <p className="text-[#696C70]">
                      Shipping Information:
                      <br /><br />
                      • Free standard shipping on orders over $50
                      <br />
                      • Express shipping available for an additional fee
                      <br />
                      • Most orders ship within 1-2 business days
                      <br /><br />
                      Return Policy:
                      <br /><br />
                      • 30-day return window for unused items
                      <br />
                      • Return shipping is free for defective items
                      <br />
                      • Contact customer service for return authorization
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>



        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-4 gap-6">
            {ProductData[category] && ProductData[category].slice(0, 4).map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="cursor-pointer"
                onClick={() => navigate(`/product/${category}/${relatedProduct.id}`)}
              >
                <div className="bg-gray-50 rounded-lg p-4 mb-3">
                  <img
                    src={product.image || (product.images && product.images[0])}
                    alt={relatedProduct.name}
                    className="w-full h-[200px] object-cover"
                  />
                </div>
                <h3 className="font-medium">{relatedProduct.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-semibold">Rs {relatedProduct.price}</span>
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