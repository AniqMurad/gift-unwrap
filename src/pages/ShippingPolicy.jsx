import React from "react";
import SearchPageNavbar from "../components/SearchPageNavbar";
import Footer from "../components/Footer";
import Navbar from "@/components/Navbar";
import DeliveryMarquee from "@/components/DeliveryMarquee";

const ShippingPolicy = () => {
  return (
    <div>
      <Navbar showSearchInput={false} bgColor="#FBF4E8" />
      <DeliveryMarquee />
      <SearchPageNavbar
        title="Shipping Policy"
        titleHome="Home Page"
        backgroundColor="#FBF4E8"
      />

      <div className="px-4 sm:px-8 lg:px-16 py-8 sm:py-10 lg:py-14">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
              Shipping Policy
            </h1>
            
            <div className="prose prose-sm sm:prose max-w-none text-gray-600">
              <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
                Processing & Delivery Times
              </h2>
              <p className="mb-4 leading-relaxed">
                We know you're excited to send your love, so we work quickly! Most orders are processed and ready for dispatch within 2-3 business days. Once your gift is on its way, you will receive a tracking number via email so you can follow its journey from our warehouse to your doorstep. Shipping times vary by location, but most domestic deliveries arrive within 5-7 business days. We always aim to beat these estimates whenever possible.
              </p>
              
              <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
                Shipping Options & Address Verification
              </h2>
              <p className="mb-4 leading-relaxed">
                We offer various shipping tiers, from standard delivery to express options for those last minute surprises that just cannot wait. Shipping costs are calculated at checkout based on the weight of the hamper and the delivery destination. Please double check your shipping address before confirming your order. GiftUnwrap cannot be held responsible for delays or non delivery caused by incorrect or incomplete addresses provided at checkout, though we will do our best to help you redirect a package if it is still in transit.
              </p>
              
              <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
                External Factors & Support
              </h2>
              <p className="leading-relaxed">
                While we partner with the most reliable couriers, external factors like extreme weather or holiday rushes can sometimes cause delays beyond our control. If your package is marked as Delivered but has not arrived, please contact us immediately so we can work with the carrier to help you locate it. We are here to ensure your gift arrives safely and makes a great impression, and we will support you through every step of the delivery process.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ShippingPolicy;
