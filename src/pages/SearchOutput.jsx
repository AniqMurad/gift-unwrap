import React, { useState, useEffect } from 'react';
import SearchPageNavbar from '../components/SearchPageNavbar';
import Product from '../components/Product';
import Footer from '../components/Footer';
import { Buttons } from '../components/Buttons';
import Navbar from '@/components/Navbar';
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
            fetch('https://giftunwrap-puce.vercel.app/api/products/')
                .then(res => {
                    if (!res.ok) throw new Error('Failed to fetch products');
                    return res.json();
                })
                .then(data => {
                    const allProductsFlat = data.flatMap(category => category.products);
                    setAllProducts(allProductsFlat);
                    setFilteredProducts(filterByQuery(allProductsFlat, query));
                    setLoading(false);
                })
                .catch(err => {
                    setError(err.message);
                    setLoading(false);
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
        return (
            <div className="text-center py-20">
                <p>Loading products...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20 text-red-600">
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <div className='w-full h-auto'>
            <Navbar showSearchInput={false} bgColor="#FBF4E8" />
            <SearchPageNavbar title="Search Result" titleHome="Home Page" backgroundColor='#FBF4E8' />

            <div className='text-center py-8'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                    {searchQuery.trim()
                        ? `Found ${filteredProducts.length} result${filteredProducts.length !== 1 ? 's' : ''} for "${searchQuery.trim()}"`
                        : `Showing all products (${filteredProducts.length})`}
                </h2>

                <div className='flex items-center justify-center gap-0 text-sm text-gray-600 mt-4'>
                    <input
                        className='rounded-l-md text-[#A0A0A0] w-[400px] border border-[#E9E9E9] py-2 px-4 outline-none focus:border-gray-400'
                        placeholder='What are you looking for today?'
                        value={searchQuery}
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') e.preventDefault();
                        }}
                    />
                </div>
            </div>

            <div className='px-16 py-4 mb-10'>
                {filteredProducts.length > 0 ? (
                    <>
                        <h2 className='font-bold'>Product Search: {searchQuery.trim() || 'All Products'}</h2>
                        <div className="grid grid-cols-4 gap-6 mt-6">
                            {filteredProducts.map((product, index) => (
                                <Product key={`${product.id}-${index}`} product={product} />
                            ))}
                        </div>

                        {/* === DEBUG FALLBACK: simple product info below, remove later === */}
                        {/* <div className="mt-10 border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Debug: Raw Product Info</h3>
              <div className="grid grid-cols-2 gap-4">
                {filteredProducts.map((product, index) => (
                  <div key={`debug-${product.id}-${index}`} className="border p-4 rounded shadow">
                    <h4 className="font-bold">{product.name}</h4>
                    <p>Price: ${product.price}</p>
                    <p>{product.shortDescription || 'No description'}</p>
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-24 h-24 object-cover mt-2"
                      />
                    ) : (
                      <p className="text-sm italic text-gray-500">No image available</p>
                    )}
                  </div>
                ))}
              </div>
            </div> */}

                        <div className="flex justify-center mt-6 mb-6">
                            <Buttons />
                        </div>
                    </>
                ) : (
                    <p className='text-center text-gray-600 mt-10'>No results found for "{searchQuery.trim()}". Please try a different search.</p>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default SearchOutput;
