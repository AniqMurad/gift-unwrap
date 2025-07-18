import React, { useState, useEffect } from "react";
import {
  FbIcon,
  InstaIcon,
  PintIcon,
  RarrowIcon,
  TwtIcon,
  YtIcon,
  VisaIcon,
  MastercardIcon,
  PaypalIcon,
} from "./icons";
import Logo from "../assets/logofooter.png";
import { useNavigate } from "react-router-dom";
import NotificationBar from "./NotificationBar";

const Footer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [notification, setNotification] = useState({
    show: false,
    type: "success",
    message: "",
  });

  // Auto-hide notification after 3 seconds
  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification((prev) => ({ ...prev, show: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  const showNotification = (type, message) => {
    setNotification({
      show: true,
      type,
      message,
    });
  };

  const goToContact = () => navigate("/contact-us");
  const goToReviews = () => navigate("/customer-feedback");
  const goToFaqs = () => navigate("/faqs");
  const goToJoy = () => navigate("/giftforeveryone");
  const goToForever = () => navigate("/giftforwedding");
  const goToHer = () => navigate("/giftforher");
  const goToHis = () => navigate("/giftforhim");

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.includes("@") && email.includes(".");
  };

  const handleNewsletterSubmit = () => {
    if (isValidEmail(email)) {
      // Navigate to signup page with email as state
      navigate("/signup", {
        state: {
          prefillEmail: email,
        },
      });
    } else {
      showNotification("error", "Please enter a valid email address");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Hide notification when user starts typing
    if (notification.show) {
      setNotification((prev) => ({ ...prev, show: false }));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleNewsletterSubmit();
    }
  };

  return (
    <div className="relative">
      {notification.show && (
        <NotificationBar
          type={notification.type}
          message={notification.message}
        />
      )}
      <div className="bg-gray-100 px-4 sm:px-8 lg:px-16 py-10 text-gray-700 text-sm">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
          <div className="w-full lg:w-[300px] flex flex-col gap-4">
            <div className="text-2xl font-bold mb-3">
              <img src={Logo} alt="" className="w-[173px] h-[42px]" />
            </div>
            <p>
              <strong>Mail:</strong> giftunwrap@gmail.com
            </p>
            <p>
              <strong>Phone:</strong> +92 326 8927354
            </p>
            <p>
              <strong>Address:</strong> Shop No. 226 PIB Colony near Jail
              Chowrangi, Karachi
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-10 w-full lg:w-[500px]">
            <div className="flex flex-col gap-4">
              <h4 className="font-semibold mb-2">INFORMATION</h4>
              <p
                className="cursor-pointer hover:text-black transition-colors"
                onClick={goToContact}
              >
                Contact us
              </p>
              <p
                className="cursor-pointer hover:text-black transition-colors"
                onClick={goToReviews}
              >
                Reviews
              </p>
              <p
                className="cursor-pointer hover:text-black transition-colors"
                onClick={goToFaqs}
              >
                FAQs
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="font-semibold mb-2">QUICK SHOP</h4>
              <p
                className="cursor-pointer hover:text-black transition-colors"
                onClick={goToJoy}
              >
                Universal Joy
              </p>
              <p
                className="cursor-pointer hover:text-black transition-colors"
                onClick={goToForever}
              >
                Forever Beginnings
              </p>
              <p
                className="cursor-pointer hover:text-black transition-colors"
                onClick={goToHer}
              >
                Her Desires
              </p>
              <p
                className="cursor-pointer hover:text-black transition-colors"
                onClick={goToHis}
              >
                His Desires
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="font-semibold mb-2">CUSTOMER SERVICES</h4>
              <p>High Quality Product</p>
              <p>Shipping</p>
              <p>Customer Service</p>
              <p>Return & Refund</p>
            </div>
          </div>

          <div className="w-full lg:w-[300px] flex flex-col gap-4">
            <h4 className="font-semibold mb-2">NEWSLETTER</h4>
            <p>
              Sign up for our newsletter and get 10% off your first purchase
            </p>
            <div className="flex flex-col sm:flex-row mt-3">
              <input
                type="email"
                placeholder="Enter your e-mail"
                value={email}
                onChange={handleEmailChange}
                onKeyPress={handleKeyPress}
                className="px-4 py-2 w-full sm:w-64 border border-gray-300 rounded-l-md sm:rounded-r-none rounded-r-md focus:outline-none bg-white"
              />
              <button
                onClick={handleNewsletterSubmit}
                className="bg-black text-white px-4 py-2 rounded-r-md sm:rounded-l-none rounded-l-md mt-2 sm:mt-0 flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <RarrowIcon className="text-white w-5 h-5" />
              </button>
            </div>

            <div className="flex justify-center sm:justify-start space-x-6 mt-4 text-gray-600">
              <a
                href="https://www.facebook.com/share/16PiPh8aS6/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FbIcon />
              </a>
              <a
                href="https://www.instagram.com/gift_unwrap?igsh=NjQyeG5kb2gydWho&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <InstaIcon />
              </a>
              {/* <YtIcon />
                <TwtIcon />
                <PintIcon /> */}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-t mt-6 pt-4 text-gray-500 text-sm gap-4">
          <p>©2025 GiftUnwrap. All Rights Reserved.</p>

          <div className="flex items-center justify-center sm:justify-end space-x-2 w-full sm:w-[200px]">
            <span className="text-gray-600 w-auto sm:w-[70px]">Payment:</span>
            <div className="flex w-auto sm:w-[130px] justify-center sm:justify-between gap-2">
              {/* <div className="border border-gray-300 rounded-md p-1 content-center">
                <VisaIcon />
              </div>
              <div className="border border-gray-300 rounded-md p-1 content-center">
                <MastercardIcon />
              </div>
              <div className="border border-gray-300 rounded-md p-1 content-center">
                <PaypalIcon />
              </div> */}
              Cash on delivery
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
