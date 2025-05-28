'use client';
import { useCart } from '@/app/context/CartContext';
import { useWishListContext } from '@/app/context/WishListContext';
import { IconHeart, IconHeartFilled, IconStarFilled, IconStar, IconShoppingCart, IconUser, IconCalendar } from '@tabler/icons-react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import StarRatings from 'react-star-ratings';
const ISSERVER = typeof window === "undefined";

function ViewKitPage() {
  const { addToWishlist, isInWishlist: checkItemInWishlist } = useWishListContext();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviewList, setReviewList] = useState([]);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [user, setUser] = useState(null);
  const { addItemToCart: addToCart, isInCart: checkItemInCart, removeItemFromCart: removeFromCart } = useCart();
  const router = useRouter();

  const commentRef = useRef();
  const { id } = useParams();

  const fetchProductId = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/kit/getbyid/${id}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch product');
      }
      const data = await res.json();
      if (!data) throw new Error('No product found');
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error(error.message || 'Failed to load product details');
    }
  };

  const fetchReview = useCallback(async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review/getbyproduct/${id}`);
      if (!res.ok) throw new Error('Failed to fetch reviews');
      const data = await res.json();
      setReviewList(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setReviewList([]);
      toast.error('Failed to load reviews');
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchProductId();
      fetchReview();
    }
  }, [id, fetchReview]);

  // Check if user is logged in
  useEffect(() => {
    if (!ISSERVER) {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (e) {
          console.error('Error parsing user data:', e);
          setUser(null);
        }
      }
    }
  }, []);

  const totalRatings = reviewList.length;

  const getAverageRating = () => {
    if (reviewList.length === 0) return 0;
    const sum = reviewList.reduce((acc, review) => acc + (review.rating || 0), 0);
    return (sum / reviewList.length).toFixed(1);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(value > 0 ? value : 1);
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  const sendReview = async () => {
    if (!user) {
      toast.error('Please log in to submit a review');
      router.push('/login');
      return;
    }

    if (!rating) {
      toast.error('Please select a rating');
      return;
    }
    if (!commentRef.current?.value?.trim()) {
      toast.error('Please write a review');
      return;
    }

    setIsSubmittingReview(true);
    
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/review/add`, {
        product: id,
        user: user._id, // Add user ID from local storage
        images: [],
        comment: commentRef.current.value.trim(),
        rating: rating
      }, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': !ISSERVER ? localStorage.getItem('token') : null
        }
      });

      if (response.status === 200 || response.status === 201) {
        toast.success('Review submitted successfully!');
        await fetchReview(); // Refresh reviews
        setRating(0); // Reset rating
        if (commentRef.current) {
          commentRef.current.value = ''; // Clear comment
        }
      }
    } catch (err) {
      console.error('Review submission error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to submit review';
      toast.error(errorMessage);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const renderStarRating = (rating, size = 20) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className="mr-1">
            {star <= rating ? (
              <IconStarFilled size={size} className="text-pink-400" />
            ) : (
              <IconStar size={size} className="text-gray-300" />
            )}
          </span>
        ))}
      </div>
    );
  };

  const showProductDetails = () => {
    if (product !== null) {
      return (
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            
            {/* Product Image/Video Section */}
            <div className="space-y-4 ">
              <div className="aspect-square bg-white rounded-3xl border-2 border-pink-200 overflow-hidden shadow-xl">
                {product.videourl ? (
                  <video
                    autoPlay
                    loop
                    muted
                    controls
                    src={product.videourl}
                    alt={product.title}
                    className="h-full w-full object-cover"
                  />
                ) : product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-pink-50">
                    <p className="text-pink-400 text-lg">💕 No image available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Product Details Section */}
            <div className="space-y-4">
              
              {/* Product Header */}
              <div className="bg-white rounded-2xl p-6 border-2 border-pink-200 shadow-lg mb-0">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-pink-800 bg-clip-text text-transparent mb-2">{product.title}</h1>
                    <p className="text-lg text-gray-600 font-medium flex items-center">💎 {product.brand}</p>
                  </div>
                  
                  <button
                    disabled={!!checkItemInWishlist(product._id)}
                    onClick={() => addToWishlist(product)}
                    className={`p-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110 ${
                      checkItemInWishlist(product._id) 
                        ? 'bg-pink-100 border-2 border-pink-300 text-pink-600' 
                        : 'bg-white border-2 border-pink-200 text-pink-400 hover:bg-pink-50 hover:border-pink-300 hover:text-pink-600'
                    }`}
                  >
                    {checkItemInWishlist(product._id) ? 
                      <IconHeartFilled size={24} /> : 
                      <IconHeart size={24} />
                    }
                  </button>
                </div>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 rounded-full">
                    <span className="text-2xl font-bold">₹{product.price}</span>
                  </div>
                  {getAverageRating() > 0 && (
                    <div className="flex items-center space-x-2 bg-pink-50 px-3 py-2 rounded-full">
                      {renderStarRating(getAverageRating())}
                      <span className="text-sm text-gray-600">({totalRatings} reviews)</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="bg-white rounded-2xl p-6 border-2 border-pink-200 shadow-lg space-y-4 mb-0">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700 flex items-center">🔢 Quantity:</label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="border-2 border-pink-200 rounded-full px-4 py-2 bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    disabled={!!checkItemInCart(product)}
                    onClick={() => addToCart(product)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-full font-semibold transition-all duration-200 ${
                      checkItemInCart(product)
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:from-pink-600 hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                    }`}
                  >
                    <span>{checkItemInCart(product) ? '💕 In Cart' : '🛒 Add to Cart'}</span>
                  </button>

                  {checkItemInCart(product) && (
                    <button
                      onClick={() => removeFromCart(product)}
                      className="px-4 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      ✕ Remove
                    </button>
                  )}
                </div>
              </div>

              {/* Write Review Section - Moved here */}
              <div className="bg-pink-50 rounded-2xl p-6 border-2 border-pink-200 mb-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">✍️ Write a Review</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">⭐ Rating</label>
                    <StarRatings
                      onClick={handleRating}
                      rating={rating}
                      starRatedColor="#ec4899"
                      starEmptyColor="#f3f4f6"
                      changeRating={setRating}
                      numberOfStars={5}
                      name='rating'
                      starDimension="32px"
                      starSpacing="4px"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">💭 Review</label>
                    <textarea
                      ref={commentRef}
                      className="w-full p-3 border-2 border-pink-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 resize-none"
                      placeholder="Share your experience with this product... 💖"
                      rows="4"
                    />
                  </div>
                  
                  <button
                    onClick={sendReview}
                    disabled={isSubmittingReview}
                    className={`px-6 py-2 rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                      isSubmittingReview
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:from-pink-600 hover:to-pink-700'
                    }`}
                  >
                    {isSubmittingReview ? '💕 Submitting...' : '🚀 Submit Review'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Product Information Tabs */}
          <div className="bg-white rounded-2xl border-2 border-pink-200 overflow-hidden shadow-xl">
            <div className="border-b-2 border-pink-200 bg-pink-50">
              <nav className="flex space-x-8 px-6">
                {['description', 'specifications', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors duration-200 ${
                      activeTab === tab
                        ? 'border-pink-500 text-pink-600 bg-white rounded-t-lg -mb-0.5'
                        : 'border-transparent text-gray-500 hover:text-pink-600 hover:border-pink-300'
                    }`}
                  >
                    {tab === 'description' && '📝 '}
                    {tab === 'specifications' && '⚙️ '}
                    {tab === 'reviews' && '⭐ '}
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {/* Description Tab */}
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
                </div>
              )}

              {/* Specifications Tab */}
              {activeTab === 'specifications' && (
                <div className="space-y-4">
                  {product.specifications?.length > 0 ? (
                    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {product.specifications.map((spec, index) => (
                        <div key={index} className="bg-pink-50 rounded-xl p-4 border border-pink-200">
                          <dt className="font-medium text-gray-900">{spec.label}</dt>
                          <dd className="text-gray-700 mt-1">{spec.value}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <div className="text-center py-8 text-pink-400">
                      <p>💕 No specifications available for this product.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Reviews Tab - Only shows reviews list now */}
              {activeTab === 'reviews' && (
                <div className="space-y-8">
                  {/* Reviews List */}
                  {reviewList.length > 0 ? (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center">💬 Customer Reviews ({totalRatings})</h3>
                      
                      {reviewList.map((review, index) => (
                        <div key={review._id || index} className="bg-white border-2 border-pink-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                                {review.user?.name ? review.user.name.charAt(0).toUpperCase() : '?'}
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {review.user?.name || 'Anonymous User'}
                                </h4>
                                <div className="flex items-center space-x-2 text-sm text-gray-500">
                                  <IconCalendar size={16} />
                                  <span>
                                    {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'Unknown date'}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            {renderStarRating(review.rating || 0, 18)}
                          </div>
                          
                          <div className="bg-pink-50 rounded-xl p-4 border border-pink-200">
                            <p className="text-gray-700 leading-relaxed italic">"{review.comment}"</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-pink-300 mb-4">
                        <IconStar size={48} className="mx-auto" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">💕 No Reviews Yet</h3>
                      <p className="text-pink-400">Be the first to review this product!</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center bg-white rounded-2xl p-8 shadow-xl border-2 border-pink-200">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <p className="text-pink-600 font-medium">💕 Loading product details...</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {showProductDetails()}
    </div>
  );
}

export default ViewKitPage;