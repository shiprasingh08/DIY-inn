'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (item) => {
    setWishlist((prevWishlist) => [...prevWishlist, item]);
  };

  const removeFromWishlist = (item) => {
    setWishlist((prevWishlist) => 
      prevWishlist.filter((wishlistItem) => wishlistItem._id !== item._id)
    );
  };

  const isInWishlist = (item) => {
    return wishlist.some((wishlistItem) => wishlistItem._id === item._id);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishListContext.Provider 
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};

export const useWishListContext = () => {
  const context = useContext(WishListContext);
  if (!context) {
    throw new Error('useWishListContext must be used within a WishListProvider');
  }
  return context;
};