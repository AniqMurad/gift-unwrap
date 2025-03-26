import React from "react";
import flowers from "../assets/revfl.png";
import Avatar from "../assets/Avatar.png";
import { StarRating } from "./icons";
import { customerReviews } from "../components/ReviewsData";

const Review = () => {
  const randomReview = customerReviews[Math.floor(Math.random() * customerReviews.length)];

  return (
    <div className="bg-[#F9F1F0] flex mb-3 pb-0 items-center">
      <div className="w-[60%] px-26">
        <div className="w-[630px] flex flex-col justify-between">
          <p className="text-[30px] mb-5">"{randomReview.review}"</p>
          <div className="w-[50%] flex gap-4 items-center">
            <img src={Avatar} alt="User Avatar" className="w-[60px]" />
            <div>
              <p className="text-[18px] font-medium tracking-wide uppercase mb-1">{randomReview.name}</p>
              <StarRating rating={randomReview.rating} />
            </div>
          </div>
        </div>
      </div>

      <div className="w-[40%] flex justify-center items-center h-full">
        <img src={flowers} alt="Flowers" />
      </div>
    </div>
  );
};

export default Review;
