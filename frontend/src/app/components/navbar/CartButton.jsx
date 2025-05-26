'use client';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCartContext } from '../../context/CartContext';

export const CartButton = () => {
  const { cart } = useCartContext();
  const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <Link href="/user/cart-system" className="relative p-2 hover:bg-gray-700 rounded-full transition-colors">
      <ShoppingCart className="h-6 w-6 text-white" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {count}
        </span>
      )}
    </Link>
  );
};