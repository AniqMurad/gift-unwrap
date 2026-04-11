import React from "react";
import SearchPageNavbar from "../components/SearchPageNavbar";
import Footer from "../components/Footer";
import Navbar from "@/components/Navbar";
import DeliveryMarquee from "@/components/DeliveryMarquee";

const RefundReturnPolicy = () => {
  return (
    <div>
      <Navbar showSearchInput={false} bgColor="#FBF4E8" />
      <DeliveryMarquee />
      <SearchPageNavbar
        title="Refund & Return Policy"
        titleHome="Home Page"
        backgroundColor="#FBF4E8"
      />

      <div className="px-4 sm:px-8 lg:px-16 py-8 sm:py-10 lg:py-14">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
              Refund & Return Policy
            </h1>
            
            <div className="prose prose-sm sm:prose max-w-none text-gray-600">
              <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
                Damaged or Incorrect Items
              </h2>
              <p className="mb-4 leading-relaxed">
                We want you and your recipient to love every gift! If an item arrives damaged or isn't what you ordered, please let us know within 24-72 hours of delivery. To help us fix things quickly, just send a photo of the issue along with your order number to our support team. We will happily arrange a replacement or a full refund to your original payment method as soon as the claim is verified. Our priority is ensuring that the joy of gifting isn't dampened by a logistical error.
              </p>
              
              <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
                Returns & Exchanges
              </h2>
              <p className="mb-4 leading-relaxed">
                Because many of our gifts are curated or contain perishable items, we generally cannot accept returns for change of mind once a gift has been dispatched. For non perishable and non personalized items, you can request an exchange within 24–48 hours days of receipt, provided the item is unused and in its original, unopened packaging. We ask that you reach out to us first to obtain an authorization for the return so we can track the package and process your exchange as quickly as possible.
              </p>
              
              <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
                Custom Items & Shipping Costs
              </h2>
              <p className="leading-relaxed">
                Please note that custom made hampers and personalized items like engraved mugs or custom frames are final sale unless they arrive defective. We believe in fairness and if we made a mistake, we will own it and make it right at no extra cost to you. If you are returning an item for an exchange based on a personal preference, the customer is responsible for the return shipping fees. We recommend using a trackable shipping service to ensure the items reach us safely.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RefundReturnPolicy;
