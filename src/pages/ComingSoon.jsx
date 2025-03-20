import React, { useState, useEffect } from "react";
import { RarrowIcon, FbIcon, InstaIcon, LinkedinIcon, PintIcon, YtIcon } from "../components/icons";

const ComingSoon = () => {
    const calculateTimeLeft = () => {
        const difference = +new Date("2025-03-25") - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#F9F1F0]">
            <div className="text-center">
                {/* Title */}
                <h1 className="text-[80px] font-semibold text-[#1F1F1F] mx-10">Coming Soon</h1>

                <div className="">
                    {/* Countdown Timer */}
                    <div className="flex justify-center items-center content-center mt-6 text-[#1F1F1F]">
                        {Object.entries(timeLeft).map(([label, value], index, array) => (
                            <div key={label} className="flex items-center">
                                <div className="text-center">
                                    <span className="text-[48px] font-bold leading-[1]">{String(value).padStart(2, "0")}</span>
                                    <p className="text-[12px] uppercase tracking-widest mt-1 leading-[1.5]">{label}</p>
                                </div>
                                {index < array.length - 1 && <span className="text-[38px] m-6 items-center">:</span>}
                            </div>
                        ))}
                    </div>

                    {/* Email Subscription Box */}
                    <div className="flex border border-[#E9E9E9] bg-[#FFFFFF] mt-8 rounded-[12px]">
                        <input
                            type="email"
                            placeholder="Enter your e-mail"
                            className="w-full px-4 py-3 rounded-l-full text-gray-700 focus:outline-none"
                        />
                        <button className="bg-[#1F1F1F] text-white p-3 rounded-[12px]">
                            <RarrowIcon className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Social Icons */}
                    <div className="flex justify-center items-centerF space-x-6 mt-6 text-[#1F1F1F]">
                        <FbIcon />
                        <InstaIcon />
                        <YtIcon />
                        <LinkedinIcon />
                        <PintIcon />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComingSoon;