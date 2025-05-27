'use client';
import { useState } from 'react';
import { Heart, Star, ShoppingCart, Grid, List, Filter, Search, X } from 'lucide-react';

export default function FavoritesPage() {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const favoriteItems = [
    {
      id: 1,
      name: 'Premium Wood Stain Set',
      category: 'woodworking',
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.8,
      reviews: 245,
      image: 'https://images.unsplash.com/photo-1609205251738-48b435b46a48?w=300&h=300&fit=crop',
      inStock: true,
      sale: true
    },
    {
      id: 2,
      name: 'Ceramic Paint Brush Set',
      category: 'painting',
      price: 15.99,
      originalPrice: 22.99,
      rating: 4.6,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop',
      inStock: true,
      sale: true
    },
    {
      id: 3,
      name: 'Vintage Mason Jar Collection',
      category: 'crafts',
      price: 18.50,
      originalPrice: 25.00,
      rating: 4.9,
      reviews: 312,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
      inStock: false,
      sale: false
    },
    {
      id: 4,
      name: 'Professional Drill Bit Set',
      category: 'tools',
      price: 42.99,
      originalPrice: 59.99,
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&h=300&fit=crop',
      inStock: true,
      sale: true
    },
    {
      id: 5,
      name: 'Fabric Scissors Set',
      category: 'sewing',
      price: 12.99,
      originalPrice: 16.99,
      rating: 4.5,
      reviews: 98,
      image: 'https://images.unsplash.com/photo-1562577309-2592ab84b1bc?w=300&h=300&fit=crop',
      inStock: true,
      sale: false
    },
    {
      id: 6,
      name: 'Acrylic Paint Mega Set',
      category: 'painting',
      price: 34.99,
      originalPrice: 49.99,
      rating: 4.8,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=300&fit=crop',
      inStock: true,
      sale: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Items', count: favoriteItems.length },
    { id: 'woodworking', name: 'Woodworking', count: favoriteItems.filter(item => item.category === 'woodworking').length },
    { id: 'painting', name: 'Painting', count: favoriteItems.filter(item => item.category === 'painting').length },
    { id: 'crafts', name: 'Crafts', count: favoriteItems.filter(item => item.category === 'crafts').length },
    { id: 'tools', name: 'Tools', count: favoriteItems.filter(item => item.category === 'tools').length },
    { id: 'sewing', name: 'Sewing', count: favoriteItems.filter(item => item.category === 'sewing').length }
  ];

  const filteredItems = favoriteItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const removeFromFavorites = (itemId) => {
    // In a real app, this would update the favorites list
    console.log('Remove item from favorites:', itemId);
  };

  const addToCart = (item) => {
    console.log('Add to cart:', item);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Heart className="text-pink-400 fill-current" size={32} />
                My Favorites
              </h1>
              <p className="text-gray-300 mt-1">{filteredItems.length} items saved</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search favorites..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-pink-400 focus:outline-none w-64"
                />
              </div>
              <div className="flex bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-pink-500 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-pink-500 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Filter size={20} />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-pink-500 text-white'
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="flex justify-between items-center">
                      {category.name}
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        selectedCategory === category.id
                          ? 'bg-pink-400 text-white'
                          : 'bg-gray-300 text-gray-600'
                      }`}>
                        {category.count}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {filteredItems.length === 0 ? (
              <div className="text-center py-16">
                <Heart className="mx-auto text-gray-400 mb-4" size={64} />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No favorites found</h3>
                <p className="text-gray-600">Try adjusting your search or browse our DIY collection to find items you love!</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {filteredItems.map(item => (
                  <div key={item.id} className={`bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow ${
                    viewMode === 'list' ? 'flex items-center' : ''
                  }`}>
                    {item.sale && (
                      <div className="absolute top-2 left-2 bg-pink-500 text-white px-2 py-1 rounded text-sm font-semibold z-10">
                        SALE
                      </div>
                    )}
                    
                    <div className={`relative ${viewMode === 'list' ? 'w-32 h-32 flex-shrink-0' : 'aspect-square'}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removeFromFavorites(item.id)}
                        className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-50 transition-colors"
                      >
                        <X size={16} className="text-gray-600" />
                      </button>
                    </div>

                    <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <div className={viewMode === 'list' ? 'flex justify-between items-start' : ''}>
                        <div className={viewMode === 'list' ? 'flex-1' : ''}>
                          <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                          <div className="flex items-center gap-1 mb-2">
                            <Star className="text-yellow-400 fill-current" size={16} />
                            <span className="text-sm text-gray-600">{item.rating} ({item.reviews})</span>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-lg font-bold text-gray-900">${item.price}</span>
                            {item.sale && (
                              <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className={`text-sm px-2 py-1 rounded-full ${
                              item.inStock 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {item.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => addToCart(item)}
                          disabled={!item.inStock}
                          className={`${viewMode === 'list' ? 'ml-4' : 'w-full mt-3'} flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                            item.inStock
                              ? 'bg-pink-500 hover:bg-pink-600 text-white'
                              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          <ShoppingCart size={16} />
                          {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}