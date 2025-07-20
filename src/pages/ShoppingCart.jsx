import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { CloseIcon } from "@/components/icons";
import SearchPageNavbar from "@/components/SearchPageNavbar";

const ShoppingCart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalCartAmount } =
    useCart();
  const navigate = useNavigate();

  const subtotal = getTotalCartAmount();
  const freeShippingThreshold = 4000;
  const amountNeededForFreeShipping = Math.max(
    0,
    freeShippingThreshold - subtotal
  );
  const shippingCost =
    subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 250;
  const totalOrderAmount = subtotal + shippingCost;

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(item.id, item.category, newQuantity);
    } else {
      removeFromCart(item.id, item.category);
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  return (
    <div>
      <Navbar showSearchInput={false} bgColor="#FBF4E8" />
      <SearchPageNavbar
        title="Shopping Cart"
        titleHome="Home Page"
        backgroundColor="#FBF4E8"
      />
      <div className="flex flex-col lg:flex-row px-4 sm:px-8 lg:px-16 py-6 sm:py-10 lg:py-20 justify-between gap-6 lg:gap-8">
        <div className="w-full lg:w-[65%] xl:w-[850px]">
          {/* ... cart expiration and free shipping notice ... */}
          <div className="mb-4 sm:mb-6">
            {/* <p className="bg-[#D2EF9A] px-5 py-2.5 rounded-lg text-[#1F1F1F] font-semibold text-sm">
                            🔥 Your cart will expire in <span className='text-[#DB4444]'>06:48</span> minutes! Please checkout before your items sell out!
                        </p> */}
            {subtotal > 0 && amountNeededForFreeShipping > 0 && (
              <div className="mt-4 sm:mt-6">
                <p className="text-[#1F1F1F] text-sm sm:text-base">
                  Buy{" "}
                  <span className="text-[#1F1F1F] font-semibold">
                    PKR {amountNeededForFreeShipping.toFixed(2)}
                  </span>{" "}
                  more to get{" "}
                  <span className="font-semibold">Free Shipping</span>
                </p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2 relative">
                  <div
                    className="h-2 bg-green-500 rounded-full"
                    style={{
                      width: `${Math.min(
                        (subtotal / freeShippingThreshold) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>
          <div className="mt-6 sm:mt-8">
            {/* Hide header on mobile, show on tablet and up */}
            <div className="hidden sm:flex h-12 bg-[#F7F7F7] rounded-lg justify-between items-center font-bold text-sm md:text-base lg:text-lg px-4">
              <p className="w-1/2 text-center">Products</p>
              <p className="w-1/6 text-center">Price</p>
              <p className="w-1/6 text-center">Quantity</p>
              <p className="w-1/6 text-center">Total</p>
              <p className="w-1/12"></p>
            </div>

            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500 py-8 sm:py-10 text-base sm:text-lg">
                Your shopping cart is empty.
              </p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={`${item.category}-${item.id}`}
                  className="py-4 border-b"
                >
                  {/* Mobile: Single line layout */}
                  <div className="sm:hidden flex items-center justify-between gap-2">
                    <img
                      src={
                        item.image ||
                        (item.images && item.images[0]) ||
                        "https://via.placeholder.com/100x130"
                      }
                      alt={item.name}
                      className="w-12 h-15 object-cover rounded-lg bg-gray-300 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0 px-2">
                      <p className="font-medium text-xs leading-tight break-words">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        PKR {item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center border border-[#E9E9E9] px-1 py-1 rounded-lg bg-white">
                      <button
                        onClick={() =>
                          handleQuantityChange(item, item.quantity - 1)
                        }
                        className="px-1 text-sm hover:bg-gray-100 rounded disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-1 text-xs min-w-[1.5rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item, item.quantity + 1)
                        }
                        className="px-1 text-sm hover:bg-gray-100 rounded"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id, item.category)}
                      className="text-red-500 p-1 hover:bg-red-50 rounded-full flex-shrink-0"
                      aria-label="Remove item"
                    >
                      <CloseIcon className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Desktop: Traditional layout */}
                  <div className="hidden sm:flex sm:justify-between sm:items-center">
                    <div className="flex items-center space-x-3 sm:w-1/2">
                      <img
                        src={
                          item.image ||
                          (item.images && item.images[0]) ||
                          "https://via.placeholder.com/100x130"
                        }
                        alt={item.name}
                        className="w-20 h-24 lg:w-[100px] lg:h-[130px] object-cover rounded-lg bg-gray-300 flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-base leading-tight break-words">
                          {item.name}
                        </p>
                      </div>
                    </div>

                    <p className="w-1/6 text-center text-sm md:text-base">
                      PKR {Math.floor(item.price)}
                    </p>

                    <div className="flex items-center w-1/6 justify-center border border-[#E9E9E9] px-3 py-2 rounded-lg bg-white">
                      <button
                        onClick={() =>
                          handleQuantityChange(item, item.quantity - 1)
                        }
                        className="px-2 text-lg hover:bg-gray-100 rounded disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-2 text-base min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item, item.quantity + 1)
                        }
                        className="px-2 text-lg hover:bg-gray-100 rounded"
                      >
                        +
                      </button>
                    </div>

                    <p className="font-semibold text-base w-1/6 text-center">
                      PKR {Math.floor(item.price * item.quantity)}
                    </p>

                    <button
                      onClick={() => removeFromCart(item.id, item.category)}
                      className="w-1/12 text-red-500 cursor-pointer text-center p-2 hover:bg-red-50 rounded-full"
                      aria-label="Remove item"
                    >
                      <CloseIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-[35%] xl:w-[380px] rounded-xl bg-[#F7F7F7] p-4 sm:p-5 lg:p-6 h-fit mt-6 lg:mt-0">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4">
            Order Summary
          </h2>
          <div className="flex justify-between text-sm sm:text-base mb-3 border-b pb-3">
            <p>Subtotal</p>
            <p>Rs {Math.floor(subtotal)}</p>
          </div>
          <div className="flex justify-between text-sm sm:text-base mb-3 border-b pb-3">
            <p>Shipping</p>
            <p>
              {shippingCost === 0 ? "Free" : `PKR ${Math.floor(shippingCost)}`}
            </p>
          </div>
          <div className="flex justify-between text-lg sm:text-xl lg:text-2xl font-semibold my-4">
            <p>Total</p>
            <p>PKR {Math.floor(totalOrderAmount)}</p>
          </div>
          <div>
            <button
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
              className="mb-4 w-full bg-black text-white py-3 sm:py-3.5 px-6 rounded-lg text-sm font-medium uppercase hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
  );
};
export default ShoppingCart;
