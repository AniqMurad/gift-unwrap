import Footer from '@/components/Footer'
import { Couponbg, DiscountLineGreen, DiscountLineWhite } from '@/components/icons';
import SearchPageNavbar from '@/components/SearchPageNavbar'
import React from 'react'

export const ShoppingCart = () => {
    const cartItems = [
        {
            name: 'Contrasting Sheepskin Sweatshirt',
            color: 'Blue',
            size: 'XL',
            price: 960.00,
            quantity: 1
        },
        {
            name: 'Salin Trousers With Elastic Waist',
            color: 'Blue',
            size: 'XL',
            price: 540.00,
            quantity: 3
        },
        {
            name: 'Jacquard Fluid Trousers',
            color: 'Blue',
            size: 'XL',
            price: 560.00,
            quantity: 2
        }
    ];

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const freeShippingThreshold = 130;
    const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

    // Discount codes (sample)
    const discountCodes = [
        { code: 'AMSRP', description: '10% OFF For all orders from 2005' },
        { code: 'AMSRP', description: '10% OFF For all orders from 2005' },
        { code: 'AMSRP', description: '10% OFF For all orders from 2005' }
    ];

    return (
        <div>
            <SearchPageNavbar title="Shopping Cart" titleHome="Home Page" />

            <div className="flex px-16 py-20 justify-between">
                <div className='w-[850px]'>
                    {/* Cart expiration notice */}
                    <div className="mb-6">
                        <p className="bg-[#D2EF9A] px-[20px] py-[10px] rounded-[8px] text-[#1F1F1F] font-semibold font-[14px]">
                            🔥 Your cart will expire in <span className='text-[#DB4444]'>06:48</span> minutes! Please checkout before your items sell out!
                        </p>
                        <div className="mt-6">
                            <p className="text-[#1F1F1F] text-[16px]">
                                Buy <span className="text-[#1F1F1F] font-semibold">${amountNeededForFreeShipping.toFixed(2)}</span> more to get <span className="font-semibold">Free Shipping</span>
                            </p>
                            <div className="mt-2 w-full bg-gray-200 rounded-full h-2 relative">
                                <div
                                    className="h-2 bg-green-500 rounded-full"
                                    style={{ width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` }} // Fixes long progress bar issue
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* Cart items table */}
                    <div className="mt-8">
                        {/* Header */}
                        <div className="h-[50px] bg-[#F7F7F7] rounded-[12px] flex justify-between items-center font-bold text-[20px] pl-2">
                            <p className="w-1/2 text-center">Products</p>
                            <p className="w-1/6 text-center">Price</p>
                            <p className="w-1/8 text-center">Quantity</p>
                            <p className="w-1/6 text-center">Total Price</p>
                            <p className="w-1/12"></p>
                        </div>

                        {/* Items */}
                        {cartItems.map((item, index) => (
                            <div key={index} className="flex justify-between items-center py-4 border-b">
                                {/* Product Info */}
                                <div className="flex items-center space-x-4 w-1/2">
                                    <div className="w-[100px] h-[130px] bg-gray-300 rounded-[8px]"></div>
                                    <div>
                                        <p className="font-[16px]">{item.name}</p>
                                        <div className="flex gap-2 mt-2">
                                            {/* Color Dropdown */}
                                            <select className="border border-[#E9E9E9] px-[12px] py-[7px] rounded-[8px] bg-[#E9E9E9]">
                                                <option>Blue</option>
                                                <option>Red</option>
                                                <option>Black</option>
                                            </select>
                                            {/* Size Dropdown */}
                                            <select className="border border-[#E9E9E9] px-[12px] py-[7px] rounded-[8px] bg-[#E9E9E9]">
                                                <option>XL</option>
                                                <option>L</option>
                                                <option>M</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Price */}
                                <p className="w-1/6 text-center">${item.price.toFixed(2)}</p>

                                {/* Quantity Controls */}
                                <div className="flex items-center w-1/8 justify-between border border-[#E9E9E9] px-[12px] py-[8px] rounded-[8px] bg-[#E9E9E9]">
                                    <button className="">-</button>
                                    <span>{item.quantity}</span>
                                    <button className="">+</button>
                                </div>

                                {/* Total Price */}
                                <p className="w-1/6 text-center">${(item.price * item.quantity).toFixed(2)}</p>

                                {/* Remove Icon */}
                                <p className="w-1/12 text-red-500 cursor-pointer text-center">✖</p>
                            </div>
                        ))}
                    </div>

                    <div className='flex items-center mt-8 border border-[#F7F7F7] bg-[#E9E9E9] rounded-[8px] px-[8px] h-[50px] relative'>
                        <input placeholder='Add voucher discount'/>
                        <button className='absolute right-2 bg-black text-white py-[6px] px-[20px] rounded-[8px] text-[14px]'>Apply Code</button>
                    </div>

                    {/* Voucher/discount section */}
                    <div className="grid grid-cols-3 mt-8 ">
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
                    </div>
                </div>

                <div className='w-[380px] rounded-[20px] bg-[#F7F7F7] p-[20px] h-fit'>
                    <h2 className="text-[24px] font-semibold mb-4">Order Summary</h2>

                    <div className="flex justify-between text-[16px] mb-4 border-b pb-4">
                        <p>Subtotal</p>
                        <p>-$80.00</p>
                    </div>

                    <div className="flex justify-between text-[16px] mb-4 border-b pb-4">
                        <p>Discounts</p>
                        <p>-$80.00</p>
                    </div>

                    <div className='flex justify-between mb-4 border-b pb-4'>
                        <p className="text-[16px] font-medium mb-2">Shipping</p>
                        <div className="space-y-1 text-[16px] mb-2">
                            <label className="flex items-center gap-2">
                                <input type="radio" name="shipping" checked className="accent-black" />
                                Free Shipping <span className="ml-auto">$0.00</span>
                            </label>
                            <label className="flex items-center gap-2 text-[#696C70]">
                                <input type="radio" name="shipping" className="accent-black" />
                                Local: <span className="ml-auto">$35.00</span>
                            </label>
                            <label className="flex items-center gap-2 text-[#696C70]">
                                <input type="radio" name="shipping" className="accent-black" />
                                Flat Rate: <span className="ml-auto">$35.00</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-between text-[24px] font-semibold mb-4">
                        <p>Total</p>
                        <p>$186.99</p>
                    </div>

                    <div>
                        <button className="mb-4 w-full bg-black text-white py-[16px] px-[60px] rounded-[12px] text-[14px]">
                            PROCESS TO CHECKOUT
                        </button>
                        <p className="text-center text-[14px] font-semibold">OR CONTINUE SHOPPING</p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
