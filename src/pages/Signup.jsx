import ConfirmPasswordField from '@/components/ConfirmPasswordField'
import Footer from '@/components/Footer'
import { LoginLine } from '@/components/icons'
import PasswordField from '@/components/PasswordField'
import RememberIcon from '@/components/RememberIcon'
import SearchPageNavbar from '@/components/SearchPageNavbar'
import UsernameField from '@/components/UsernameField'
import { useNavigate } from "react-router-dom";
import React,{useState} from 'react'

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userId: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });

    const [errors, setErrors] = useState({
        userId: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
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

    const handleRegister = () => {
        const newErrors = {};
        
        // Username validation
        if (!formData.userId.trim()) {
            newErrors.userId = 'Username is required';
        }
        
        // Password validation
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        }
    
        // Confirm password validation
        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
    
        // Terms agreement validation
        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the Terms of Use';
        }
    
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
    
        // If no errors, proceed with registration
        console.log('Registration attempted with:', formData);
    };

    const handleLogin = () => {
        navigate("/login");
    };
    return (
        <div>
            <SearchPageNavbar title="Create An Account" titleHome="Home Page" backgroundColor = '#FBF4E8'/>

            <div className="flex px-16 py-20 justify-between items-center">

                <div className="w-[580px]">
                    <h2 className="text-[30px] font-semibold mb-6">Register</h2>
                    <div>
                    <UsernameField 
                            value={formData.userId}
                            onChange={handleInputChange}
                            error={errors.userId}
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
                        <div className="flex justify-between items-center mt-4 mb-4">
                            <div className="flex items-center">
                                <RememberIcon />
                                <span className="text-[#A0A0A0]">
                                    I agree to the <span className="text-[#1F1F1F]">Terms of Use</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <button className="bg-black text-[14px] text-white px-[40px] py-[16px] rounded-[12px] mt-4 uppercase cursor-pointer" onClick={handleRegister}>REGISTER</button>
                </div>

                <LoginLine />

                <div className="w-[580px]">
                    <h2 className="text-[30px] font-semibold mb-2">Already have an account?</h2>
                    <p className="text-[#696C70] text-[16px] mb-4">
                        Welcome back. Sign in to access your personalized experience, saved preferences, and more. We're thrilled to have you with us again!
                    </p>
                    <button className="bg-black text-[14px] text-white px-[40px] py-[16px] rounded-[12px] mt-4 uppercase cursor-pointer" onClick={handleLogin}>LOGIN</button>
                </div>

            </div>

            <Footer />
        </div>
    )
}

export default Signup