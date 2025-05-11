'use client';
import { useState } from 'react';
import Link from 'next/link';
import { User, LogOut, Settings, ChevronDown } from 'lucide-react';

export const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  // In a real app, you'd get this from your auth context/state
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return (
      <div className="flex items-center space-x-4">
        <Link 
          href="/login"
          className="text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors"
        >
          Login
        </Link>
        <Link 
          href="/signup"
          className="text-sm font-medium text-white bg-pink-600 px-4 py-2 rounded-full hover:bg-pink-700 transition-colors"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <User className="h-6 w-6 text-gray-700" />
        <ChevronDown className={`h-4 w-4 text-gray-700 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu">
            <Link
              href="/profile"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </Link>
            <Link
              href="/settings"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Link>
            <button
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                // Add logout logic here
                setIsOpen(false);
              }}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};