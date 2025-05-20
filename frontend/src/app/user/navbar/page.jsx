'use client';
import { useState } from "react";
import { Menu, X, Search, Heart, ShoppingBag, User } from "lucide-react";
import Link from 'next/link';

export default function DIYNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Add search functionality here
  };

  return (
    <div className="w-full">
      {/* Main Navbar */}
      <nav className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl text-pink-400">Nest&Needle</span>
            </div>

            {/* Mobile menu button */}
            <div className="block md:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-pink-400" />
                ) : (
                  <Menu className="h-6 w-6 text-pink-400" />
                )}
              </button>
            </div>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/user" className="text-white hover:text-pink-300 font-medium">
                Home
              </Link>
              <Link href="/user/projects" className="text-white hover:text-pink-300 font-medium">
                Projects
              </Link>
              <Link href="/user/tutorials" className="text-white hover:text-pink-300 font-medium">
                Tutorials
              </Link>
              <Link href="/user/community" className="text-white hover:text-pink-300 font-medium">
                Community
              </Link>
              <Link href="/user/blog" className="text-white hover:text-pink-300 font-medium">
                Blog
              </Link>
            </div>

            {/* Desktop Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search DIYs..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="bg-gray-800 rounded-full py-1 pl-4 pr-10 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
                <button
                  onClick={handleSearchSubmit}
                  className="absolute right-0 top-0 p-2 text-gray-400 hover:text-pink-300"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
              <Link href="/user/favorites" className="text-white hover:text-pink-300">
                <Heart className="h-5 w-5" />
              </Link>
              <Link href="/user/cart" className="text-white hover:text-pink-300">
                <ShoppingBag className="h-5 w-5" />
              </Link>
              <Link href="/user/profile" className="text-white hover:text-pink-300">
                <User className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Categories Menu */}
      <div className="bg-pink-100 text-black px-4 py-2 flex overflow-x-auto whitespace-nowrap">
        <div className="mx-2 px-3 py-1 text-sm font-medium hover:bg-pink-200 rounded-full cursor-pointer">All</div>
        <div className="mx-2 px-3 py-1 text-sm font-medium hover:bg-pink-200 rounded-full cursor-pointer">Home Decor</div>
        <div className="mx-2 px-3 py-1 text-sm font-medium hover:bg-pink-200 rounded-full cursor-pointer">Furniture</div>
        <div className="mx-2 px-3 py-1 text-sm font-medium hover:bg-pink-200 rounded-full cursor-pointer">Gardening</div>
        <div className="mx-2 px-3 py-1 text-sm font-medium hover:bg-pink-200 rounded-full cursor-pointer">Crafts</div>
        <div className="mx-2 px-3 py-1 text-sm font-medium hover:bg-pink-200 rounded-full cursor-pointer">Upcycling</div>
      </div>

      {/* Mobile Nav Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/user" className="block px-3 py-2 text-white hover:bg-pink-900 hover:text-pink-300 rounded-md">
              Home
            </Link>
            <Link href="/user/projects" className="block px-3 py-2 text-white hover:bg-pink-900 hover:text-pink-300 rounded-md">
              Projects
            </Link>
            <Link href="/user/tutorials" className="block px-3 py-2 text-white hover:bg-pink-900 hover:text-pink-300 rounded-md">
              Tutorials
            </Link>
            <Link href="/user/community" className="block px-3 py-2 text-white hover:bg-pink-900 hover:text-pink-300 rounded-md">
              Community
            </Link>
            <Link href="/user/blog" className="block px-3 py-2 text-white hover:bg-pink-900 hover:text-pink-300 rounded-md">
              Blog
            </Link>
          </div>
          {/* Mobile Icons */}
          <div className="px-4 py-3 border-t border-gray-700 flex justify-between">
            <Link href="/user/favorites" className="text-white hover:text-pink-300">
              <Heart className="h-5 w-5" />
            </Link>
            <Link href="/user/cart" className="text-white hover:text-pink-300">
              <ShoppingBag className="h-5 w-5" />
            </Link>
            <Link href="/user/profile" className="text-white hover:text-pink-300">
              <User className="h-5 w-5" />
            </Link>
            <button onClick={handleSearchSubmit} className="text-white hover:text-pink-300">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}