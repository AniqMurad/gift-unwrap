import React from "react";

const Offer = () => {
  return (
    <div className="w-full bg-[#D2EF9A] p-10 text-center flex justify-center items-center gap-32 mt-10">
      <div className="">
        <h2 className="text-[32px] font-bold tracking-wide">
          Sign Up And Get 10% Off
        </h2>
        <p className="text-sm text-gray-700 font-normal tracking-wide">
          Sign up for early sale access, new in, promotions and more
        </p>
      </div>
      <div className=" ">
        <div className="flex p-1 bg-white rounded-lg">
          <input
            type="email"
            placeholder="Enter your e-mail"
            className="px-4 py-2 w-80  bg-white placeholder-opacity-100 placeholder:text-sm placeholder:font-normal"
          />
          <button className="bg-black text-white px-8 py-2 text-sm rounded-lg "> 
            SUBSCRIBE
           </button>
        </div>
      </div>

      {/* <div className="w-full max-w-[500px] mx-auto">
        <h2 className="text-3xl font-bold tracking-wide">Sign Up And Get 10% Off</h2>
        <p className="text-sm text-gray-700 tracking-wide">
          Sign up for early sale access, new in, promotions and more
        </p>
      </div>
      <div className="mt-4 flex justify-center">
        <input
          type="email"
          placeholder="Enter your e-mail"
          className="px-4 py-2 w-80 border border-gray-300 rounded-l-md bg-white"
        />
        <button className="bg-black text-white px-6 py-2 rounded-r-md">SUBSCRIBE</button>
      </div> */}
    </div>
  );
};

export default Offer;
