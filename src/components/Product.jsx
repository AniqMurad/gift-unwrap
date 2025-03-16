import React from 'react'
import p1 from '../assets/1pp.png'
import p2 from '../assets/2pp.png'
import p3 from '../assets/3pp.png'
import p4 from '../assets/4pp.png'
import { HeartIcon2 } from './icons'

const Product = () => {
    return (
        <div>
            <div className='relative bg-[#FBF4E8] rounded-[24px]'>
                <p className="bg-red-400 font-semibold p-1 text-xs text-white w-max rounded-[24px] absolute top-[10px] left-[10px]">
                    SALE
                </p>
                <button className="bg-white p-1 rounded-[24px] absolute top-[10px] right-[10px] cursor-pointer">
                    <HeartIcon2 />
                </button>
                <img src={p1} className='' />
            </div>
            <div className='mt-4'>
                <p>Le Sigh Tee</p>
                <div className='flex items-center gap-2 text-sm mt-1'>
                    <span>$68</span><span className='line-through text-[#A0A0A0]'>$98</span><span className='bg-[#D2EF9A] rounded-[24px] p-1'>-25%</span>
                </div>
            </div>
        </div>
    )
}

export default Product