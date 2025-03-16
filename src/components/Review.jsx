import React from 'react'
import flowers from '../assets/revfl.png'
import Avatar from '../assets/Avatar.png'
import { StarRating } from './icons'


const Review = () => {
  return (
    <div className='bg-[#F9F1F0] flex mb-3 p-2 pb-0'>
      <div className='w-[60%] px-16 py-4'>
        <p className='text-3xl text-bold mt-5'>
        "I absolutely love this shop! The products are high-quality and the customer service is excellent. I always leave with exactly what I need and a smile on my face."
        </p>
        <div className='w-[50%] p-2 flex gap-2 items-center my-auto'>
          <img src={Avatar} alt='' />
          <div>
            <p className='text-lg font-medium tracking-wide'>LANA RHOADES</p>
            <StarRating />
          </div>
        </div>
      </div>
      <div className='w-[40%]'>
        <img src={flowers} alt='' />
      </div>
      
    </div>
  )
}

export default Review