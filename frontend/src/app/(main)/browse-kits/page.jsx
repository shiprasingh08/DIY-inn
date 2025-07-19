'use client';
import React, { useEffect, useState, Suspense } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { Search, Filter, ShoppingCart, Eye, Sparkles, Heart } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/app/components/navbar/Navbar';

const BrowseKitsContent = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All');
  const { addItemToCart, isInCart, removeItemFromCart } = useCart();

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
        (product.title?.toLowerCase() || '').includes(lowercasedSearch) ||
        (product.description?.toLowerCase() || '').includes(lowercasedSearch)
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
    <>
      <Navbar />

      {/* Hero Section with Gradient Background */}
      <div className="relative min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-300/20 to-pink-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-300/10 to-pink-300/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 px-4 py-8 sm:px-6 sm:py-12 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-pink-500 animate-spin" />
              <span className="text-sm font-medium text-pink-600 uppercase tracking-wider">Discover & Create</span>
              <Sparkles className="w-6 h-6 text-pink-500 animate-spin" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Browse DIY Kits
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
              Transform your creativity into reality with our curated collection of premium DIY kits
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="backdrop-blur-md bg-white/80 rounded-2xl shadow-xl border border-white/50 p-6 md:p-8">
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                {/* Search Input */}
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Search className="h-5 w-5 text-pink-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search for amazing DIY projects..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="pl-12 pr-4 py-4 w-full text-base rounded-xl border-0 bg-white shadow-lg focus:ring-4 focus:ring-pink-200 focus:outline-none transition-all duration-300 placeholder-gray-400"
                  />
                </div>

                {/* Category Filter */}
                <div className="relative lg:min-w-[250px]">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Filter className="h-5 w-5 text-pink-400" />
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="pl-12 pr-8 py-4 w-full text-base rounded-xl border-0 bg-white shadow-lg focus:ring-4 focus:ring-pink-200 focus:outline-none transition-all duration-300 appearance-none cursor-pointer"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === 'All' ? '🎨 All Categories' : `✨ ${category}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="max-w-4xl mx-auto mb-8">
              <div className="backdrop-blur-md bg-red-50/90 border border-red-200/50 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-3 text-red-600 hover:text-red-800 underline font-medium transition-colors"
                >
                  🔄 Try refreshing the page
                </button>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex flex-col justify-center items-center h-64 gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-pink-200 border-t-pink-500 animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-b-purple-500 animate-spin animate-reverse"></div>
              </div>
              <p className="text-gray-600 font-medium animate-pulse">Loading amazing kits...</p>
            </div>
          ) : (
            <>
              {/* Results Counter */}
              {filteredProducts.length > 0 && (
                <div className="text-center mb-8">
                  <p className="text-gray-600">
                    Showing <span className="font-bold text-pink-600">{filteredProducts.length}</span> amazing kit{filteredProducts.length !== 1 ? 's' : ''}
                    {selectedCategory !== 'All' && <span className="ml-1">in <span className="font-semibold text-purple-600">{selectedCategory}</span></span>}
                  </p>
                </div>
              )}

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 lg:gap-8">
                  {filteredProducts.map((product) => (
                    <div
                      key={product._id}
                      className="group relative backdrop-blur-md bg-white/90 rounded-3xl shadow-lg hover:shadow-2xl border border-white/50 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:rotate-1"
                    >
                      {/* Product Image Container */}
                      <div className="relative overflow-hidden rounded-t-3xl">
                        <div className="aspect-square">
                          <img
                            src={product.image || "https://via.placeholder.com/300"}
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Stock Status Badge */}
                        <div className="absolute top-4 right-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-md ${
                            product.stock > 5 
                              ? 'bg-green-100/90 text-green-700 border border-green-200/50' 
                              : product.stock > 0 
                              ? 'bg-yellow-100/90 text-yellow-700 border border-yellow-200/50'
                              : 'bg-red-100/90 text-red-700 border border-red-200/50'
                          }`}>
                            {product.stock > 5 ? '✅ In Stock' : product.stock > 0 ? '⚠️ Low Stock' : '❌ Out of Stock'}
                          </span>
                        </div>

                        {/* Favorite Button */}
                        <button className="absolute top-4 left-4 p-2 rounded-full backdrop-blur-md bg-white/80 border border-white/50 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-pink-50 hover:scale-110">
                          <Heart className="w-4 h-4 text-pink-500" />
                        </button>
                      </div>

                      {/* Content Section */}
                      <div className="p-6">
                        {/* Category Tag */}
                        <div className="inline-block mb-3">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 border border-pink-200/50">
                            {product.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-2 group-hover:text-pink-600 transition-colors">
                          {product.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>

                        {/* Price */}
                        <div className="mb-6">
                          <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                            ${parseFloat(product.price || 0).toFixed(2)}
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Link
                            href={`/view-kits/${product._id}`}
                            className="flex-1 group/btn flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                          >
                            <Eye className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                            <span className="text-sm">View</span>
                          </Link>
                          
                          {isInCart(product) ? (
                            <button
                              onClick={() => removeItemFromCart(product)}
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                              disabled={product.stock <= 0}
                            >
                              <ShoppingCart className="w-4 h-4" />
                              <span className="text-sm">Remove</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => addItemToCart(product)}
                              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                                product.stock <= 0
                                  ? 'bg-gray-400 cursor-not-allowed text-white'
                                  : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white'
                              }`}
                              disabled={product.stock <= 0}
                            >
                              <ShoppingCart className="w-4 h-4" />
                              <span className="text-sm">Add</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* No Products Found */
                <div className="text-center max-w-2xl mx-auto">
                  <div className="backdrop-blur-md bg-white/80 rounded-3xl shadow-xl border border-white/50 p-12">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                      <Search className="w-10 h-10 text-pink-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">No DIY kits found</h3>
                    <p className="text-gray-600 mb-6">
                      We couldn't find any kits matching your criteria. Try adjusting your search or explore different categories!
                    </p>
                    {searchTerm || selectedCategory !== 'All' ? (
                      <button
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedCategory('All');
                        }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                      >
                        <Sparkles className="w-4 h-4" />
                        Clear all filters
                      </button>
                    ) : null}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

const BrowseKits = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="w-16 h-16 rounded-full border-4 border-pink-200 border-t-pink-500 animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-b-purple-500 animate-spin animate-reverse"></div>
          </div>
          <p className="text-gray-600 font-medium animate-pulse">Loading your creative journey...</p>
        </div>
      </div>
    }>
      <BrowseKitsContent />
    </Suspense>
  );
};

export default BrowseKits;