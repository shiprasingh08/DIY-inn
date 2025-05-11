'use client';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export const WishListButton = ({ count }) => {
  return (
    <Link href="/wishlist" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
      <Heart className="h-6 w-6 text-gray-700" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {count}
        </span>
      )}
    </Link>
  );
};