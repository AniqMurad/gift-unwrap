import React from "react";
import i1 from "../assets/1.png";
import i2 from "../assets/2.png";
import i3 from "../assets/3.png";
import i4 from "../assets/4.png";
import i5 from "../assets/5.png";
import i6 from "../assets/6.png";

const Partners = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 px-4 sm:px-8 lg:px-16 py-6 mt-10">
        <div className="flex justify-center items-center mb-3 sm:mb-0">
        <img src={i1}  alt="Shangxi" className="partner-logo w-full max-w-[120px] h-auto object-contain"  />
        </div>
        <div className="flex justify-center items-center mb-3 sm:mb-0">
        <img src={i2} alt="Shangxi" className="partner-logo w-full max-w-[120px] h-auto object-contain"  />
        </div>
        <div className="flex justify-center items-center mb-3 sm:mb-0">
        <img src={i3} alt="Shangxi" className="partner-logo w-full max-w-[120px] h-auto object-contain" />
        </div>
        <div className="flex justify-center items-center mb-3 sm:mb-0">
        <img src={i4} alt="Shangxi" className="partner-logo w-full max-w-[120px] h-auto object-contain"/>
        </div>
        <div className="flex justify-center items-center mb-3 sm:mb-0">
        <img src={i5} alt="Shangxi" className="partner-logo w-full max-w-[120px] h-auto object-contain" />
        </div>
        <div className="flex justify-center items-center mb-3 sm:mb-0">
        <img src={i6} alt="Shangxi" className="partner-logo w-full max-w-[120px] h-auto object-contain" />
        </div>
    </div>
  );
};

export default Partners;
