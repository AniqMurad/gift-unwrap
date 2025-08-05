import React, { useState, useEffect } from "react";
import SearchPageNavbar from "../components/SearchPageNavbar";
import Footer from "../components/Footer";
import Navbar from "@/components/Navbar";
import NotificationBar from "../components/NotificationBar";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Hide notification when user starts typing
    if (notification.show) {
      setNotification((prev) => ({ ...prev, show: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessageSent(false);
    setNotification((prev) => ({ ...prev, show: false })); // Hide any existing notifications

    try {
      const response = await fetch("https://giftunwrapbackend.vercel.app/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: "", email: "", content: "" });
        setMessageSent(true);
        showNotification("success", "Your message has been sent successfully!");
      } else {
        const errorData = await response.json();
        const errorMessage =
          errorData.message || "Failed to send message. Please try again.";
        showNotification("error", errorMessage);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      showNotification(
        "error",
        "Something went wrong. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {notification.show && (
        <NotificationBar
          type={notification.type}
          message={notification.message}
        />
      )}
      <Navbar showSearchInput={false} bgColor="#FBF4E8" />
      <SearchPageNavbar
        title="Contact Us"
        titleHome="Home Page"
        backgroundColor="#FBF4E8"
      />

      <div className="px-4 sm:px-8 lg:px-16 py-4">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12 mt-6 sm:mt-10">
          <div className="w-full lg:w-[850px]">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold">
                Drop Us A Line
              </h2>
              <p className="text-[#A0A0A0] mt-2 text-sm sm:text-base">
                Use the form below to get in touch with the sales team{" "}
              </p>
            </div>

            <form className="mt-4 sm:mt-6" onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:ring focus:ring-gray-200 outline-none"
                  required
                  disabled={loading}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:ring focus:ring-gray-200 outline-none"
                  required
                  disabled={loading}
                />
              </div>

              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Your Message"
                className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 mt-3 sm:mt-4 h-24 sm:h-28 text-sm sm:text-base focus:ring focus:ring-gray-200 outline-none"
                required
                disabled={loading}
              ></textarea>

              <button
                type="submit"
                className="mt-3 sm:mt-4 px-4 sm:px-6 py-2 sm:py-3 bg-black text-white text-sm sm:text-base rounded-lg hover:bg-gray-800 transition w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "Sending..." : "SEND MESSAGE"}
              </button>
              {messageSent && (
                <p className="mt-2 text-green-600 text-sm sm:text-base">
                  Your message has been sent!
                </p>
              )}
            </form>
          </div>

          <div className="w-full lg:w-[300px] text-[#1F1F1F]">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold">Our Store</h3>
              <p className="mt-2 text-sm sm:text-base leading-relaxed">
                Shop No. 226 PIB Colony near Jail Chowrangi, Karachi, Pakistan
              </p>
              <p className="mt-2 text-sm sm:text-base">
                Phone: +92 313 0216931
              </p>
              <p className="text-sm sm:text-base">
                Email: giftunwrap@gmail.com
              </p>
            </div>

            {/* <div>
                <h3 className="text-xl sm:text-2xl font-semibold mt-4 sm:mt-6">Open Hours</h3>
                <p className="text-sm sm:text-base">Mon - Fri: 7:30am - 8:00pm PST</p>
                <p className="text-sm sm:text-base">Saturday: 8:00am - 6:00pm PST</p>
                <p className="text-sm sm:text-base">Sunday: 9:00am - 5:00pm PST</p>
            </div> */}

            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mt-4 sm:mt-6">
                Open Hours
              </h3>
              <p className="text-sm sm:text-base">Available 24/7</p>
            </div>
          </div>
        </div>

        <div className="w-full mt-8 sm:mt-12">
          <iframe
            title="Store Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28950.479383254168!2d67.06026213656998!3d24.89173305270807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e5cf6b037fb%3A0x9b7f2c3c1b4a0efb!2sPIB%20Colony%2C%20Karachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1721218654847!5m2!1sen!2s"
            width="100%"
            height="300"
            className="sm:h-[400px] rounded-lg shadow-md"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;
