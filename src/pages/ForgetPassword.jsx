import ConfirmPasswordField from '@/components/ConfirmPasswordField';
import Footer from '@/components/Footer';
import { LoginLine } from '@/components/icons';
import PasswordField from '@/components/PasswordField';
import SearchPageNavbar from '@/components/SearchPageNavbar';
import UsernameField from '@/components/UsernameField';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Loader from '../components/Loader';
import NotificationBar from '../components/NotificationBar';

const ForgetPassword = () => {
    const navigate = useNavigate();

    const [step, setStep] = useState('email'); // 'email' or 'reset'
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [token, setToken] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState({
        show: false,
        type: 'success',
        message: ''
    });

    useEffect(() => {
        if (notification.show) {
            const timer = setTimeout(() => {
                setNotification(prev => ({ ...prev, show: false }));
            }, 3000); // Hide after 3 seconds
            return () => clearTimeout(timer);
        }
    }, [notification.show]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
        setNotification(prev => ({ ...prev, show: false })); // Hide notification on input change
    };

    const handleEmailSubmit = async () => {
        if (!formData.email.trim()) {
            setError('Email is required');
            setNotification({
                show: true,
                type: 'error',
                message: 'Email is required'
            });
            return;
        }

        setIsLoading(true);
        setNotification(prev => ({ ...prev, show: false })); // Hide previous notification

        try {
            const res = await axios.post('https://giftunwrapbackend.vercel.app/api/auth/forgot-password', { email: formData.email });
            console.log('Response:', res.data);
            setToken(res.data.token);
            setStep('reset');
            setNotification({
                show: true,
                type: 'success',
                message: 'Email verified! Please enter your new password.'
            });
        } catch (err) {
            console.error('Email submit error:', err.response?.data || err.message);
            const errorMsg = err.response?.data?.message || 'Something went wrong';
            setError(errorMsg);
            setNotification({
                show: true,
                type: 'error',
                message: errorMsg
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordReset = async () => {
        if (!formData.password || !formData.confirmPassword) {
            const errorMsg = 'Both fields are required';
            setError(errorMsg);
            setNotification({
                show: true,
                type: 'error',
                message: errorMsg
            });
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            const errorMsg = 'Passwords do not match';
            setError(errorMsg);
            setNotification({
                show: true,
                type: 'error',
                message: errorMsg
            });
            return;
        }

        setIsLoading(true);
        setNotification(prev => ({ ...prev, show: false })); // Hide previous notification

        try {
            await axios.post('https://giftunwrapbackend.vercel.app/api/auth/reset-password', {
                email: formData.email,
                password: formData.password,
            });

            setNotification({
                show: true,
                type: 'success',
                message: 'Password reset successful! Redirecting to login page...'
            });

            // Navigate after a short delay to show success message
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Reset failed';
            setError(errorMsg);
            setNotification({
                show: true,
                type: 'error',
                message: errorMsg
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {isLoading && <Loader />}
            {notification.show && (
                <NotificationBar type={notification.type} message={notification.message} />
            )}
            <Navbar showSearchInput={false} bgColor="#FBF4E8" />
            <SearchPageNavbar title="Forget Your Password" titleHome="Home Page" backgroundColor='#FBF4E8' />

            <div className="flex flex-col lg:flex-row px-4 sm:px-8 lg:px-16 py-6 sm:py-10 lg:py-20 justify-between items-start gap-6 lg:gap-8">
                <div className="w-full lg:w-[580px]">
                    <h2 className="text-2xl sm:text-3xl lg:text-[30px] font-semibold mb-2">Reset Your Password</h2>
                    <p className='text-base sm:text-lg lg:text-[18px] mb-6'>
                        {step === 'email' ? 'Enter your email' : 'Enter your new password'}
                    </p>

                    {error && <p className="text-red-600 mb-4 text-sm sm:text-base">{error}</p>}

                    {step === 'email' ? (
                        <>
                            <UsernameField
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={isLoading}
                            />
                            <button
                                className="bg-black text-xs sm:text-sm text-white px-6 sm:px-8 lg:px-[40px] py-3 sm:py-4 lg:py-[16px] rounded-lg lg:rounded-[12px] mt-6 sm:mt-8 w-full sm:w-auto uppercase cursor-pointer hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50"
                                onClick={handleEmailSubmit}
                                disabled={isLoading}
                            >
                                {isLoading ? 'SUBMITTING...' : 'SUBMIT'}
                            </button>
                        </>
                    ) : (
                        <>
                            <PasswordField
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                disabled={isLoading}
                            />
                            <ConfirmPasswordField
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                disabled={isLoading}
                            />
                            <button
                                className="bg-black text-xs sm:text-sm text-white px-6 sm:px-8 lg:px-[40px] py-3 sm:py-4 lg:py-[16px] rounded-lg lg:rounded-[12px] mt-6 sm:mt-8 w-full sm:w-auto uppercase cursor-pointer hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50"
                                onClick={handlePasswordReset}
                                disabled={isLoading}
                            >
                                {isLoading ? 'RESETTING...' : 'RESET PASSWORD'}
                            </button>
                        </>
                    )}
                </div>

                {/* <LoginLine className="hidden lg:block" /> */}

                <div className="w-full lg:w-[580px] mt-6 lg:mt-0">
                    <h2 className="text-2xl sm:text-3xl lg:text-[30px] font-semibold mb-2">New Customer</h2>
                    <p className="text-[#696C70] text-sm sm:text-base lg:text-[16px] mb-4">
                        Be part of our growing family of new customers! Join us today and unlock
                        a world of exclusive benefits, offers, and personalized experiences.
                    </p>
                    <button
                        className="bg-black text-xs sm:text-sm text-white px-6 sm:px-8 lg:px-[40px] py-3 sm:py-4 lg:py-[16px] rounded-lg lg:rounded-[12px] mt-4 w-full sm:w-auto uppercase cursor-pointer hover:bg-gray-800 transition-colors duration-200"
                        onClick={() => navigate("/signup")}
                        disabled={isLoading}
                    >
                        REGISTER
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ForgetPassword;
