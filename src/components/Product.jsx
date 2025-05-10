// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { HeartIcon2, HeartIcon3, DetailEyeIcon, CartIcon } from './icons';
// import { useWishlist } from '../context/WishlistContext';

// const Product = ({ product, columns }) => {
//     const { wishlist, toggleWishlist } = useWishlist();
//     const navigate = useNavigate();

//     if (!product) return null;

//     const category = product.category || 'unknown';
//     const id = product.id || 'no-id';

//     const isInWishlist = wishlist.some((item) => item.id === id && item.category === category);

//     const handleAddToCart = (e) => {
//         e.stopPropagation();
//         e.preventDefault();
//         console.log("Add to cart clicked:", product);
//     };

//     const handleNavigateToDetail = (e) => {
//         e.stopPropagation();
//         e.preventDefault();
//         if (id !== 'no-id' && category !== 'unknown') {
//             navigate(`/product/${category}/${id}`);
//         } else {
//             console.error("Missing product category or ID for navigation");
//         }
//     };

//     const handleWishlistClick = (e) => {
//         e.stopPropagation();
//         e.preventDefault();
//         toggleWishlist(product, category);
//     };

//     const containerWidthClass = columns === 5 ? 'w-auto' : 'w-[300px]';

//     return (
//         <div className={`${containerWidthClass} group mb-6`}>
//             <div className='relative bg-[#FBF4E8] rounded-[24px] overflow-hidden'>

//                 {/* Product Image - Base layer */}
//                 <img
//                     src={product.image || (product.images && product.images[0])}
//                     alt={product.name}
//                     className={`w-full h-auto aspect-[3/4] object-cover rounded-[16px] transition-transform duration-300 group-hover:scale-105`}
//                 />

//                 {/* Overlay - Transparent by default, light grey on hover */}
//                 {/* Reduced opacity to 30 for a lighter effect */}
//                 {/* <div className="absolute inset-0 bg-transparent group-hover:bg-gray-100 group-hover:bg-opacity-0 transition-opacity duration-300 flex items-center justify-center z-10">
//                     <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-3">
//                         <button
//                             onClick={handleNavigateToDetail}
//                             className="p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors cursor-pointer" // Added cursor-pointer
//                             aria-label="View Product"
//                         >
//                             <DetailEyeIcon className="w-5 h-5 text-black" />
//                         </button>

//                         <button
//                             onClick={handleAddToCart}
//                             className="p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors cursor-pointer" // Added cursor-pointer
//                             aria-label="Add to Cart"
//                         >
//                             <CartIcon className="w-5 h-5 text-black" />
//                         </button>
//                     </div>
//                 </div> */}
//                 <div className="absolute inset-0 flex items-center justify-center z-10">
//                 {/* Icons Container - Fades in on hover */}
//                 <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-3">
//                     {/* Eye Icon Button */}
//                     <button
//                         onClick={handleNavigateToDetail}
//                         className="p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors cursor-pointer"
//                         aria-label="View Product"
//                     >
//                         <DetailEyeIcon className="w-5 h-5 text-black" />
//                     </button>

//                     {/* Cart Icon Button */}
//                     <button
//                         onClick={handleAddToCart}
//                         className="p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors cursor-pointer"
//                         aria-label="Add to Cart"
//                     >
//                         <CartIcon className="w-5 h-5 text-black" />
//                     </button>
//                 </div>
//             </div>

//                 {/* Sale Badge - Above overlay */}
//                 {product.discountPercentage > 0 && (
//                     <p className="bg-red-400 font-semibold px-3 py-1 text-xs text-white w-max rounded-[36px] absolute top-[10px] left-[10px] z-20">
//                         SALE
//                     </p>
//                 )}

//                 {/* Wishlist Button - Above overlay */}
//                 <button
//                     className={`p-1 rounded-full absolute top-[10px] right-[10px] cursor-pointer transition-all duration-300 z-20 ${isInWishlist ? "bg-[#DB4444]" : "bg-white"}`}
//                     onClick={handleWishlistClick}
//                     aria-label="Toggle Wishlist"
//                 >
//                     {isInWishlist ? <HeartIcon3 /> : <HeartIcon2 />}
//                 </button>

//             </div>

//             {/* Product Info */}
//             <div className='mt-4'>
//                 <Link to={id !== 'no-id' && category !== 'unknown' ? `/product/${category}/${id}` : '#'} className="block">
//                     <p className="font-medium text-gray-800 group-hover:text-black transition-colors truncate">{product.name}</p>
//                 </Link>
//                 <div className='flex items-center gap-2 text-sm mt-1'>
//                     <span className="font-semibold text-black">Rs {product.price}</span>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Product;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeartIcon2, HeartIcon3, DetailEyeIcon, CartIcon } from './icons';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext'; 

const Product = ({ product, columns }) => {
    const { wishlist, toggleWishlist } = useWishlist();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    if (!product) return null;

    const category = product.category || 'unknown';
    const id = product.id || 'no-id';

    const isInWishlist = wishlist.some((item) => item.id === id && item.category === category);

    const handleAddToCart = (e) => {
        e.stopPropagation();
        e.preventDefault();
        addToCart(product); 
        console.log("Add to cart clicked:", product);
    };

    const handleNavigateToDetail = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (id !== 'no-id' && category !== 'unknown') {
            navigate(`/product/${category}/${id}`);
        } else {
            console.error("Missing product category or ID for navigation");
        }
    };

    const handleWishlistClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleWishlist(product, category);
    };

    const containerWidthClass = columns === 5 ? 'w-auto' : 'w-[300px]';

    return (
        <div className={`${containerWidthClass} group mb-6`}>
            <div className='relative bg-[#FBF4E8] rounded-[24px] overflow-hidden'>

                <img
                    src={product.image || (product.images && product.images[0])}
                    alt={product.name}
                    className={`w-full h-auto aspect-[3/4] object-cover rounded-[16px] transition-transform duration-300 group-hover:scale-105`}
                />
                
                <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-3">
                    <button
                        onClick={handleNavigateToDetail}
                        className="p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors cursor-pointer"
                        aria-label="View Product"
                    >
                        <DetailEyeIcon className="w-5 h-5 text-black" />
                    </button>

                    <button
                        onClick={handleAddToCart}
                        className="p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors cursor-pointer"
                        aria-label="Add to Cart"
                    >
                        <CartIcon className="w-5 h-5 text-black" />
                    </button>
                </div>
            </div>

                {product.discountPercentage > 0 && (
                    <p className="bg-red-400 font-semibold px-3 py-1 text-xs text-white w-max rounded-[36px] absolute top-[10px] left-[10px] z-20">
                        SALE
                    </p>
                )}

                <button
                    className={`p-1 rounded-full absolute top-[10px] right-[10px] cursor-pointer transition-all duration-300 z-20 ${isInWishlist ? "bg-[#DB4444]" : "bg-white"}`}
                    onClick={handleWishlistClick}
                    aria-label="Toggle Wishlist"
                >
                    {isInWishlist ? <HeartIcon3 /> : <HeartIcon2 />}
                </button>

            </div>

            <div className='mt-4'>
                <Link to={id !== 'no-id' && category !== 'unknown' ? `/product/${category}/${id}` : '#'} className="block">
                    <p className="font-medium text-gray-800 group-hover:text-black transition-colors truncate">{product.name}</p>
                </Link>
                <div className='flex items-center gap-2 text-sm mt-1'>
                    <span className="font-semibold text-black">Rs {product.price}</span>
                </div>
            </div>
        </div>
    );
};

export default Product;