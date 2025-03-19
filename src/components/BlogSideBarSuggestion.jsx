import React from 'react'
import sidebar1 from '../assets/sb1.png'

const BlogSideBarSuggestion = () => {
    return (
        <div>
            <h3 className="font-bold text-lg mb-6">Recent Posts</h3>
            <div className="flex justify-between w-[270px] mb-6">
                <img
                    src={sidebar1}
                    className="w-[80px] h-[80px] rounded-md object-cover"
                />
                <div className='w-[170px] flex flex-col justify-center'>
                    <div className="w-max bg-[#D2EF9A] text-black text-xs px-2 py-1 rounded-[48px] inline-block">
                        BABY, NEWBORN
                    </div>
                    <p className="text-sm text-black mt-2">How To Organize Baby Visits And Keep...</p>
                </div>
            </div>

            <div className="flex justify-between w-[270px] mb-6">
                <img
                    src={sidebar1}
                    className="w-[80px] h-[80px] rounded-md object-cover"
                />
                <div className='w-[170px] flex flex-col justify-center'>
                    <div className="w-max bg-[#D2EF9A] text-black text-xs px-2 py-1 rounded-[48px] inline-block">
                        BABY, NEWBORN
                    </div>
                    <p className="text-sm text-black mt-2">How To Organize Baby Visits And Keep...</p>
                </div>
            </div>

            <div className="flex justify-between w-[270px] mb-6">
                <img
                    src={sidebar1}
                    className="w-[80px] h-[80px] rounded-md object-cover"
                />
                <div className='w-[170px] flex flex-col justify-center'>
                    <div className="w-max bg-[#D2EF9A] text-black text-xs px-2 py-1 rounded-[48px] inline-block">
                        BABY, NEWBORN
                    </div>
                    <p className="text-sm text-black mt-2">How To Organize Baby Visits And Keep...</p>
                </div>
            </div> 
        </div>
    )
}

export default BlogSideBarSuggestion