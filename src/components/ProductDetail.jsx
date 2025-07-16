import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import SearchPageNavbar from '../components/SearchPageNavbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import Navbar from './Navbar';
import axios from 'axios';
import Product from '../components/Product';

const ProductDetail = () => {
    const [selectedImage, setSelectedImage] = useState('');
    const { productId, category } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProductAndRelated = async () => {
            let currentProduct = null;

            const productFromState = location.state?.productData;
            if (productFromState && productFromState.id.toString() === productId && productFromState.category === category) {
                setProduct(productFromState);
                setSelectedImage(productFromState.image || (productFromState.images && productFromState.images[0]) || '');
                currentProduct = productFromState;
            } else {
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

            setQuantity(1);
            window.scrollTo(0, 0);

            if (currentProduct) {
                try {
                    const response = await axios.get('https://giftunwrapbackend.vercel.app/api/products');
                    const categoryData = response.data.find(item => item.category === category);
                    if (categoryData && categoryData.products) {
                        const filteredRelated = categoryData.products.filter((p) => p.id !== currentProduct.id);
                        const shuffled = filteredRelated.sort(() => 0.5 - Math.random());
                        setRelatedProducts(shuffled.slice(0, 4));
                    }
                } catch (err) {
                    console.error("Failed to fetch related products:", err);
                }

                // 👉 Fetch reviews separately
                try {
                    const reviewsRes = await axios.get(`https://giftunwrapbackend.vercel.app/api/reviews/${category}/${productId}`);
                    setReviews(reviewsRes.data || []);
                } catch (error) {
                    console.error("Failed to fetch reviews:", error);
                }
            }
        };

        fetchProductAndRelated();
    }, [productId, category, location.state]);

    if (!product) {
        return <div className="flex justify-center items-center h-screen">Loading product details...</div>;
    }

    const handleIncreaseQuantity = () => setQuantity(prev => prev + 1);
    const handleDecreaseQuantity = () => quantity > 1 && setQuantity(prev => prev - 1);

    const handleAddToCart = () => {
        addToCart({ ...product, quantity });
        alert(`${product.name} (Qty: ${quantity}) added to cart!`);
    };

    const handleBuyNow = () => {
        addToCart({ ...product, quantity });
        navigate('/ShoppingCart');
    };

    return (
        <div>
            <Navbar showSearchInput={false} bgColor="#FBF4E8" />
            <SearchPageNavbar title={product.name} titleHome="Home" backgroundColor="#FBF4E8" />

            <div className="container mx-auto px-4 sm:px-8 lg:px-16 py-6 sm:py-8 lg:py-12">
                {/* Product Images and Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Images */}
                    <div className="space-y-6">
                        <div className="bg-gray-50 p-6 rounded-lg flex items-center justify-center aspect-square">
                            <img src={selectedImage} alt={product.name} className="w-full h-full object-contain max-h-[500px]" />
                        </div>
                        {product.images && product.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {product.images.map((img, i) => (
                                    <div key={i} onClick={() => setSelectedImage(img)} className={`cursor-pointer border p-1 rounded ${selectedImage === img ? 'border-black' : 'border-gray-200'}`}>
                                        <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold">{product.name}</h1>
                        <p className="text-2xl text-red-500">Rs {product.price?.toFixed(2)}</p>
                        <p className="text-gray-600">{product.shortDescription || "No short description available."}</p>

                        <div className="flex items-center space-x-4">
                            <button onClick={handleDecreaseQuantity} className="px-3 py-2 border rounded-l">-</button>
                            <span className="px-4">{quantity}</span>
                            <button onClick={handleIncreaseQuantity} className="px-3 py-2 border rounded-r">+</button>
                        </div>

                        <button onClick={handleAddToCart} className="w-full bg-black text-white py-3 rounded hover:bg-gray-800">Add to Cart</button>
                        <button onClick={handleBuyNow} className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600">Buy Now</button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mt-16">
                    <div className="flex border-b">
                        {['description', 'reviews', 'shipping'].map(tab => (
                            <button
                                key={tab}
                                className={`py-3 px-6 font-medium ${activeTab === tab ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-black'}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab === 'reviews' ? `Reviews (${reviews.length})` : tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className="py-6">
                        {activeTab === 'description' && (
                            <p>{product.longDescription || "Detailed description not available."}</p>
                        )}

                        {activeTab === 'reviews' && (
                            <div className="space-y-4">
                                {reviews.length > 0 ? reviews.map((r, i) => (
                                    <div key={i} className="border-b pb-3">
                                        <p className="font-semibold">{r.author || 'Anonymous'}</p>
                                        <p className="text-sm text-gray-500">{new Date(r.date).toLocaleDateString()}</p>
                                        <p className="mt-1">{r.comment}</p>
                                    </div>
                                )) : (
                                    <p>No reviews yet for this product.</p>
                                )}
                            </div>
                        )}

                        {activeTab === 'shipping' && (
                            <div>
                                <h4 className="font-semibold mb-2">Shipping Information:</h4>
                                <ul className="list-disc list-inside">
                                    <li>Free standard shipping on orders over Rs 130.</li>
                                    <li>Express shipping available for an additional fee.</li>
                                    <li>Most orders ship within 1-2 business days.</li>
                                </ul>
                                <h4 className="font-semibold mt-4 mb-2">Return Policy:</h4>
                                <ul className="list-disc list-inside">
                                    <li>30-day return window for unused items in original packaging.</li>
                                    <li>Return shipping is free for defective or incorrect items.</li>
                                    <li>Contact customer service for return authorization and instructions.</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold mb-6 text-center">You May Also Like</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {relatedProducts.map((p) => (
                                <Product key={p.id} product={{ ...p, category }} columns={4} />
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
