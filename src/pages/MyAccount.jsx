import ConfirmPasswordField from '@/components/ConfirmPasswordField'
import Footer from '@/components/Footer'
import {
    HalfArrowDown2,
    MyAddressIcon,
    MyLogoutIcon,
    MyOrderIcon,
    MyUserIcon
} from '@/components/icons'
import NewPasswordField from '@/components/NewPasswordField'
import PasswordField from '@/components/PasswordField'
import SearchPageNavbar from '@/components/SearchPageNavbar'
import React, { useState } from 'react'
import avatar from "../assets/avatar.png"
import Navbar from '@/components/Navbar'
import OrderHistory from '@/components/OrderHistory' // <-- You’ll create this separately

const MyAccount = () => {
    const [activeTab, setActiveTab] = useState('account') // default tab

    return (
        <div>
            <Navbar showSearchInput={false} bgColor="#FBF4E8" />
            <SearchPageNavbar title="My Account" titleHome="Home Page" backgroundColor='#FBF4E8' />

            <div className="flex px-16 py-20 justify-between">
                {/* Sidebar */}
                <div className="w-[28%] bg-[#F7F7F7] shadow-lg rounded-[20px] px-[32px] py-[40px]">
                    <div className="flex flex-col items-center text-center">
                        <img src={avatar} className="w-[46%] h-[46%] bg-gray-300 rounded-full" />
                        <h3 className="text-[20px] font-semibold mt-3">Tony Nguyen</h3>
                        <p className="text-[20px]">hi.avitex@gmail.com</p>
                    </div>

                    <div className="mt-8">
                        <div
                            className={`flex gap-5 rounded-[16px] items-center px-[20px] py-[16px] mb-1 cursor-pointer ${activeTab === 'account' ? 'bg-[#FFFFFF]' : ''
                                }`}
                            onClick={() => setActiveTab('account')}
                        >
                            <MyUserIcon />
                            <h6 className='text-[20px] font-semibold'>Account Details</h6>
                        </div>

                        <div
                            className={`flex gap-5 rounded-[16px] items-center px-[20px] py-[16px] mb-1 cursor-pointer ${activeTab === 'orders' ? 'bg-[#FFFFFF]' : ''
                                }`}
                            onClick={() => setActiveTab('orders')}
                        >
                            <MyOrderIcon />
                            <h6 className='text-[20px] font-semibold'>Your Orders</h6>
                        </div>

                        <div className='flex gap-5 rounded-[16px] items-center px-[20px] py-[16px] mb-1'>
                            <MyLogoutIcon />
                            <h6 className='text-[20px] font-semibold'>Logout</h6>
                        </div>
                    </div>
                </div>

                {/* Right Content Area */}
                <div className='w-[55%]'>
                    {activeTab === 'account' && (
                        <div>
                            <h2 className="text-[24px] font-semibold mb-4">Information</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="Tony" className="border p-3 rounded-md w-full" />
                                <input type="text" placeholder="Nguyen" className="border p-3 rounded-md w-full" />
                                <input type="email" placeholder="hi.avitex@gmail.com" className="border p-3 rounded-md" />
                                <input type="text" placeholder="(+12) 345 678 910" className="border p-3 rounded-md" />
                                <div className="flex justify-between items-center border p-3 rounded-md w-full col-span-2">
                                    United States
                                    <HalfArrowDown2 />
                                </div>
                            </div>

                            <h2 className="text-[24px] font-semibold mt-8">Change Password</h2>
                            <div className="grid">
                                <PasswordField />
                                <NewPasswordField />
                                <ConfirmPasswordField />
                            </div>

                            <button className="text-[14px] uppercase bg-black text-white py-[16px] px-[40px] rounded-[12px] mt-8">
                                UPDATE ACCOUNT
                            </button>
                        </div>
                    )}

                    {activeTab === 'orders' && (
                        <OrderHistory />
                    )}
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default MyAccount
