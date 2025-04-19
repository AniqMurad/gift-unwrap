import React, { useState, useEffect } from "react";
import SearchPageNavbar from '../components/SearchPageNavbar'
import Footer from '../components/Footer'
import { ArrowDown, FilterIcon, FiveBars, FourBars, HerCross, HerHorLine, HerLine, PagenextIcon, PageprevIcon, SquareIcon, ThreeBars } from "../components/icons";
import Product from "../components/Product";
import ProductData from "../components/ProductData";
import { useLocation } from 'react-router-dom';

const Giftforreligions = () => {

    const location = useLocation();
    const [columns, setColumns] = useState(4);
    const [prevColumns, setPrevColumns] = useState(4);
    const [selectedCategory, setSelectedCategory] = useState(''); // Tracks selected gift category
    const giftsForReligiousProducts = ProductData.giftsForReligions.filter(product =>
        selectedCategory === '' || product.keyGift === selectedCategory
    );
    // const giftsForHerProducts = ProductData.giftsForHer;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [selectedFilters, setSelectedFilters] = useState([]);
    // const [selectedCategory, setSelectedCategory] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;

    useEffect(() => {
        if (selectedFilters.length === 0 && !selectedCategory && minPrice === 0 && maxPrice === 1000) {
            setIsSidebarOpen(false);
        }
    }, [selectedFilters, selectedCategory, minPrice, maxPrice]);

    useEffect(() => {
        if (isSidebarOpen) {
            setPrevColumns(columns); // Store previous columns setting
            setColumns(3); // Force 3 columns when sidebar is open
        } else {
            setColumns(prevColumns); // Restore previous setting when sidebar closes
        }
    }, [isSidebarOpen]);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const categoryParam = queryParams.get('category');

        if (categoryParam) {
            setSelectedCategory(categoryParam);
        }
    }, [location.search]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
        if (!isSidebarOpen) {
            setPrevColumns(columns); // Pehle ka column store karna
            setColumns(3); // Sidebar open hone par 3 columns
        } else {
            setColumns(prevColumns); // Sidebar close hone par last selected column wapas
        }
    };


    const handleColumnChange = (col) => {
        if (!isSidebarOpen) {
            setColumns(col);
        } else {
            setPrevColumns(col); // Sidebar open ho toh bhi last selected column store rahe
        }
    };


    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handleMinChange = (e) => {
        const value = Number(e.target.value);
        if (value < maxPrice) setMinPrice(value);
    };

    const handleMaxChange = (e) => {
        const value = Number(e.target.value);
        if (value > minPrice) setMaxPrice(value);
    };

    const toggleFilter = (filter) => {
        setSelectedFilters((prev) =>
            prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
        );
    };

    const removeFilter = (filter) => {
        setSelectedFilters((prev) => prev.filter((f) => f !== filter));
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    // Function to clear all filters
    const clearAllFilters = () => {
        setSelectedCategory("");
        setSelectedFilters([]);
        setMinPrice(0);
        setMaxPrice(1000);
    };

    const handleMouseMove = (e, type) => {
        const slider = e.currentTarget.parentElement;
        const rect = slider.getBoundingClientRect();
        let newValue = Math.round(((e.clientX - rect.left) / rect.width) * 1000);

        if (type === "min" && newValue < maxPrice) {
            setMinPrice(newValue);
        } else if (type === "max" && newValue > minPrice) {
            setMaxPrice(newValue);
        }
    };

    const categories = [
        { name: "Bags", count: 112 },
        { name: "Books", count: 32 },
        { name: "Clothing", count: 42 },
        { name: "Chocolate & Sweets", count: 13 },
        { name: "Engraved Jewellery", count: 54 },
        { name: "Photo Frame", count: 93 },
        { name: "Fragrance", count: 52 },
        { name: "Flowers", count: 14 },
    ];

    const hobbies = [
        { name: "BBQ", count: 112 },
        { name: "Cooking", count: 32 },
        { name: "Decorations", count: 42 },
        { name: "Dining", count: 13 },
        { name: "Fashion", count: 54 },
        { name: "Food & Drinks", count: 93 },
        { name: "Office & School", count: 93 },
        { name: "Party", count: 93 },
        { name: "Reading", count: 93 },
    ];

    return (
        <div>

            <SearchPageNavbar title="Religious Gifts" titleHome="Home Page" />
            <div className='bg-[#FBF4E8] justify-center gap-8 flex text-[14px] font-semibold text-[#1F1F1F] uppercase py-8'>
                <p className={`cursor-pointer ${selectedCategory === 'eid' ? 'underline' : ''}`} onClick={() => handleCategorySelect('eid')}>Eid Gifts</p>
                <p className={`cursor-pointer ${selectedCategory === 'holi' ? 'underline' : ''}`} onClick={() => handleCategorySelect('holi')}>Holi Gifts</p>
                <p className={`cursor-pointer ${selectedCategory === 'diwali' ? 'underline' : ''}`} onClick={() => handleCategorySelect('diwali')}>Diwali Gifts</p>
                <p className={`cursor-pointer ${selectedCategory === 'navroz' ? 'underline' : ''}`} onClick={() => handleCategorySelect('navroz')}>Navroz Gifts</p>
            </div>

            <div className="px-16 py-10 flex justify-between">
                {isSidebarOpen && (
                    <div className="w-[270px] transition-all duration-300">
                        {/* Product Type */}
                        <div className="mb-6 pb-6 border-b border-[#E9E9E9]">
                            <h2 className="font-semibold text-lg mb-3">Products Type</h2>
                            <ul className="text-[#696C70] text-[16px]">
                                {categories.map((category) => (
                                    <li
                                        key={category.name}
                                        className="flex justify-between items-center cursor-pointer mb-3"
                                        onClick={() => setSelectedCategory(category.name)}
                                    >
                                        <span
                                            className={`${selectedCategory === category.name ? "text-black font-semibold underline" : ""
                                                }`}
                                        >
                                            {category.name}
                                        </span>
                                        <span className="text-[#A0A0A0]">({category.count})</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Price Range */}
                        <div className="mb-6 pb-6 border-b border-[#E9E9E9]">
                            <h2 className="font-semibold text-lg mb-3">Price Range</h2>

                            {/* Range Slider */}
                            <div className="relative w-full mb-4">
                                {/* Min Price Slider */}
                                <input
                                    type="range"
                                    min="0"
                                    max="1000"
                                    value={minPrice}
                                    onChange={handleMinChange}
                                    className="absolute w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                                />

                                {/* Max Price Slider */}
                                <input
                                    type="range"
                                    min="0"
                                    max="1000"
                                    value={maxPrice}
                                    onChange={handleMaxChange}
                                    className="absolute w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                                />

                                {/* Price Knobs */}
                                <div
                                    className="absolute top-[-8px] w-5 h-5 bg-white border-2 border-black rounded-full"
                                    style={{ left: `${(minPrice / 1000) * 100}%` }}
                                ></div>
                                <div
                                    className="absolute top-[-8px] w-5 h-5 bg-white border-2 border-black rounded-full"
                                    style={{ left: `${(maxPrice / 1000) * 100}%` }}
                                ></div>
                            </div>

                            {/* Price Inputs */}
                            <div className="flex justify-between mt-8">
                                <div>
                                    <p className="text-sm text-[#1F1F1F] mb-1">Min price</p>
                                    <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                                        <input
                                            type="number"
                                            value={minPrice}
                                            onChange={handleMinChange}
                                            className="w-16 text-lg font-semibold text-black outline-none"
                                        />
                                        <span className="text-[#A0A0A0] text-sm ml-2">PKR</span>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm text-[#1F1F1F] mb-1">Max price</p>
                                    <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                                        <input
                                            type="number"
                                            value={maxPrice}
                                            onChange={handleMaxChange}
                                            className="w-16 text-lg font-semibold text-black outline-none"
                                        />
                                        <span className="text-[#A0A0A0] text-sm ml-2">PKR</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hobbies & Interests */}
                        <div className="mb-6">
                            <h2 className="font-semibold text-lg mb-3">Hobbies & Interests</h2>
                            <ul className="text-[#696C70] text-[16px]">
                                {hobbies.map((hobby) => (
                                    <li key={hobby.name} className="flex justify-between items-center cursor-pointer mb-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedFilters.includes(hobby.name)}
                                            onChange={() => toggleFilter(hobby.name)}
                                            className="mr-2 w-4 h-4 accent-black"
                                        />
                                        <span
                                            className={`flex-1 ${selectedFilters.includes(hobby.name) ? "text-[#1F1F1F] font-medium" : ""
                                                }`}
                                        >
                                            {hobby.name}
                                        </span>
                                        <span className="text-[#A0A0A0]">({hobby.count})</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                <div className={`${isSidebarOpen ? "w-[960px]" : "w-full"} transition-all duration-300`}>
                    {/* filters */}
                    <div className="flex flex-col flex-wrap gap-3">
                        <div className="flex items-center justify-between space-x-6">
                            {/* Layout Switch Buttons */}
                            <div className="flex items-center space-x-4">
                                {!isSidebarOpen && (
                                    <button className="flex items-center gap-2 mr-3 text-[#1F1F1F]" onClick={toggleSidebar}>
                                        <FilterIcon />
                                        Filters
                                    </button>
                                )}
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

                                <div className="flex items-center ml-5 gap-2">
                                    <SquareIcon />
                                    <p className="">Show only products on sale</p>
                                </div>
                            </div>

                            {/* Filters */}
                            <div className="flex space-x-4">
                                <div className="flex justify-between items-center py-2 space-x-2">
                                    <p className="">Sort By</p>
                                </div>

                                <div className="flex justify-between items-center border border-[#E9E9E9] rounded-md px-4 w-[160px]">
                                    <p className="">Best Selling</p>
                                    <ArrowDown />
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
                        {giftsForReligiousProducts.map((product) => (
                            <Product key={product.id} product={product} columns={columns} />
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

export default Giftforreligions