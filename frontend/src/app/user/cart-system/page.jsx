'use client';
import React, { useState, useEffect } from 'react';
import { Trash2, Heart, ShoppingBag, Gift, ChevronRight, X, Hammer, ShoppingCart as CartIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';
import Script from 'next/script';

export default function ShoppingCart() {
  const router = useRouter();
  const { cart, addItemToCart, removeItemFromCart, clearCart: clearCartContext } = useCart();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    shippingAddress: '',
    paymentMethod: 'cod'
  });

  // Additional states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [savedItems, setSavedItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [razorpayOrder, setRazorpayOrder] = useState(null);

  // Form error state
  const [formErrors, setFormErrors] = useState({});

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const discount = promoApplied ? subtotal * 0.1 : 0; // 10% discount with promo code
  const total = subtotal - discount;

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!formData.shippingAddress.trim()) errors.shippingAddress = 'Shipping address is required';
    return errors;
  };

  // Initialize Razorpay
  const initializeRazorpayUPI = async () => {
    if (cart.length === 0) {
      setError('Your cart is empty!');
      return;
    }

    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Create Razorpay order from backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: total,
          currency: 'INR',
          receipt: `receipt_${Date.now()}`
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create payment order');
      }

      const data = await response.json();
      if (data.success) {
        setRazorpayOrder(data.order);
        openRazorpayCheckout(data.order);
      } else {
        throw new Error(data.message || 'Failed to create payment order');
      }
    } catch (error) {
      console.error('Error initializing payment:', error);
      setError('Failed to initialize payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Open Razorpay checkout
  const openRazorpayCheckout = async (order) => {
    try {
      // Get Razorpay key from API route
      const keyResponse = await fetch('/api/razorpay');
      const keyData = await keyResponse.json();
      
      const options = {
        key: keyData.keyId,
        amount: order.amount,
        currency: order.currency,
        name: 'DIY Inn',
        description: 'DIY Kits Purchase',
        order_id: order.id,
        handler: function (response) {
          // Handle successful payment
          verifyPayment(response);
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: '', // Add phone number field if needed
        },
        notes: {
          address: formData.shippingAddress
        },
        theme: {
          color: '#ec4899', // Pink-500 from Tailwind
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
            setError('Payment cancelled. Please try again.');
          }
        }
      };
      
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Error opening Razorpay:', error);
      setError('Failed to initialize payment interface. Please try again.');
      setLoading(false);
    }
  };

  // Verify payment with backend
  const verifyPayment = async (paymentResponse) => {
    try {
      setLoading(true);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/verify-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentResponse)
      });

      if (!response.ok) {
        throw new Error('Payment verification failed');
      }

      const data = await response.json();
      
      if (data.success) {
        // Create order after successful payment
        await createOrder('upi');
      } else {
        throw new Error(data.message || 'Payment verification failed');
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      setError('Payment verification failed. Please contact support.');
    } finally {
      setLoading(false);
    }
  };

  // Create order
  const createOrder = async (paymentMethodUsed) => {
    try {
      setLoading(true);
      setError('');
      
      // Prepare order data
      const orderData = {
        customerName: formData.name,
        email: formData.email,
        shippingAddress: formData.shippingAddress,
        items: cart.map(item => ({
          _id: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1,
          image: item.image
        })),
        subtotal: subtotal,
        shipping: 0,
        total: total,
        paymentMethod: paymentMethodUsed || formData.paymentMethod,
        status: paymentMethodUsed === 'upi' ? 'processing' : 'pending',
        orderDate: new Date().toISOString()
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const order = await response.json();

      // Clear cart after successful order
      clearCartContext();
      
      // Redirect to order confirmation/details page
      router.push(`/user/view-order/${order._id}`);

    } catch (error) {
      console.error('Error placing order:', error);
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle place order based on payment method
  const handlePlaceOrder = async () => {
    if (formData.paymentMethod === 'upi') {
      await initializeRazorpayUPI();
    } else {
      await createOrder();
    }
  };

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    const item = cart.find(item => (item._id || item.id) === id);
    if (item) {
      // Remove and re-add with new quantity
      removeItemFromCart(item);
      if (newQuantity > 0) {
        addItemToCart({...item, quantity: newQuantity - 1}); // subtracting 1 because addItemToCart will add 1
      }
    }
  };

  // Save item for later
  const saveForLater = (id) => {
    const itemToSave = cart.find(item => (item._id || item.id) === id);
    if (itemToSave) {
      setSavedItems([...savedItems, itemToSave]);
      removeItemFromCart(itemToSave);
    }
  };

  // Move item from saved to cart
  const moveToCart = (id) => {
    const itemToMove = savedItems.find(item => (item._id || item.id) === id);
    if (itemToMove) {
      addItemToCart(itemToMove);
      setSavedItems(savedItems.filter(item => (item._id || item.id) !== id));
    }
  };
  
  // Clear entire cart
  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCartContext();
      setPromoApplied(false);
      setPromoCode("");
    }
  };
  
  // Apply promo code
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setPromoApplied(true);
    } else {
      alert("Invalid promo code");
    }
  };

  // Show UPI Info
  const showUpiInfo = formData.paymentMethod === 'upi';

  return (
    <div className="min-h-screen bg-gray-100">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      {/* ... Rest of your component render... */}
      
      <main className="container mx-auto px-4 py-8">
        {/* Cart header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Shopping Cart</h1>
          <p className="text-gray-600 mt-2">{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>
        
        {/* Cart content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart items */}
          <div className="lg:w-2/3 space-y-6">
            {/* Cart empty state */}
            {cart.length === 0 && (
              <div className="bg-white rounded-lg shadow p-10 text-center">
                <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingCart className="text-pink-500 w-10 h-10" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
                <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
                <Link href="/user">
                  <button className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 font-medium">
                    Start Shopping
                  </button>
                </Link>
              </div>
            )}

            {/* Cart items */}
            {cart.length > 0 && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Shopping Cart</h2>
                    <button 
                      onClick={clearCart}
                      className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1"
                    >
                      <Trash2 size={16} />
                      Clear Cart
                    </button>
                  </div>
                </div>

                {/* Cart items list */}
                <div className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <div key={item._id || item.id} className="p-6 flex flex-col sm:flex-row gap-4">
                      {/* Product image */}
                      <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-md overflow-hidden">
                        <img 
                          src={item.image || 'https://placehold.co/200x200?text=DIY+Kit'} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Product details */}
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                            <p className="text-gray-500 text-sm">Category: {item.category || 'DIY Kit'}</p>
                          </div>
                          <div className="text-lg font-bold text-gray-900">
                            ${item.price.toFixed(2)}
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex flex-wrap items-center justify-between mt-4 gap-2">
                          {/* Quantity */}
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button 
                              onClick={() => updateQuantity((item._id || item.id), (item.quantity || 1) - 1)}
                              className="px-3 py-1 hover:bg-gray-100"
                              disabled={(item.quantity || 1) <= 1}
                            >
                              -
                            </button>
                            <span className="px-3 py-1">{item.quantity || 1}</span>
                            <button 
                              onClick={() => updateQuantity((item._id || item.id), (item.quantity || 1) + 1)}
                              className="px-3 py-1 hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                          
                          {/* Action buttons */}
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => saveForLater(item._id || item.id)}
                              className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                            >
                              <Heart size={16} />
                              Save for later
                            </button>
                            <button 
                              onClick={() => removeItemFromCart(item)}
                              className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1"
                            >
                              <Trash2 size={16} />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Saved for later items */}
            {savedItems.length > 0 && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold">Saved for later ({savedItems.length})</h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {savedItems.map((item) => (
                    <div key={item._id || item.id} className="p-6 flex gap-4">
                      {/* Product image */}
                      <div className="w-32 h-32 bg-gray-100 rounded-md overflow-hidden">
                        <img 
                          src={item.image || 'https://placehold.co/200x200?text=DIY+Kit'} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Product details */}
                      <div className="flex-1">
                        <div className="flex justify-between gap-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                            <p className="text-gray-500 text-sm">Category: {item.category || 'DIY Kit'}</p>
                          </div>
                          <div className="text-lg font-bold text-gray-900">
                            ${item.price.toFixed(2)}
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex items-center mt-4 gap-3">
                          <button 
                            onClick={() => moveToCart(item._id || item.id)}
                            className="text-sm text-pink-500 hover:text-pink-700 flex items-center gap-1"
                          >
                            <ShoppingBag size={16} />
                            Move to Cart
                          </button>
                          <button 
                            onClick={() => setSavedItems(savedItems.filter(i => (i._id || i.id) !== (item._id || item.id)))}
                            className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1"
                          >
                            <Trash2 size={16} />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Checkout section */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Checkout Details</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="Enter your name"
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="Enter your email"
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
                    <textarea
                      name="shippingAddress"
                      value={formData.shippingAddress}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="Enter your shipping address"
                      rows={3}
                    />
                    {formErrors.shippingAddress && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.shippingAddress}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                    <select
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      <option value="cod">Cash on Delivery</option>
                      <option value="card">Card Payment</option>
                      <option value="upi">UPI (Razorpay)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Show UPI info section when UPI is selected */}
            {showUpiInfo && (
              <div className="p-4 mt-4 bg-blue-50 rounded-md border border-blue-100">
                <h3 className="font-semibold text-blue-700 mb-2 flex items-center">
                  <span className="mr-2">📱</span>UPI Payment Information
                </h3>
                <ul className="text-sm text-blue-600 space-y-2 pl-6 list-disc">
                  <li>You will be redirected to Razorpay UPI payment gateway</li>
                  <li>You can pay using any UPI app (Google Pay, PhonePe, BHIM, Paytm, etc.)</li>
                  <li>Payment is secure and processed instantly</li>
                  <li>Your order will be confirmed after successful payment</li>
                </ul>
              </div>
            )}

            {/* Order summary */}
            <div className="bg-white rounded-lg shadow sticky top-6">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Order Summary</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {/* Promo discount */}
                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span className="flex items-center gap-1">
                        <Gift size={16} />
                        Promo Discount
                      </span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-lg font-bold">${total.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Including all taxes and fees
                    </p>
                  </div>
                </div>
                
                {/* Promo code */}
                <div className="mt-6">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      disabled={promoApplied}
                    />
                    <button
                      onClick={applyPromoCode}
                      className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 disabled:bg-gray-300"
                      disabled={promoApplied || !promoCode}
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                    {error}
                  </div>
                )}

                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading || cart.length === 0}
                  className={`w-full mt-6 py-3 px-4 rounded-full flex items-center justify-center gap-2 text-white font-semibold transition ${
                    cart.length === 0
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-pink-500 hover:bg-pink-600"
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>{formData.paymentMethod === 'upi' ? 'Proceed to Pay' : 'Place Order'}</span>
                      <ChevronRight size={20} />
                    </div>
                  )}
                </button>

                {/* Additional Info */}
                <div className="mt-6 space-y-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">?</span>
                    <span>Need project advice? <a href="#" className="text-pink-500 hover:underline">Ask our DIY experts</a></span>
                  </div>
                  <p className="text-gray-500">
                    Free shipping on orders over $100. Easy 30-day returns on unused items.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}