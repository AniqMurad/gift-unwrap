import React from 'react'

import { ShippingIcon, GuaranteeIcon, MoneyBack, PhoneIcon } from './icons'

const Services = () => {
  return (
    <div className='px-16 py-4'>
      <div className=' w-[100%] mx-auto px-8 py-4 justify-evenly bg-[#F7F7F7] rounded-2xl flex gap-3'>
        <div className=' flex flex-col gap-3 items-center text-center'>
          <PhoneIcon />
          <p className='text-lg font-bold'>24/7 Customer Service</p>
          <p className='text-sm text-[##696C70]'>We're here to help you with any questions or concerns you have, 24/7.</p>
        </div>
        <div className=' flex flex-col gap-3 items-center text-center'>
          <MoneyBack />
          <p className='text-lg font-bold'>14-Day Money Back</p>
          <p className='text-sm text-[##696C70]'>If you're not satisfied with your purchase, simply return it within 14 days for a refund.</p>
        </div>
        <div className=' flex flex-col gap-3 items-center text-center'>
          <GuaranteeIcon />
          <p className='text-lg font-bold'>Our Guarantee</p>
          <p className='text-sm text-[##696C70]'> We stand behind our products and services and guarantee your satisfaction.</p>
        </div>
        <div className=' flex flex-col gap-3 items-center text-center'>
          <ShippingIcon />
          <p className='text-lg font-bold'>Shipping Nationwide</p>
          <p className='text-sm text-[##696C70]'>We ship our products nationwide, making them accessible to customers.</p>
        </div>

      </div>
    </div>
  )
}

export default Services