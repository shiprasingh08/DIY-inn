"use client"

import { useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import Link from 'next/link';
import { CartButton } from './CartButton';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo and brand name */}
          <Link href="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-pink-500" />
            <span className="text-white font-bold text-xl">Nest&Needle</span>
          </Link>

          {/* Primary Navigation - Desktop */}          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-white hover:text-pink-300 transition duration-300">Home</Link>
            <Link href="/browse-kits" className="text-white hover:text-pink-300 transition duration-300">Browse-Kits</Link>
            <Link href="/aboutus" className="text-white hover:text-pink-300 transition duration-300">AboutUs</Link>
            <Link href="/contact" className="text-white hover:text-pink-300 transition duration-300">Contact</Link>
            <CartButton />
            <Link href="/login" className="text-pink-300 hover:text-pink-100 transition duration-300 border border-pink-500 px-3 py-1 rounded-md">Login</Link>
            <Link href="/signup" className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition duration-300">SignUp</Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="outline-none text-white hover:text-pink-300 transition duration-300"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - sliding from side rather than dropdown */}
      {isOpen && (
        <div className="md:hidden bg-black">
          <div className="flex flex-row justify-around py-3 border-t border-gray-800">
            <Link href="/" className="text-white hover:text-pink-300 text-sm font-medium">Home</Link>
            <Link href="/browse-kits" className="text-white hover:text-pink-300 text-sm font-medium">Browse</Link>
            <Link href="/aboutus" className="text-white hover:text-pink-300 text-sm font-medium">AboutUs</Link>
            <Link href="/contact" className="text-white hover:text-pink-300 text-sm font-medium">Contact</Link>
            <div className="scale-90">
              <CartButton />
            </div>
            <Link href="/login" className="text-pink-300 hover:text-pink-100 text-sm font-medium">Login</Link>
            <Link href="/signup" className="text-pink-500 hover:text-pink-300 text-sm font-medium">SignUp</Link>
          </div>
        </div>
      )}
    </nav>
  );
}