import React from "react";
import SearchPageNavbar from "../components/SearchPageNavbar";
import Footer from "../components/Footer";
import { StarRating } from "../components/icons";
import { customerReviews } from "../components/ReviewsData";
import Navbar from "@/components/Navbar";

const CustomerFeedback = () => {
  return (
    <div className="w-full h-auto">
      <Navbar showSearchInput={false} bgColor="#FBF4E8" />
      <div className="mb-5">
        <SearchPageNavbar
          title="Customer Feedback"
          titleHome="Home Page"
          backgroundColor="#FBF4E8"
        />
      </div>

      <div className="px-4 sm:px-8 lg:px-16 py-4 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {customerReviews.map((review) => (
          <div
            key={review.id}
            className="bg-[#F7F7F7] rounded-[16px] mt-5 px-6 py-5 w-full max-w-[410px] mx-auto flex flex-col"
          >
            <div className="flex-grow">
              <div className="mb-2">
                <StarRating rating={review.rating} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{review.title}</h3>
                <p className="text-[#1F1F1F] mt-2">{review.review}</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-[#1F1F1F] font-semibold">{review.name}</p>
              <p className="text-[#A0A0A0] text-sm">{review.date}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default CustomerFeedback;
