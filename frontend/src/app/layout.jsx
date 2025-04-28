'use client';
import './globals.css';
import Navbar from './Navbar';
import { CartProvider } from './context/CartContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
