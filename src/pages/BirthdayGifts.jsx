import React, { useState, useEffect } from "react";
import SearchPageNavbar from '../components/SearchPageNavbar';
import Footer from '../components/Footer';
import { ArrowDown, FiveBars, FourBars, HerCross, HerHorLine, HerLine, PagenextIcon, PageprevIcon, SquareIcon, ThreeBars } from "../components/icons";
import Product from "../components/Product";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Navbar from "@/components/Navbar";

const BirthdayGifts = () => {
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const [columns, setColumns] = useState(4);
    const [selectedCategory, setSelectedCategory] = useState('');
    const giftsForBirthdayProducts = products.filter(product =>
        selectedCategory === '' || product.keyGift === selectedCategory
    );
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;

    const category = "birthday";

    useEffect(() => {
        axios.get('http://localhost:5000/api/products')
            .then(res => {
                const categoryData = res.data.find(item => item.category === category);
                if (categoryData) {
                    setProducts(categoryData.products);
                }
            })
            .catch(err => console.error("Failed to load products:", err));
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
            <Navbar showSearchInput={false} bgColor="#FBF4E8" />
            <SearchPageNavbar title="Birthday Gifts" titleHome="Home Page" backgroundColor='#FBF4E8' />
            <div className='bg-[#FBF4E8] justify-center gap-2 sm:gap-4 lg:gap-8 flex flex-wrap text-xs sm:text-sm lg:text-[14px] font-semibold text-[#1F1F1F] uppercase py-4 sm:py-6 px-2 sm:px-4'>
                <p className={`cursor-pointer ${selectedCategory === 'his birthday' ? 'underline' : ''}`} onClick={() => handleCategorySelect('his birthday')}>
                    <span className="sm:hidden">His Birthday</span>
                    <span className="hidden sm:inline">His Birthday</span>
                </p>
                <p className={`cursor-pointer ${selectedCategory === 'her birthday' ? 'underline' : ''}`} onClick={() => handleCategorySelect('her birthday')}>
                    <span className="sm:hidden">Her Birthday</span>
                    <span className="hidden sm:inline">Her birthday</span>
                </p>
                <p className={`cursor-pointer ${selectedCategory === 'employee birthday' ? 'underline' : ''}`} onClick={() => handleCategorySelect('employee birthday')}>
                    <span className="sm:hidden">Employee</span>
                    <span className="hidden sm:inline">Employee Birthday</span>
                </p>
                <p className={`cursor-pointer ${selectedCategory === 'baby birthday' ? 'underline' : ''}`} onClick={() => handleCategorySelect('baby birthday')}>
                    <span className="sm:hidden">Baby</span>
                    <span className="hidden sm:inline">Babies Birthday</span>
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
                                            {selectedCategory === 'his birthday' ? 'His Birthday' : 
                                             selectedCategory === 'her birthday' ? 'Her Birthday' :
                                             selectedCategory === 'employee birthday' ? 'Employee' :
                                             selectedCategory === 'baby birthday' ? 'Baby' : selectedCategory}
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
                    <div className={`justify-items-center grid grid-cols-2 md:grid-cols-3 lg:grid-cols-${columns} gap-3 sm:gap-4 lg:gap-6 mt-6 sm:mt-8 lg:mt-10 transition-all duration-300`}>
                        {giftsForBirthdayProducts.map((product) => (
                            <Product
                                key={product.id}
                                product={{ ...product, category: "birthday" }}
                                columns={columns}
                            />
                        ))}
                    </div>

                    {/* paging */}
                    {/* <div className="flex justify-center mt-10">
                        <div className="flex items-center space-x-1 border border-gray-400 rounded-md px-2 py-1">
                            {currentPage > 1 && (
                                <button onClick={goToPreviousPage} className="px-3 py-1 border-r border-gray-400">
                                    <PageprevIcon />
                                </button>
                            )}

                            <button className="px-3 py-1 bg-black text-white rounded">{currentPage}</button>

                            {currentPage < totalPages && (
                                <button onClick={goToNextPage} className="px-3 py-1 border-l border-gray-400">
                                    <PagenextIcon />
                                </button>
                            )}
                        </div>
                    </div> */}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default BirthdayGifts;