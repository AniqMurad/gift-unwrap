import React from "react";
import flowers from "../assets/revfl.png";
import Avatar from "../assets/Avatar.png";
import { StarRating } from "./icons";
import { customerReviews } from "../components/ReviewsData";

const Review = () => {
  const randomReview = customerReviews[Math.floor(Math.random() * customerReviews.length)];

  return (
    <div className="bg-[#F9F1F0] flex flex-col lg:flex-row items-center justify-between px-6 py-10 gap-6">
      
      {/* Review Text Section */}
      <div className="w-full lg:w-[60%]">
        <div className="max-w-[630px] flex flex-col justify-between mx-auto">
          <p className="text-[20px] sm:text-[24px] lg:text-[30px] mb-5 leading-relaxed">
            "{randomReview.review}"
          </p>
          <div className="flex items-center gap-4">
            <img src={Avatar} alt="User Avatar" className="w-[50px] sm:w-[60px]" />
            <div>
              <p className="text-[16px] sm:text-[18px] font-medium tracking-wide uppercase mb-1">
                {randomReview.name}
              </p>
              <StarRating rating={randomReview.rating} />
            </div>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full lg:w-[40%] flex justify-center">
        <img src={flowers} alt="Flowers" className="max-w-[300px] w-full h-auto object-contain" />
      </div>
    </div>
  );
};

export default Review;

