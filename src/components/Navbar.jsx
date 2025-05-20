import Logo from "../assets/logo.png";
import React, { useState, useEffect, useRef } from "react";
import { UsersIcon, CartIcon, HeartIcon, CloseIcon } from "./icons";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useCart } from "../context/CartContext";

const Navbar = ({ showSearchInput = true,
  borderBottom,
  borderColor,
  bgColor,
}) => {
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, removeFromCart, getTotalCartAmount, getTotalCartItems } = useCart();
  const cartRef = useRef(null);
  const prevTotalQuantityRef = useRef(getTotalCartItems()); // --- Store previous total quantity ---

  const handleWishlistClick = () => navigate("/wishlist");
  const handleLogoClick = () => navigate("/");
  const handleCartClick = () => setIsCartOpen(prev => !prev);
  const handleCloseCart = () => setIsCartOpen(false);
  const handleSearch = () => navigate("/search-output");
  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/signup");

  const handleViewCartPage = () => {
    setIsCartOpen(false);
    navigate("/ShoppingCart"); // Ensure this matches your route for the shopping cart page
  };
  const handleContinueShoppingInDropdown = () => { // Renamed to avoid conflict if you have another handleContinueShopping
    setIsCartOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        const cartButton = event.target.closest('button');
        const cartIcon = cartButton?.querySelector('svg[aria-label="Cart Icon"]');
        if (cartIcon) return;
        setIsCartOpen(false);
      }
    };
    if (isCartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCartOpen]);

  // --- Modified useEffect to open cart when total quantity increases ---
  useEffect(() => {
    const currentTotalQuantity = getTotalCartItems();
    // Open if the total number of items (sum of quantities) has increased
    if (currentTotalQuantity > prevTotalQuantityRef.current) {
      setIsCartOpen(true);
    }
    // Update the ref to the current total quantity for the next comparison
    prevTotalQuantityRef.current = currentTotalQuantity;
  }, [cartItems, getTotalCartItems]); // Rerun when cartItems changes, use getTotalCartItems for comparison

  return (
    <div
      className="flex items-center justify-between px-16 py-3 relative"
      style={{
        backgroundColor: bgColor,
        borderBottom: `${borderBottom} solid ${borderColor}`,
      }}
    >
      <div className="cursor-pointer" onClick={handleLogoClick}>
        <img src={Logo} alt="GiftUnwrap Logo" className="w-[173px] h-[42px]" />
      </div>
      {showSearchInput && (
        <div className="text-sm">
          <input
            className="rounded-tl-md rounded-bl-md text-[#A0A0A0] w-96 border border-[#E9E9E9] py-2 px-4 focus:outline-none focus:border-black"
            placeholder="What are you looking for today?"
          />
          <button className="rounded-tr-md rounded-br-md text-sm font-normal cursor-pointer border border-black bg-black text-white py-2 px-6 hover:bg-gray-800 transition-colors" onClick={handleSearch}>
            SEARCH
          </button>
        </div>
      )}
      <div className="flex gap-5 items-center justify-between">
        {/* User Dropdown */}
        <div className="cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline border-0"><UsersIcon /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white p-2 shadow-lg border border-grey-200">
              <DropdownMenuItem>
                <Button className="bg-black text-white font-bold w-full cursor-pointer" onClick={handleLogin}>LOGIN</Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="w-full flex justify-center whitespace-nowrap">
                  <span className="text-[#A0A0A0]">Don't have an account? <strong className="text-black cursor-pointer" onClick={handleRegister}>Register</strong></span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* Wishlist Dropdown */}
        <div className="cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline border-0"><HeartIcon /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white p-2 border border-grey-200">
              <DropdownMenuLabel className="text-xl font-bold">Wish List</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem><div className="w-full flex justify-center">No Items Available</div></DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuItem>
                <Button className="bg-black text-white font-bold w-full" onClick={handleWishlistClick}>VIEW ALL WISH LIST</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* Cart Dropdown */}
        <div className="cursor-pointer relative" ref={cartRef}>
          <Button variant="outline border-0" onClick={handleCartClick}>
            <CartIcon aria-label="Cart Icon" />
            {getTotalCartItems() > 0 && (
              <span className="absolute top-[10px] right-[10px] transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {getTotalCartItems()}
              </span>
            )}
          </Button>
          {isCartOpen && (
            <div className="absolute right-0 top-full mt-2 w-96 bg-white p-4 border rounded-2xl shadow-2xl z-30">
              <div className="flex justify-between items-center mb-3 border-b-2 pb-2">
                <h1 className="font-bold text-lg">SHOPPING CART ({getTotalCartItems()})</h1>
                <button className="p-1 hover:bg-gray-100 rounded-full" onClick={handleCloseCart}>
                  <CloseIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              {cartItems.length === 0 ? (
                <p className="text-center text-gray-500 py-4">Your cart is empty.</p>
              ) : (
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div key={`${item.category}-${item.id}`} className="flex items-center gap-3 border-b pb-3 last:border-b-0">
                      <img
                        src={item.image || (item.images && item.images[0])}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-grow">
                        <p className="text-sm font-medium truncate w-48" title={item.name}>{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-sm font-semibold">
                        Rs {item.price * item.quantity}
                      </div>
                      {/* This is the remove button in the dropdown */}
                      <button onClick={() => removeFromCart(item.id, item.category)} className="p-1 hover:bg-gray-100 rounded-full">
                        <CloseIcon className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {cartItems.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-md font-semibold">Subtotal:</span>
                    <span className="text-md font-bold">Rs {getTotalCartAmount()}</span>
                  </div>
                  <div className="flex flex-col justify-center items-center space-y-2">
                    <button className="bg-black text-white py-2 px-4 rounded-lg w-full hover:bg-gray-800 transition-colors" onClick={handleViewCartPage}>
                      View Cart & Checkout
                    </button>
                    <button className="text-sm text-gray-700 hover:text-black underline" onClick={handleContinueShoppingInDropdown}>
                      Continue Shopping
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;