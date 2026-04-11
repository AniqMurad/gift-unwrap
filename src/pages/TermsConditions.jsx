import React from "react";
import SearchPageNavbar from "../components/SearchPageNavbar";
import Footer from "../components/Footer";
import Navbar from "@/components/Navbar";
import DeliveryMarquee from "@/components/DeliveryMarquee";

const TermsConditions = () => {
  return (
    <div>
      <Navbar showSearchInput={false} bgColor="#FBF4E8" />
      <DeliveryMarquee />
      <SearchPageNavbar
        title="Terms & Conditions"
        titleHome="Home Page"
        backgroundColor="#FBF4E8"
      />

      <div className="px-4 sm:px-8 lg:px-16 py-8 sm:py-10 lg:py-14">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
              Terms & Conditions
            </h1>
            
            <div className="prose prose-sm sm:prose max-w-none text-gray-600">
              <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
                Order Agreement
              </h2>
              <p className="mb-4 leading-relaxed">
                By using GiftUnwrap.com, you're joining a community dedicated to the art of giving and spreading love. These terms are here to ensure a smooth experience for everyone involved. When you place an order, you agree that all information provided is accurate and that you are authorized to use the payment method selected. We reserve the right to decline or cancel orders if we notice anything unusual or if there are issues with payment authorization, but we will always contact you first to clear things up before taking any action.
              </p>
              
              <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
                Product Information & Intellectual Property
              </h2>
              <p className="mb-4 leading-relaxed">
                We put a lot of heart into our product photos and descriptions. While we strive for perfect accuracy, minor variations in packaging or colors may occur due to screen settings or seasonal availability of certain items like specific flowers or treats. All content on this site, from our logo to our curated gift designs and blog posts, is the intellectual property of GiftUnwrap and cannot be used without our express permission. We take pride in our original work and appreciate your respect for our creative efforts.
              </p>
              
              <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
                Website Maintenance & Updates
              </h2>
              <p className="leading-relaxed">
                Our goal is to keep the website running perfectly all day and night, but occasionally we may need to perform maintenance or updates to improve our service. GiftUnwrap is not liable for any minor delays or technical glitches during these times. By continuing to browse, you agree to follow these simple guidelines designed to keep our gifting community a positive and secure space. We may update these terms from time to time to reflect changes in our business or legal requirements, so we encourage you to check back periodically.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsConditions;
