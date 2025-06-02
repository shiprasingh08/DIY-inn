'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ChevronLeft, Clock, Box, Truck, XCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ViewOrder() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Format date for display - handle various date formats and fallbacks
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date) 
      ? date.toLocaleDateString() 
      : 'N/A';
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/getbyid/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order');
        }
        const data = await response.json();
        setOrder(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to get status icon
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-600" />;
      default:
        return <Box className="w-5 h-5 text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Order Not Found</h2>
          <p className="text-gray-600">The order you're looking for doesn't exist.</p>
          <Link
            href="/user/manage-order"
            className="mt-4 inline-block bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <Link
          href="/user/manage-order"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Orders
        </Link>

        {/* Order Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Order #{id.slice(-6).toUpperCase()}</h1>
              <p className="text-gray-600 mt-1">
                Placed on {formatDate(order.createdAt || order.orderDate)}
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-2">
              {getStatusIcon(order.status)}
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Order Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">Customer Name</p>
                  <p className="text-gray-900">{order.customerName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-gray-900">{order.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Product</p>
                  <p className="text-gray-900">{order.product}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Quantity</p>
                  <p className="text-gray-900">{order.quantity}</p>
                </div>
                {order.customization && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Customization</p>
                    <p className="text-gray-900 whitespace-pre-line">{order.customization}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Shipping & Payment</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">Shipping Address</p>
                  <p className="text-gray-900 whitespace-pre-line">{order.shippingAddress}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Billing Address</p>
                  <p className="text-gray-900 whitespace-pre-line">{order.billingAddress}</p>
                </div>
                {order.total && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Amount</p>
                    <p className="text-gray-900">${typeof order.total === 'number' ? order.total.toFixed(2) : '0.00'}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Order Timeline */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Timeline</h2>
          <div className="space-y-6">
            <div className="relative flex items-center">
              <div className={`h-4 w-4 rounded-full ${
                order.status === 'completed' ? 'bg-green-500' :
                order.status === 'processing' ? 'bg-yellow-500' :
                order.status === 'cancelled' ? 'bg-red-500' :
                order.status === 'shipped' ? 'bg-blue-500' :
                'bg-gray-500'
              }`}></div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">
                  Order {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </p>
                <p className="text-sm text-gray-500">
                  {formatDate(order.createdAt || order.orderDate)}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            {order.status !== 'cancelled' && order.status !== 'completed' && (
              <button className="w-full sm:w-auto bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 transition-colors">
                Track Order
              </button>
            )}
            <button className="w-full sm:w-auto border border-pink-500 text-pink-500 px-6 py-2 rounded-md hover:bg-pink-50 transition-colors">
              Need Help?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}