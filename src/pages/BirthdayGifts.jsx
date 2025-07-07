import React, { useState, useEffect } from "react";
import SearchPageNavbar from '../components/SearchPageNavbar';
import Footer from '../components/Footer';
import { FiveBars, FourBars, HerCross, HerHorLine, HerLine, ThreeBars } from "../components/icons";
import Product from "../components/Product";
import Loader from "../components/Loader";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Navbar from "@/components/Navbar";

const BirthdayGifts = () => {
    const [birthdayProducts, setBirthdayProducts] = useState([]);
    const [herProducts, setHerProducts] = useState([]);
    const [himProducts, setHimProducts] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const [columns, setColumns] = useState(4);
    const [selectedCategory, setSelectedCategory] = useState(''); // Can be 'his birthday', 'her birthday', 'employee birthday', 'baby birthday', or empty for all
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [selectedFilters, setSelectedFilters] = useState([]); // This will likely be for general filters, not categories

    // Fetch products for all relevant categories
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://giftunwrapbackend.vercel.app/api/products');
                const allCategoriesData = response.data;

                const birthdayData = allCategoriesData.find(item => item.category === "birthday");
                if (birthdayData) {
                    setBirthdayProducts(birthdayData.products);
                }

                const giftsForHerData = allCategoriesData.find(item => item.category === "giftsForHer");
                if (giftsForHerData) {
                    setHerProducts(giftsForHerData.products);
                }

                const giftsForHimData = allCategoriesData.find(item => item.category === "giftsForHim");
                if (giftsForHimData) {
                    setHimProducts(giftsForHimData.products);
                }

            } catch (err) {
                console.error("Failed to load products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Effect to set the selected category from URL params and update displayed products
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const categoryParam = queryParams.get('category');
        if (categoryParam) {
            setSelectedCategory(categoryParam);
        } else {
            setSelectedCategory(''); // Reset if no category in URL
        }
    }, [location.search]);

    // Effect to filter and set displayProducts based on selectedCategory and fetched products
    useEffect(() => {
        let productsToDisplay = [];

        if (selectedCategory === 'his birthday') {
            productsToDisplay = himProducts.filter(product => product.keyGift === 'birthday' || product.occasion === 'birthday'); // Assuming keyGift or occasion for birthday
        } else if (selectedCategory === 'her birthday') {
            productsToDisplay = herProducts.filter(product => product.keyGift === 'birthday' || product.occasion === 'birthday'); // Assuming keyGift or occasion for birthday
        } else if (selectedCategory === 'employee birthday' || selectedCategory === 'baby birthday') {
            // These would typically come from the 'birthday' category in your data structure
            productsToDisplay = birthdayProducts.filter(product => product.keyGift === selectedCategory);
        } else {
            // If no specific category is selected, display all birthday, her, and him products
            // You might want to refine this logic based on how you want to present "all"
            productsToDisplay = [...birthdayProducts, ...herProducts, ...himProducts];
        }

        // Apply additional filters if any (minPrice, maxPrice, selectedFilters which are not categories)
        productsToDisplay = productsToDisplay.filter(product =>
            product.price >= minPrice && product.price <= maxPrice &&
            (selectedFilters.length === 0 || selectedFilters.some(filter => product.tags && product.tags.includes(filter))) // Example: assuming products have 'tags' array
        );

        // Remove duplicates if any (e.g., a product might be in 'giftsForHer' and also tagged as 'birthday')
        const uniqueProducts = [];
        const productIds = new Set();
        productsToDisplay.forEach(product => {
            if (!productIds.has(product.id)) {
                uniqueProducts.push(product);
                productIds.add(product.id);
            }
        });

        setDisplayProducts(uniqueProducts);

    }, [selectedCategory, birthdayProducts, herProducts, himProducts, minPrice, maxPrice, selectedFilters]);


    const handleColumnChange = (col) => {
        setColumns(col);
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
            <SearchPageNavbar title="Birthday Gifts" titleHome="Home Page" backgroundColor='#FBF4E8' />
            <div className='bg-[#FBF4E8] justify-center gap-2 sm:gap-4 lg:gap-8 flex flex-wrap text-xs sm:text-sm lg:text-[14px] font-semibold text-[#1F1F1F] uppercase py-4 sm:py-6 px-2 sm:px-4'>
                <p className={`cursor-pointer ${selectedCategory === 'his birthday' ? 'underline' : ''}`} onClick={() => handleCategorySelect('his birthday')}>
                    <span className="sm:hidden">His Birthday</span>
                    <span className="hidden sm:inline">His Birthday</span>
                </p>
                <p className={`cursor-pointer ${selectedCategory === 'her birthday' ? 'underline' : ''}`} onClick={() => handleCategorySelect('her birthday')}>
                    <span className="sm:hidden">Her Birthday</span>
                    <span className="hidden sm:inline">Her Birthday</span>
                </p>
                <p className={`cursor-pointer ${selectedCategory === 'employee birthday' ? 'underline' : ''}`} onClick={() => handleCategorySelect('employee birthday')}>
                    <span className="sm:hidden">Employee</span>
                    <span className="hidden sm:inline">Employee Birthday</span>
                </p>
                <p className={`cursor-pointer ${selectedCategory === 'baby birthday' ? 'underline' : ''}`} onClick={() => handleCategorySelect('baby birthday')}>
                    <span className="sm:hidden">Baby</span>
                    <span className="hidden sm:inline">Babies Birthday</span>
                </p>
                <p className={`cursor-pointer ${selectedCategory === '' ? 'underline' : ''}`} onClick={() => handleCategorySelect('')}>
                    <span className="sm:hidden">All</span>
                    <span className="hidden sm:inline">All Birthday Gifts</span>
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
                            <span className="text-[#696C70] font-medium text-xs sm:text-sm">{displayProducts.length > 0 ? `${displayProducts.length} Products Found:` : ""}</span>

                            <HerLine />
                            <div className="flex flex-wrap gap-1 sm:gap-2">
                                {/* Selected Category */}
                                {selectedCategory && (
                                    <span className="px-2 sm:px-3 py-1 bg-[#F9F1F0] text-black rounded-full flex items-center text-xs sm:text-sm">
                                        <button onClick={() => setSelectedCategory("")} className="mr-1 sm:mr-2 text-gray-500 hover:text-black">X</button>
                                        <span className="sm:hidden">
                                            {selectedCategory === 'his birthday' ? 'His Bday' :
                                                selectedCategory === 'her birthday' ? 'Her Bday' :
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
                    {displayProducts.length > 0 ? (
                        <div className={`justify-items-center grid grid-cols-2 md:grid-cols-3 lg:grid-cols-${columns} gap-3 sm:gap-4 lg:gap-6 mt-6 sm:mt-8 lg:mt-10 transition-all duration-300`}>
                            {displayProducts.map((product) => (
                                <Product
                                    key={product.id}
                                    product={product} // Pass the entire product object
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
    );
};

export default BirthdayGifts;