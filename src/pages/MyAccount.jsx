import ConfirmPasswordField from '@/components/ConfirmPasswordField';
import Footer from '@/components/Footer';
import {
    HalfArrowDown2,
    MyLogoutIcon,
    MyOrderIcon,
    MyUserIcon
} from '@/components/icons';
import NewPasswordField from '@/components/NewPasswordField';
import PasswordField from '@/components/PasswordField';
import SearchPageNavbar from '@/components/SearchPageNavbar';
import React, { useState, useEffect } from 'react';
import avatar from "../assets/avatar2.jpg"; // Updated avatar path
import Navbar from '@/components/Navbar';
import OrderHistory from '@/components/OrderHistory';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NotificationBar from '@/components/NotificationBar';

const MyAccount = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('account');
    const [userData, setUserData] = useState({ firstName: '', lastName: '', email: '', phone: '', country: '' });


    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordChangeErrors, setPasswordChangeErrors] = useState({});
    const [notification, setNotification] = useState({ show: false, type: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (location.state?.activeTab) {
            setActiveTab(location.state.activeTab);
        }

        const userString = localStorage.getItem('user');
        if (userString) {
            try {
                const storedUser = JSON.parse(userString);
                setUserData({
                    firstName: storedUser.firstName || '',
                    lastName: storedUser.lastName || '',
                    email: storedUser.email || '',
                    phone: storedUser.phone || '',
                    country: storedUser.country || 'United States'
                });
            } catch (error) {
                console.error("Failed to parse user data from localStorage:", error);
            }
        }
    }, [location.state]);

    useEffect(() => {
        if (notification.show) {
            const timer = setTimeout(() => {
                setNotification(prev => ({ ...prev, show: false }));
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification.show]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        window.dispatchEvent(new CustomEvent('authChanged'));
        navigate("/login");
    };

    const handleChangePassword = async () => {
        setIsLoading(true);
        setPasswordChangeErrors({});
        setNotification({ show: false, type: '', message: '' });

        const errors = {};
        if (!currentPassword) {
            errors.currentPassword = 'Current password is required';
        }
        if (!newPassword) {
            errors.newPassword = 'New password is required';
        } else if (newPassword.length < 6) {
            errors.newPassword = 'New password must be at least 6 characters long';
        }
        if (newPassword !== confirmNewPassword) {
            errors.confirmNewPassword = 'New passwords do not match';
        }

        if (Object.keys(errors).length > 0) {
            setPasswordChangeErrors(errors);
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post('https://giftunwrapbackend.vercel.app/api/auth/change-password', {
                email: userData.email,
                currentPassword: currentPassword,
                newPassword: newPassword
            });

            setNotification({ show: true, type: 'success', message: response.data.message });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        } catch (error) {
            console.error('Error changing password:', error);
            const errorMessage = error.response?.data?.message || 'Failed to change password. Please try again.';
            setNotification({ show: true, type: 'error', message: errorMessage });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Navbar showSearchInput={false} bgColor="#FBF4E8" />
            <SearchPageNavbar title="My Account" titleHome="Home Page" backgroundColor='#FBF4E8' />

            {notification.show && (
                <NotificationBar type={notification.type} message={notification.message} />
            )}

            <div className="flex flex-col lg:flex-row px-4 sm:px-8 lg:px-16 py-6 sm:py-10 lg:py-20 gap-6 lg:gap-8">
                {/* Sidebar */}
                <div className="w-full lg:w-[28%] bg-[#F7F7F7] shadow-lg rounded-[20px] px-4 sm:px-6 lg:px-[32px] py-6 sm:py-8 lg:py-[40px]">
                    <div className="flex flex-col items-center text-center">
                        <img src={avatar} className="w-16 h-16 sm:w-20 sm:h-20 lg:w-[46%] lg:h-[46%] bg-gray-300 rounded-full" alt="User Avatar" />
                        <h3 className="text-lg sm:text-xl lg:text-[20px] font-semibold mt-3">{userData.firstName} {userData.lastName}</h3>
                        <p className="text-sm sm:text-base lg:text-[20px] text-gray-600 break-all">{userData.email}</p>
                    </div>

                    <div className="mt-6 sm:mt-8">
                        <div
                            className={`flex gap-3 sm:gap-4 lg:gap-5 rounded-[16px] items-center px-3 sm:px-4 lg:px-[20px] py-3 sm:py-4 lg:py-[16px] mb-1 cursor-pointer ${activeTab === 'account' ? 'bg-[#FFFFFF]' : ''}`}
                            onClick={() => setActiveTab('account')}
                        >
                            <MyUserIcon />
                            <h6 className='text-sm sm:text-base lg:text-[20px] font-semibold'>Account Details</h6>
                        </div>

                        <div
                            className={`flex gap-3 sm:gap-4 lg:gap-5 rounded-[16px] items-center px-3 sm:px-4 lg:px-[20px] py-3 sm:py-4 lg:py-[16px] mb-1 cursor-pointer ${activeTab === 'orders' ? 'bg-[#FFFFFF]' : ''}`}
                            onClick={() => setActiveTab('orders')}
                        >
                            <MyOrderIcon />
                            <h6 className='text-sm sm:text-base lg:text-[20px] font-semibold'>Your Orders</h6>
                        </div>

                        <div
                            className='flex gap-3 sm:gap-4 lg:gap-5 rounded-[16px] items-center px-3 sm:px-4 lg:px-[20px] py-3 sm:py-4 lg:py-[16px] mb-1 cursor-pointer'
                            onClick={handleLogout}
                        >
                            <MyLogoutIcon />
                            <h6 className='text-sm sm:text-base lg:text-[20px] font-semibold'>Logout</h6>
                        </div>
                    </div>
                </div>

                {/* Right Content Area */}
                <div className='w-full lg:w-[55%]'>
                    {activeTab === 'account' && (
                        <div>
                            <h2 className="text-xl sm:text-2xl lg:text-[24px] font-semibold mb-4">Information</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <input 
                                    type="text" 
                                    placeholder="First Name" 
                                    value={userData.firstName} 
                                    readOnly 
                                    className="border p-2 sm:p-3 rounded-md bg-gray-100 cursor-not-allowed text-sm sm:text-base" 
                                />
                                <input 
                                    type="text" 
                                    placeholder="Last Name" 
                                    value={userData.lastName} 
                                    readOnly 
                                    className="border p-2 sm:p-3 rounded-md bg-gray-100 cursor-not-allowed text-sm sm:text-base" 
                                />
                                <input 
                                    type="email" 
                                    placeholder="Email" 
                                    value={userData.email} 
                                    readOnly 
                                    className="border p-2 sm:p-3 rounded-md bg-gray-100 cursor-not-allowed text-sm sm:text-base sm:col-span-2" 
                                />
                                <input 
                                    type="text" 
                                    placeholder="Phone Number" 
                                    value={userData.phone} 
                                    readOnly 
                                    className="border p-2 sm:p-3 rounded-md bg-gray-100 cursor-not-allowed text-sm sm:text-base sm:col-span-2" 
                                />
                            </div>

                            <h2 className="text-xl sm:text-2xl lg:text-[24px] font-semibold mt-6 sm:mt-8 mb-4">Change Password</h2>
                            <div className="grid gap-3 sm:gap-4">
                                <PasswordField
                                    label="Current Password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    error={passwordChangeErrors.currentPassword}
                                />
                                <NewPasswordField
                                    label="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    error={passwordChangeErrors.newPassword}
                                />
                                <ConfirmPasswordField
                                    label="Confirm New Password"
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    error={passwordChangeErrors.confirmNewPassword}
                                />
                            </div>

                            <button
                                className="text-xs sm:text-sm lg:text-[14px] uppercase bg-black text-white py-3 sm:py-4 lg:py-[16px] px-6 sm:px-8 lg:px-[40px] rounded-[12px] mt-6 sm:mt-8 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={handleChangePassword}
                                disabled={isLoading}
                            >
                                {isLoading ? 'UPDATING...' : 'UPDATE ACCOUNT'}
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
    );
};

export default MyAccount;