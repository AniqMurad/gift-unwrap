import React, { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';

const CartContext = createContext();

const matchesCartLine = (item, productId, productCategory, cartKey) => {
  if (cartKey) return item.cartKey === cartKey;
  return !item.cartKey && item.id === productId && item.category === productCategory;
};

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart items from local storage on initial load
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    // Save cart items to local storage whenever they change
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((productToAdd) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => matchesCartLine(
          item,
          productToAdd.id,
          productToAdd.category,
          productToAdd.cartKey,
        )
      );

      if (existingItem) {
        // If item exists, add the new quantity to existing quantity
        return prevItems.map((item) =>
          matchesCartLine(item, productToAdd.id, productToAdd.category, productToAdd.cartKey)
            ? { ...item, quantity: (item.quantity || 1) + (productToAdd.quantity || 1) }
            : item
        );
      }

      // If item doesn't exist, add it with the specified quantity
      return [...prevItems, { ...productToAdd, quantity: productToAdd.quantity || 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId, productCategory, cartKey) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !matchesCartLine(item, productId, productCategory, cartKey)
      )
    );
  }, []);

  const updateQuantity = useCallback((productId, productCategory, newQuantity, cartKey) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, productCategory, cartKey);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          matchesCartLine(item, productId, productCategory, cartKey)
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getTotalCartAmount = useCallback(() => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cartItems]);

  const getTotalCartItems = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const value = useMemo(() => ({
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalCartAmount,
    getTotalCartItems
  }), [cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getTotalCartAmount, getTotalCartItems]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
