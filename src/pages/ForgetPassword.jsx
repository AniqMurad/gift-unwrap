import ConfirmPasswordField from '@/components/ConfirmPasswordField';
import Footer from '@/components/Footer';
import { LoginLine } from '@/components/icons';
import PasswordField from '@/components/PasswordField';
import SearchPageNavbar from '@/components/SearchPageNavbar';
import UsernameField from '@/components/UsernameField';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from '@/components/Navbar';

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleEmailSubmit = async () => {
        if (!formData.email.trim()) {
            setError('Email is required');
            return;
        }

        try {
            const res = await axios.post('https://giftunwrap-puce.vercel.app/api/auth/forgot-password', { email: formData.email });
            console.log('Response:', res.data); // Log response here
            setToken(res.data.token); // Assuming your backend sends a token
            setStep('reset');
        } catch (err) {
            console.error('Email submit error:', err.response?.data || err.message); // Log full error
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    const handlePasswordReset = async () => {
        if (!formData.password || !formData.confirmPassword) {
            setError('Both fields are required');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            // Send email and password for reset
            await axios.post('https://giftunwrap-puce.vercel.app/api/auth/reset-password', {
                email: formData.email, // Include email here
                password: formData.password,
            });

            alert('Password reset successful. Please login.');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Reset failed');
        }
    };

    return (
        <div>
            <Navbar showSearchInput={false} bgColor="#FBF4E8" />
            <SearchPageNavbar title="Forget Your Password" titleHome="Home Page" backgroundColor='#FBF4E8' />

            <div className="flex px-16 py-20 justify-between items-center">
                <div className="w-[580px]">
                    <h2 className="text-[30px] font-semibold mb-2">Reset Your Password</h2>
                    <p className='text-[18px] mb-6'>
                        {step === 'email' ? 'Enter your email' : 'Enter your new password'}
                    </p>

                    {error && <p className="text-red-600 mb-4">{error}</p>}

                    {step === 'email' ? (
                        <>
                            <UsernameField
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            <button
                                className="bg-black text-white px-[40px] py-[16px] rounded-[12px] mt-8 uppercase"
                                onClick={handleEmailSubmit}
                            >
                                Submit
                            </button>
                        </>
                    ) : (
                        <>
                            <PasswordField
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            <ConfirmPasswordField
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                            />
                            <button
                                className="bg-black text-white px-[40px] py-[16px] rounded-[12px] mt-8 uppercase"
                                onClick={handlePasswordReset}
                            >
                                Reset Password
                            </button>
                        </>
                    )}
                </div>

                <LoginLine />

                <div className="w-[580px]">
                    <h2 className="text-[30px] font-semibold mb-2">New Customer</h2>
                    <p className="text-[#696C70] text-[16px] mb-4">
                        Be part of our growing family of new customers! Join us today and unlock
                        a world of exclusive benefits, offers, and personalized experiences.
                    </p>
                    <button
                        className="bg-black text-white px-[40px] py-[16px] rounded-[12px] mt-4 uppercase cursor-pointer"
                        onClick={() => navigate("/signup")}
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
