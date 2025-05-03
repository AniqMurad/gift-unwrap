import Footer from "../components/Footer";
import { LoginLine } from "../components/icons";
import SearchPageNavbar from "../components/SearchPageNavbar";
import React, { useState } from "react";
import UsernameField from "@/components/UsernameField";
import PasswordField from "@/components/PasswordField";
import RememberIcon from "@/components/RememberIcon";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState('');

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

    const handleLogin = async () => {
        const newErrors = {};
        setGeneralError('');

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                email: formData.email,
                password: formData.password
            });

            const { token, user } = res.data;

            // Save token (or user info) as needed
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            // Navigate to home or dashboard
            navigate('/');
        } catch (err) {
            const msg = err.response?.data?.message || 'Invalid email or password';
            setGeneralError(msg);
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
            <SearchPageNavbar title="Login" titleHome="Home Page" backgroundColor='#FBF4E8' />

            <div className="flex px-16 py-20 justify-between items-center">

                <div className="w-[580px]">
                    <h2 className="text-[30px] font-semibold mb-6">Login</h2>
                    {generalError && <p className="text-red-600 mb-4">{generalError}</p>}
                    <UsernameField 
                        value={formData.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <PasswordField 
                        value={formData.password}
                        onChange={handleInputChange}
                        error={errors.password}
                    />
                    <div className="flex justify-between items-center mt-4 mb-4">
                        <div className="flex items-center cursor-pointer">
                            <RememberIcon />
                            <span className="text-[#1F1F1F]">Remember me</span>
                        </div>
                        <a className="text-[16px] underline font-semibold cursor-pointer" onClick={handleForgotPass}>
                            Forgot Your Password?
                        </a>
                    </div>
                    <button className="bg-black text-[14px] text-white px-[40px] py-[16px] rounded-[12px] mt-4 uppercase cursor-pointer" onClick={handleLogin}>
                        LOGIN
                    </button>
                </div>

                <LoginLine />

                <div className="w-[580px]">
                    <h2 className="text-[30px] font-semibold mb-2">New Customer</h2>
                    <p className="text-[#696C70] text-[16px] mb-4">
                        Be part of our growing family of new customers! Join us today and unlock
                        a world of exclusive benefits, offers, and personalized experiences.
                    </p>
                    <button className="bg-black text-[14px] text-white px-[40px] py-[16px] rounded-[12px] mt-4 uppercase cursor-pointer" onClick={handleSignup}>
                        REGISTER
                    </button>
                </div>

            </div>

            <Footer />
        </>
    );
};

export default Login;
