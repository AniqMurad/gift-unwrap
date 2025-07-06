import React, { useState, useEffect } from "react";
import SearchPageNavbar from '../components/SearchPageNavbar';
import Footer from '../components/Footer';
import { ArrowDown, FiveBars, FourBars, HerLine, PagenextIcon, PageprevIcon, SquareIcon, ThreeBars } from "../components/icons";
import Product from "../components/Product";
import Loader from "../components/Loader";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Navbar from "@/components/Navbar";

const Forcompanies = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const [columns, setColumns] = useState(4); // Default to 4 columns
    const [selectedCategory, setSelectedCategory] = useState(''); // Tracks selected gift category
    const giftsForCompanyProducts = products.filter(product =>
        selectedCategory === '' || product.keyGift === selectedCategory
    );
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;

    const category = "giftsForCompany";

    useEffect(() => {
        setLoading(true);
        axios.get('https://giftunwrapbackend.vercel.app/api/products')
            .then(res => {
                const categoryData = res.data.find(item => item.category === category);
                if (categoryData) {
                    setProducts(categoryData.products);
                }
            })
            .catch(err => console.error("Failed to load products:", err))
            .finally(() => setLoading(false));
    }, [category]);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const categoryParam = queryParams.get('category');

        if (categoryParam) {
            setSelectedCategory(categoryParam);
        }
    }, [location.search]);

    const handleColumnChange = (col) => {
        setColumns(col);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const removeFilter = (filter) => {
        setSelectedFilters((prev) => prev.filter((f) => f !== filter));
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const clearAllFilters = () => {
        setSelectedCategory("");
        setSelectedFilters([]);
        setMinPrice(0);
        setMaxPrice(1000);
    };

    return (
        <div>
            {loading && <Loader />}
            <Navbar showSearchInput={false} bgColor="#FBF4E8" />
            <SearchPageNavbar title="Gifts For Companies" titleHome="Home Page" backgroundColor='#FBF4E8' />
            <div className='bg-[#FBF4E8] justify-center gap-2 sm:gap-4 lg:gap-8 flex flex-wrap text-xs sm:text-sm lg:text-[14px] font-semibold text-[#1F1F1F] uppercase py-4 sm:py-6 px-2 sm:px-4'>
                <p className={`cursor-pointer ${selectedCategory === 'newhire' ? 'underline' : ''}`} onClick={() => handleCategorySelect('newhire')}>
                    <span className="sm:hidden">New Hire</span>
                    <span className="hidden sm:inline">Gifts For New Hire</span>
                </p>
                <p className={`cursor-pointer ${selectedCategory === 'ocassion' ? 'underline' : ''}`} onClick={() => handleCategorySelect('ocassion')}>
                    <span className="sm:hidden">Occasions</span>
                    <span className="hidden sm:inline">Gifts For Occasions</span>
                </p>
                <p className={`cursor-pointer ${selectedCategory === 'farewell' ? 'underline' : ''}`} onClick={() => handleCategorySelect('farewell')}>
                    <span className="sm:hidden">Farewell</span>
                    <span className="hidden sm:inline">Gifts For Farewell</span>
                </p>
                <p className={`cursor-pointer ${selectedCategory === 'achievement' ? 'underline' : ''}`} onClick={() => handleCategorySelect('achievement')}>
                    <span className="sm:hidden">Achievement</span>
                    <span className="hidden sm:inline">Gifts for Achievement</span>
                </p>
                <p className={`cursor-pointer ${selectedCategory === 'workanniversary' ? 'underline' : ''}`} onClick={() => handleCategorySelect('workanniversary')}>
                    <span className="sm:hidden">Anniversary</span>
                    <span className="hidden sm:inline">Work Anniversary Gifts</span>
                </p>
            </div>

            <div className="px-4 sm:px-8 lg:px-16 py-6 sm:py-8 lg:py-10 flex justify-between">
                <div className="w-full transition-all duration-300">
                    {/* filters */}
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
                            {/* Layout Switch Buttons - Hidden on mobile */}
                            <div className="hidden sm:flex items-center space-x-4">
                                <div className="flex space-x-2">
                                    <div className={`border ${columns === 3 ? 'bg-black' : 'border-[#E9E9E9]'} p-1 rounded cursor-pointer`}
                                        onClick={() => handleColumnChange(3)}>
                                        <ThreeBars fillColor={columns === 3 ? "white" : "#A0A0A0"} />
                                    </div>
                                    <div className={`border ${columns === 4 ? 'bg-black' : 'border-[#E9E9E9]'} p-1 rounded cursor-pointer`}
                                        onClick={() => handleColumnChange(4)}>
                                        <FourBars fillColor={columns === 4 ? "white" : "#A0A0A0"} />
                                    </div>
                                    <div className={`border ${columns === 5 ? 'bg-black' : 'border-[#E9E9E9]'} p-1 rounded cursor-pointer`}
                                        onClick={() => handleColumnChange(5)}>
                                        <FiveBars fillColor={columns === 5 ? "white" : "#A0A0A0"} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 sm:gap-3 items-center mt-2">
                            <span className="text-[#696C70] font-medium text-xs sm:text-sm">{selectedFilters.length > 0 || selectedCategory ? "18 Products Found:" : ""}</span>

                            <HerLine />
                            <div className="flex flex-wrap gap-1 sm:gap-2">
                                {/* Selected Category */}
                                {selectedCategory && (
                                    <span className="px-2 sm:px-3 py-1 bg-[#F9F1F0] text-black rounded-full flex items-center text-xs sm:text-sm">
                                        <button onClick={() => setSelectedCategory("")} className="mr-1 sm:mr-2 text-gray-500 hover:text-black">X</button>
                                        <span className="sm:hidden">
                                            {selectedCategory === 'newhire' ? 'New Hire' : 
                                             selectedCategory === 'ocassion' ? 'Occasions' :
                                             selectedCategory === 'farewell' ? 'Farewell' :
                                             selectedCategory === 'achievement' ? 'Achievement' :
                                             selectedCategory === 'workanniversary' ? 'Anniversary' : selectedCategory}
                                        </span>
                                        <span className="hidden sm:inline">{selectedCategory}</span>
                                    </span>
                                )}

                                {/* Price Range */}
                                {(minPrice > 0 || maxPrice < 1000) && (
                                    <span className="px-2 sm:px-3 py-1 bg-[#D2EF9A] text-[#1F1F1F] rounded-full flex items-center text-xs sm:text-sm">
                                        <button onClick={() => { setMinPrice(0); setMaxPrice(1000); }} className="mr-1 sm:mr-2 text-green-800 hover:text-green-900">-</button>
                                        <span className="sm:hidden">₨{minPrice}-{maxPrice}</span>
                                        <span className="hidden sm:inline">PKR {minPrice} - PKR {maxPrice}</span>
                                    </span>
                                )}

                                {/* Selected Hobbies & Interests */}
                                {selectedFilters.map((filter) => (
                                    <span key={filter} className="px-2 sm:px-3 py-1 bg-[#F9F1F0] text-black rounded-full flex items-center text-xs sm:text-sm">
                                        <button onClick={() => removeFilter(filter)} className="mr-1 sm:mr-2 text-gray-500 hover:text-black">X</button>
                                        {filter}
                                    </span>
                                ))}
                            </div>

                            {/* Clear All Button */}
                            {(selectedFilters.length > 0 || selectedCategory || minPrice > 0 || maxPrice < 1000) && (
                                <button onClick={clearAllFilters} className="flex items-center gap-1 sm:gap-2 border border-[#DB4444] px-2 sm:px-3 py-1 text-[#DB4444] bg-[#F9F1F0] rounded-full text-xs sm:text-sm">
                                    <span className="sm:hidden">Clear</span>
                                    <span className="hidden sm:inline">X Clear All</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* products */}
                    {giftsForCompanyProducts.length > 0 ? (
                        <div className={`justify-items-center grid grid-cols-2 md:grid-cols-3 lg:grid-cols-${columns} gap-3 sm:gap-4 lg:gap-6 mt-6 sm:mt-8 lg:mt-10 transition-all duration-300`}>
                            {giftsForCompanyProducts.map((product) => (
                                <Product
                                    key={product.id}
                                    product={{ ...product, category: "giftsForCompany" }}
                                    columns={columns}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 sm:py-20 lg:py-24">
                            <div className="text-center">
                                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-600 mb-4">
                                    No Products Available
                                </h3>
                                <p className="text-sm sm:text-base text-gray-500">
                                    Sorry, there are no products available in this category at the moment.
                                </p>
                            </div>
                        </div>
                    )}

                   
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Forcompanies;