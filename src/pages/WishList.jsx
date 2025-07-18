import React, { useState } from 'react';
import SearchPageNavbar from '../components/SearchPageNavbar';
import Product from '../components/Product';
import Footer from '../components/Footer';
import { useWishlist } from '../context/WishlistContext';
import { Buttons } from '../components/Buttons';
import { ArrowDown, FiveBars, FourBars, ThreeBars } from '../components/icons';
import Navbar from '@/components/Navbar';

const WishList = () => {
    const { wishlist } = useWishlist();
    const [columns, setColumns] = useState(4); // Default 4 columns

    return (
        <div className='w-full h-auto'>
            <Navbar showSearchInput={false} bgColor="#FBF4E8" />
            <SearchPageNavbar title="Wish List" titleHome="Home Page" backgroundColor='#FBF4E8' />

            <div className='px-16 py-4 mt-10 mb-10'>
                <div className="flex items-center justify-between py-4 space-x-6">
                    <div className="flex space-x-2">
                        <div className={`border ${columns === 3 ? 'bg-black' : 'border-[#E9E9E9]'} p-1 rounded cursor-pointer`} onClick={() => setColumns(3)}>
                            <ThreeBars fillColor={columns === 3 ? "white" : "#A0A0A0"} />
                        </div>
                        <div className={`border ${columns === 4 ? 'bg-black' : 'border-[#E9E9E9]'} p-1 rounded cursor-pointer`} onClick={() => setColumns(4)}>
                            <FourBars fillColor={columns === 4 ? "white" : "#A0A0A0"} />
                        </div>
                        <div className={`border ${columns === 5 ? 'bg-black' : 'border-[#E9E9E9]'} p-1 rounded cursor-pointer`} onClick={() => setColumns(5)}>
                            <FiveBars fillColor={columns === 5 ? "white" : "#A0A0A0"} />
                        </div>
                    </div>

                    {/* <div className="flex space-x-4">
                        <div className="flex justify-between items-center border border-[#E9E9E9] rounded-md px-4 py-2 space-x-2 w-[160px]">
                            <p className="text-gray-700">Type</p>
                            <ArrowDown />
                        </div>

                        <div className="flex justify-between items-center border border-[#E9E9E9] rounded-md px-4 py-2 space-x-2 w-[160px]">
                            <p className="text-gray-700">Best Selling</p>
                            <ArrowDown />
                        </div>
                    </div> */}
                </div>

                <div className=''>
                    {wishlist.length === 0 ? (
                        <p className="text-center mt-6 text-4xl font-bold">No items in wishlist</p>
                    ) : (
                        <div className={`justify-items-center grid gap-6 mt-6 ${columns === 3 ? 'grid-cols-3' : columns === 4 ? 'grid-cols-4' : 'grid-cols-5'}`}>
                            {wishlist.map((item) => (
                                <div key={item.identifier} className={`${columns === 5 ? 'scale-90' : 'scale-100'} transition-transform`}>
                                    <Product product={item} columns={columns} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex justify-center mt-6 mb-6">
                    <Buttons />
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default WishList;
