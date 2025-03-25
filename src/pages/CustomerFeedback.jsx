import React from 'react';
import SearchPageNavbar from '../components/SearchPageNavbar';
import Footer from '../components/Footer';
import { StarRating } from '../components/icons';
import { customerReviews } from "../components/ReviewsData";

const CustomerFeedback = () => {
    return (
        <div className="w-full h-auto">
            <SearchPageNavbar title="Customer Feedback" titleHome="Home Page" />

            <div className="px-16 py-4 flex flex-wrap gap-6 justify-between">
                {customerReviews.map((review) => (
                    <div key={review.id} className="bg-[#F7F7F7] rounded-[16px] px-6 py-5 mt-10 mb-10 w-[410px] h-auto flex flex-col">
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

            <Footer />
        </div>
    );
};

export default CustomerFeedback;
