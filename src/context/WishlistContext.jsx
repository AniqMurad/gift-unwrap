import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    const toggleWishlist = (product, category) => {
        const productIdentifier = `${category}-${product.id}`;
        if (wishlist.some((item) => item.identifier === productIdentifier)) {
            setWishlist(wishlist.filter((item) => item.identifier !== productIdentifier));
        } else {
            setWishlist([...wishlist, { ...product, identifier: productIdentifier, category }]);
        }
    };

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);
