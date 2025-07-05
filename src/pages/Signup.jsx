import ConfirmPasswordField from '@/components/ConfirmPasswordField'
import Footer from '@/components/Footer'
import { LoginLine } from '@/components/icons'
import PasswordField from '@/components/PasswordField'
import RememberIcon from '@/components/RememberIcon'
import SearchPageNavbar from '@/components/SearchPageNavbar'
import UsernameField from '@/components/UsernameField'
import PhoneNumberField from '@/components/PhoneNumberField'
import Namefield from '@/components/Namefield'
import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar'

const Signup = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });

    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState('');

    // Effect to handle pre-filled email from navigation state
    useEffect(() => {
        if (location.state?.prefillEmail) {
            setFormData(prev => ({
                ...prev,
                email: location.state.prefillEmail
            }));
        }
    }, [location.state]);

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
    };

    const handleTermsChange = () => {
        setFormData(prev => ({
            ...prev,
            agreeToTerms: !prev.agreeToTerms
        }));
        setErrors(prev => ({
            ...prev,
            agreeToTerms: ''
        }));
    };

    const handleRegister = async () => {
        const newErrors = {};
        setGeneralError('');

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        }

        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the Terms of Use';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // 🔗 API call
        try {
            const res = await axios.post('https://giftunwrapbackend.vercel.app/api/auth/register', {
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
                name: formData.name,
                phoneNumber: formData.phoneNumber
            });

            /*alert('Registration successful. Please log in.');
                        navigate('/login'); */
            setGeneralError('Registration successful. Please log in.'); // Using generalError for success message, or you can implement a dedicated success notification.
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        } catch (err) {
            const msg = err.response?.data?.message || 'Something went wrong';
            setGeneralError(msg);
        }
    };

    const handleLogin = () => {
        navigate("/login");
    };

    return (
        <div>
            <Navbar showSearchInput={false} bgColor="#FBF4E8" />
            <SearchPageNavbar title="Create An Account" titleHome="Home Page" backgroundColor='#FBF4E8' />

            <div className="flex flex-col lg:flex-row px-4 sm:px-8 lg:px-16 py-6 sm:py-10 lg:py-20 justify-between items-start gap-6 lg:gap-8">

                <div className="w-full lg:w-[580px]">
                    <h2 className="text-2xl sm:text-3xl lg:text-[30px] font-semibold mb-4 sm:mb-6">Register</h2>
                    {generalError && (
                        <p className={`mb-4 text-sm sm:text-base ${generalError.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
                            {generalError}
                        </p>
                    )}
                    <Namefield
                        value={formData.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                    <UsernameField
                        value={formData.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <PhoneNumberField
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        error={errors.phoneNumber}
                    />
                    <PasswordField
                        value={formData.password}
                        onChange={handleInputChange}
                        error={errors.password}
                    />
                    <ConfirmPasswordField
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        error={errors.confirmPassword}
                    />
                    <div className="flex items-start mt-4 mb-4">
                        <div className="flex items-start cursor-pointer" onClick={handleTermsChange}>
                            <RememberIcon checked={formData.agreeToTerms} />
                            <span className="text-[#A0A0A0] ml-2 text-xs sm:text-sm lg:text-base leading-tight">
                                I agree to the <span className="text-[#1F1F1F]">Terms of Use</span>
                            </span>
                        </div>
                    </div>
                    {errors.agreeToTerms && <p className="text-red-600 mb-2 text-sm sm:text-base">{errors.agreeToTerms}</p>}
                    <button className="bg-black text-xs sm:text-sm text-white px-6 sm:px-8 lg:px-[40px] py-3 sm:py-4 lg:py-[16px] rounded-lg lg:rounded-[12px] mt-4 w-full uppercase cursor-pointer hover:bg-gray-800 transition-colors duration-200" onClick={handleRegister}>
                        REGISTER
                    </button>
                </div>

                {/* <LoginLine className="hidden lg:block" /> */}

                <div className="w-full lg:w-[580px] mt-6 lg:mt-0">
                    <h2 className="text-2xl sm:text-3xl lg:text-[30px] font-semibold mb-2">Already have an account?</h2>
                    <p className="text-[#696C70] text-sm sm:text-base mb-4">
                        Welcome back. Sign in to access your personalized experience, saved preferences, and more. We're thrilled to have you with us again!
                    </p>
                    <button className="bg-black text-xs sm:text-sm text-white px-6 sm:px-8 lg:px-[40px] py-3 sm:py-4 lg:py-[16px] rounded-lg lg:rounded-[12px] mt-4 w-full uppercase cursor-pointer hover:bg-gray-800 transition-colors duration-200" onClick={handleLogin}>
                        LOGIN
                    </button>
                </div>

            </div>

            <Footer />
        </div>
    )
}

export default Signup;