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
                <img src={product?.image} alt={product.name} className={`w-[300px] h-[360px] rounded-[16px]`} />
            </div>
            <div className='mt-4'>
                <p>{product.name}</p>
                <div className='flex items-center gap-2 text-sm mt-1'>
                    <span>Rs {product.price}</span>
                    {/* <span className='line-through text-[#A0A0A0]'>${product.originalPrice}</span> */}
                    {/* <span className='bg-[#D2EF9A] rounded-[24px] p-1'>-{product.discount}%</span> */}
                </div>
            </div>
        </div>
    );
};

export default Product;


// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Product = ({ product, columns }) => {
//   const navigate = useNavigate();

//   const handleProductClick = () => {
//     navigate(`/product/${product.id}`);
//   };

//   return (
//     <div 
//       className={`cursor-pointer transition-all duration-300 hover:shadow-lg w-full`}
//       onClick={handleProductClick}
//     >
//       {/* Product content */}
//       <div className="bg-gray-50 rounded-md overflow-hidden relative">
//         <img 
//           src={product.image} 
//           alt={product.name} 
//           className={`w-full h-auto object-contain aspect-[3/4]`} 
//         />
//         {/* Sale badge if applicable */}
//         {product.oldPrice && (
//           <span className="absolute top-3 right-3 bg-[#D2EF9A] text-[#1F1F1F] px-2 py-1 rounded-full text-xs">
//             {Math.round((1 - product.currentPrice / product.oldPrice) * 100)}% OFF
//           </span>
//         )}
//       </div>
      
//       <div className="mt-3">
//         <h3 className={`font-medium ${columns === 5 ? 'text-sm' : 'text-base'}`}>{product.name}</h3>
//         <div className="flex items-center gap-2 mt-1">
//           <span className={`font-semibold ${columns === 5 ? 'text-sm' : 'text-base'}`}>${product.currentPrice}</span>
//           {product.oldPrice && (
//             <span className={`line-through text-[#A0A0A0] ${columns === 5 ? 'text-xs' : 'text-sm'}`}>
//               ${product.oldPrice}
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Product;