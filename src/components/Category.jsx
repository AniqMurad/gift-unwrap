import React from 'react'
import gift1 from '../assets/g1.png';
import gift2 from '../assets/g2.png';
import gift3 from '../assets/g3.png';

const Category = () => {
    return (
        <div className="relative rounded-lg overflow-hidden shadow-lg">
            <img src={gift1} className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex flex-col justify-center px-6 bg-black/20">
                <h2 className="text-lg font-semibold text-black">Special Baby Moments</h2>
                <button className="text-sm text-start font-semibold text-black underline">
                    Shop Gifts Now
                </button>
            </div>
        </div>
    )
}

export default Category