import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    const toggleWishlist = (product) => {
        if (wishlist.some((item) => item.id === product.id)) {
            setWishlist(wishlist.filter((item) => item.id !== product.id)); // Remove from wishlist
        } else {
            setWishlist([...wishlist, product]); // Add to wishlist
        }
    };

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);
