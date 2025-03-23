import React from 'react'

const SubNavbar = () => {
    return (
        <div className="flex justify-between items-start bg-[#ffff] px-16 py-3 border-b-2 border-solid border-[#E9E9E9]">
            <div className='flex gap-8'>
                <button className='font-bold text-sm border-b-2'>
                    CATEGORIES
                </button>
                <button className='font-bold text-sm'>
                    RECIPIENTS
                </button>
                <button className='font-bold text-sm'>
                    OCASSIONS
                </button>
                <button className='font-bold text-sm'>
                    PERSONALIZATION METHOD
                </button>
                <button className='font-bold text-sm text-red-300'>
                    BIRTHDAY GIFT
                </button>
            </div>
            <div>
              <span className='text-sm font-normal'>Phone: </span> <span className='text-sm font-semibold'>+92-3465987104</span>
            </div>
            <div></div>
        </div>
    )
}

export default SubNavbar