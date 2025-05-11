import BillingEmailField from '@/components/BillingEmailField'
import Footer from '@/components/Footer'
import { LoginLine } from '@/components/icons'
import Navbar from '@/components/Navbar'
import SearchPageNavbar from '@/components/SearchPageNavbar'
import UsernameField from '@/components/UsernameField'
import React from 'react'

const OrderTracking = () => {
    return (
        <div>
            <Navbar showSearchInput={false} bgColor="#FBF4E8" />
            <SearchPageNavbar title="Order Tracking" titleHome="Home Page" backgroundColor='#FBF4E8' />

            <div className="flex px-16 py-20 justify-between items-center">

                <div className="w-[580px]">
                    <h2 className="text-[30px] font-semibold mb-2">Order Tracking</h2>
                    <p className='text-[18px] mb-6'>To track your order please enter your Order ID in the box below and press the "Track" button. This was given to you on your receipt and in the confirmation email you should have received.</p>
                    <UsernameField />
                    <BillingEmailField />
                    <button className="bg-black text-[14px] text-white px-[40px] py-[16px] rounded-[12px] mt-8 uppercase">Track Order</button>
                </div>

                <LoginLine />

                <div className="w-[580px]">
                    <h2 className="text-[30px] font-semibold mb-2">Already have an account?</h2>
                    <p className="text-[#696C70] text-[16px] mb-4">
                        Welcome back. Sign in to access your personalized experience, saved preferences, and more. We're thrilled to have you with us again!
                    </p>
                    <button className="bg-black text-[14px] text-white px-[40px] py-[16px] rounded-[12px] mt-4 uppercase">LOGIN</button>
                </div>

            </div>

            <Footer />
        </div>
    )
}

export default OrderTracking