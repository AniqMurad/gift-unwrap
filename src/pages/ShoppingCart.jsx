import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { CloseIcon } from '@/components/icons'; // Make sure this icon is available

const ShoppingCart = () => {
    const { cartItems, removeFromCart, updateQuantity, getTotalCartAmount } = useCart();
    const navigate = useNavigate();

    const subtotal = getTotalCartAmount();
    const freeShippingThreshold = 130;
    const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
    const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 15;
    const totalOrderAmount = subtotal + shippingCost;

    const handleQuantityChange = (item, newQuantity) => {
        if (newQuantity > 0) {
            updateQuantity(item.id, item.category, newQuantity);
        } else {
            removeFromCart(item.id, item.category);
        }
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    const handleContinueShopping = () => {
        navigate('/');
    };

    return (
        <div>
            <Navbar showSearchInput={false}/>
            <div className="flex flex-col lg:flex-row px-4 sm:px-8 md:px-16 py-10 md:py-20 justify-between gap-8">
                <div className='w-full lg:w-[65%] xl:w-[850px]'>
                    {/* ... cart expiration and free shipping notice ... */}
                     <div className="mb-6">
                        <p className="bg-[#D2EF9A] px-5 py-2.5 rounded-lg text-[#1F1F1F] font-semibold text-sm">
                            🔥 Your cart will expire in <span className='text-[#DB4444]'>06:48</span> minutes! Please checkout before your items sell out!
                        </p>
                        {subtotal > 0 && amountNeededForFreeShipping > 0 && (
                             <div className="mt-6">
                                <p className="text-[#1F1F1F] text-base">
                                    Buy <span className="text-[#1F1F1F] font-semibold">Rs {amountNeededForFreeShipping.toFixed(2)}</span> more to get <span className="font-semibold">Free Shipping</span>
                                </p>
                                <div className="mt-2 w-full bg-gray-200 rounded-full h-2 relative">
                                    <div
                                        className="h-2 bg-green-500 rounded-full"
                                        style={{ width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="mt-8">
                        <div className="h-12 bg-[#F7F7F7] rounded-lg flex justify-between items-center font-bold text-sm sm:text-base md:text-lg px-2">
                            <p className="w-2/5 sm:w-1/2 text-left sm:text-center pl-2 sm:pl-0">Products</p>
                            <p className="w-1/5 sm:w-1/6 text-center">Price</p>
                            <p className="w-1/5 sm:w-1/6 text-center">Quantity</p>
                            <p className="w-1/5 sm:w-1/6 text-center">Total</p>
                            <p className="w-[5%] sm:w-1/12"></p>
                        </div>

                        {cartItems.length === 0 ? (
                            <p className="text-center text-gray-500 py-10 text-lg">Your shopping cart is empty.</p>
                        ) : (
                            cartItems.map((item) => (
                                <div key={`${item.category}-${item.id}`} className="flex flex-wrap sm:flex-nowrap justify-between items-center py-4 border-b">
                                    <div className="flex items-center space-x-3 w-full sm:w-2/5 md:w-1/2 mb-2 sm:mb-0">
                                        <img
                                            src={item.image || (item.images && item.images[0]) || 'https://via.placeholder.com/100x130'}
                                            alt={item.name}
                                            className="w-20 h-24 sm:w-[100px] sm:h-[130px] object-cover rounded-lg bg-gray-300"
                                        />
                                        <div>
                                            <p className="font-medium text-sm sm:text-base leading-tight">{item.name}</p>
                                        </div>
                                    </div>
                                    <p className="w-1/3 sm:w-1/6 text-center text-sm sm:text-base">Rs {item.price.toFixed(2)}</p>
                                    <div className="flex items-center w-1/3 sm:w-1/6 justify-center border border-[#E9E9E9] px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg bg-white">
                                        <button
                                            onClick={() => handleQuantityChange(item, item.quantity - 1)}
                                            className="px-2 text-lg hover:bg-gray-100 rounded disabled:opacity-50"
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span className="px-2 text-sm sm:text-base">{item.quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange(item, item.quantity + 1)}
                                            className="px-2 text-lg hover:bg-gray-100 rounded"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className="w-1/3 sm:w-1/6 text-center font-semibold text-sm sm:text-base">Rs {(item.price * item.quantity).toFixed(2)}</p>
                                    {/* This is the remove button */}
                                    <button
                                        onClick={() => removeFromCart(item.id, item.category)}
                                        className="w-full sm:w-auto sm:w-1/12 text-red-500 cursor-pointer text-center p-2 hover:bg-red-50 rounded-full mt-2 sm:mt-0"
                                        aria-label="Remove item"
                                    >
                                        <CloseIcon className="w-5 h-5 mx-auto" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Order Summary */}
                <div className='w-full lg:w-[35%] xl:w-[380px] rounded-xl bg-[#F7F7F7] p-5 md:p-6 h-fit mt-8 lg:mt-0'>
                    <h2 className="text-xl md:text-2xl font-semibold mb-4">Order Summary</h2>
                    <div className="flex justify-between text-base mb-3 border-b pb-3">
                        <p>Subtotal</p>
                        <p>Rs {subtotal.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between text-base mb-3 border-b pb-3">
                        <p>Shipping</p>
                        <p>{shippingCost === 0 ? 'Free' : `Rs ${shippingCost.toFixed(2)}`}</p>
                    </div>
                    <div className="flex justify-between text-xl md:text-2xl font-semibold my-4">
                        <p>Total</p>
                        <p>Rs {totalOrderAmount.toFixed(2)}</p>
                    </div>
                    <div>
                        <button
                            onClick={handleCheckout}
                            disabled={cartItems.length === 0}
                            className="mb-4 w-full bg-black text-white py-3.5 px-6 rounded-lg text-sm font-medium uppercase hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            PROCESS TO CHECKOUT
                        </button>
                        <button
                            onClick={handleContinueShopping}
                            className="w-full text-center text-sm font-semibold text-gray-700 hover:text-black underline"
                        >
                            OR CONTINUE SHOPPING
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default ShoppingCart;