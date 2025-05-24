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
import React, { useState, useEffect } from 'react' // Import useEffect
import avatar from "../assets/avatar.png"
import Navbar from '@/components/Navbar'
import OrderHistory from '@/components/OrderHistory' 
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate

const MyAccount = () => {
    const location = useLocation(); // Get location object
    const navigate = useNavigate(); // For logout
    const [activeTab, setActiveTab] = useState('account') // default tab
    const [userData, setUserData] = useState({ firstName: '', lastName: '', email: '', phone: '', country: '' });


    useEffect(() => {
        // Check for activeTab in location state when component mounts or location changes
        if (location.state?.activeTab) {
            setActiveTab(location.state.activeTab);
        }

        // Load user data from localStorage
        const userString = localStorage.getItem('user');
        if (userString) {
            try {
                const storedUser = JSON.parse(userString);
                setUserData({
                    firstName: storedUser.firstName || '',
                    lastName: storedUser.lastName || '',
                    email: storedUser.email || '',
                    phone: storedUser.phone || '', // Assuming phone and country might be stored
                    country: storedUser.country || 'United States' // Default if not present
                });
            } catch (error) {
                console.error("Failed to parse user data from localStorage:", error);
                // Handle error, maybe redirect to login if user data is crucial and corrupted
            }
        } else {
            // If no user data in localStorage, redirect to login
            // navigate('/login'); // Uncomment this if unauthenticated users should not access this page
        }

    }, [location.state]); // Re-run effect if location.state changes

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.dispatchEvent(new CustomEvent('authChanged')); // Notify Navbar
        navigate("/login");
    };


    return (
        <div>
            <Navbar showSearchInput={false} bgColor="#FBF4E8" />
            <SearchPageNavbar title="My Account" titleHome="Home Page" backgroundColor='#FBF4E8' />

            <div className="flex px-16 py-20 justify-between">
                {/* Sidebar */}
                <div className="w-[28%] bg-[#F7F7F7] shadow-lg rounded-[20px] px-[32px] py-[40px]">
                    <div className="flex flex-col items-center text-center">
                        <img src={avatar} className="w-[46%] h-[46%] bg-gray-300 rounded-full" />
                        <h3 className="text-[20px] font-semibold mt-3">{userData.firstName} {userData.lastName}</h3>
                        <p className="text-[20px]">{userData.email}</p>
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

                        <div 
                            className='flex gap-5 rounded-[16px] items-center px-[20px] py-[16px] mb-1 cursor-pointer'
                            onClick={handleLogout} // Add onClick handler for logout
                        >
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
                                <input type="text" placeholder="First Name" value={userData.firstName} onChange={(e) => setUserData({...userData, firstName: e.target.value})} className="border p-3 rounded-md w-full" />
                                <input type="text" placeholder="Last Name" value={userData.lastName} onChange={(e) => setUserData({...userData, lastName: e.target.value})} className="border p-3 rounded-md w-full" />
                                <input type="email" placeholder="Email" value={userData.email} readOnly className="border p-3 rounded-md bg-gray-100 cursor-not-allowed" />
                                <input type="text" placeholder="Phone Number" value={userData.phone} onChange={(e) => setUserData({...userData, phone: e.target.value})} className="border p-3 rounded-md" />
                                <div className="flex justify-between items-center border p-3 rounded-md w-full col-span-2">
                                    {userData.country}
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
