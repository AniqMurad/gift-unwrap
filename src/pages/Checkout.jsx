// (Your existing imports remain unchanged)

import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import SearchPageNavbar from '@/components/SearchPageNavbar';
import OrderSummary from '@/components/OrderSummary';
import NotificationBar from '@/components/NotificationBar';
import Loader from '@/components/Loader';

const Checkout = () => {
    const { cartItems, getTotalCartAmount, clearCart } = useCart();
    const navigate = useNavigate();

    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [saveCardDetails, setSaveCardDetails] = useState(false);
    const [showDiscountApplied, setShowDiscountApplied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [notification, setNotification] = useState({
        show: false,
        type: 'success',
        message: ''
    });

    useEffect(() => {
        if (notification.show) {
            const timer = setTimeout(() => {
                setNotification(prev => ({ ...prev, show: false }));
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification.show]);

    const showNotification = (type, message) => {
        setNotification({ show: true, type, message });
    };

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "Pakistan",
        city: "",
        street: "",
        state: "",
        postalCode: "",
        additionalInfo: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
        if (notification.show) {
            setNotification(prev => ({ ...prev, show: false }));
        }
    };

    const subtotal = getTotalCartAmount();
    const shippingCost = subtotal > 0 ? (subtotal >= 130 ? 0 : 15) : 0;
    const discountAmount = 0;
    const totalOrderAmount = subtotal + shippingCost - discountAmount;

    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setNotification(prev => ({ ...prev, show: false }));

        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email || !emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
        }
        if (!formData.phone || !/^\d{11,15}$/.test(formData.phone)) {
            newErrors.phone = 'Phone number must be 11 to 15 digits.';
        }
        if (!formData.street) newErrors.street = 'Street address is required.';
        if (!formData.city) newErrors.city = 'City is required.';
        if (!formData.state) newErrors.state = 'State is required.';
        if (!formData.postalCode || isNaN(formData.postalCode)) {
            newErrors.postalCode = 'Postal code must be a number.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsLoading(false);
            return;
        }

        if (cartItems.length === 0) {
            showNotification('error', 'Your cart is empty. Please add items before placing an order.');
            setIsLoading(false);
            return;
        }

        const userId = localStorage.getItem('userId');

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
                category: item.category,
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                image: item.image || (item.images && item.images[0])
            })),
        };

        try {
            const response = await fetch('https://giftunwrapbackend.vercel.app/api/orders/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });

            const data = await response.json();

            if (response.ok) {
                const orderSummaryData = {
                    cartItems: cartItems.map(item => ({
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
                    showDiscountApplied
                };

                const shippingDetails = {
                    email: formData.email,
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    postalCode: formData.postalCode,
                    country: formData.country,
                    phone: formData.phone
                };

                showNotification('success', `Order placed successfully! Order ID: ${data._id}. Redirecting...`);
                
                setTimeout(() => {
                    clearCart();
                    navigate('/order-confirmation', {
                        state: {
                            orderId: data._id,
                            orderSummary: orderSummaryData,
                            customerName: formData.firstName,
                            shippingInfo: shippingDetails
                        }
                    });
                }, 2000);
            } else {
                showNotification('error', `Failed to place order: ${data.message || 'Server error'}`);
                setIsLoading(false);
            }

        } catch (error) {
            showNotification('error', 'An error occurred while submitting your order. Please try again.');
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setShowDiscountApplied(subtotal > 50);
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
                    <div className='w-full lg:w-[60%] xl:w-[630px] space-y-5 lg:space-y-6'>
                        <div className="space-y-3 sm:space-y-4">
                            <h2 className="text-xl sm:text-2xl lg:text-[30px] font-semibold">Shipping Information</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                {[
                                    { name: "firstName", placeholder: "First Name" },
                                    { name: "lastName", placeholder: "Last Name" },
                                ].map(({ name, placeholder }) => (
                                    <div key={name}>
                                        <input
                                            type="text"
                                            name={name}
                                            value={formData[name]}
                                            onChange={handleChange}
                                            placeholder={placeholder}
                                            className="border px-3 py-2.5 rounded-lg w-full text-sm"
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                ))}

                                <div className="sm:col-span-2">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email Address"
                                        className="border px-3 py-2.5 rounded-lg w-full text-sm"
                                        required
                                        disabled={isLoading}
                                    />
                                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                                </div>

                                <div className="sm:col-span-2">
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Phone Number"
                                        className="border px-3 py-2.5 rounded-lg w-full text-sm"
                                        required
                                        disabled={isLoading}
                                    />
                                    {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                                </div>

                                <input
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    placeholder="Country/Region"
                                    className="border px-3 py-2.5 rounded-lg w-full sm:col-span-2 text-sm"
                                    required
                                    disabled
                                />

                                <div className="sm:col-span-2">
                                    <input
                                        type="text"
                                        name="street"
                                        value={formData.street}
                                        onChange={handleChange}
                                        placeholder="Street Address"
                                        className="border px-3 py-2.5 rounded-lg w-full text-sm"
                                        required
                                        disabled={isLoading}
                                    />
                                    {errors.street && <p className="text-red-600 text-sm mt-1">{errors.street}</p>}
                                </div>

                                <div>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="Town / City"
                                        className="border px-3 py-2.5 rounded-lg w-full text-sm"
                                        required
                                        disabled={isLoading}
                                    />
                                    {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
                                </div>

                                <div>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        placeholder="State"
                                        className="border px-3 py-2.5 rounded-lg w-full text-sm"
                                        required
                                        disabled={isLoading}
                                    />
                                    {errors.state && <p className="text-red-600 text-sm mt-1">{errors.state}</p>}
                                </div>

                                <div>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                        placeholder="Postal Code"
                                        className="border px-3 py-2.5 rounded-lg w-full text-sm"
                                        required
                                        disabled={isLoading}
                                    />
                                    {errors.postalCode && <p className="text-red-600 text-sm mt-1">{errors.postalCode}</p>}
                                </div>

                                <textarea
                                    name="additionalInfo"
                                    rows="3"
                                    placeholder="Order notes (optional)..."
                                    value={formData.additionalInfo}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2.5 bg-transparent focus:outline-none resize-none sm:col-span-2 text-sm"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <div className="space-y-4 sm:space-y-5">
                            <h2 className="text-xl sm:text-2xl lg:text-[30px] font-semibold">Payment Option</h2>

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

                        <button
                            type="submit"
                            className='w-full bg-black text-white text-sm font-semibold mt-6 px-6 py-3 rounded-lg uppercase hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                            disabled={cartItems.length === 0 || isLoading}
                        >
                            {isLoading ? 'Processing...' : 'Place Order'}
                        </button>
                    </div>

                    <div className='w-full lg:w-[40%] xl:w-[520px] mt-6 lg:mt-0'>
                        <OrderSummary
                            cartItems={cartItems}
                            subtotal={subtotal}
                            shippingCost={shippingCost}
                            discountAmount={discountAmount}
                            totalOrderAmount={totalOrderAmount}
                            showDiscountApplied={showDiscountApplied}
                        />
                        
                        {/* Customization Message below Order Summary */}
                        <div className="bg-blue-50 border border-blue-200 rounded-md p-3 sm:p-4 mt-4">
                            <div className="flex items-start gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div className="text-blue-700 text-sm sm:text-base">
                                    <p className="font-medium mb-1">Need customization?</p>
                                    <p>Feel free to contact us before or after placing your order — we're here to help! We'll also reach out shortly to confirm your preferences.</p>
                                    <p>You can also call or WhatsApp us at <strong>+92 3130216931</strong></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <Footer />
        </div>
    );
};

export default Checkout;