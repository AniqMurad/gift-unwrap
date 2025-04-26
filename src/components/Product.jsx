import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon2, HeartIcon3 } from './icons';
import { useWishlist } from '../context/WishlistContext';

const Product = ({ product, columns }) => {
    const { wishlist, toggleWishlist } = useWishlist();
    if (!product) return null;

    const isInWishlist = wishlist.some((item) => item.id === product.id && item.category === product.category);

    return (
        <div className={`${columns === 5 ? 'w-auto' : 'w-[300px]'} h-[468px]`}>
            <div className='relative bg-[#FBF4E8] rounded-[24px]'>
                <p className="bg-red-400 font-semibold px-3 py-1 text-xs text-white w-max rounded-[36px] absolute top-[10px] left-[10px]">
                    SALE
                </p>
                <button
                    className={`p-1 rounded-full absolute top-[10px] right-[10px] cursor-pointer transition-all duration-300 ${isInWishlist ? "bg-[#DB4444]" : "bg-white"}`}
                    onClick={() => toggleWishlist(product, product.category)}
                >
                    {isInWishlist ? <HeartIcon3 /> : <HeartIcon2 />}
                </button>

                {/* Wrap image in a Link */}
                <Link to={`/product/${product.category}/${product.id}`}>
                    <img
                        src={product?.image}
                        alt={product.name}
                        className={`w-[300px] h-[360px] rounded-[16px]`}
                    />
                </Link>
            </div>

            {/* Wrap text content in a Link */}
            <Link to={`/product/${product.category}/${product.id}`}>
                <div className='mt-4'>
                    <p>{product.name}</p>
                    <div className='flex items-center gap-2 text-sm mt-1'>
                        <span>Rs {product.price}</span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Product;
