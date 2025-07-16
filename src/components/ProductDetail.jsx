import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import SearchPageNavbar from '../components/SearchPageNavbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import Navbar from './Navbar';
import axios from 'axios'; // Import axios for API calls
import Product from '../components/Product'; // Assuming your Product component is in components/Product.js

const ProductDetail = () => {
    const [selectedImage, setSelectedImage] = useState('');
    const { productId, category } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [relatedProducts, setRelatedProducts] = useState([]); // New state for related products
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProductAndRelated = async () => {
            let currentProduct = null;

            // First, try to get product from navigation state (for immediate display)
            const productFromState = location.state?.productData;
            if (productFromState && productFromState.id.toString() === productId && productFromState.category === category) {
                setProduct(productFromState);
                setSelectedImage(productFromState.image || (productFromState.images && productFromState.images[0]) || '');
                currentProduct = productFromState;
            } else {
                // If not in state, fetch the specific product from the API
                try {
                    const response = await axios.get(`https://giftunwrapbackend.vercel.app/api/products/${category}/${productId}`);
                    setProduct(response.data);
                    setSelectedImage(response.data.image || (response.data.images && response.data.images[0]) || '');
                    currentProduct = response.data;
                } catch (err) {
                    console.error(`Failed to fetch product ${category}/${productId}:`, err);
                    setProduct(null);
                }
            }
            setQuantity(1); // Reset quantity when product changes
            window.scrollTo(0, 0); // Scroll to top

            // Fetch related products from the same category
            if (currentProduct) {
                try {
                    const response = await axios.get('https://giftunwrapbackend.vercel.app/api/products');
                    const categoryData = response.data.find(item => item.category === category);
                    if (categoryData && categoryData.products) {
                        const filteredRelated = categoryData.products.filter(
                            (p) => p.id !== currentProduct.id // Exclude the current product
                        );

                        // Shuffle and pick up to 4 random related products
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
        return <div className="flex justify-center items-center h-screen">Loading product details...</div>;
    }

    const handleIncreaseQuantity = () => {
        setQuantity(prevQty => prevQty + 1);
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQty => prevQty - 1);
        }
    };

    const handleAddToCart = () => {
        if (product) {
            addToCart({ ...product, quantity });
            alert(`${product.name} (Qty: ${quantity}) added to cart!`);
        }
    };

    const handleBuyNow = () => {
        if (product) {
            addToCart({ ...product, quantity });
            navigate('/ShoppingCart');
        }
    };

    return (
        <div>
            <Navbar showSearchInput={false} bgColor="#FBF4E8" />
            <SearchPageNavbar title={product.name} titleHome="Home" backgroundColor='#FBF4E8' />

            <div className="container mx-auto px-4 sm:px-8 lg:px-16 py-6 sm:py-8 lg:py-12">
                {/* Product Detail Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-16">
                    {/* Left: Product Images */}
                    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                        <div className="bg-gray-50 p-4 sm:p-6 lg:p-8 rounded-lg flex items-center justify-center aspect-square">
                            <img
                                src={selectedImage || product.image || (product.images && product.images[0]) || 'https://via.placeholder.com/600'}
                                alt={product.name}
                                className="w-full h-full object-contain max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] xl:max-h-[600px]"
                            />
                        </div>

                        {product.images && product.images.length > 1 && (
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
                                {product.images.map((imgSrc, index) => (
                                    <div
                                        key={index}
                                        className={`border p-1 sm:p-2 rounded cursor-pointer aspect-square ${selectedImage === imgSrc ? 'border-black' : 'border-gray-200 hover:border-gray-400'}`}
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
                    <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1F1F1F]">{product.name}</h1>

                        <div className="flex items-center gap-4">
                            <span className="text-lg sm:text-xl lg:text-2xl font-semibold text-red-500">Rs {product.price ? product.price.toFixed(2) : 'N/A'}</span>
                            {/* Add original price and discount if applicable */}
                        </div>

                        <div className="text-[#696C70] border-b border-gray-200 pb-4 sm:pb-5 lg:pb-6 text-sm sm:text-base">
                            {/* Use product.shortDescription from API */}
                            <p>{product.shortDescription || "No short description available."}</p>
                        </div>

                        <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 pt-4">
                            <div className="flex items-center justify-center sm:justify-start border border-gray-300 rounded-md w-fit mx-auto sm:mx-0">
                                <button
                                    className="px-3 sm:px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-l-md text-lg sm:text-base"
                                    onClick={handleDecreaseQuantity}
                                    aria-label="Decrease quantity"
                                >
                                    -
                                </button>
                                <span className="px-3 sm:px-4 py-2 text-center w-12 sm:w-14">{quantity}</span>
                                <button
                                    className="px-3 sm:px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-r-md text-lg sm:text-base"
                                    onClick={handleIncreaseQuantity}
                                    aria-label="Increase quantity"
                                >
                                    +
                                </button>
                            </div>

                            <div className="flex flex-col gap-3 w-full">
                                {/* --- 5. Attach handlers to buttons --- */}
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full px-6 sm:px-8 lg:px-12 py-3 sm:py-4 bg-black text-white rounded-md hover:bg-gray-800 transition text-sm sm:text-base font-medium"
                                >
                                    Add to Cart
                                </button>

                                <button
                                    onClick={handleBuyNow}
                                    className="w-full px-6 sm:px-8 lg:px-12 py-3 sm:py-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition text-sm sm:text-base font-medium"
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>

                        <div className="border border-gray-200 rounded-md p-3 sm:p-4 mt-6 sm:mt-7 lg:mt-8 space-y-2 sm:space-y-3">
                            <div className="flex items-center gap-3 text-xs sm:text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2.05-2.05A1 1 0 015.71 14h7.29zM13 16l-2-2m2 2l2-2m-2 2v-2m0 0h4.586a1 1 0 00.707-.293l2.828-2.828a1 1 0 000-1.414l-2.828-2.828A1 1 0 0017.586 6H13" />
                                </svg>
                                <span>Free shipping over Rs 130</span> {/* Updated threshold */}
                            </div>
                            <div className="flex items-center gap-3 text-xs sm:text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 15v-1a4 4 0 00-4-4H8m0 0l4 4m-4-4l4-4m-4 4H4" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                                <span>30-day returns</span>
                            </div>
                        </div>

                        <div className="mt-16 sm:mt-20 lg:mt-32">
                            <div className="flex border-b border-gray-200 overflow-x-auto">
                                <button
                                    className={`py-2 sm:py-3 px-3 sm:px-6 font-medium whitespace-nowrap text-sm sm:text-base ${activeTab === 'description' ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-black'}`}
                                    onClick={() => setActiveTab('description')}
                                >
                                    Description
                                </button>
                                <button
                                    className={`py-2 sm:py-3 px-3 sm:px-6 font-medium whitespace-nowrap text-sm sm:text-base ${activeTab === 'reviews' ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-black'}`}
                                    onClick={() => setActiveTab('reviews')}
                                >
                                    Reviews ({product.reviews ? product.reviews.length : 0})
                                </button>
                                <button
                                    className={`py-2 sm:py-3 px-3 sm:px-6 font-medium whitespace-nowrap text-sm sm:text-base ${activeTab === 'shipping' ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-black'}`}
                                    onClick={() => setActiveTab('shipping')}
                                >
                                    Shipping & Returns
                                </button>
                            </div>

                            <div className="py-4 sm:py-6 lg:py-8 text-gray-700 leading-relaxed text-sm sm:text-base">
                                {activeTab === 'description' && (
                                    <div>
                                        {/* Use product.longDescription from API */}
                                        <p>
                                            {product.longDescription || "Detailed description not available."}
                                        </p>
                                    </div>
                                )}

                                {activeTab === 'reviews' && (
                                    <div>
                                        {product.reviews && product.reviews.length > 0 ? (
                                            product.reviews.map((review, index) => (
                                                <div key={index} className="border-b last:border-b-0 py-3 sm:py-4">
                                                    <p className="font-semibold text-sm sm:text-base">{review.author}</p>
                                                    {review.createdAt && (
                                                        <span className="text-xs text-gray-500 block mb-1">
                                                            {new Date(review.createdAt).toLocaleDateString(undefined, {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })}
                                                        </span>
                                                    )}
                                                    <p className="text-xs sm:text-sm text-gray-500"><strong>Rating:</strong> {review.rating} ⭐</p>
                                                    <p className="mt-1 text-sm sm:text-base"><strong>Comment:</strong> {review.comment}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No reviews yet for this product.</p>
                                        )}
                                    </div>
                                )}

                                {activeTab === 'shipping' && (
                                    <div className="space-y-3 sm:space-y-4">
                                        <div>
                                            <h4 className="font-semibold mb-2 text-sm sm:text-base">Shipping Information:</h4>
                                            <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
                                                <li>Free standard shipping on orders over Rs 130.</li>
                                                <li>Express shipping available for an additional fee.</li>
                                                <li>Most orders ship within 1-2 business days.</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-2 text-sm sm:text-base">Return Policy:</h4>
                                            <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
                                                <li>30-day return window for unused items in original packaging.</li>
                                                <li>Return shipping is free for defective or incorrect items.</li>
                                                <li>Contact customer service for return authorization and instructions.</li>
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
                        <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center">You May Also Like</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
                            {relatedProducts.map((p) => (
                                <Product key={p.id} product={{ ...p, category: category }} columns={4} />
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