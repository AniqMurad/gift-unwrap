import React, { useState } from 'react';
import Product from './Product';
import ProductData from '../components/ProductData';

const ProductPage = ({ title, category }) => {
    const [selectedSubcategory, setSelectedSubcategory] = useState("All");

    // Extract unique subcategories from data
    const subcategories = ["All", ...new Set(ProductData[category].map(item => item.subcategory))];

    // Filter products based on selected subcategory
    let products = ProductData[category].filter(item =>
        selectedSubcategory === "All" || item.subcategory === selectedSubcategory
    );

    // If "All" is selected, show only random 4 products
    if (selectedSubcategory === "All" && products.length > 4) {
        products = products.sort(() => 0.5 - Math.random()).slice(0, 4);
    }

    return (
        <div className='px-16 py-4'>
            <div className='flex justify-between'>
                <h2 className="text-3xl font-bold">{title}</h2>

                <div className='flex gap-[8px] bg-[#F7F7F7] rounded-[16px] py-[4px] px-[8px]'>
                    {subcategories.map((sub) => (
                        <button
                            key={sub}
                            onClick={() => setSelectedSubcategory(sub)}
                            className={`font-bold text-[12px] px-3 py-1 rounded transition-all ${selectedSubcategory === sub ? 'bg-[#FFFFFF] text-[#1F1F1F] px-[20px] py-[8px]' : ''
                                }`}
                        >
                            {sub.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            <div className={`flex gap-5 mt-5 ${products.length === 2 ? 'justify-start' : 'justify-between'}`}>
            {products.length > 0 ? (
                    products.map((item) => (
                        <Product key={`${category}-${item.id}`} product={{ ...item, category }} />
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </div>
        </div>
    );
}

export default ProductPage;
