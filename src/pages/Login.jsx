// Login.jsx
import Footer from "../components/Footer";
import { LoginLine } from "../components/icons";
import SearchPageNavbar from "../components/SearchPageNavbar";
import React, { useState, useEffect } from "react";
import UsernameField from "@/components/UsernameField";
import PasswordField from "@/components/PasswordField";
import RememberIcon from "@/components/RememberIcon";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import NotificationBar from "../components/NotificationBar";
import Navbar from "@/components/Navbar";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
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
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification.show]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
        setNotification(prev => ({ ...prev, show: false }));
    };

    const handleLogin = async () => {
        const newErrors = {};
        setNotification(prev => ({ ...prev, show: false }));

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
        }
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        try {
            const res = await axios.post('https://giftunwrapbackend.vercel.app/api/auth/login', {
                email: formData.email,
                password: formData.password
            });

            const { token, user } = res.data;

            // Split the name into firstName and lastName
            const nameParts = user.name.trim().split(' ');
            const firstName = nameParts[0] || '';
            const lastName = nameParts.slice(1).join(' ') || '';

            // Create enhanced user object with additional fields
            const enhancedUser = {
                ...user,
                firstName: firstName,
                lastName: lastName,
                phone: user.phoneNumber, // Map phoneNumber to phone
                country: 'United States' // Default country
            };

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(enhancedUser));
            localStorage.setItem('userId', user._id);
            localStorage.setItem('username', user.name);

            console.log("Login successful. User ID stored:", user._id);
            console.log("Logged in user name:", user.name);
            console.log("Logged in user phone number:", user.phoneNumber);

            // Show success notification
            setNotification({
                show: true,
                type: 'success',
                message: 'You have successfully logged in!'
            });

            // Dispatch custom event to notify Navbar
            window.dispatchEvent(new CustomEvent('authChanged'));

            // Navigate after a short delay to show success message
            setTimeout(() => {
                navigate('/');
            }, 1500);

        } catch (err) {
            const msg = err.response?.data?.message || 'Invalid email or password. Please try again.';
            setNotification({
                show: true,
                type: 'error',
                message: msg
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignup = () => {
        navigate("/signup");
    };

    const handleForgotPass = () => {
        navigate("/forgetPassword");
    };

    return (
        <>
            {isLoading && <Loader />}
            {notification.show && (
                <NotificationBar type={notification.type} message={notification.message} />
            )}
            <Navbar showSearchInput={false} bgColor="#FBF4E8" />
            <SearchPageNavbar title="Login" titleHome="Home Page" backgroundColor='#FBF4E8' />

            <div className="flex flex-col lg:flex-row px-4 sm:px-8 lg:px-16 py-6 sm:py-10 lg:py-20 justify-between items-start gap-6 lg:gap-8">

                <div className="w-full lg:w-[580px]">
                    <h2 className="text-2xl sm:text-3xl lg:text-[30px] font-semibold mb-4 sm:mb-6">Login</h2>
                    <UsernameField
                        value={formData.email}
                        onChange={handleInputChange}
                        error={errors.email}
                        disabled={isLoading}
                    />
                    <PasswordField
                        value={formData.password}
                        onChange={handleInputChange}
                        error={errors.password}
                        disabled={isLoading}
                    />
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mt-4 mb-4">
                        <div className={`flex items-center ${isLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`} onClick={!isLoading ? () => {/* Handle remember me toggle */ } : undefined}>
                            {/* <RememberIcon />
                            <span className="text-[#1F1F1F] ml-2 text-sm sm:text-base">Remember me</span> */}
                        </div>
                        <a className={`text-sm sm:text-base underline font-semibold ${isLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:text-blue-600'}`} onClick={!isLoading ? handleForgotPass : undefined}>
                            Forgot Your Password?
                        </a>
                    </div>
                    <div className="mt-4 h-[58px]">
                        <button
                            className="bg-black text-xs sm:text-sm text-white px-6 sm:px-8 lg:px-[40px] py-3 sm:py-4 lg:py-[16px] rounded-lg lg:rounded-[12px] w-full uppercase cursor-pointer hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50"
                            onClick={handleLogin}
                            disabled={isLoading}
                        >
                            LOGIN
                        </button>
                    </div>
                </div>

                {/* <LoginLine className="hidden lg:block" /> */}

                <div className="w-full lg:w-[580px] mt-6 lg:mt-0">
                    <h2 className="text-2xl sm:text-3xl lg:text-[30px] font-semibold mb-2">New Customer</h2>
                    <p className="text-[#696C70] text-sm sm:text-base mb-4">
                        Be part of our growing family of new customers! Join us today and unlock
                        a world of exclusive benefits, offers, and personalized experiences.
                    </p>
                    <button
                        className="bg-black text-xs sm:text-sm text-white px-6 sm:px-8 lg:px-[40px] py-3 sm:py-4 lg:py-[16px] rounded-lg lg:rounded-[12px] mt-4 w-full uppercase cursor-pointer hover:bg-gray-800 transition-colors duration-200"
                        onClick={handleSignup}
                        disabled={isLoading}
                    >
                        REGISTER
                    </button>
                </div>

            </div>

            <Footer />
        </>
    );
};

export default Login;