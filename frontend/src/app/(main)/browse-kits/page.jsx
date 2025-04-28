'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useCartContext } from '../../context/CartContext';

const BrowseKits = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const { addItemToCart, isInCart, removeItemFromCart } = useCartContext();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/getall`);
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Browse DIY Kits</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
            >
              <img
                src={product.image || "https://via.placeholder.com/150"}
                alt={product.name}
                className="w-32 h-32 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              <p className="text-blue-500 font-bold mb-2">Price: ${product.price}</p>
              <p className="text-gray-500 text-sm">Category: {product.category}</p>
              <p className="text-gray-500 text-sm">Stock: {product.stock}</p>
              {product.size && <p className="text-gray-500 text-sm">Size: {product.size}</p>}
              <div className="flex gap-2 mt-3">
                <Link href={`/view-kits/${product._id}`} className="px-4 py-2 rounded-lg bg-blue-700 text-white">
                  View Kit
                </Link>
                {isInCart(product) ? (
                  <button 
                    onClick={() => removeItemFromCart(product)}
                    className="px-4 py-2 rounded-lg bg-red-600 text-white"
                  >
                    Remove from Cart
                  </button>
                ) : (
                  <button 
                    onClick={() => addItemToCart(product)}
                    className="px-4 py-2 rounded-lg bg-green-600 text-white"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No DIY kits available</p>
        )}
      </div>
    </div>
  );
};

export default BrowseKits;