import React, { useState, useEffect } from 'react';
import SearchPageNavbar from '../components/SearchPageNavbar';
import Product from '../components/Product';
import Footer from '../components/Footer';
import { Buttons } from '../components/Buttons';
import Navbar from '@/components/Navbar';
import Loader from '@/components/Loader';
import { useSearchParams } from "react-router-dom";

const SearchOutput = () => {

    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const filterByQuery = (products, query) => {
        if (!query.trim()) return products;
        const q = query.toLowerCase();
        return products.filter(product => product.name.toLowerCase().includes(q));
    };
    
    useEffect(() => {
        const query = searchParams.get("query") || '';
        setSearchQuery(query);
    
        // Refetching only if allProducts is empty (first load)
        if (allProducts.length === 0) {
            setLoading(true); // Show loader
            fetch('https://giftunwrapbackend.vercel.app/api/products/')
                .then(res => {
                    if (!res.ok) throw new Error('Failed to fetch products');
                    return res.json();
                })
                .then(data => {
                    const allProductsFlat = data.flatMap(category => category.products);
                    setAllProducts(allProductsFlat);
                    setFilteredProducts(filterByQuery(allProductsFlat, query));
                    setLoading(false); // Hide loader on success
                })
                .catch(err => {
                    setError(err.message);
                    setLoading(false); // Hide loader on error
                });
        } else {
            // If products already fetched, just filter
            setFilteredProducts(filterByQuery(allProducts, query));
        }
    }, [searchParams]);  // 👈 triggers when URL query changes
    

    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (!query.trim()) {
            setFilteredProducts(allProducts);
        } else {
            const q = query.toLowerCase();
            const results = allProducts.filter(product =>
                product.name.toLowerCase().includes(q)
            );
            setFilteredProducts(results);
        }
    };

    // Debug log to verify filtered products before render
    console.log('Filtered Products:', filteredProducts);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div>
                <Navbar showSearchInput={false} bgColor="#FBF4E8" />
                <SearchPageNavbar title="Search Result" titleHome="Home Page" backgroundColor='#FBF4E8' />
                <div className="text-center py-10 sm:py-16 lg:py-20 text-red-600">
                    <p className="text-sm sm:text-base">Error: {error}</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className='w-full h-auto'>
            <Navbar showSearchInput={false} bgColor="#FBF4E8" />
            <SearchPageNavbar title="Search Result" titleHome="Home Page" backgroundColor='#FBF4E8' />

            {/* Search Results Header */}
            <div className='text-center py-4 sm:py-6 lg:py-8 px-4'>
                <h2 className='text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-4'>
                    {searchQuery.trim()
                        ? `Found ${filteredProducts.length} result${filteredProducts.length !== 1 ? 's' : ''} for "${searchQuery.trim()}"`
                        : `Showing all products (${filteredProducts.length})`}
                </h2>

                {/* Responsive Search Input */}
                <div className='flex items-center justify-center gap-0 text-sm text-gray-600'>
                    <input
                        className='rounded-l-md text-[#A0A0A0] w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] border border-[#E9E9E9] py-2 px-3 sm:px-4 text-sm sm:text-base outline-none focus:border-gray-400'
                        placeholder='What are you looking for today?'
                        value={searchQuery}
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') e.preventDefault();
                        }}
                    />
                </div>
            </div>

            {/* Products Grid Container */}
            <div className='px-4 sm:px-8 lg:px-16 py-4 mb-6 sm:mb-8 lg:mb-10'>
                {filteredProducts.length > 0 ? (
                    <>
                        {/* Section Title */}
                        <h2 className='font-bold text-sm sm:text-base lg:text-lg mb-4 sm:mb-6'>
                            Product Search: {searchQuery.trim() || 'All Products'}
                        </h2>
                        
                        {/* Responsive Products Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
                            {filteredProducts.map((product, index) => (
                                <Product 
                                    key={`${product.id}-${index}`} 
                                    product={product}
                                    columns="responsive" // Pass responsive prop to Product component
                                />
                            ))}
                        </div>

                        {/* Pagination/Load More Buttons */}
                        <div className="flex justify-center mt-6 sm:mt-8 lg:mt-10 mb-4 sm:mb-6">
                            <Buttons />
                        </div>
                    </>
                ) : (
                    /* No Results Message */
                    <div className='text-center text-gray-600 mt-6 sm:mt-8 lg:mt-10 px-4'>
                        <p className='text-sm sm:text-base lg:text-lg'>
                            No results found for "{searchQuery.trim()}".
                        </p>
                        <p className='text-xs sm:text-sm lg:text-base mt-2 text-gray-500'>
                            Please try a different search term.
                        </p>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default SearchOutput;
