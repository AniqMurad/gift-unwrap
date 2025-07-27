import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

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

  const addToCart = (productToAdd) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === productToAdd.id && item.category === productToAdd.category
      );
      
      if (existingItem) {
        // If item exists, add the new quantity to existing quantity
        return prevItems.map((item) =>
          item.id === productToAdd.id && item.category === productToAdd.category
            ? { ...item, quantity: (item.quantity || 1) + (productToAdd.quantity || 1) }
            : item
        );
      }
      
      // If item doesn't exist, add it with the specified quantity
      return [...prevItems, { ...productToAdd, quantity: productToAdd.quantity || 1 }];
    });
  };

  const removeFromCart = (productId, productCategory) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.id === productId && item.category === productCategory)
      )
    );
  };

  const updateQuantity = (productId, productCategory, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, productCategory);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId && item.category === productCategory
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };
 
  const getTotalCartAmount = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      getTotalCartAmount, 
      getTotalCartItems 
    }}>
      {children}
    </CartContext.Provider>
  );
};