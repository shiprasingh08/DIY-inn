'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useCartContext } from '../../context/CartContext';
import { Search } from 'lucide-react';

const BrowseKits = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addItemToCart, isInCart, removeItemFromCart } = useCartContext();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/kit/getall`);
        console.log('Fetched products:', response.data);
        setProducts(response.data);
        setFilteredProducts(response.data);
        
        // Extract unique categories
        const uniqueCategories = ['All', ...new Set(response.data.map(item => item.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search term and category
  useEffect(() => {
    let result = products;
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(lowercasedSearch) ||
        product.description.toLowerCase().includes(lowercasedSearch)
      );
    }
    
    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, products]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-6 text-black">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-pink-600">Browse DIY Kits</h1>
      
      {/* Search and filter */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-pink-300" />
          </div>
          <input
            type="text"
            placeholder="Search by name or description..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-pink-400 bg-white text-black focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          />
        </div>
        
        <div className="flex-shrink-0 w-full md:w-auto">
          <select 
            value={selectedCategory} 
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full md:w-auto px-4 py-2 rounded-lg border border-pink-400 bg-white text-black focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>
      
      {error && (
        <div className="bg-white border-l-4 border-pink-500 text-pink-600 p-4 mb-6 rounded">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 text-pink-400 underline"
          >
            Try refreshing the page
          </button>
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
        </div>
      ) : (
        <>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center transition-transform hover:shadow-lg hover:-translate-y-1 border border-pink-400"
                >
                  <div className="w-full h-40 mb-4 overflow-hidden rounded-md">
                    <img
                      src={product.image || "https://via.placeholder.com/150"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-lg font-semibold mb-2 text-center text-black">{product.name}</h2>
                  <p className="text-gray-600 text-sm mb-2 text-center line-clamp-2">{product.description}</p>
                  <p className="text-pink-400 font-bold mb-2">${parseFloat(product.price || 0).toFixed(2)}</p>
                  <div className="flex flex-wrap gap-2 justify-center mb-2">
                    <span className="bg-white text-pink-600 text-xs px-2 py-1 rounded border border-pink-400">
                      {product.category}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      product.stock > 5 ? 'bg-white text-green-600 border border-green-600' : 
                      product.stock > 0 ? 'bg-white text-yellow-600 border border-yellow-600' : 
                      'bg-white text-pink-700 border border-pink-700'
                    }`}>
                      {product.stock > 5 ? 'In Stock' : 
                       product.stock > 0 ? 'Low Stock' : 
                       'Out of Stock'}
                    </span>
                  </div>
                  
                  <div className="flex gap-2 mt-auto w-full">
                    <Link 
                      href={`/view-kits/${product._id}`} 
                      className="flex-1 px-3 py-2 text-center text-sm rounded-lg bg-pink-600 hover:bg-pink-700 text-white transition-colors"
                    >
                      View Details
                    </Link>
                    {isInCart(product) ? (
                      <button 
                        onClick={() => removeItemFromCart(product)}
                        className="flex-1 px-3 py-2 text-center text-sm rounded-lg bg-black hover:bg-gray-800 text-white transition-colors"
                        disabled={product.stock <= 0}
                      >
                        Remove
                      </button>
                    ) : (
                      <button 
                        onClick={() => addItemToCart(product)}
                        className={`flex-1 px-3 py-2 text-center text-sm rounded-lg ${
                          product.stock <= 0 
                            ? 'bg-gray-600 cursor-not-allowed' 
                            : 'bg-pink-500 hover:bg-pink-600'
                        } text-white transition-colors`}
                        disabled={product.stock <= 0}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center bg-white shadow-md rounded-lg p-8 mt-6 border border-pink-400">
              <p className="text-gray-600 mb-2">No DIY kits found</p>
              {searchTerm || selectedCategory !== 'All' ? (
                <p className="text-sm text-gray-400">
                  Try adjusting your search or filter criteria
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('All');
                    }}
                    className="ml-2 text-pink-400 hover:underline"
                  >
                    Clear filters
                  </button>
                </p>
              ) : null}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BrowseKits;