import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NotificationBar from './NotificationBar';

const Offer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [notification, setNotification] = useState({
    show: false,
    type: 'success',
    message: ''
  });

  // Auto-hide notification after 3 seconds
  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification(prev => ({ ...prev, show: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  const showNotification = (type, message) => {
    setNotification({
      show: true,
      type,
      message
    });
  };

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
      showNotification('error', 'Please enter a valid email address');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Hide notification when user starts typing
    if (notification.show) {
      setNotification(prev => ({ ...prev, show: false }));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubscribe();
    }
  };

  return (
    <div className="relative">
      {notification.show && (
        <NotificationBar type={notification.type} message={notification.message} />
      )}
      <div className="w-full bg-[#D2EF9A] p-4 sm:p-6 lg:p-10 text-center flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-32 mt-10">
        <div className="max-w-md lg:max-w-none">
          <h2 className="text-xl sm:text-2xl lg:text-[32px] font-bold tracking-wide">
            Sign Up And Get 10% Off
          </h2>
          <p className="text-xs sm:text-sm text-gray-700 font-normal tracking-wide mt-2">
            Sign up for early sale access, new in, promotions and more
          </p>
        </div>
        <div className="w-full max-w-md lg:max-w-none">
          <div className="flex flex-col sm:flex-row p-1 bg-white rounded-lg justify-between">
            <input
              type="email"
              placeholder="Enter your e-mail"
              value={email}
              onChange={handleEmailChange}
              onKeyPress={handleKeyPress}
              className="px-4 py-2 w-full sm:w-80 bg-white placeholder-opacity-100 placeholder:text-sm placeholder:font-normal focus:outline-none rounded-lg sm:rounded-r-none"
            />
            <button 
              onClick={handleSubscribe}
              className="bg-black text-white px-4 sm:px-8 py-2 text-sm rounded-lg sm:rounded-l-none hover:bg-gray-800 transition-colors mt-2 sm:mt-0"
            > 
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;