import React from 'react';
import SearchPageNavbar from '../components/SearchPageNavbar';
import Footer from '../components/Footer';
import { StarRating } from '../components/icons';

const CustomerFeedback = () => {
    return (
        <div className="w-full h-auto">
            <SearchPageNavbar title="Customer Feedback" />

            <div className='px-16 py-4 flex justify-between'>

                <div className="bg-[#F7F7F7] rounded-[16px] px-6 py-5 mt-10 mb-10 w-[380px]">
                    <div>
                        <div className="mb-2">
                            <StarRating />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Quality Of Clothing!</h3>
                            <p className="text-[#1F1F1F] mt-2">
                                "I absolutely love this shop! The products are high-quality and the customer
                                service is excellent. I always leave with exactly what I need and a smile on my face."
                            </p>
                        </div>
                    </div>
                    <div>
                        <p className="text-gray-800 font-semibold mt-3">Mark G.</p>
                        <p className="text-gray-400 text-sm">August 13, 2023</p>
                    </div>
                </div>

                <div className="bg-[#F7F7F7] rounded-[16px] px-6 py-5 mt-10 mb-10 w-[380px]">
                    <div>
                        <div className="mb-2">
                            <StarRating />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Quality Of Clothing!</h3>
                            <p className="text-[#1F1F1F] mt-2">
                                "I absolutely love this shop! The products are high-quality and the customer
                                service is excellent. I always leave with exactly what I need and a smile on my face."
                            </p>
                        </div>
                    </div>
                    <div>
                        <p className="text-gray-800 font-semibold mt-3">Mark G.</p>
                        <p className="text-gray-400 text-sm">August 13, 2023</p>
                    </div>
                </div>

                <div className="bg-[#F7F7F7] rounded-[16px] px-6 py-5 mt-10 mb-10 w-[380px]">
                    <div>
                        <div className="mb-2">
                            <StarRating />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Quality Of Clothing!</h3>
                            <p className="text-[#1F1F1F] mt-2">
                                "I absolutely love this shop! The products are high-quality and the customer
                                service is excellent. I always leave with exactly what I need and a smile on my face."
                            </p>
                        </div>
                    </div>
                    <div>
                        <p className="text-gray-800 font-semibold mt-3">Mark G.</p>
                        <p className="text-gray-400 text-sm">August 13, 2023</p>
                    </div>
                </div>

            </div>

            <Footer />
        </div>
    );
};

export default CustomerFeedback;
