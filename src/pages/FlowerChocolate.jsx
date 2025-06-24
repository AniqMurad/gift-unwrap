import React, { useState, useEffect } from "react";
import SearchPageNavbar from '../components/SearchPageNavbar'
import Footer from '../components/Footer'
import { ArrowDown, FilterIcon, FiveBars, FourBars, HerCross, HerHorLine, HerLine, PagenextIcon, PageprevIcon, SquareIcon, ThreeBars } from "../components/icons";
import Product from "../components/Product";
// import ProductData from "../components/ProductData";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Navbar from "@/components/Navbar";

const FlowerChocolate = () => {

    const [products, setProducts] = useState([]);
    const location = useLocation();
    const [columns, setColumns] = useState(4); // Default to 4 columns
    const [selectedCategory, setSelectedCategory] = useState(''); // Tracks selected gift category
    const giftsForEveryoneProducts = products.filter(product =>
        selectedCategory === '' || product.keyGift === selectedCategory
    );
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;

    const category = "giftsForEveryone";

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
            <SearchPageNavbar title="Gifts For Everyone" titleHome="Home Page" backgroundColor='#FBF4E8' />
            <div className='bg-[#FBF4E8] justify-center gap-8 flex text-[14px] font-semibold text-[#1F1F1F] uppercase py-6'>
                <p className={`cursor-pointer ${selectedCategory === 'couple' ? 'underline' : ''}`} onClick={() => handleCategorySelect('couple')}>Gifts For Couples</p>
                <p className={`cursor-pointer ${selectedCategory === 'teacher' ? 'underline' : ''}`} onClick={() => handleCategorySelect('teacher')}>Gifts For Teachers</p>
                <p className={`cursor-pointer ${selectedCategory === 'relative' ? 'underline' : ''}`} onClick={() => handleCategorySelect('relative')}>Gifts For Relatives</p>
            </div>

            <div className="px-16 py-10 flex justify-between">
                {/* Left sidebar is removed from here */}

                <div className="w-full transition-all duration-300"> {/* Adjusted width to w-full */}
                    {/* filters */}
                    <div className="flex flex-col flex-wrap gap-3">
                        <div className="flex items-center justify-between space-x-6">
                            {/* Layout Switch Buttons */}
                            <div className="flex items-center space-x-4">
                                {/* Removed Filters button */}
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

                        <div className="flex gap-3 items-center mt-2">
                            <span className="text-[#696C70] font-medium">{selectedFilters.length > 0 || selectedCategory ? "18 Products Found:" : ""}</span>

                            <HerLine />
                            <div className="flex gap-2">
                                {/* Selected Category */}
                                {selectedCategory && (
                                    <span className="px-3 py-1 bg-[#F9F1F0] text-black rounded-full flex items-center">
                                        <button onClick={() => setSelectedCategory("")} className="mr-2 text-gray-500 hover:text-black"><HerCross strokeColor="#1F1F1F" /></button>
                                        {selectedCategory}

                                    </span>
                                )}

                                {/* Price Range */}
                                {(minPrice > 0 || maxPrice < 1000) && (
                                    <span className="px-3 py-1 bg-[#D2EF9A] text-[#1F1F1F] rounded-full flex items-center">
                                        <button onClick={() => { setMinPrice(0); setMaxPrice(1000); }} className="mr-2 text-green-800 hover:text-green-900"><HerHorLine /></button>
                                        PKR {minPrice} - PKR {maxPrice}
                                    </span>
                                )}

                                {/* Selected Hobbies & Interests */}
                                {selectedFilters.map((filter) => (
                                    <span key={filter} className="px-3 py-1 bg-[#F9F1F0] text-black rounded-full flex items-center">
                                        <button onClick={() => removeFilter(filter)} className="mr-2 text-gray-500 hover:text-black"><HerCross strokeColor="#1F1F1F" /></button>
                                        {filter}
                                    </span>
                                ))}
                            </div>

                            {/* Clear All Button */}
                            {(selectedFilters.length > 0 || selectedCategory || minPrice > 0 || maxPrice < 1000) && (
                                <button onClick={clearAllFilters} className="flex items-center gap-2 border border-[#DB4444] px-3 py-1 text-[#DB4444] bg-[#F9F1F0] rounded-full ml-4">
                                    <HerCross strokeColor="#DB4444" /> Clear All
                                </button>
                            )}

                        </div>
                    </div>

                    {/* products */}
                    <div className={`justify-items-center grid grid-cols-${columns} gap-6 mt-10 transition-all duration-300`}>
                        {giftsForEveryoneProducts.map((product) => (
                            <Product
                                key={product.id}
                                product={{ ...product, category: "giftsForEveryone" }}
                                columns={columns}
                            />
                        ))}
                    </div>

                    {/* paging */}
                    <div className="flex justify-center mt-10">
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
                    </div>
                </div>
            </div>

            <Footer />

        </div>
    )
}

export default FlowerChocolate
