import Footer from '@/components/Footer'
import { CheckoutLine, HalfArrowDown2, PayPalIcon, AppleIcon, VisaIcon2, Cardicon2, Cardicon3, Cardicon4, DiscountLineWhite, DiscountLineGreen, Couponbg, BlueCheckbox, CloseIcon } from '@/components/icons' // Added CloseIcon
import RememberIcon from '@/components/RememberIcon'
import Navbar from '@/components/Navbar'; // --- 1. Using Navbar for consistency, can be SearchPageNavbar if preferred ---
import React, { useState, useEffect } from 'react' // --- 2. Import useEffect ---
import { useCart } from '../context/CartContext'; // --- 3. Import useCart ---
import { useNavigate } from 'react-router-dom'; // --- 4. Import useNavigate ---
import SearchPageNavbar from '@/components/SearchPageNavbar';
import OrderSummary from '@/components/OrderSummary'; // Import the new component
import NotificationBar from '@/components/NotificationBar';
import Loader from '@/components/Loader';

const Checkout = () => {
    const { cartItems, getTotalCartAmount, clearCart } = useCart();
    const navigate = useNavigate();

    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [paymentMethod, setPaymentMethod] = useState('cod'); // Changed default to 'cod' since credit card is disabled
    const [saveCardDetails, setSaveCardDetails] = useState(false);
    const [showDiscountApplied, setShowDiscountApplied] = useState(false); // Example state for discount message
    const [isLoading, setIsLoading] = useState(false); // <--- 1. Add isLoading state
    const [notification, setNotification] = useState({
        show: false,
        type: 'success',
        message: ''
    });

    // Auto-hide notification after 3 seconds
    useEffect(() => {
        if (notification.show) {
            const timer = setTimeout(() => {
                setNotification(prev => ({ ...prev, show: false }));
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification.show]);

    const showNotification = (type, message) => {
        setNotification({
            show: true,
            type,
            message
        });
    };

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
        // Hide notification when user starts typing
        if (notification.show) {
            setNotification(prev => ({ ...prev, show: false }));
        }
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
        setNotification(prev => ({ ...prev, show: false })); // Hide any existing notifications

        const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'street', 'city', 'postalCode', 'country', 'state'];
        for (let field of requiredFields) {
            if (!formData[field]) {
                showNotification('error', 'Please fill in all required shipping information.');
                setIsLoading(false);
                return;
            }
        }

        if (paymentMethod === 'creditCard') {
            if (!cardName || !cardNumber || !expiry || !cvv) {
                showNotification('error', 'Please fill in all credit card details.');
                setIsLoading(false); // <--- 3. Reset isLoading on validation failure
                return;
            }
        }
        if (cartItems.length === 0) {
            showNotification('error', 'Your cart is empty. Please add items before placing an order.');
            setIsLoading(false); // <--- 3. Reset isLoading on validation failure
            return;
        }

        const userId = localStorage.getItem('userId');
        console.log("Checkout userId from localStorage:", userId);

        const orderData = {
            userId,
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

        try {
            const response = await fetch('https://giftunwrapbackend.vercel.app/api/orders/', { // Replace with your actual backend URL if different
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

                showNotification('success', `Order placed successfully! Order ID: ${data._id}. Redirecting...`);
                
                // Clear cart and navigate after a short delay to show success message
                setTimeout(() => {
                    clearCart();
                    navigate('/order-confirmation', {
                        state: {
                            orderId: data._id,
                            orderSummary: orderSummaryData,
                            customerName: formData.firstName,
                            shippingInfo: shippingDetails // Add shipping info here
                        }
                    });
                }, 2000);
                // No need to set isLoading to false here if navigating away immediately
            } else {
                console.error('Failed to place order:', data.message);
                showNotification('error', `Failed to place order: ${data.message || 'Server error'}`);
                setIsLoading(false); // <--- 3. Reset isLoading on API error
            }

        } catch (error) {
            console.error('Error submitting order:', error);
            showNotification('error', 'An error occurred while submitting your order. Please try again.');
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
            {isLoading && <Loader />}
            {notification.show && (
                <NotificationBar type={notification.type} message={notification.message} />
            )}
            <Navbar showSearchInput={false} bgColor="#FBF4E8" />
            <SearchPageNavbar title="Checkout" titleHome="Home Page" backgroundColor='#FBF4E8' />

            <form onSubmit={handleSubmitOrder}>
                <div className="flex flex-col lg:flex-row px-4 sm:px-8 lg:px-16 py-6 sm:py-10 lg:py-20 justify-between gap-6 lg:gap-8">

                    {/* Left div - Information & Payment */}
                    <div className='w-full lg:w-[60%] xl:w-[630px] space-y-5 lg:space-y-6'>

                        {/* Login Prompt */}

                        <div className="space-y-3 sm:space-y-4">
                            <h2 className="text-xl sm:text-2xl lg:text-[30px] font-semibold">Shipping Information</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                {/* --- Your existing form fields with value, name, and onChange --- */}
                                <input 
                                    type="text" 
                                    name="firstName" 
                                    value={formData.firstName} 
                                    onChange={handleChange} 
                                    placeholder="First Name *" 
                                    className="border px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg w-full text-sm sm:text-base" 
                                    required 
                                    disabled={isLoading}
                                />
                                <input 
                                    type="text" 
                                    name="lastName" 
                                    value={formData.lastName} 
                                    onChange={handleChange} 
                                    placeholder="Last Name *" 
                                    className="border px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg w-full text-sm sm:text-base" 
                                    required 
                                    disabled={isLoading}
                                />
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    placeholder="Email Address *" 
                                    className="border px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg w-full sm:col-span-2 text-sm sm:text-base" 
                                    required 
                                    disabled={isLoading}
                                />
                                <input 
                                    type="tel" 
                                    name="phone" 
                                    value={formData.phone} 
                                    onChange={handleChange} 
                                    placeholder="Phone Number *" 
                                    className="border px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg w-full sm:col-span-2 text-sm sm:text-base" 
                                    required 
                                    disabled={isLoading}
                                />

                                <input 
                                    type="text" 
                                    name="country" 
                                    value={formData.country} 
                                    onChange={handleChange} 
                                    placeholder="Country/Region *" 
                                    className="border px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg w-full sm:col-span-2 text-sm sm:text-base" 
                                    required 
                                    disabled={isLoading}
                                />

                                <input 
                                    type="text" 
                                    name="street" 
                                    value={formData.street} 
                                    onChange={handleChange} 
                                    placeholder="Street Address *" 
                                    className="border px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg w-full sm:col-span-2 text-sm sm:text-base" 
                                    required 
                                    disabled={isLoading}
                                />
                                <input 
                                    type="text" 
                                    name="city" 
                                    value={formData.city} 
                                    onChange={handleChange} 
                                    placeholder="Town / City *" 
                                    className="border px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg w-full text-sm sm:text-base" 
                                    required 
                                    disabled={isLoading}
                                />

                                <input 
                                    type="text" 
                                    name="state" 
                                    value={formData.state} 
                                    onChange={handleChange} 
                                    placeholder="State *" 
                                    className="border px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg w-full text-sm sm:text-base" 
                                    required 
                                    disabled={isLoading}
                                />
                                <input 
                                    type="text" 
                                    name="postalCode" 
                                    value={formData.postalCode} 
                                    onChange={handleChange} 
                                    placeholder="Postal Code *" 
                                    className="border px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg w-full text-sm sm:text-base" 
                                    required 
                                    disabled={isLoading}
                                />

                                <textarea
                                    name="additionalInfo"
                                    rows="3"
                                    placeholder='Order notes (optional)...'
                                    value={formData.additionalInfo}
                                    onChange={handleChange}
                                    className="w-full border border-[#E9E9E9] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 bg-transparent focus:outline-none resize-none sm:col-span-2 text-sm sm:text-base"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Payment Option */}
                        <div className="space-y-4 sm:space-y-5">
                            <h2 className="text-xl sm:text-2xl lg:text-[30px] font-semibold">Payment Option</h2>
                            
                            {/* Credit Card Option - DISABLED */}
                            <div className="rounded-lg p-4 sm:p-5 bg-[#F5F5F5] border border-[#E0E0E0] opacity-60">
                                <div className='flex items-center gap-2 mb-2'>
                                    <input 
                                        type="radio" 
                                        id="creditCard" 
                                        name="paymentMethod" 
                                        value="creditCard" 
                                        disabled 
                                        className="form-radio h-4 w-4 text-gray-400 cursor-not-allowed" 
                                    />
                                    <label htmlFor="creditCard" className="font-medium text-gray-500 cursor-not-allowed text-sm sm:text-base">Credit Card</label>
                                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full ml-2">Disabled</span>
                                </div>
                                <p className='text-xs sm:text-sm text-[#999999] mt-2'>
                                    Online payment is not available right now. Please use Cash on Delivery.
                                </p>
                            </div>

                            {/* Cash on Delivery Option */}
                            <div className={`rounded-lg p-4 sm:p-5 cursor-pointer ${paymentMethod === 'cod' ? 'bg-[#F0F5FF] border border-blue-500' : 'bg-[#F7F7F7] border border-transparent'}`} onClick={() => !isLoading && setPaymentMethod('cod')}>
                                <div className='flex items-center gap-2'>
                                    <input 
                                        type="radio" 
                                        id="cod" 
                                        name="paymentMethod" 
                                        value="cod" 
                                        checked={paymentMethod === 'cod'} 
                                        onChange={() => setPaymentMethod('cod')} 
                                        className="form-radio h-4 w-4 text-blue-600" 
                                        disabled={isLoading}
                                    />
                                    <label htmlFor="cod" className="font-medium text-sm sm:text-base">Cash on Delivery</label>
                                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full ml-2">Available</span>
                                </div>
                                {paymentMethod === 'cod' && (
                                    <p className='text-xs sm:text-sm text-[#696C70] mt-2'>Pay with cash upon delivery.</p>
                                )}
                            </div>
                        </div>

                        {/* Submit Button - Ensure it's inside the form */}
                        <button
                            type="submit"
                            className='w-full bg-black text-white text-sm sm:text-base font-semibold mt-6 lg:mt-8 px-6 sm:px-10 py-3 sm:py-4 rounded-lg uppercase hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                            disabled={cartItems.length === 0 || isLoading} // <--- 5. Disable button when loading or cart is empty
                        >
                            {isLoading ? 'Processing...' : 'Place Order'} {/* <--- 4. Show loader text */}
                        </button>
                    </div>

                    {/* <CheckoutLine className="hidden lg:block" /> */}

                    {/* Right div - Order Summary */}
                    <div className='w-full lg:w-[40%] xl:w-[520px] mt-6 lg:mt-0'>
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