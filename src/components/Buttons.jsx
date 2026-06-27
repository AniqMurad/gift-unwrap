import React from 'react'

export const Buttons = ({ onClick }) => {
    return (
        // <div className="flex justify-center mt-6 mb-6">
            <button onClick={onClick} className='uppercase bg-black text-white font-semibold py-2 px-6 rounded-md hover:bg-gray-800 transition-colors cursor-pointer'>
                Load More
            </button>
        // </div>
    )
}
