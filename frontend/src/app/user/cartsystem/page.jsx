'use client';
import React, { useState } from 'react';
import { Trash2, Heart, ShoppingBag, Gift, ChevronRight, X, Hammer, ShoppingCart as CartIcon } from 'lucide-react';

export default function ShoppingCart() {
  // Cart state
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Pink Acrylic Paint Set",
      price: 24.99,
      quantity: 1,
      image: "/api/placeholder/150/150",
      category: "Painting Supplies"
    },
    {
      id: 2,
      name: "Black Wood Stain",
      price: 19.99,
      quantity: 2,
      image: "/api/placeholder/150/150",
      category: "Wood Finishing"
    },
    {
      id: 3,
      name: "White Canvas Pack (5 pcs)",
      price: 32.99,
      quantity: 1,
      image: "/api/placeholder/150/150",
      category: "Art Supplies"
    }
  ]);

  // Recommended products
  const [recommendedProducts] = useState([
    {
      id: 4,
      name: "Pink Craft Paper",
      price: 8.99,
      image: "/api/placeholder/100/100",
      category: "Paper Crafts"
    },
    {
      id: 5,
      name: "Black Sharpie Markers",
      price: 11.99,
      image: "/api/placeholder/100/100",
      category: "Art Supplies"
    },
    {
      id: 6,
      name: "White Polymer Clay",
      price: 15.99,
      image: "/api/placeholder/100/100",
      category: "Modeling"
    },
    {
      id: 8,
      name: "Craft Scissors Set",
      price: 12.99,
      image: "/api/placeholder/100/100",
      category: "Tools"
    },
    {
      id: 9,
      name: "Glitter Pack (12 colors)",
      price: 9.99,
      image: "/api/placeholder/100/100",
      category: "Decorative"
    },
    {
      id: 10,
      name: "Paint Brush Set",
      price: 16.99,
      image: "/api/placeholder/100/100",
      category: "Painting Supplies"
    },
    {
      id: 11,
      name: "Hot Glue Gun",
      price: 14.99,
      image: "/api/placeholder/100/100",
      category: "Tools"
    },
    {
      id: 12,
      name: "Washi Tape Collection",
      price: 7.99,
      image: "/api/placeholder/100/100",
      category: "Decorative"
    },
    {
      id: 13,
      name: "Craft Storage Box",
      price: 19.99,
      image: "/api/placeholder/100/100",
      category: "Organization"
    }
  ]);

  // Saved items
  const [savedItems, setSavedItems] = useState([
    {
      id: 7,
      name: "DIY Jewelry Kit",
      price: 27.99,
      image: "/api/placeholder/100/100"
    }
  ]);

  // Promo code state
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Shipping cost
  const shipping = subtotal > 100 ? 0 : 5.99;
  
  // Calculate total
  const total = subtotal + shipping - discount;

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? {...item, quantity: newQuantity} : item
    ));
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Save item for later
  const saveForLater = (id) => {
    const itemToSave = cartItems.find(item => item.id === id);
    if (itemToSave) {
      setSavedItems([...savedItems, itemToSave]);
      removeItem(id);
    }
  };

  // Move item from saved to cart
  const moveToCart = (id) => {
    const itemToMove = savedItems.find(item => item.id === id);
    if (itemToMove) {
      setCartItems([...cartItems, {...itemToMove, quantity: 1}]);
      setSavedItems(savedItems.filter(item => item.id !== id));
    }
  };

  // Apply promo code
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setDiscount(subtotal * 0.1);
      setPromoApplied(true);
    } else {
      alert("Invalid promo code");
    }
  };

  // Add recommended product to cart
  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + 1);
    } else {
      setCartItems([...cartItems, {...product, quantity: 1}]);
    }
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
    setDiscount(0);
    setPromoApplied(false);
    setPromoCode("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main content */}
      <main className="container mx-auto py-8 px-4">        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-3">
            <CartIcon size={32} className="text-pink-500" />
            <h1 className="text-3xl font-bold">Nest&<span className="text-pink-500">Needle</span> Cart</h1>
          </div>
        </div>

        {/* Cart content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart items */}
          <div className="lg:w-2/3">
            {cartItems.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow text-center">
                <ShoppingBag size={64} className="text-pink-500 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold mb-2">Your craft cart is empty</h2>
                <p className="text-gray-600 mb-4">Time to stock up on DIY supplies for your next project!</p>
                <button className="bg-pink-500 text-white py-2 px-6 rounded-full hover:bg-pink-600 transition">
                  Browse DIY Supplies
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Cart Items ({cartItems.length})</h2>
                    {cartItems.length > 0 && (
                      <button 
                        onClick={clearCart}
                        className="text-sm flex items-center gap-1 text-red-500 hover:text-red-600 transition"
                      >
                        <Trash2 size={16} />
                        Clear Cart
                      </button>
                    )}
                  </div>
                </div>

                {/* Cart items list */}
                <ul>
                  {cartItems.map(item => (
                    <li key={item.id} className="border-b border-gray-200 p-6">
                      <div className="flex items-center gap-4">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-24 h-24 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <p className="text-gray-500 mb-2">Category: {item.category}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <button 
                              onClick={() => saveForLater(item.id)}
                              className="text-sm flex items-center gap-1 text-pink-500 hover:text-pink-600 transition"
                            >
                              <Heart size={16} />
                              Save for later
                            </button>
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-sm flex items-center gap-1 text-gray-500 hover:text-gray-600 transition"
                            >
                              <Trash2 size={16} />
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                          <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Saved items */}
            {savedItems.length > 0 && (
              <div className="bg-white rounded-lg shadow mt-8">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold">Saved for Later ({savedItems.length})</h2>
                </div>
                <ul>
                  {savedItems.map(item => (
                    <li key={item.id} className="border-b border-gray-200 last:border-b-0 p-6">
                      <div className="flex items-center gap-4">
                        <img 
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-pink-500 font-semibold">${item.price.toFixed(2)}</p>
                        </div>
                        <button 
                          onClick={() => moveToCart(item.id)}
                          className="bg-pink-500 text-white py-2 px-4 rounded-full hover:bg-pink-600 transition"
                        >
                          Move to Cart
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommended products */}
            <div className="mt-8 bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Complete Your Project</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {recommendedProducts.map(product => (
                  <div key={product.id} className="border border-gray-200 rounded-lg p-4 text-center">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover mx-auto mb-2"
                    />
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-pink-500 font-semibold mb-2">${product.price.toFixed(2)}</p>
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full bg-black text-white py-1 px-3 rounded hover:bg-gray-800 transition text-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow sticky top-4">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Order Summary</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-pink-500">
                      <span>Discount (10%)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Tax calculated at checkout</p>
                  </div>
                </div>

                {/* Promo code */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      disabled={promoApplied}
                    />
                    <button
                      onClick={applyPromoCode}
                      disabled={promoApplied || !promoCode}
                      className={`px-4 py-2 rounded-full transition ${
                        promoApplied
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-black text-white hover:bg-gray-800"
                      }`}
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <div className="flex items-center gap-2 text-green-500 mt-2 text-sm">
                      <Gift size={16} />
                      <span>Promo code applied successfully!</span>
                      <button 
                        onClick={() => {
                          setPromoApplied(false);
                          setPromoCode("");
                          setDiscount(0);
                        }}
                        className="ml-auto text-gray-500 hover:text-gray-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Checkout button */}
                <button
                  disabled={cartItems.length === 0}
                  className={`w-full mt-6 py-3 px-4 rounded-full flex items-center justify-center gap-2 text-white font-semibold transition ${
                    cartItems.length === 0
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-pink-500 hover:bg-pink-600"
                  }`}
                >
                  Proceed to Checkout
                  <ChevronRight size={20} />
                </button>

                {/* Payment methods */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500 mb-2">We accept</p>
                  <div className="flex justify-center gap-2">
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  </div>
                </div>
                
                {/* Additional info */}
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
        </div>      </main>
    </div>
  );
}