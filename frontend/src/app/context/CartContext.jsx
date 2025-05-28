'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const useCartContext = useCart; // Add this alias for backwards compatibility

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  const addItemToCart = (item) => {
    const itemId = item._id || item.id;
    const existingItem = cart.find(cartItem => (cartItem._id || cartItem.id) === itemId);
    if (existingItem) {
      setCart(prevCart => prevCart.map(cartItem =>
        (cartItem._id || cartItem.id) === itemId
          ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
          : cartItem
      ));
    } else {
      setCart(prevCart => [...prevCart, { ...item, quantity: 1 }]);
    }
  };

  const removeItemFromCart = (item) => {
    const itemId = item._id || item.id;
    setCart(prevCart => prevCart.filter(cartItem => (cartItem._id || cartItem.id) !== itemId));
  };

  const isInCart = (item) => {
    const itemId = item._id || item.id;
    return cart.some(cartItem => (cartItem._id || cartItem.id) === itemId);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const clearCart = () => {
    setCart([]);
  };

  const value = {
    cart,
    addItemToCart,
    removeItemFromCart,
    isInCart,
    getCartTotal,
    clearCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};