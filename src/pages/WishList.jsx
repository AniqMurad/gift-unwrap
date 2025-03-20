import React from 'react'
import SearchPageNavbar from '../components/SearchPageNavbar'
import Product from '../components/Product'
import Footer from '../components/Footer'
import { Buttons } from '../components/Buttons'
import { ArrowDown, FiveBars, FourBars, ThreeBars } from '../components/icons'

const WishList = () => {
    return (
        <div className='w-full h-auto'>
            <SearchPageNavbar title="Wish List" titleHome="Home Page" />

            <div className='px-16 py-4 mt-10 mb-10'>
                <div className="flex items-center justify-between py-4 space-x-6">
                    {/* Layout Switch Buttons */}
                    <div className="flex space-x-2">
                        <ThreeBars />
                        <FourBars />
                        <FiveBars className="text-gray-500" />
                    </div>

                    {/* Filters */}
                    <div className="flex space-x-4">
                        <div className="flex justify-between items-center border border-[#E9E9E9] rounded-md px-4 py-2 space-x-2 w-[160px]">
                            <p className="text-gray-700">Type</p>
                            <ArrowDown />
                        </div>

                        <div className="flex justify-between items-center border border-[#E9E9E9] rounded-md px-4 py-2 space-x-2 w-[160px]">
                            <p className="text-gray-700">Best Selling</p>
                            <ArrowDown />
                        </div>
                    </div>
                </div>

                {/* Grid layout instead of flex */}
                <div className='grid grid-cols-4 gap-6 mt-6'>
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                </div>

                {/* Centered Load More Button */}
                <div className="flex justify-center mt-6 mb-6">
                    <Buttons />
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default WishList