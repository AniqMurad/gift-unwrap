import React, { useState } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "./icons";
import axios from "axios";

const RequestQuoteModal = ({ isOpen, onClose, product }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    quantity: "",
    email: "",
    phoneNumber: "",
    additionalRequirements: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    if (!formData.quantity.trim()) {
      newErrors.quantity = "Number of products is required";
    } else if (isNaN(formData.quantity) || parseInt(formData.quantity) <= 0) {
      newErrors.quantity = "Please enter a valid number greater than 0";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        productId: product.id,
        productName: product.name,
        productImage: product.image || (product.images && product.images[0]),
        companyName: formData.companyName,
        quantity: parseInt(formData.quantity),
        email: formData.email,
        phoneNumber: formData.phoneNumber || null,
        additionalRequirements: formData.additionalRequirements || null,
      };

      await axios.post(
        "https://giftunwrapbackend.vercel.app/api/quotes",
        payload
      );

      setShowSuccess(true);

      // Reset form
      setFormData({
        companyName: "",
        quantity: "",
        email: "",
        phoneNumber: "",
        additionalRequirements: "",
      });

      // Close modal after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Error submitting quote request:", error);
      setErrors({
        submit:
          error.response?.data?.message ||
          "Failed to submit quote request. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        companyName: "",
        quantity: "",
        email: "",
        phoneNumber: "",
        additionalRequirements: "",
      });
      setErrors({});
      setShowSuccess(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}>
      <div className="bg-[#FBF4E8] rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-gray-200">
        {/* Header */}
        <div className="sticky top-0 bg-[#FBF4E8] border-b border-gray-300 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1F1F1F]">
            Request a Corporate Quote
          </h2>
          {!isSubmitting && (
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white rounded-full transition-colors"
              aria-label="Close modal"
            >
              <CloseIcon className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>

        {/* Success Message */}
        {showSuccess ? (
          <div className="p-8 text-center">
            <div className="mb-4">
              <svg
                className="w-16 h-16 text-green-500 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Thank You!
            </h3>
            <p className="text-gray-600">
              Thank you for your interest. Our team will contact you shortly
              with a quotation.
            </p>
          </div>
        ) : (
          <>
            {/* Product Info */}
            <div className="px-6 pt-4 pb-2 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <img
                  src={
                    product.image || (product.images && product.images[0])
                  }
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <p className="font-semibold text-[#1F1F1F]">{product.name}</p>
                  <p className="text-sm text-[#696C70]">Corporate pricing · Quote on request</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {errors.submit && (
                <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {errors.submit}
                </div>
              )}

              {/* Company Name */}
              <div>
                <label className="block text-sm font-semibold text-[#1F1F1F] mb-1">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none bg-white ${
                    errors.companyName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your company name"
                />
                {errors.companyName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.companyName}
                  </p>
                )}
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold text-[#1F1F1F] mb-1">
                  Number of Products Needed <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="1"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none bg-white ${
                    errors.quantity ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter quantity"
                />
                {errors.quantity && (
                  <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-[#1F1F1F] mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none bg-white ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="your.email@company.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone Number (Optional) */}
              <div>
                <label className="block text-sm font-semibold text-[#1F1F1F] mb-1">
                  Phone Number <span className="text-gray-500">(Optional)</span>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none bg-white"
                  placeholder="+92 XXX XXXXXXX"
                />
              </div>

              {/* Additional Requirements (Optional) */}
              <div>
                <label className="block text-sm font-semibold text-[#1F1F1F] mb-1">
                  Additional Requirements{" "}
                  <span className="text-gray-500">(Optional)</span>
                </label>
                <textarea
                  name="additionalRequirements"
                  value={formData.additionalRequirements}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none resize-none bg-white"
                  placeholder="Any specific requirements or customization needs..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition-colors ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-black hover:bg-gray-800"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    "Submit Quote Request"
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default RequestQuoteModal;
