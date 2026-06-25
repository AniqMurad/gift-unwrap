import { createContext, useContext, useState, useCallback, useMemo } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    const toggleWishlist = useCallback((product, category) => {
        const productIdentifier = `${category}-${product.id}`;
        setWishlist((prevWishlist) => {
            if (prevWishlist.some((item) => item.identifier === productIdentifier)) {
                return prevWishlist.filter((item) => item.identifier !== productIdentifier);
            }
            return [...prevWishlist, { ...product, identifier: productIdentifier, category }];
        });
    }, []);

    const value = useMemo(() => ({ wishlist, toggleWishlist }), [wishlist, toggleWishlist]);

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);
