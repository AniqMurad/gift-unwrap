import { CheckoutLine, SuccessIcon, NeedHelpIcon } from '@/components/icons'
import Navbar from '@/components/Navbar'
import SearchPageNavbar from '@/components/SearchPageNavbar'
import React from 'react'

const SuccessScreen = () => {
    return (
        <div>
            <Navbar showSearchInput={false} bgColor="#FBF4E8" />
            <SearchPageNavbar title="Checkout" titleHome="Home Page" backgroundColor='#FBF4E8' />

            <div className="flex flex-col lg:flex-row px-4 sm:px-8 md:px-16 py-10 lg:py-20 justify-between gap-8">
                {/* Left Side - Order Confirmation */}
                <div className='w-full lg:w-[60%] xl:w-[630px] space-y-4'>

                    <div className='flex gap-2'>
                        <SuccessIcon />
                        <div>
                            <h2 className="text-[16px]">Order #623</h2>
                            <h1 className="text-[30px] font-bold">Thank You James!</h1>
                        </div>
                    </div>

                    <div className='border border-[#E9E9E9] rounded-[8px] px-[16px] py-[11px]'>
                        <p className="text-[16px] font-semibold">Order Update</p>
                        <p className="text-[16px] text-[#696C70]">You will receive order and shipping updates via email.</p>
                    </div>

                    <div className="w-full">
                        <iframe
                            title="Store Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3183.216660408919!2d-81.48117898486048!3d36.347017180036175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8850c843bd14395d%3A0x9c0a9ff7cb94ed7b!2s2163%20Phillips%20Gap%20Rd%2C%20West%20Jefferson%2C%20NC%2028694%2C%20USA!5e0!3m2!1sen!2s!4v1715866821780!5m2!1sen!2s"
                            width="100%"
                            height="400"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="rounded-lg shadow-md"
                        ></iframe>
                        <div className="mt-6 text-[16px] text-[#696C70] border border-[#E9E9E9] rounded-[8px] px-[20px] py-[11px]">
                            <strong className='text-[#1F1F1F]'>Email:</strong> test@giftunwrap.com
                        </div>
                        <div className="mt-4 text-[16px] text-[#696C70] border border-[#E9E9E9] rounded-[8px] px-[20px] py-[11px]">
                            <strong className='text-[#1F1F1F]'>Address:</strong> C9, Rehmani Garden Colony, Nishat Rd, Pakistan
                        </div>
                    </div>

                    <div className='flex justify-between items-center mt-6'>
                        <div className='flex gap-2 items-center text-[16px]'>
                            <NeedHelpIcon />
                            <p>Need Help? <span className='underline'>Contact Us</span></p>
                        </div>

                        <button className="bg-black text-white px-6 py-2 rounded-[8px] uppercase cursor-pointer">
                            Continue Shopping
                        </button>
                    </div>
                </div>

                <CheckoutLine className="hidden lg:block" />

                <div className='w-full lg:w-[40%] xl:w-[520px] mt-10 lg:mt-0'>
                    {/* call from checkout. */}
                </div>
            </div>
        </div>
    )
}

export default SuccessScreen