import Logo from "../assets/logo.png";
import React, { useState, useEffect, useRef } from "react";
// Assuming you might want specific icons for logged-in state, add them here
// For example: import { ProfileIcon, OrderIcon, LogoutIcon } from "./icons";
import { UsersIcon, CartIcon, HeartIcon, CloseIcon } from "./icons"; // Keep existing icons
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
import { useWishlist } from "../context/WishlistContext"; // Add this import

const Navbar = ({ showSearchInput = true, borderBottom, borderColor, bgColor }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, removeFromCart, getTotalCartAmount, getTotalCartItems } = useCart();
  const { wishlist, toggleWishlist } = useWishlist(); // Use wishlist context
  const cartRef = useRef(null);
  const prevTotalQuantityRef = useRef(getTotalCartItems());

  // --- State for Login Status ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userNameInitial, setUserNameInitial] = useState(''); // To display user's first initial

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    if (token && userString) {
      setIsLoggedIn(true);
      try {
        const userData = JSON.parse(userString);
        // Assuming user object has 'firstName' or 'name'
        if (userData.firstName) {
          setUserNameInitial(userData.firstName.charAt(0).toUpperCase());
        } else if (userData.name) {
          setUserNameInitial(userData.name.charAt(0).toUpperCase());
        } else {
          setUserNameInitial('U'); // Default initial if name not found
        }
      } catch (e) {
        console.error("Failed to parse user data from localStorage", e);
        setUserNameInitial('U'); // Fallback initial
      }
    } else {
      setIsLoggedIn(false);
      setUserNameInitial('');
    }
    // Listen for custom event that signals login/logout to re-check
    const handleAuthChange = () => {
      const currentToken = localStorage.getItem('token');
      const currentUserString = localStorage.getItem('user');
      if (currentToken && currentUserString) {
        setIsLoggedIn(true);
        try {
          const userData = JSON.parse(currentUserString);
          if (userData.firstName) {
            setUserNameInitial(userData.firstName.charAt(0).toUpperCase());
          } else if (userData.name) {
            setUserNameInitial(userData.name.charAt(0).toUpperCase());
          } else {
            setUserNameInitial('U');
          }
        } catch (e) {
          setUserNameInitial('U');
        }
      } else {
        setIsLoggedIn(false);
        setUserNameInitial('');
      }
    };

    window.addEventListener('authChanged', handleAuthChange);
    // Initial check
    handleAuthChange();

    return () => {
      window.removeEventListener('authChanged', handleAuthChange);
    };
  }, []); // Empty dependency array, authChanged event will trigger updates

  const handleWishlistClick = () => navigate("/wishlist");
  const handleLogoClick = () => navigate("/");
  const handleCartClick = () => setIsCartOpen(prev => !prev);
  const handleCloseCart = () => setIsCartOpen(false);
  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/searchoutput?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };
  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/signup");
  const handleMyProfile = () => navigate("/myAccount", { state: { activeTab: 'account' } });
  const handleMyOrders = () => navigate("/myAccount", { state: { activeTab: 'orders' } });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserNameInitial('');
    // Dispatch a custom event to notify other components if needed, or rely on navigation
    window.dispatchEvent(new CustomEvent('authChanged'));
    navigate("/login"); // Or to homepage
  };

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

  useEffect(() => {
    const currentTotalQuantity = getTotalCartItems();
    if (currentTotalQuantity > prevTotalQuantityRef.current) {
      setIsCartOpen(true);
    }
    prevTotalQuantityRef.current = currentTotalQuantity;
  }, [cartItems, getTotalCartItems]);

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            className="rounded-tr-md rounded-br-md text-sm font-normal cursor-pointer border border-black bg-black text-white py-2 px-6 hover:bg-gray-800 transition-colors"
            onClick={handleSearch}
          >
            SEARCH
          </button>
        </div>
      )}
      <div className="flex gap-5 items-center justify-between">
        {/* User Dropdown */}
        <div className="cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline border-0">
                {isLoggedIn && userNameInitial ? (
                  <span className="flex items-center justify-center h-7 w-7 bg-black text-white rounded-full text-sm font-semibold">
                    {userNameInitial}
                  </span>
                ) : (
                  <UsersIcon />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white p-2 shadow-lg border border-grey-200">
              {isLoggedIn ? (
                <>
                  <DropdownMenuItem onSelect={handleMyProfile} className="cursor-pointer">
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={handleMyOrders} className="cursor-pointer">
                    My Orders
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={handleLogout} className="cursor-pointer text-red-600">
                    Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem>
                    <Button className="bg-black text-white font-bold w-full cursor-pointer" onClick={handleLogin}>LOGIN</Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="w-full flex justify-center whitespace-nowrap">
                      <span className="text-[#A0A0A0]">Don't have an account? <strong className="text-black cursor-pointer" onClick={handleRegister}>Register</strong></span>
                    </div>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* Wishlist Dropdown */}
        <div className="cursor-pointer relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline border-0" className="relative">
                <HeartIcon />
                {wishlist.length > 0 && (
                  <span className="absolute top-[10px] right-[10px] transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-96 bg-white p-4 border rounded-2xl shadow-2xl z-30">
              <div className="flex justify-between items-center mb-3 border-b-2 pb-2">
                <h1 className="font-bold text-lg">WISH LIST ({wishlist.length})</h1>
              </div>
              {wishlist.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No items in your wishlist.</p>
              ) : (
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {wishlist.map((item) => (
                    <div key={item.identifier} className="flex items-center gap-3 border-b pb-3 last:border-b-0">
                      <img
                        src={item.image || (item.images && item.images[0])}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-grow">
                        <p className="text-sm font-medium truncate w-48" title={item.name}>{item.name}</p>
                        <p className="text-xs text-gray-500">{item.category}</p>
                      </div>
                      <div className="text-sm font-semibold">
                        Rs {item.price}
                      </div>
                      {/* Remove from wishlist button */}
                      <button onClick={() => toggleWishlist(item, item.category)} className="p-1 hover:bg-gray-100 rounded-full">
                        <CloseIcon className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-4 pt-4 border-t">
                <Button className="bg-black text-white font-bold w-full" onClick={handleWishlistClick}>
                  VIEW ALL WISH LIST
                </Button>
              </div>
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