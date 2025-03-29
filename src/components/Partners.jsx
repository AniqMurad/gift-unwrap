import React from "react";
import i1 from "../assets/1.png";
import i2 from "../assets/2.png";
import i3 from "../assets/3.png";
import i4 from "../assets/4.png";
import i5 from "../assets/5.png";
import i6 from "../assets/6.png";

const Partners = () => {
  return (
    <div className="flex justify-between px-16 py-6 mt-10">
        <div>
        <img src={i1}  alt="Shangxi" className="partner-logo w-[90%]"  />
        </div>
        <div>
        <img src={i2} alt="Shangxi" className="partner-logo w-[90%]"  />
        </div>
        <div>
        <img src={i3} alt="Shangxi" className="partner-logo w-[90%]" />
        </div>
        <div>
        <img src={i4} alt="Shangxi" className="partner-logo w-[90%]"/>
        </div>
        <div>
        <img src={i5} alt="Shangxi" className="partner-logo w-[90%]" />
        </div>
        <div>
        <img src={i6} alt="Shangxi" className="partner-logo w-[90%]" />
        </div>
      {/* <img src={i1} alt="Shangxi" className="partner-logo"/>
      <img src={i2} alt="Cheryl" className="partner-logo"/>
      <img src={i3} alt="Vanfaba" className="partner-logo"/>
      <img src={i4} alt="Carolin" className="partner-logo"/>
      <img src={i5} alt="Panadox" className="partner-logo"/>
      <img src={i6} alt="Penny W. Textiles" className="partner-logo"/> */}
    </div>
  );
};

export default Partners;
