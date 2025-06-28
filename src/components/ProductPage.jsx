import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Product';

const ProductPage = ({ title, category }) => {
    const [selectedSubcategory, setSelectedSubcategory] = useState("All");
    const [products, setProducts] = useState([]);
    const [randomFour, setRandomFour] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/products')
            .then(res => {
                const categoryData = res.data.find(item => item.category === category);
                if (categoryData && Array.isArray(categoryData.products)) {
                    setProducts(categoryData.products);
                }
            })
            .catch(err => console.error("Failed to load products:", err));
    }, [category]);

    useEffect(() => {
        if (selectedSubcategory === "All" && products.length) {
            const shuffled = [...products].sort(() => 0.5 - Math.random());
            setRandomFour(shuffled.slice(0, 4));
        }
    }, [products, selectedSubcategory]);

    const handleSubcategoryClick = (sub) => {
        setSelectedSubcategory(sub);
        if (sub === "All" && products.length) {
            const shuffled = [...products].sort(() => 0.5 - Math.random());
            setRandomFour(shuffled.slice(0, 4));
        }
    };

    const subcategories = [
        "All",
        ...new Set(
            products
                .map(item => item.keyGift?.trim())
                .filter(Boolean)
        )
    ];

    const filteredProducts = selectedSubcategory === "All"
        ? randomFour
        : products.filter(item =>
            item.keyGift?.toLowerCase().trim() === selectedSubcategory.toLowerCase().trim()
        );

    return (
        <div className='px-4 sm:px-6 lg:px-16 py-4'>
            <div className='flex flex-col lg:flex-row justify-between gap-4'>
                <h2 className="text-3xl font-bold">{title}</h2>

                {/* Filter: Hidden below lg */}
                <div className='hidden lg:flex flex-wrap gap-[8px] bg-[#F7F7F7] rounded-[16px] py-[4px] px-[8px]'>
                    {subcategories.map((sub) => (
                        <button
                            key={sub}
                            onClick={() => handleSubcategoryClick(sub)}
                            className={`font-bold text-[14px] px-3 py-1 rounded transition-all ${selectedSubcategory === sub
                                ? 'bg-[#FFFFFF] text-[#1F1F1F] px-[20px] py-[8px] rounded-[12px] shadow-lg'
                                : ''
                                }`}
                        >
                            {sub.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            {/* Products: Flex layout for better centering */}
            <div className={`flex flex-wrap gap-5 mt-6 
                justify-center 
                sm:justify-center 
                lg:justify-between`}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((item) => (
                        <div
                            key={item.id}
                            className='w-full sm:w-[48%] lg:w-[23%] flex justify-center'
                        >
                            <Product product={{ ...item, category }} />
                        </div>
                    ))
                ) : (
                    <p className="mt-5 text-center w-full">No products available</p>
                )}
            </div>
        </div>
    );
};

export default ProductPage;
