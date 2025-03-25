import React from "react";
import { FbIcon, InstaIcon, PintIcon, RarrowIcon, TwtIcon, YtIcon, VisaIcon, MastercardIcon, PaypalIcon, } from "./icons";
import Logo from '../assets/logo.png';
const Footer = () => {
  return (
    <div className="bg-gray-100 px-16 py-10 text-gray-700 text-sm">
      <div className="flex justify-between">

        <div className="w-[300px] flex flex-col gap-4">
          <div className="text-2xl font-bold mb-3">
            <img src={Logo} alt="" />
          </div>
          <p><strong>Mail:</strong> giftunwrap@gmail.com</p>
          <p><strong>Phone:</strong> 1-333-345-6868</p>
          <p><strong>Address:</strong> Flat C9, Rehmani Garden Colony, Nistar Rd, Karachi</p>
        </div>

        <div className="flex justify-between gap-10 w-[500px]">
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold mb-2">INFORMATION</h4>
            <p>Contact us</p>
            <p>Reviews</p>
            <p>Track Order</p>
            <p>FAQs</p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-semibold mb-2">QUICK SHOP</h4>
            <p>Gifts by Occasion</p>
            <p>Gift of Choice</p>
            <p>Gift Cards</p>
            <p>Employee Gifts</p>
            <p>Client Gifts</p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-semibold mb-2">CUSTOMER SERVICES</h4>
            <p>Orders FAQs</p>
            <p>Shipping</p>
            <p>Privacy Policy</p>
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
              className="px-4 py-2 w-64 border border-gray-300 rounded-l-md focus:outline-none bg-white"
            />
            <button className="bg-black text-white px-4 py-2 rounded-r-md flex items-center justify-center">
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
          <div className="flex w-[130px] flex justify-between">
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
