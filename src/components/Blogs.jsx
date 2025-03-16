import React from 'react'
import blog1 from '../assets/blog1.png'
import blog2 from '../assets/blog2.png'
import blog3 from '../assets/blog3.png'

const Blogs = () => {
    return (
        <div className='px-16 py-12'>
            <h1 className='flex justify-center font-bold text-3xl'>Blogs</h1>
            <div className='flex justify-between gap-5 mt-8'>
                <div className=''>
                    <img src={blog1} className="w-full h-[260px] object-cover rounded-lg" />
                    <div className="mt-3">
                        <span className="bg-[#D2EF9A] text-black text-xs font-bold px-3 py-1 rounded-full">
                            CORPORATE GIFT
                        </span>
                        <h3 className="mt-2 text-lg font-bold">
                            The 2025 Q1 Corporate Gifting Trend Report Is LIVE!
                        </h3>
                        <p className="text-gray-500 text-sm mt-1">
                            By Tony Nguyen — Oct 12, 2025
                        </p>
                    </div>
                </div>

                <div>
                    <img src={blog2} className="w-full h-[260px] object-cover rounded-lg" />
                    <div className="mt-3">
                        <span className="bg-[#D2EF9A] text-black text-xs font-bold px-3 py-1 rounded-full">
                            CORPORATE GIFT
                        </span>
                        <h3 className="mt-2 text-lg font-bold">
                            The 2025 Q1 Corporate Gifting Trend Report Is LIVE!
                        </h3>
                        <p className="text-gray-500 text-sm mt-1">
                            By Tony Nguyen — Oct 12, 2025
                        </p>
                    </div>
                </div>

                <div>
                    <img src={blog3} className="w-full h-[260px] object-cover rounded-lg" />
                    <div className="mt-3">
                        <span className="bg-[#D2EF9A] text-black text-xs font-bold px-3 py-1 rounded-full">
                            CORPORATE GIFT
                        </span>
                        <h3 className="mt-2 text-lg font-bold">
                            The 2025 Q1 Corporate Gifting Trend Report Is LIVE!
                        </h3>
                        <p className="text-gray-500 text-sm mt-1">
                            By Tony Nguyen — Oct 12, 2025
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blogs
