import React from 'react';
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
                <img src={product?.image} alt={product.name} className={`w-[300px] h-[400px] rounded-[16px]`} />
            </div>
            <div className='mt-4'>
                <p>{product.name}</p>
                <div className='flex items-center gap-2 text-sm mt-1'>
                    <span>${product.price}</span>
                    <span className='line-through text-[#A0A0A0]'>${product.originalPrice}</span>
                    <span className='bg-[#D2EF9A] rounded-[24px] p-1'>-{product.discount}%</span>
                </div>
            </div>
        </div>
    );
};

export default Product;
