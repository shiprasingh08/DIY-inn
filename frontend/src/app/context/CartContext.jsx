'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

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
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeItemFromCart = (item) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem._id !== item._id));
  };

  const isInCart = (item) => {
    return cart.some((cartItem) => cartItem._id === item._id);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider 
      value={{
        cart,
        addItemToCart,
        removeItemFromCart,
        isInCart,
        getCartTotal,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};