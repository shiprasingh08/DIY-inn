'use client';
import { useCartContext } from '@/app/context/CartContext';
import { useWishListContext } from '@/app/context/WishListContext';
import { IconHeart, IconHeartFilled, IconStarFilled } from '@tabler/icons-react';
import axios from 'axios';
import { useParams } from 'next/navigation';
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
  const { addItemToCart: addToCart, isInCart: checkItemInCart } = useCartContext();

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
      setReviewList(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to load reviews');
    }
  }, [id]);

  useEffect(() => {
    fetchProductId();
    fetchReview();
  }, [id, fetchReview]);

  const totalRatings = reviewList.length;

  const getAverageRating = () => {
    if (reviewList.length === 0) return 0;
    let sum = 0;
    reviewList.forEach(review => {
      sum += review.rating;
    });
    return (sum / reviewList.length).toFixed(1);
  }

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(value > 0 ? value : 1);
  };

  const handleRating = (rate) => {
    setRating(rate);
    console.log(`Rating given: ${rate}`);
  };

  const sendReview = () => {
    if (!rating) {
      toast.error('Please select a rating');
      return;
    }
    if (!commentRef.current.value.trim()) {
      toast.error('Please write a review');
      return;
    }

    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/review/add`, {
      product: id,
      images: [],
      comment: commentRef.current.value,
      rating: rating
    }, {
      headers: {
        'x-auth-token': !ISSERVER && localStorage.getItem('token')
      }
    })
      .then((result) => {
        toast.success('Review added successfully');
        fetchReview(); // Refresh reviews after adding
        setRating(0); // Reset rating
        commentRef.current.value = ''; // Clear comment
      }).catch((err) => {
        console.log(err);
        toast.error(err.response?.data?.message || 'Something went wrong');
      });
  }

  const showProductDetails = () => {
    if (product !== null) {
      return (
        <>
          <div className="max-w-6xl w-full flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-12">
            <div className="w-full md:w-1/2 max-h-[70vh] flex justify-center">
              {product.videourl ? (
                <video
                  autoPlay
                  loop
                  muted
                  controls
                  src={product.videourl}
                  alt={product.title}
                  className="w-full h-full object-contain rounded-lg shadow-md"
                />
              ) : product.image ? (
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full object-contain rounded-lg shadow-md" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                  <p className="text-gray-500">No media available</p>
                </div>
              )}
            </div>

            <div className="w-full md:w-1/2">
              <h1 className="text-4xl font-bold text-gray-800">{product.title}</h1>
              <h2 className='text-md font-semibold text-gray-700 mb-4'>{product.brand}</h2>
                <span className="text-2xl font-semibold text-red-900">₹{product.price}</span>

              <div className="my-6">
              <p className="text-lg text-gray-600 mb-6">{product.description}</p>
              </div>

              {/* <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Product Features:</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  {product.features?.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  )) || (
                      <>
                        <li>Lorem, ipsum dolor.</li>
                        <li>Lorem, ipsum dolor.</li>
                        <li>Lorem ipsum dolor sit.</li>
                        <li>Lorem ipsum dolor sit amet consectetur.</li>
                        <li>Lorem ipsum dolor sit.</li>
                      </>
                    )}
                </ul>
              </div> */}

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Specifications:</h2>
                <ul className="text-gray-600 space-y-2">
                  {product.specifications?.map((spec, index) => (
                    <li key={index}>
                      <strong>{spec.label}:</strong> {spec.value}
                    </li>
                  )) || (
                      <>
                        <li><strong>Dimensions:</strong> {product.dimensions || ''}</li>
                        <li><strong>Weight:</strong> {product.weight || ''}</li>
                        <li><strong>Material:</strong> {product.material || ''}</li>
                      </>
                    )}
                </ul>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="quantity"
                  className="text-lg font-medium text-gray-800 mr-4"
                  aria-label="Product quantity"
                >
                  Quantity:
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-16 text-center py-2 border border-gray-300 rounded-md"
                  min="1"
                  aria-label="Product quantity"
                  role="spinbutton"
                />
              </div>

              <div className="mb-6 items-center">
                <div className="flex items-center">
                  <div className="flex items-center border rounded-3xl shadow-md py-2 px-6 bg-gray-100 space-x-2">
                    <span className={`text-2xl font-bold ${getAverageRating() >= 4 ? "text-green-900" : "text-yellow-500"
                      }`}>
                      {getAverageRating()}
                    </span>
                    <IconStarFilled
                      className={`text-2xl ${getAverageRating() >= 4 ? "text-green-900" : "text-yellow-500"
                        }`}
                    />
                  </div>

                  <span className="text-gray-600 text-sm mx-2 mt-1">
                    ({totalRatings} Reviews)
                  </span>
                </div>

                <StarRatings
                  className="mt-5"
                  onClick={handleRating}
                  rating={rating}
                  starRatedColor="red"
                  starEmptyColor="gray"
                  changeRating={setRating}
                  numberOfStars={5}
                  name='rating'
                  starDimension="30px"
                />
                <textarea
                  ref={commentRef}
                  className="w-full p-2 mt-5 border border-gray-300 rounded-md"
                  placeholder="Write your review here..."
                ></textarea>
                <button
                  onClick={sendReview}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Submit Review
                </button>
              </div>

              <button
                disabled={checkItemInCart}
                onClick={() => {
                  addToCart(product);
                }}
                className="w-full border md:w-auto px-4 py-2 bg-black text-white text-lg font-semibold rounded-full hover:bg-gray-800 transition-colors duration-300 disabled:bg-white disabled:text-gray-400 disabled:border-gray-400"
              >
                {checkItemInCart(product) ? 'Item already in cart' : 'Add to Cart'}
              </button>
              <button
                disabled={checkItemInWishlist(product._id)}
                onClick={() => {
                  addToWishlist(product);
                }}
                className='px-4 py-2 mx-2 rounded-full bg-gray-200 text-black transition-all ease-in disabled:bg-red-500 disabled:text-white '
              >
                {checkItemInWishlist(product._id) ? <IconHeartFilled /> : <IconHeart />}
              </button>

              {
                reviewList.length > 0 ? (

                  reviewList.map(review => (
                    <div key={review._id}>
                      <div className="bg-white shadow-md rounded-lg p-6 mb-4 transition duration-300 ease-in-out hover:shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                          <h2 className="text-xl font-bold text-gray-800">{review.user.name}</h2>
                          <p className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                        </div>

                        <div className="flex items-center mb-4">
                          <StarRatings
                            readOnly
                            rating={review.rating}
                            starRatedColor="red"
                            starEmptyColor="gray"
                            numberOfStars={5}
                            starDimension="20px"
                          />
                        </div>

                        <p className="text-gray-700 text-lg italic">"{review.comment}"</p>
                      </div>
                    </div>

                  ))

                ) : (
                  <h2 className="text-xl text-gray-800 mb-4">No reviews found yet.</h2>
                )
              }
            </div>
          </div>
        </>
      );
    } else {
      return (
        <div className="flex items-center justify-center">
          <h2 className="text-xl text-gray-800">Loading...</h2>
        </div>
      );
    }
  };

  return (
    <div className="bg-white min-h-screen mt-10 flex items-center justify-center p-6 overflow-y-auto">
      {showProductDetails()}
    </div>
  );
}
export default ViewKitPage;
