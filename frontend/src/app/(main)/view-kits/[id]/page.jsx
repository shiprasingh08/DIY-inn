'use client';
import { useCart } from '@/app/context/CartContext';
import { useWishListContext } from '@/app/context/WishListContext';
import { IconHeart, IconHeartFilled, IconStarFilled, IconStar, IconShoppingCart, IconUser, IconCalendar, IconMinus, IconPlus } from '@tabler/icons-react';
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

  // Debug: Log reviewList whenever it changes
  useEffect(() => {
    console.log('Review List:', reviewList);
  }, [reviewList]);

  // Check if user is logged in
  useEffect(() => {
    if (!ISSERVER) {
      const userData = localStorage.getItem('user');
      if (userData) {
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

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  const sendReview = async () => {
    // Debug: Log user and localStorage before submitting review
    console.log('User state before review submit:', user);
    if (!ISSERVER) {
      console.log('localStorage token:', localStorage.getItem('token'));
      console.log('localStorage user:', localStorage.getItem('user'));
    }

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
      const payload = {
        product: id,
        user: typeof user._id === 'string' ? user._id : user._id?._id || user.id || user,
        images: [],
        comment: commentRef.current.value.trim(),
        rating: rating
      };
      const headers = {
        'Content-Type': 'application/json',
        'x-auth-token': !ISSERVER && user.token ? user.token : null
      };
      console.log('Review payload:', payload);
      console.log('Review headers:', headers);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/review/add`, payload, { headers });

      if (response.status === 200 || response.status === 201) {
        toast.success('Review submitted successfully!');
        await fetchReview();
        setRating(0);
        if (commentRef.current) {
          commentRef.current.value = '';
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
              <IconStarFilled size={size} className="text-pink-500" />
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
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            
            {/* Main Product Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
              
              {/* Product Media */}
              <div className="relative">
                <div className="sticky top-8">
                  <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl border border-gray-100 group">
                    <div className="aspect-square">
                      {product.videourl ? (
                        <video
                          autoPlay
                          loop
                          muted
                          controls
                          src={product.videourl}
                          alt={product.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.title}
                          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-50 to-pink-100">
                          <div className="text-center">
                            <div className="w-20 h-20 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-4">
                              <IconUser size={40} className="text-pink-400" />
                            </div>
                            <p className="text-pink-500 font-medium">No image available</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </div>

              {/* Product Information */}
              <div className="space-y-8">
                
                {/* Header */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="inline-block px-3 py-1 bg-pink-100 text-pink-700 text-sm font-medium rounded-full mb-3">
                        {product.brand}
                      </div>
                      <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                        {product.title}
                      </h1>
                    </div>
                    
                    <button
                      disabled={!!checkItemInWishlist(product._id)}
                      onClick={() => addToWishlist(product)}
                      className={`relative p-4 rounded-2xl transition-all duration-300 group ${
                        checkItemInWishlist(product._id) 
                          ? 'bg-pink-500 shadow-lg shadow-pink-500/25' 
                          : 'bg-white border border-gray-200 hover:bg-pink-50 hover:border-pink-300 shadow-lg hover:shadow-xl'
                      }`}
                    >
                      {checkItemInWishlist(product._id) ? 
                        <IconHeartFilled size={24} className="text-white" /> : 
                        <IconHeart size={24} className="text-gray-600 group-hover:text-pink-500" />
                      }
                    </button>
                  </div>

                  {/* Rating and Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="text-4xl font-bold text-gray-900">
                        ₹{product.price}
                      </div>
                      {getAverageRating() > 0 && (
                        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                          {renderStarRating(getAverageRating(), 16)}
                          <span className="text-sm text-gray-600 font-medium">
                            {getAverageRating()} ({totalRatings})
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                  <h3 className="font-semibold text-gray-900 mb-4">Quantity</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-gray-50">
                      <button
                        onClick={decrementQuantity}
                        className="p-3 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-200"
                      >
                        <IconMinus size={18} />
                      </button>
                      <span className="px-6 py-3 bg-white font-semibold text-gray-900 min-w-[80px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={incrementQuantity}
                        className="p-3 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-200"
                      >
                        <IconPlus size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  {!checkItemInCart(product) ? (
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-pink-500/25 transform hover:-translate-y-0.5 flex items-center justify-center space-x-3"
                    >
                      <IconShoppingCart size={24} />
                      <span>Add to Cart</span>
                    </button>
                  ) : (
                    <div className="flex-1 flex space-x-4">
                      <div className="flex-1 bg-gray-100 text-gray-600 py-4 px-8 rounded-2xl font-semibold text-lg flex items-center justify-center space-x-3">
                        <IconShoppingCart size={24} />
                        <span>In Cart</span>
                      </div>
                      <button
                        onClick={() => removeFromCart(product)}
                        className="bg-black text-white py-4 px-6 rounded-2xl font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* Write Review Section */}
                <div className="bg-gradient-to-br from-pink-50 to-white rounded-2xl p-8 border border-pink-200 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                    <IconStar className="text-pink-500" />
                    <span>Write a Review</span>
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Your Rating</label>
                      <StarRatings
                        onClick={handleRating}
                        rating={rating}
                        starRatedColor="#ec4899"
                        starEmptyColor="#e5e7eb"
                        changeRating={setRating}
                        numberOfStars={5}
                        name='rating'
                        starDimension="36px"
                        starSpacing="6px"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Your Review</label>
                      <textarea
                        ref={commentRef}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 resize-none transition-all duration-200"
                        placeholder="Share your experience with this product..."
                        rows="5"
                      />
                    </div>
                    
                    <button
                      onClick={sendReview}
                      disabled={isSubmittingReview}
                      className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                        isSubmittingReview
                          ? 'bg-gray-400 text-white cursor-not-allowed'
                          : 'bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:from-pink-600 hover:to-pink-700 shadow-lg hover:shadow-xl hover:shadow-pink-500/25 transform hover:-translate-y-0.5'
                      }`}
                    >
                      {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Information Tabs */}
            <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xl">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-0">
                  {['description', 'specifications', 'reviews'].map((tab, index) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-6 px-8 font-semibold text-center capitalize transition-all duration-300 relative ${
                        activeTab === tab
                          ? 'text-pink-600 bg-gradient-to-b from-pink-50 to-white'
                          : 'text-gray-500 hover:text-pink-600 hover:bg-pink-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        {tab === 'description' && <span className="text-lg">📝</span>}
                        {tab === 'specifications' && <span className="text-lg">⚙️</span>}
                        {tab === 'reviews' && <span className="text-lg">💬</span>}
                        <span>{tab}</span>
                      </div>
                      {activeTab === tab && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-pink-600 rounded-t-full" />
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-8 lg:p-12">
                {/* Description Tab */}
                {activeTab === 'description' && (
                  <div className="max-w-4xl">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Description</h2>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
                    </div>
                  </div>
                )}

                {/* Specifications Tab */}
                {activeTab === 'specifications' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Specifications</h2>
                    {product.specifications?.length > 0 ? (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {product.specifications.map((spec, index) => (
                          <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:border-pink-300 transition-all duration-300 hover:shadow-lg">
                            <dt className="font-semibold text-gray-900 text-lg mb-2">{spec.label}</dt>
                            <dd className="text-gray-700 text-base">{spec.value}</dd>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <IconStar size={48} className="text-pink-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No specifications available</h3>
                        <p className="text-gray-500">Detailed specifications will be updated soon.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
                      {totalRatings > 0 && (
                        <div className="text-right">
                          <div className="text-3xl font-bold text-gray-900">{getAverageRating()}</div>
                          <div className="flex items-center justify-end space-x-1 mb-1">
                            {renderStarRating(getAverageRating(), 18)}
                          </div>
                          <div className="text-sm text-gray-500">{totalRatings} reviews</div>
                        </div>
                      )}
                    </div>

                    {reviewList.length > 0 ? (
                      <div className="space-y-6">
                        {reviewList.map((review, index) => (
                          <div key={review._id || index} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 hover:border-pink-300 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-start space-x-4 mb-6">
                              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                {review.user?.name ? review.user.name.charAt(0).toUpperCase() : '?'}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-semibold text-gray-900 text-lg">
                                    {review.user?.name || 'Anonymous User'}
                                  </h4>
                                  {renderStarRating(review.rating || 0, 18)}
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                  <IconCalendar size={16} className="mr-2" />
                                  <span>
                                    {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'Unknown date'}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-white rounded-xl p-6 border border-gray-200">
                              <p className="text-gray-700 leading-relaxed italic">"{review.comment}"</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <IconStar size={48} className="text-pink-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Reviews Yet</h3>
                        <p className="text-gray-500">Be the first to review this product!</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-gray-50 flex items-center justify-center">
          <div className="text-center bg-white rounded-3xl p-12 shadow-2xl border border-gray-200 max-w-md w-full mx-4">
            <div className="relative mb-8">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-200 border-t-pink-500 mx-auto"></div>
              <div className="absolute inset-0 rounded-full bg-pink-50 opacity-20 animate-pulse"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading Product</h3>
            <p className="text-gray-500">Please wait while we fetch the details...</p>
          </div>
        </div>
      );
    }
  };

  return showProductDetails();
}

export default ViewKitPage;