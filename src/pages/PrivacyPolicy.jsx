import React from "react";
import SearchPageNavbar from "../components/SearchPageNavbar";
import Footer from "../components/Footer";
import Navbar from "@/components/Navbar";
import DeliveryMarquee from "@/components/DeliveryMarquee";

const PrivacyPolicy = () => {
  return (
    <div>
      <Navbar showSearchInput={false} bgColor="#FBF4E8" />
      <DeliveryMarquee />
      <SearchPageNavbar
        title="Privacy Policy"
        titleHome="Home Page"
        backgroundColor="#FBF4E8"
      />

      <div className="px-4 sm:px-8 lg:px-16 py-8 sm:py-10 lg:py-14">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
              Privacy Policy
            </h1>
            
            <div className="prose prose-sm sm:prose max-w-none text-gray-600">
              <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
                Data Collection & Security
              </h2>
              <p className="mb-4 leading-relaxed">
                At GiftUnwrap, we take your trust as seriously as your celebrations. We only collect the information necessary to get your beautiful gifts to their destination and this includes your name, delivery address, email, and contact number. Rest assured, your payment details are processed through secure, encrypted gateways, and we never store your credit card information on our own servers. Our website uses standard security protocols to ensure that every interaction you have with our store is protected from unauthorized access.
              </p>
              
              <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
                Data Usage & Sharing
              </h2>
              <p className="mb-4 leading-relaxed">
                We use your data primarily to process orders, provide tracking updates, and, if you've opted in, share occasional gift inspiration or special offers. We do not sell or trade your personal details to outside parties. We only share information with trusted partners, such as our delivery couriers, who need those details to complete your order. We may also use anonymized data to understand shopping trends which helps us improve our gift selection and website performance for a better user experience.
              </p>
              
              <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
                Your Rights & Control
              </h2>
              <p className="leading-relaxed">
                Your rights are important to us and we want you to feel in control of your data. If you ever want to know what information we have on file, or if you'd like us to delete your account and personal data, simply reach out to our team. We are committed to keeping your shopping experience safe and your personal information private. By using our site, you agree to the collection of this information as described, allowing us to provide the seamless service you expect from a premium gifting brand.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
