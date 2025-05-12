'use client';

import { CartProvider } from './context/CartContext';
import { WishListProvider } from './context/WishListContext';
import { Toaster } from 'react-hot-toast';

export default function Providers({ children }) {
  return (
    <CartProvider>
      <WishListProvider>
        <Toaster position="top-right" />
        {children}
      </WishListProvider>
    </CartProvider>
  );
}
