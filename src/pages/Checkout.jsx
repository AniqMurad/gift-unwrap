import Footer from '@/components/Footer'
import { CheckoutLine, HalfArrowDown2, PayPalIcon, AppleIcon, VisaIcon2, Cardicon2, Cardicon3, Cardicon4, DiscountLineWhite, DiscountLineGreen, Couponbg, BlueCheckbox, CloseIcon } from '@/components/icons' // Added CloseIcon
import RememberIcon from '@/components/RememberIcon'
import Navbar from '@/components/Navbar'; // --- 1. Using Navbar for consistency, can be SearchPageNavbar if preferred ---
import React, { useState, useEffect } from 'react' // --- 2. Import useEffect ---
import { useCart } from '../context/CartContext'; // --- 3. Import useCart ---
import { useNavigate } from 'react-router-dom'; // --- 4. Import useNavigate ---
import SearchPageNavbar from '@/components/SearchPageNavbar';
import OrderSummary from '@/components/OrderSummary'; // Import the new component

const Checkout = () => {
    const { cartItems, getTotalCartAmount, clearCart } = useCart();
    const navigate = useNavigate();

    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [paymentMethod, setPaymentMethod] = useState('creditCard'); // 'creditCard' or 'cod'
    const [saveCardDetails, setSaveCardDetails] = useState(false);
    const [showDiscountApplied, setShowDiscountApplied] = useState(false); // Example state for discount message
    const [isLoading, setIsLoading] = useState(false); // <--- 1. Add isLoading state

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "Pakistan", // Default or fetch dynamically
        city: "",
        street: "",
        state: "", // Default or fetch dynamically
        postalCode: "",
        additionalInfo: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLoginRedirect = () => {
        navigate('/login'); // Or open a login modal
    };

    // --- 6. Calculate Order Summary ---
    const subtotal = getTotalCartAmount();
    const shippingCost = subtotal > 0 ? (subtotal >= 130 ? 0 : 15) : 0; // Example: Free shipping over Rs 130, or Rs 15
    const discountAmount = 0; // Placeholder for discount logic
    const totalOrderAmount = subtotal + shippingCost - discountAmount;

    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        setIsLoading(true); // <--- 2. Set isLoading to true

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.street || !formData.city || !formData.postalCode || !formData.country || !formData.state) {
            alert("Please fill in all required shipping information.");
            setIsLoading(false); // <--- 3. Reset isLoading on validation failure
            return;
        }
        if (paymentMethod === 'creditCard') {
            if (!cardName || !cardNumber || !expiry || !cvv) {
                alert("Please fill in all credit card details.");
                setIsLoading(false); // <--- 3. Reset isLoading on validation failure
                return;
            }
        }
        if (cartItems.length === 0) {
             alert("Your cart is empty. Please add items before placing an order.");
             setIsLoading(false); // <--- 3. Reset isLoading on validation failure
             return;
        }


        const orderData = {
            shippingInfo: formData,
            paymentMethod: paymentMethod,
            cardDetails: paymentMethod === 'creditCard' ? {
                cardName,
                cardNumber,
                expiry,
                cvv,
                saveCardDetails
            } : null,
            orderItems: cartItems.map(item => ({
                category: item.category, // Make sure your cart items include the category
                id: item.id,           // Make sure your cart items include the nested product ID
                name: item.name,
                quantity: item.quantity,
                price: item.price, // Send price, but backend will verify
                image: item.image || (item.images && item.images[0])
            })),
        };

        console.log("Sending order data:", orderData); // Log data being sent

        // --- API Call to Backend ---
        try {
            const response = await fetch('http://localhost:5000/api/orders/', { // Replace with your actual backend URL if different
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${yourAuthToken}`, // Include if using authentication
                },
                body: JSON.stringify(orderData),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Order placed successfully:', data);
                
                // Prepare summary data to pass to success screen
                const orderSummaryData = {
                    cartItems: cartItems.map(item => ({ // Pass a snapshot of cart items
                        category: item.category,
                        id: item.id,
                        name: item.name,
                        quantity: item.quantity,
                        price: item.price,
                        image: item.image || (item.images && item.images[0])
                    })),
                    subtotal,
                    shippingCost,
                    discountAmount,
                    totalOrderAmount,
                    showDiscountApplied // Pass this state as well
                };

                const shippingDetails = {
                    email: formData.email,
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    postalCode: formData.postalCode,
                    country: formData.country,
                    phone: formData.phone // Optionally pass phone if you want to display it
                };

                // alert(`Order placed successfully! Order ID: ${data._id}. Total: Rs ${data.totalAmount.toFixed(2)}`);
                clearCart(); 
                navigate('/order-confirmation', { 
                    state: { 
                        orderId: data._id, 
                        orderSummary: orderSummaryData, 
                        customerName: formData.firstName,
                        shippingInfo: shippingDetails // Add shipping info here
                    } 
                });
                // No need to set isLoading to false here if navigating away immediately
            } else {
                console.error('Failed to place order:', data.message);
                alert(`Failed to place order: ${data.message || 'Server error'}`);
                setIsLoading(false); // <--- 3. Reset isLoading on API error
            }

        } catch (error) {
            console.error('Error submitting order:', error);
            alert('An error occurred while submitting your order. Please try again.');
            setIsLoading(false); // <--- 3. Reset isLoading on exception
        }
        // --- End API Call ---
    };

    // Example: Apply discount
    useEffect(() => {
        if (subtotal > 50) { 
            setShowDiscountApplied(true);
        } else {
            // setDiscountAmount(0);
            setShowDiscountApplied(false);
        }
    }, [subtotal]);


    return (
        <div>
            <Navbar showSearchInput={false} bgColor="#FBF4E8"/>
            <SearchPageNavbar title="Checkout" titleHome="Home Page" backgroundColor='#FBF4E8' />

            <form onSubmit={handleSubmitOrder}>
                <div className="flex flex-col lg:flex-row px-4 sm:px-8 md:px-16 py-10 lg:py-20 justify-between gap-8">

                    {/* Left div - Information & Payment */}
                    <div className='w-full lg:w-[60%] xl:w-[630px] space-y-8'>

                        {/* Login Prompt */}
                      
                        <div className="space-y-5">
                            <h2 className="text-[24px] md:text-[30px] font-semibold">Shipping Information</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* --- Your existing form fields with value, name, and onChange --- */}
                                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name *" className="border px-[16px] py-[11px] rounded-[8px] w-full" required />
                                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name *" className="border px-[16px] py-[11px] rounded-[8px] w-full" required />
                                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address *" className="border px-[16px] py-[11px] rounded-[8px] w-full sm:col-span-2" required />
                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number *" className="border px-[16px] py-[11px] rounded-[8px] w-full sm:col-span-2" required />

                                <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country/Region *" className="border px-[16px] py-[11px] rounded-[8px] w-full sm:col-span-2" required />

                                <input type="text" name="street" value={formData.street} onChange={handleChange} placeholder="Street Address *" className="border px-[16px] py-[11px] rounded-[8px] w-full sm:col-span-2" required />
                                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Town / City *" className="border px-[16px] py-[11px] rounded-[8px] w-full" required />

                                <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State *" className="border px-[16px] py-[11px] rounded-[8px] w-full" required />
                                <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="Postal Code *" className="border px-[16px] py-[11px] rounded-[8px] w-full" required />

                                <textarea
                                    name="additionalInfo"
                                    rows="3"
                                    placeholder='Order notes (optional)...'
                                    value={formData.additionalInfo}
                                    onChange={handleChange}
                                    className="w-full border border-[#E9E9E9] rounded-[8px] px-[16px] py-[11px] bg-transparent focus:outline-none resize-none sm:col-span-2"
                                />
                            </div>
                        </div>

                        {/* Payment Option */}
                        <div className="space-y-5">
                            <h2 className="text-[24px] md:text-[30px] font-semibold">Payment Option</h2>
                            {/* Credit Card Option */}
                            <div className={`rounded-[8px] p-[20px] ${paymentMethod === 'creditCard' ? 'bg-[#F0F5FF] border border-blue-500' : 'bg-[#F7F7F7] border border-transparent'}`}>
                                <div className='flex items-center gap-2 mb-2 cursor-pointer' onClick={() => setPaymentMethod('creditCard')}>
                                    <input type="radio" id="creditCard" name="paymentMethod" value="creditCard" checked={paymentMethod === 'creditCard'} onChange={() => setPaymentMethod('creditCard')} className="form-radio h-4 w-4 text-blue-600"/>
                                    <label htmlFor="creditCard" className="font-medium">Credit Card</label>
                                </div>
                                {paymentMethod === 'creditCard' && (
                                    <div className="mt-4 space-y-3">
                                        <p className='text-[14px] text-[#696C70]'>Securely pay with your credit card.</p>
                                        <input type="text" value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="Name on Card *" className="w-full bg-white border px-[16px] py-[11px] rounded-[8px]" required={paymentMethod === 'creditCard'} />
                                        <div className="relative">
                                            <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="Card Number *" className="w-full bg-white border px-[16px] py-[11px] rounded-[8px]" required={paymentMethod === 'creditCard'} />
                                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
                                                <VisaIcon2 /> <Cardicon2 /> <Cardicon3 /> <Cardicon4 />
                                            </div>
                                        </div>
                                        <div className='flex space-x-4'>
                                            <input type="text" value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY *" className="w-1/2 bg-white border px-[16px] py-[11px] rounded-[8px]" required={paymentMethod === 'creditCard'} />
                                            <input type="password" value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder="CVV *" className="w-1/2 bg-white border px-[16px] py-[11px] rounded-[8px]" required={paymentMethod === 'creditCard'} />
                                        </div>
                                        <div className="flex items-center cursor-pointer mt-2" onClick={() => setSaveCardDetails(!saveCardDetails)}>
                                            {saveCardDetails ? <BlueCheckbox /> : <RememberIcon />}
                                            <span className="text-[#1F1F1F] text-[14px] ml-2">Save Card Details for future payments</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Cash on Delivery Option */}
                            <div className={`rounded-[8px] p-[20px] cursor-pointer ${paymentMethod === 'cod' ? 'bg-[#F0F5FF] border border-blue-500' : 'bg-[#F7F7F7] border border-transparent'}`} onClick={() => setPaymentMethod('cod')}>
                                <div className='flex items-center gap-2'>
                                    <input type="radio" id="cod" name="paymentMethod" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="form-radio h-4 w-4 text-blue-600"/>
                                    <label htmlFor="cod" className="font-medium">Cash on Delivery</label>
                                </div>
                                {paymentMethod === 'cod' && (
                                       <p className='text-[14px] text-[#696C70] mt-2'>Pay with cash upon delivery.</p>
                                )}
                            </div>
                        </div>

                         {/* Submit Button - Ensure it's inside the form */}
                        <button
                            type="submit"
                            className='w-full bg-black text-white text-[16px] font-semibold mt-8 px-[40px] py-[14px] rounded-[12px] uppercase hover:bg-gray-800 transition-colors disabled:opacity-50'
                            disabled={cartItems.length === 0 || isLoading} // <--- 5. Disable button when loading or cart is empty
                        >
                            {isLoading ? 'Processing...' : 'Place Order'} {/* <--- 4. Show loader text */}
                        </button>
                    </div>

                    <CheckoutLine className="hidden lg:block" />

                    {/* Right div - Order Summary */}
                    <div className='w-full lg:w-[40%] xl:w-[520px] mt-10 lg:mt-0'>
                        <OrderSummary
                            cartItems={cartItems}
                            subtotal={subtotal}
                            shippingCost={shippingCost}
                            discountAmount={discountAmount}
                            totalOrderAmount={totalOrderAmount}
                            showDiscountApplied={showDiscountApplied}
                        />
                    </div>
                </div>
            </form>
            <Footer />
        </div>
    )
}

export default Checkout;