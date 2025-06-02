'use client';
import { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, Edit, Trash2, Eye, MoreHorizontal, CheckCircle, XCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';

export default function UserOrderManagement() {
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Format date for display - handle various date formats and fallbacks
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date) 
        ? date.toLocaleDateString() 
        : 'N/A';
  };

  useEffect(() => {
    fetchOrders();
  }, [user.email]); // Refetch when user changes

  const fetchOrders = async () => {
    try {
      if (!user.isLoggedIn || !user.email) {
        setOrders([]);
        setLoading(false);
        return;
      }
      
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      // Use user email to fetch only their orders
      const res = await fetch(`${apiUrl}/order/user/${encodeURIComponent(user.email)}`);
      
      if (!res.ok) {
        throw new Error('Failed to fetch orders');
      }
      
      const data = await res.json();
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  // Filter orders based on selected tab and search term
  const filteredOrders = orders.filter(order => {
    const matchesTab = selectedTab === 'all' || order.status === selectedTab;
    const matchesSearch = 
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Sort orders based on sort field and direction
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    let comparison = 0;
    if (sortField === 'date') {
      comparison = new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortField === 'total') {
      comparison = parseFloat(a.total) - parseFloat(b.total);
    } else if (sortField === 'customer') {
      comparison = a.customerName.localeCompare(b.customerName);
    } else if (sortField === 'id') {
      comparison = a._id.localeCompare(b._id);
    }
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Page Header */}
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">My Orders</h2>
            <p className="mt-1 text-sm text-gray-500">View and track your orders</p>
          </div>

          {/* Filters and Search */}
          <div className="p-6 bg-white border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-1">
                <button 
                  onClick={() => setSelectedTab('all')} 
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    selectedTab === 'all' 
                      ? 'bg-pink-100 text-pink-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  All Orders
                </button>
                <button 
                  onClick={() => setSelectedTab('processing')} 
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    selectedTab === 'processing' 
                      ? 'bg-pink-100 text-pink-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Processing
                </button>
                <button 
                  onClick={() => setSelectedTab('completed')} 
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    selectedTab === 'completed' 
                      ? 'bg-pink-100 text-pink-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Completed
                </button>
                <button 
                  onClick={() => setSelectedTab('cancelled')} 
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    selectedTab === 'cancelled' 
                      ? 'bg-pink-100 text-pink-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Cancelled
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 p-2.5"
                  />
                </div>
                <button className="bg-gray-100 p-2.5 rounded-lg text-gray-600 hover:bg-gray-200">
                  <Filter className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto">
            {orders.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900">No orders found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  You haven't placed any orders yet.
                </p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('id')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Order ID</span>
                        {sortField === 'id' && (
                          sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('customer')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Customer</span>
                        {sortField === 'customer' && (
                          sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('date')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Date</span>
                        {sortField === 'date' && (
                          sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('total')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Total</span>
                        {sortField === 'total' && (
                          sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-pink-600">#{order._id.slice(-6).toUpperCase()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.customerName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {formatDate(order.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{order.quantity}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ${typeof order.total === 'number' ? order.total.toFixed(2) : '0.00'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          <span className="mr-1">{getStatusIcon(order.status)}</span>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <Link 
                            href={`/user/view-order/${order._id}`}
                            className="text-gray-400 hover:text-gray-500"
                          >
                            <Eye className="w-5 h-5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {orders.length > 0 && (
            <div className="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{sortedOrders.length}</span> of{" "}
                    <span className="font-medium">{orders.length}</span> results
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}