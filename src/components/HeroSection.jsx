import React from "react";
import img1 from "../assets/herosection1.png";
import img2 from "../assets/herosection2.1.png";
import img3 from "../assets/herosection2.2.png";

const HeroSection = () => {
    return (
        <div className="flex py-6 px-16 gap-6">
            <div className="w-[65%] relative rounded-[24px] overflow-hidden">
                <img src={img1} className="rounded-[24px] shadow-md w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-[rgba(249,241,240,0.9)] via-[rgba(250,247,241,0.3)] to-transparent rounded-[24px] flex items-center px-10">
                    {/* Text Content */}
                    <div className="text-white max-w-md">
                        <h2 className="text-5xl tracking-wide font-bold text-black leading-[50px]">Celebrate Women's Day</h2>
                        <p className="mt-4 text-lg text-black">
                            Express appreciation, gratitude, and support for the women in your lives.
                        </p>
                        <button className="mt-5 px-6 py-2 shadow-lg text-sm text-white bg-black font-semibold rounded-md">
                            SHOP NOW
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-[35%] flex flex-col gap-6">

                <div className="bg-[#DEFBFF] flex justify-between items-center h-[50%] py-5 px-8 rounded-[24px] shadow-md">
                    <div>
                        <p className="bg-[#DB4444] text-white text-xs font-semibold px-2 py-1 rounded-md uppercase w-max">
                            SAVE 10%
                        </p>
                        <p className="text-xl font-bold mt-2">Gifts For Him</p>
                        <p className="text-md mt-3 text-[#696C70]">
                            Starting at{" "}
                            <span className="text-[#DB4444] text-md font-medium">PKR 500</span>
                        </p>
                    </div>
                    <div>
                        <img src={img2} className="w-[140px] h-[140px] rounded-full object-cover" />
                    </div>
                </div>

                <div className="bg-[#F9F1F0] flex justify-between items-center h-[50%] py-5 px-8 rounded-[24px] shadow-md">
                    <div>
                        <p className="bg-[#DB4444] text-white text-xs font-semibold px-2 py-1 rounded-md uppercase w-max">
                            SAVE 10%
                        </p>
                        <p className="text-xl font-bold mt-2">Gifts For Her</p>
                        <p className="text-md mt-3 text-[#696C70]">
                            Starting at{" "}
                            <span className="text-[#DB4444] text-md font-medium">PKR 500</span>
                        </p>
                    </div>
                    <div>
                        <img src={img3} className="w-[140px] h-[140px] rounded-full object-cover" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
