'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from './components/Footer';
import Navbar from './components/navbar/Navbar';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import { WishListProvider } from './context/WishListContext';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-right" />
        <CartProvider>
          <WishListProvider>
            <Navbar />
            <main className="min-h-screen pt-16">{children}</main>
            <Footer />
          </WishListProvider>
        </CartProvider>
      </body>
    </html>
  );
}
