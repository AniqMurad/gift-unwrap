import { CheckoutLine, SuccessIcon, NeedHelpIcon } from '@/components/icons';
import Navbar from '@/components/Navbar';
import SearchPageNavbar from '@/components/SearchPageNavbar';
import React from 'react'; // Removed useEffect and useState as they are no longer needed for map logic
import { useLocation, Link } from 'react-router-dom';
import OrderSummary from '@/components/OrderSummary';

const SuccessScreen = () => {
    const location = useLocation();
    const orderId = location.state?.orderId;
    const orderSummaryData = location.state?.orderSummary;
    const customerName = location.state?.customerName;
    const shippingInfo = location.state?.shippingInfo; // Retrieve shipping info

    // Fallback data if state is not available (e.g., direct navigation)
    const defaultSummary = {
        cartItems: [],
        subtotal: 0,
        shippingCost: 0,
        discountAmount: 0,
        totalOrderAmount: 0,
        showDiscountApplied: false,
    };

    const summaryToDisplay = orderSummaryData || defaultSummary;

    // Construct the display email and address string
    const displayEmail = shippingInfo?.email || 'N/A';
    const displayAddress = shippingInfo
        ? `${shippingInfo.street}, ${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.postalCode}, ${shippingInfo.country}`
        : 'N/A';

    // No need for coords or mapLoadError state, or the useEffect hook
    // as map functionality is removed.

    return (
        <div>
            <Navbar showSearchInput={false} bgColor="#FBF4E8" />
            <SearchPageNavbar title="Order Confirmed" titleHome="Home Page" backgroundColor='#FBF4E8' />

            <div className="flex flex-col lg:flex-row px-4 sm:px-8 lg:px-16 py-6 sm:py-10 lg:py-20 justify-between gap-6 lg:gap-8">
                {/* Left Side - Order Confirmation */}
                <div className='w-full lg:w-[60%] xl:w-[630px] space-y-4 sm:space-y-5'>

                    <div className='flex gap-2 sm:gap-3'>
                        <SuccessIcon />
                        <div>
                            <h2 className="text-sm sm:text-base">Order #{orderId || 'N/A'}</h2>
                            <h1 className="text-2xl sm:text-3xl lg:text-[30px] font-bold">Thank You {customerName || ''}!</h1>
                        </div>
                    </div>

                    <div className='border border-[#E9E9E9] rounded-lg px-4 sm:px-5 py-3 sm:py-4'>
                        <p className="text-sm sm:text-base font-semibold">Order Confirmed</p>
                        <p className="text-sm sm:text-base text-[#696C70]">You will receive order and shipping updates via email.</p>
                    </div>

                    <div className="w-full">
                        {/* Removed all map-related rendering logic here */}
                        {/* Only keeping the email and address display divs */}
                        <div className="mt-4 sm:mt-6 text-sm sm:text-base text-[#696C70] border border-[#E9E9E9] rounded-lg px-4 sm:px-5 py-3 sm:py-4">
                            <strong className='text-[#1F1F1F]'>Email:</strong> {displayEmail}
                        </div>
                        <div className="mt-3 sm:mt-4 text-sm sm:text-base text-[#696C70] border border-[#E9E9E9] rounded-lg px-4 sm:px-5 py-3 sm:py-4">
                            <strong className='text-[#1F1F1F]'>Address:</strong> {displayAddress}
                        </div>
                    </div>

                    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4 sm:mt-6'>
                        <div className='flex gap-2 items-center text-sm sm:text-base'>
                            <NeedHelpIcon />
                            <p>Need Help? <Link to="/contact" className='underline'>Contact Us</Link></p>
                        </div>

                        <Link to="/" className="bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg uppercase cursor-pointer no-underline text-sm sm:text-base w-full sm:w-auto text-center">
                            Continue Shopping
                        </Link>
                    </div>
                </div>

                {/* <CheckoutLine className="hidden lg:block" /> */}

                <div className='w-full lg:w-[40%] xl:w-[520px] mt-6 lg:mt-0'>
                    <OrderSummary
                        cartItems={summaryToDisplay.cartItems}
                        subtotal={summaryToDisplay.subtotal}
                        shippingCost={summaryToDisplay.shippingCost}
                        discountAmount={summaryToDisplay.discountAmount}
                        totalOrderAmount={summaryToDisplay.totalOrderAmount}
                        showDiscountApplied={summaryToDisplay.showDiscountApplied}
                        title="Your Order Details"
                    />
                </div>
            </div>
        </div>
    )
}

export default SuccessScreen;