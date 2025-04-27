import React from 'react'
import SearchPageNavbar from '../components/SearchPageNavbar'
import Product from '../components/Product'
import Footer from '../components/Footer'
import { Buttons } from '../components/Buttons'
import ProductData from "../components/ProductData";

const SearchOutput = () => {
    const chocoProducts = ProductData.Chocolates;

    return (
        <div className='w-full h-auto'>
            <SearchPageNavbar title="Search Result" titleHome="Home Page" backgroundColor = '#FBF4E8'/>

            <div className='text-center py-8'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                    Found {chocoProducts.length} Results For "Chocolates & Sweets"
                </h2>
                <div className='flex items-center justify-center gap-0 text-sm text-gray-600 mt-4'>
                    <input
                        className='rounded-l-md text-[#A0A0A0] w-[400px] border border-[#E9E9E9] py-2 px-4 outline-none focus:border-gray-400'
                        placeholder='What are you looking for today?'
                    />
                    <button className='rounded-r-md text-sm font-medium border border-black bg-black text-white py-2 px-6'>
                        SEARCH
                    </button>
                </div>
            </div>

            <div className='px-16 py-4 mb-10'>
                <h2 className=' font-bold'>Product Search: Chocolates & Sweets</h2>

                {/* Grid layout instead of flex */}
                {/* <div className='grid grid-cols-4 gap-6 mt-6'>
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                </div> */}

                <div className="grid grid-cols-4 gap-6 mt-6">
                    {chocoProducts.map((product) => (
                        <Product key={product.id} product={product} />
                    ))}
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

export default SearchOutput