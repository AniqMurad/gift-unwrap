import React, { useState } from "react";
import { FbIcon, InstaIcon, PintIcon, RarrowIcon, TwtIcon, YtIcon, VisaIcon, MastercardIcon, PaypalIcon, } from "./icons";
import Logo from '../assets/logofooter.png';
import { useNavigate } from "react-router-dom"; 

const Footer = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    
    const goToContact = () => navigate('/contact-us');
    const goToReviews = () => navigate('/customer-feedback');
    const goToFaqs = () => navigate('/faqs'); 
    const goToJoy = () => navigate('/giftforeveryone'); 
    const goToForever = () => navigate('/giftforwedding'); 
    const goToHer = () => navigate('/giftforher'); 
    const goToHis = () => navigate('/giftforhim');

    // Email validation function
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) && email.includes('@') && email.includes('.');
    };

    const handleNewsletterSubmit = () => {
        if (isValidEmail(email)) {
            // Navigate to signup page with email as state
            navigate('/signup', { 
                state: { 
                    prefillEmail: email 
                } 
            });
        } else {
            alert('Please enter a valid email address');
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleNewsletterSubmit();
        }
    };

    return (
        <div className="bg-gray-100 px-16 py-10 text-gray-700 text-sm">
            <div className="flex justify-between">
                <div className="w-[300px] flex flex-col gap-4">
                    <div className="text-2xl font-bold mb-3">
                        <img src={Logo} alt="" className="w-[173px] h-[42px]"/>
                    </div>
                    <p><strong>Mail:</strong> giftunwrap@gmail.com</p>
                    <p><strong>Phone:</strong> +92 326 8927354</p>
                    <p><strong>Address:</strong> Shop No. 226 PIB Colony near Jail Chowrangi, Karachi</p>
                </div>

                <div className="flex justify-between gap-10 w-[500px]">
                    <div className="flex flex-col gap-4">
                        <h4 className="font-semibold mb-2">INFORMATION</h4>
                        <p className="cursor-pointer hover:text-black transition-colors" onClick={goToContact}>Contact us</p>
                        <p className="cursor-pointer hover:text-black transition-colors" onClick={goToReviews}>Reviews</p>
                        <p className="cursor-pointer hover:text-black transition-colors" onClick={goToFaqs}>FAQs</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="font-semibold mb-2">QUICK SHOP</h4>
                        <p className="cursor-pointer hover:text-black transition-colors" onClick={goToJoy}>Universal Joy</p>
                        <p className="cursor-pointer hover:text-black transition-colors" onClick={goToForever}>Forever Beginnings</p>
                        <p className="cursor-pointer hover:text-black transition-colors" onClick={goToHer}>Her Desires</p>
                        <p className="cursor-pointer hover:text-black transition-colors" onClick={goToHis}>His Desires</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="font-semibold mb-2">CUSTOMER SERVICES</h4>
                        <p>High Quality Product</p>
                        <p>Shipping</p>
                        <p>Customer Service</p>
                        <p>Return & Refund</p>
                    </div>
                </div>

                <div className="w-[300px] flex flex-col gap-4">
                    <h4 className="font-semibold mb-2">NEWSLETTER</h4>
                    <p>Sign up for our newsletter and get 10% off your first purchase</p>
                    <div className="flex mt-3">
                        <input
                            type="email"
                            placeholder="Enter your e-mail"
                            value={email}
                            onChange={handleEmailChange}
                            onKeyPress={handleKeyPress}
                            className="px-4 py-2 w-64 border border-gray-300 rounded-l-md focus:outline-none bg-white"
                        />
                        <button 
                            onClick={handleNewsletterSubmit}
                            className="bg-black text-white px-4 py-2 rounded-r-md flex items-center justify-center hover:bg-gray-800 transition-colors"
                        >
                            <RarrowIcon className="text-white w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex space-x-6 mt-4 text-gray-600">
                        <FbIcon />
                        <InstaIcon />
                        <YtIcon />
                        <TwtIcon />
                        <PintIcon />
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center border-t mt-6 pt-4 text-gray-500 text-sm">
                <p>©2025 GiftUnwrap. All Rights Reserved.</p>

                <div className="flex items-center space-x-2 w-[200px]">
                    <span className="text-gray-600 w-[70px]">Payment:</span>
                    <div className="flex w-[130px] justify-between">
                        <div className="border border-gray-300 rounded-md p-1 content-center">
                            <VisaIcon />
                        </div>
                        <div className="border border-gray-300 rounded-md p-1 content-center">
                            <MastercardIcon />
                        </div>
                        <div className="border border-gray-300 rounded-md p-1 content-center">
                            <PaypalIcon />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;