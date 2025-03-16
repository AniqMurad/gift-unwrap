import React from 'react'

const Offer = () => {
  return (
    <div className="bg-[#D2EF9A] px-32 py-8 text-center flex justify-between mt-10">
      <div className="w-full max-w-[500px] mx-auto">
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
      </div>
    </div>
  )
}

export default Offer