import Footer from '@/components/Footer'
import { CheckoutLine, HalfArrowDown2, PayPalIcon, AppleIcon, VisaIcon2, Cardicon2, Cardicon3, Cardicon4, DiscountLineWhite, DiscountLineGreen, Couponbg, BlueCheckbox } from '@/components/icons'
import RememberIcon from '@/components/RememberIcon'
import SearchPageNavbar from '@/components/SearchPageNavbar'
import React, { useState } from 'react'

const Checkout = () => {

    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
        city: "",
        street: "",
        state: "",
        postalCode: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <SearchPageNavbar title="Checkout" titleHome="Home Page" backgroundColor = '#FBF4E8'/>

            <div className="flex px-16 py-20 justify-between">

                {/* left div */}
                <div className='flex flex-col justify-center'>

                    {/* first div */}
                    <div>
                        <div className="">
                            <p className="text-[16px] text-[#A0A0A0] mb-3 px-[16px] py-[11px] rounded-[8px] bg-[#F7F7F7]">
                                Already have an account? <span className="font-semibold text-[#1F1F1F] underline">Login Here</span>
                            </p>
                            <div className='border border-[#E9E9E9] p-[20px] rounded-[8px]'>
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="email" placeholder="Your name/Email" className="border px-[16px] py-[11px] rounded-[4px] w-full" />
                                    <input type="password" placeholder="Password" className="border px-[16px] py-[11px] rounded-[4px] w-full" />
                                </div>
                                <button className="bg-black text-white px-[40px] py-[12px] rounded-[12px] mt-4">LOGIN</button>
                            </div>
                        </div>

                        <h2 className="text-[30px] font-semibold mt-5 mb-5">Information</h2>

                        <div className="">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative flex items-center">
                                    <label className={`absolute left-4 text-[#696C70] text-[16px] bg-white pointer-events-none z-0 ${formData.firstName ? "hidden" : ""}`}>
                                        First Name <span className="text-[#DB4444]">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full border border-[#E9E9E9] rounded-[8px] px-[16px] py-[11px] bg-transparent focus:outline-none z-20"
                                    />
                                </div>

                                <div className="relative flex items-center">
                                    <label className={`absolute left-4 text-[#696C70] text-[16px] bg-white pointer-events-none z-0 ${formData.lastName ? "hidden" : ""}`}>
                                        Last Name <span className="text-[#DB4444]">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full border border-[#E9E9E9] rounded-[8px] px-[16px] py-[11px] bg-transparent focus:outline-none z-20"
                                    />
                                </div>

                                {/* Email */}
                                <div className="relative flex items-center">
                                    <label className={`absolute left-4 text-[#696C70] text-[16px] bg-white pointer-events-none z-0 ${formData.email ? "hidden" : ""}`}>
                                        Email Address <span className="text-[#DB4444]">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full border border-[#E9E9E9] rounded-[8px] px-[16px] py-[11px] bg-transparent focus:outline-none z-20"
                                    />
                                </div>

                                {/* Phone */}
                                <div className="relative flex items-center">
                                    <label className={`absolute left-4 text-[#696C70] text-[16px] bg-white pointer-events-none z-0 ${formData.phone ? "hidden" : ""}`}>
                                        Phone Number <span className="text-[#DB4444]">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full border border-[#E9E9E9] rounded-[8px] px-[16px] py-[11px] bg-transparent focus:outline-none z-20"
                                    />
                                </div>

                                <div className="flex justify-between items-center border border-[#E9E9E9] px-[16px] py-[11px] rounded-[8px] w-full col-span-2">
                                    Choose Country/Region
                                    <HalfArrowDown2 />
                                </div>

                                <div className="relative flex items-center">
                                    <label className={`absolute left-4 text-[#696C70] text-[16px] bg-white pointer-events-none z-0 ${formData.city ? "hidden" : ""}`}>
                                        Town / City <span className="text-[#DB4444]">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full border border-[#E9E9E9] rounded-[8px] px-[16px] py-[11px] bg-transparent focus:outline-none z-20"
                                    />
                                </div>

                                {/* Street Address */}
                                <div className="relative flex items-center">
                                    <label className={`absolute left-4 text-[#696C70] text-[16px] bg-white pointer-events-none z-0 ${formData.street ? "hidden" : ""}`}>
                                        Street Address <span className="text-[#DB4444]">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="street"
                                        value={formData.street}
                                        onChange={handleChange}
                                        className="w-full border border-[#E9E9E9] rounded-[8px] px-[16px] py-[11px] bg-transparent focus:outline-none z-20"
                                    />
                                </div>

                                <div className="flex justify-between items-center border border-[#E9E9E9] px-[16px] py-[11px] rounded-[8px] w-full">
                                    Choose State
                                    <HalfArrowDown2 />
                                </div>

                                <div className="relative flex items-center">
                                    <label className={`absolute left-4 text-[#696C70] text-[16px] bg-white pointer-events-none z-0 ${formData.postalCode ? "hidden" : ""}`}>
                                        Postal Code <span className="text-[#DB4444]">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                        className="w-full border border-[#E9E9E9] rounded-[8px] px-[16px] py-[11px] bg-transparent focus:outline-none z-20"
                                    />
                                </div>

                                <textarea
                                    name="additionalInfo"
                                    rows="3"
                                    placeholder='Write note...'
                                    value={formData.additionalInfo}
                                    onChange={handleChange}
                                    className="w-full border border-[#E9E9E9] rounded-[8px] px-[16px] py-[11px] bg-transparent focus:outline-none resize-none relative z-20 col-span-2"
                                />
                            </div>
                        </div>
                    </div>

                    {/* second div */}
                    <div className="w-[630px]">
                        <h2 className="text-[30px] font-semibold mt-5 mb-5">Choose Payment Option</h2>
                        <div>
                            <div className='bg-[#F7F7F7] rounded-[8px] p-[20px]'>
                                <div>
                                    <div className='flex items-center gap-2 mb-2'>
                                        <BlueCheckbox />
                                        <p>Credit Card</p>
                                    </div>
                                    <p className='text-[16px] text-[#696C70]'>Make your payment directly into our bank account. Your order will not be shipped until the funds have cleared in our account.</p>
                                </div>

                                <div>
                                    <div className="">
                                        {/* Cardholder Name */}
                                        <div className="relative flex items-center mt-4 bg-white rounded-[8px] px-[16px] py-[11px]">
                                            <label
                                                className={`absolute left-4 text-[#696C70] text-[16px] transition-all duration-200
                                                pointer-events-none z-0 bg-white 
                                                ${cardName ? "hidden" : ""}`}
                                            >
                                                Name on Card <span className="text-[#DB4444]">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={cardName}
                                                onChange={(e) => setCardName(e.target.value)}
                                                className="focus:outline-none z-20 bg-transparent"
                                            />
                                        </div>

                                        {/* Card Number */}
                                        <div className="relative flex items-center mt-4 bg-white rounded-[8px] px-[16px] py-[11px]">
                                            <label
                                                className={`absolute left-4 text-[#696C70] text-[16px] transition-all duration-200
                                                pointer-events-none z-0 bg-white 
                                                ${cardNumber ? "hidden" : ""}`}
                                            >
                                                Card Number <span className="text-[#DB4444]">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={cardNumber}
                                                onChange={(e) => setCardNumber(e.target.value)}
                                                className="focus:outline-none z-20 bg-transparent"
                                            />
                                            {/* Payment Icons */}
                                            <div className="absolute right-3 flex space-x-2">
                                                <VisaIcon2 />
                                                <Cardicon2 />
                                                <Cardicon3 />
                                                <Cardicon4 />
                                            </div>
                                        </div>

                                        {/* expiry and cvv */}
                                        <div className='flex space-x-4 mt-4'>
                                            {/* Expiry */}
                                            <div className="relative flex items-center bg-white rounded-[8px] px-[16px] py-[11px] w-1/2">
                                                <label
                                                    className={`absolute left-4 text-[#696C70] text-[16px] transition-all duration-200
                                                pointer-events-none z-0 bg-white 
                                                ${expiry ? "hidden" : ""}`}
                                                >
                                                    MM/YY <span className="text-[#DB4444]">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={expiry}
                                                    onChange={(e) => setExpiry(e.target.value)}
                                                    className="focus:outline-none z-20 bg-transparent"
                                                />
                                            </div>

                                            {/* CVV */}
                                            <div className="relative flex items-center bg-white rounded-[8px] px-[16px] py-[11px] w-1/2">
                                                <label
                                                    className={`absolute left-4 text-[#696C70] text-[16px] transition-all duration-200
                                                pointer-events-none z-0 bg-white 
                                                ${cvv ? "hidden" : ""}`}
                                                >
                                                    CVV <span className="text-[#DB4444]">*</span>
                                                </label>
                                                <input
                                                    type="password"
                                                    value={cvv}
                                                    onChange={(e) => setCvv(e.target.value)}
                                                    className="focus:outline-none z-20 bg-transparent"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center cursor-pointer mt-4">
                                    <RememberIcon />
                                    <span className="text-[#1F1F1F] text-[16px] font-semibold">Save Card Details</span>
                                </div>
                            </div>

                            <div className='border border-[#E9E9E9] rounded-[8px] py-[11px] px-[20px] bg-white mt-4 flex items-center'>
                                <div className='w-[14px] h-[14px] rounded-[1000px] border border-[#A0A0A0] mr-2'></div>
                                <p className='text-[16px]'>Cash on Delivery</p>
                            </div>

                            <div className="border border-[#E9E9E9] rounded-[8px] py-[11px] px-[20px] bg-white mt-4 flex items-center">
                                <div className="w-[14px] h-[14px] rounded-full border border-[#A0A0A0] mr-2 flex-shrink-0"></div>
                                <div className="flex items-center justify-center h-full">
                                    <AppleIcon />
                                </div>
                                <p className="text-[16px] ml-2 h-full flex items-center">Apple Pay</p>
                            </div>

                            <div className='border border-[#E9E9E9] rounded-[8px] py-[11px] px-[20px] bg-white mt-4 flex items-center'>
                                <div className='w-[14px] h-[14px] rounded-[1000px] border border-[#A0A0A0] mr-2'></div>
                                <PayPalIcon />
                            </div>
                        </div>
                    </div>

                    <button className='w-full bg-black text-white text-[18px] mt-8 px-[40px] py-[16px] rounded-[12px]'>PAYMENT</button>

                </div>

                <CheckoutLine />

                {/* right div */}
                <div className='w-[520px]'>
                    <div className='flex justify-end mb-4'>
                        <p className='bg-[#D2EF9A] py-[12px] px-[16px] rounded-[8px] text-black text-[16px]'>Discount code has been applied</p>
                    </div>
                    <div>
                        <h2 className='text-[30px] font-semibold mb-4'>Shopping Cart</h2>
                        <div>
                            <div className="flex border-b py-4 items-center">
                                <img src="/path-to-image1.png" alt="Product 1" className="w-[100px] h-[100px] rounded-[8px] bg-[#E9E9E9]" />
                                <div className="ml-4 flex-1 flex justify-between">
                                    <div>
                                        <p className="font-[16px]">Contrasting Sheepskin Sweatshirt</p>
                                        <p className="text-[#696C70] text-[14px]">XL/Blue</p>
                                    </div>
                                    <div>
                                        <p className="font-[16px]">1 X $60.00</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex border-b py-4 items-center">
                                <img src="/path-to-image1.png" alt="Product 1" className="w-[100px] h-[100px] rounded-[8px] bg-[#E9E9E9]" />
                                <div className="ml-4 flex-1 flex justify-between">
                                    <div>
                                        <p className="font-[16px]">Contrasting Sheepskin Sweatshirt</p>
                                        <p className="text-[#696C70] text-[14px]">XL/Blue</p>
                                    </div>
                                    <div>
                                        <p className="font-[16px]">1 X $60.00</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex border-b py-4 items-center">
                                <img src="/path-to-image1.png" alt="Product 1" className="w-[100px] h-[100px] rounded-[8px] bg-[#E9E9E9]" />
                                <div className="ml-4 flex-1 flex justify-between">
                                    <div>
                                        <p className="font-[16px]">Contrasting Sheepskin Sweatshirt</p>
                                        <p className="text-[#696C70] text-[14px]">XL/Blue</p>
                                    </div>
                                    <div>
                                        <p className="font-[16px]">1 X $60.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className=''>
                            <div className="grid grid-cols-2 py-4 px-8 mt-4 justify-items-center gap-10">
                                {/* First Coupon with White Background & Border */}
                                <div className="relative">
                                    <Couponbg BgColor="white" BorderColor="#E9E9E9" />
                                    <div className="absolute top-0 left-0 h-full flex flex-col justify-between w-[220px] h-[100px] p-3">
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="text-[14px]">
                                                Discount <br /> <span className="text-[14px] font-bold">10% OFF</span>
                                            </p>
                                            <p className="text-[14px]">
                                                For all orders <br /> from 200$
                                            </p>
                                        </div>
                                        <div className="relative z-10">
                                            <DiscountLineWhite />
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                            <p className="text-[14px] font-semibold">CODE: AN6810</p>
                                            <button className="border px-[8px] py-[4px] text-[10px] bg-black text-white rounded-[44px]">
                                                APPLIED
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Second Coupon (Keeps default background color) */}
                                <div className="relative">
                                    <Couponbg />
                                    <div className="absolute top-0 left-0 h-full flex flex-col justify-between w-[220px] h-[100px] p-3">
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="text-[14px]">
                                                Discount <br /> <span className="text-[14px] font-bold">10% OFF</span>
                                            </p>
                                            <p className="text-[14px]">
                                                For all orders <br /> from 200$
                                            </p>
                                        </div>
                                        <div className="relative z-10">
                                            <DiscountLineGreen />
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                            <p className="text-[14px] font-semibold">CODE: AN6810</p>
                                            <button className="border px-[8px] py-[4px] text-[10px] bg-black text-white rounded-[44px]">
                                                APPLIED
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                {/* Coupon Input */}
                                <div className="flex justify-between bg-[#F7F7F7] border border-[#E9E9E9] pl-[20px] pr-[8px] py-[8px] rounded-[8px] mt-4">
                                    <input type="text" placeholder="ONI6810" className="outline-none w-full text-[16px]" />
                                    <button className="bg-black text-white px-[20px] py-[6px] rounded-[8px] text-[14px]">APPLIED</button>
                                </div>

                                {/* Warning Message */}
                                <p className="text-[#DB4444] text-[16px] mt-4">
                                    Discount code is only used for orders with a total value of products over $500.00
                                </p>
                            </div>
                        </div>

                        <div className='mt-8'>
                            <div className='border-t border-b py-4'>
                                <div className='flex justify-between mt-4'>
                                    <p className='text-[16px]'>Shipping</p>
                                    <p className='text-[16px]'>Free</p>
                                </div>
                                <div className='flex justify-between mt-4'>
                                    <p className='text-[16px]'>Discounts</p>
                                    <p className='text-[16px]'>-$80.00</p>
                                </div>
                            </div>
                            <div className='flex justify-between mt-4'>
                                <p className='text-[24px] font-bold'>Subtotal</p>
                                <p className='text-[24px] font-bold'>$186,99</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <Footer />
        </div>
    )
}

export default Checkout