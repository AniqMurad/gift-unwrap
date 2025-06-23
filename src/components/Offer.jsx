import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Offer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.includes('@') && email.includes('.');
  };

  const handleSubscribe = () => {
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
      handleSubscribe();
    }
  };

  return (
    <div className="w-full bg-[#D2EF9A] p-10 text-center flex justify-center items-center gap-32 mt-10">
      <div className="">
        <h2 className="text-[32px] font-bold tracking-wide">
          Sign Up And Get 10% Off
        </h2>
        <p className="text-sm text-gray-700 font-normal tracking-wide">
          Sign up for early sale access, new in, promotions and more
        </p>
      </div>
      <div className=" ">
        <div className="flex p-1 bg-white rounded-lg">
          <input
            type="email"
            placeholder="Enter your e-mail"
            value={email}
            onChange={handleEmailChange}
            onKeyPress={handleKeyPress}
            className="px-4 py-2 w-80 bg-white placeholder-opacity-100 placeholder:text-sm placeholder:font-normal focus:outline-none"
          />
          <button 
            onClick={handleSubscribe}
            className="bg-black text-white px-8 py-2 text-sm rounded-lg hover:bg-gray-800 transition-colors"
          > 
            SUBSCRIBE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Offer;