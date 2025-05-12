'use client';
import { useState } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, Package, ShoppingBag, Truck, CheckCircle, AlertCircle } from 'lucide-react';

export default function OrderManagement() {
  const [activeTab, setActiveTab] = useState('all');
  const [sortDirection, setSortDirection] = useState('desc');
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Sample order data
  const orders = [
    {
      id: 'ORD-7856',
      date: '2025-05-10',
      status: 'delivered',
      items: [
        { name: 'DIY Macramé Wall Hanging Kit', price: 29.99, quantity: 1 },
        { name: 'Ceramic Painting Set', price: 34.50, quantity: 2 }
      ],
      total: 98.99,
      address: '123 Craft St, DIY City, DC 12345',
      trackingNumber: 'TRK12345678'
    },
    {
      id: 'ORD-7832',
      date: '2025-05-08', 
      status: 'processing',
      items: [
        { name: 'Wooden Birdhouse Kit', price: 24.99, quantity: 1 }
      ],
      total: 24.99,
      address: '456 Maker Ave, DIY City, DC 12345'
    },
    {
      id: 'ORD-7814',
      date: '2025-05-05',
      status: 'shipped',
      items: [
        { name: 'Candle Making Supplies', price: 42.75, quantity: 1 },
        { name: 'Essential Oils Set', price: 18.99, quantity: 1 }
      ],
      total: 61.74,
      address: '789 Creator Blvd, DIY City, DC 12345',
      trackingNumber: 'TRK98765432'
    },
    {
      id: 'ORD-7798',
      date: '2025-05-02',
      status: 'cancelled',
      items: [
        { name: 'Knitting Starter Kit', price: 35.50, quantity: 1 }
      ],
      total: 35.50,
      address: '321 Hobby Ln, DIY City, DC 12345'
    }
  ];

  // Filter orders based on active tab
  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    return order.status === activeTab;
  });

  // Sort orders based on date
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortDirection === 'desc' ? dateB - dateA : dateA - dateB;
  });

  // Toggle sort direction
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
  };

  // Handle order expansion
  const toggleOrderExpansion = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  // Get status badge color and icon
  const getStatusDetails = (status) => {
    switch (status) {
      case 'processing':
        return { 
          color: 'bg-pink-100 text-pink-700',
          icon: <Package size={16} className="text-pink-700" />
        };
      case 'shipped':
        return { 
          color: 'bg-blue-100 text-blue-700',
          icon: <Truck size={16} className="text-blue-700" />
        };
      case 'delivered':
        return { 
          color: 'bg-green-100 text-green-700',
          icon: <CheckCircle size={16} className="text-green-700" />
        };
      case 'cancelled':
        return { 
          color: 'bg-gray-100 text-gray-700',
          icon: <AlertCircle size={16} className="text-gray-700" />
        };
      default:
        return { 
          color: 'bg-gray-100 text-gray-700',
          icon: <ShoppingBag size={16} className="text-gray-700" />
        };
    }
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-pink-500">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
            <p className="text-gray-600 mt-2">Manage and track your DIY project orders</p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search orders by ID or item name..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <div className="flex gap-4">
              <button 
                onClick={toggleSortDirection}
                className="flex items-center gap-1 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                Sort by Date
                {sortDirection === 'desc' ? 
                  <ChevronDown size={16} /> : 
                  <ChevronUp size={16} />
                }
              </button>
              <div className="relative">
                <button className="flex items-center gap-1 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500">
                  <Filter size={16} />
                  Filter
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8" aria-label="Order Tabs">
              <button
                onClick={() => setActiveTab('all')}
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'all'
                    ? 'border-pink-500 text-pink-500'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                All Orders
              </button>
              <button
                onClick={() => setActiveTab('processing')}
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'processing'
                    ? 'border-pink-500 text-pink-500'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Processing
              </button>
              <button
                onClick={() => setActiveTab('shipped')}
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'shipped'
                    ? 'border-pink-500 text-pink-500'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Shipped
              </button>
              <button
                onClick={() => setActiveTab('delivered')}
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'delivered'
                    ? 'border-pink-500 text-pink-500'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Delivered
              </button>
              <button
                onClick={() => setActiveTab('cancelled')}
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'cancelled'
                    ? 'border-pink-500 text-pink-500'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Cancelled
              </button>
            </nav>
          </div>

          {/* Order List */}
          <div className="space-y-4">
            {sortedOrders.length > 0 ? (
              sortedOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  {/* Order Header */}
                  <div 
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 cursor-pointer"
                    onClick={() => toggleOrderExpansion(order.id)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div>
                        <span className="font-bold text-black">{order.id}</span>
                        <span className="text-gray-500 text-sm ml-2">
                          {formatDate(order.date)}
                        </span>
                      </div>
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusDetails(order.status).color}`}>
                        {getStatusDetails(order.status).icon}
                        <span className="ml-1 capitalize">{order.status}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 md:mt-0">
                      <span className="font-bold text-black">${order.total.toFixed(2)}</span>
                      <button className="ml-4 text-pink-500 focus:outline-none">
                        {expandedOrder === order.id ? 
                          <ChevronUp size={20} /> : 
                          <ChevronDown size={20} />
                        }
                      </button>
                    </div>
                  </div>

                  {/* Order Details (Expanded) */}
                  {expandedOrder === order.id && (
                    <div className="p-4 border-t border-gray-200 bg-white">
                      <h4 className="font-medium text-gray-900 mb-2">Order Items</h4>
                      <ul className="divide-y divide-gray-200">
                        {order.items.map((item, index) => (
                          <li key={index} className="py-3 flex justify-between">
                            <div>
                              <p className="text-gray-900">{item.name}</p>
                              <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="font-medium text-gray-900 mb-2">Shipping Details</h4>
                        <p className="text-gray-600">{order.address}</p>
                        {order.trackingNumber && (
                          <div className="mt-2">
                            <span className="text-gray-600">Tracking: </span>
                            <span className="text-pink-500 font-medium">{order.trackingNumber}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end gap-2">
                        {order.status === 'processing' && (
                          <button className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
                            Cancel Order
                          </button>
                        )}
                        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
                          View Details
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <ShoppingBag size={48} className="mx-auto text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
                <p className="mt-1 text-sm text-gray-500">Try changing your filters or search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}