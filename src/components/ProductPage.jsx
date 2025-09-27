import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Product';

const ProductPage = ({ title, category }) => {
    const [selectedSubcategory, setSelectedSubcategory] = useState("All");
    const [products, setProducts] = useState([]);
    const [randomFour, setRandomFour] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get('https://giftunwrapbackend.vercel.app/api/products')
            .then(res => {
                const categoryData = res.data.find(item => item.category === category);
                if (categoryData && Array.isArray(categoryData.products)) {
                    setProducts(categoryData.products);
                }
            })
            .catch(err => console.error("Failed to load products:", err))
            .finally(() => setLoading(false));
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

    // Skeleton component matching your product card layout
    const ProductSkeleton = () => (
        <div className="w-full max-w-sm mx-auto">
            <div className="flex flex-col space-y-3">
                {/* Image skeleton */}
                <div 
                    className="w-full rounded-lg bg-gray-200"
                    style={{
                        height: '180px',
                        backgroundColor: '#e5e7eb',
                        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                    }}
                />
                {/* Content skeleton */}
                <div className="space-y-2 px-2">
                    {/* Title skeleton */}
                    <div 
                        className="h-4 bg-gray-200 rounded"
                        style={{
                            width: '85%',
                            height: '16px',
                            backgroundColor: '#e5e7eb',
                            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                        }}
                    />
                    {/* Price skeleton */}
                    <div 
                        className="h-4 bg-gray-200 rounded"
                        style={{
                            width: '50%',
                            height: '16px',
                            backgroundColor: '#e5e7eb',
                            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                        }}
                    />
                    {/* Button skeleton */}
                    <div 
                        className="h-8 bg-gray-200 rounded mt-2"
                        style={{
                            width: '100%',
                            height: '32px',
                            backgroundColor: '#e5e7eb',
                            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                        }}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div className='px-4 sm:px-6 lg:px-16 py-4'>
            {/* Add CSS animation for pulse effect */}
            <style jsx>{`
                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.5;
                    }
                }
            `}</style>
            
            <div className='flex flex-col lg:flex-row justify-between gap-4 px-[10px]'>
                <h2 className="text-3xl font-bold text-center">{title}</h2>
                {/* Filter: Hidden below lg */}
                <div className='hidden text-[#696C70] lg:flex flex-wrap gap-[8px] bg-[#F7F7F7] rounded-[16px] py-[4px] px-[8px]'>
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
            
            {/* Products: Grid layout for better responsive control */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mt-6 justify-items-center">
                {loading ? (
                    // Show exactly 4 skeleton loaders in one row
                    Array.from({ length: 4 }).map((_, index) => (
                        <ProductSkeleton key={index} />
                    ))
                ) : filteredProducts.length > 0 ? (
                    // Show actual products when loaded
                    filteredProducts.map((item) => (
                        <Product 
                            key={item.id} 
                            product={{ ...item, category }} 
                        />
                    ))
                ) : (
                    // Show message only when not loading and no products found
                    <div className="col-span-full">
                        <p className="text-center">No products available</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductPage;