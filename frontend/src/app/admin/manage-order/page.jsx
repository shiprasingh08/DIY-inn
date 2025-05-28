'use client';
import { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, Edit, Trash2, Eye, MoreHorizontal, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Remove sample data and implement API fetch
export default function AdminOrderManagement() {
  const router = useRouter();
  const [sortField, setSortField] = useState('orderDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders data from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // Update to the correct backend endpoint
        const response = await fetch('http://localhost:5000/order/getall');
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        setOrders(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setError('Failed to load orders. Please try again later.');
        // Fallback to empty array if fetch fails
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (activeDropdown && !event.target.closest('.actions-dropdown')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  // Actions handlers
  const handleViewOrder = (orderId) => {
    router.push(`/admin/view-order/${orderId}`);
  };

  const handleEditOrder = (orderId) => {
    router.push(`/admin/view-order/${orderId}?edit=true`);
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        // Update to the correct backend endpoint
        const response = await fetch(`http://localhost:5000/order/delete/${orderId}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        // Update local state after successful API call
        const updatedOrders = orders.filter(order => order._id !== orderId);
        setOrders(updatedOrders);
      } catch (err) {
        console.error('Failed to delete order:', err);
        alert('Failed to delete order. Please try again.');
      }
    }
  };

  const handleMoreOptions = (orderId, event) => {
    event.stopPropagation();
    setActiveDropdown(activeDropdown === orderId ? null : orderId);
  };

  const handleFilterClick = () => {
    setShowFilterMenu(!showFilterMenu);
  };

  // Filter orders based on selected tab and search term
  const filteredOrders = orders.filter(order => {
    // Match status from backend model (pending, processing, shipped, delivered, cancelled)
    const matchesTab = selectedTab === 'all' || order.status === selectedTab;
    const matchesSearch = 
      (order._id && order._id.toLowerCase().includes(searchTerm.toLowerCase())) || 
      (order.customerName && order.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (order.email && order.email.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  // Sort orders based on sort field and direction
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    let comparison = 0;
    if (sortField === 'orderDate') {
      comparison = new Date(a.orderDate) - new Date(b.orderDate);
    } else if (sortField === 'total') {
      comparison = a.total - b.total;
    } else if (sortField === 'customerName') {
      comparison = a.customerName.localeCompare(b.customerName);
    } else if (sortField === '_id') {
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
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'processing':
        return <Clock className="w-4 h-4" />;
      case 'shipped':
        return <Clock className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date) 
      ? date.toLocaleDateString() 
      : 'N/A';
  };

  // Calculate total items in an order
  const calculateTotalItems = (items) => {
    if (!items || !Array.isArray(items)) return 0;
    return items.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center">
                <span className="font-medium text-white">AD</span>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-white"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Page Header */}
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Order Management</h2>
            <p className="mt-1 text-sm text-gray-500">View and manage all customer orders</p>
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
                  onClick={() => setSelectedTab('shipped')} 
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    selectedTab === 'shipped' 
                      ? 'bg-pink-100 text-pink-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Shipped
                </button>
                <button 
                  onClick={() => setSelectedTab('delivered')} 
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    selectedTab === 'delivered' 
                      ? 'bg-pink-100 text-pink-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Delivered
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
            {loading ? (
              <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
                <span className="ml-2">Loading orders...</span>
              </div>
            ) : error ? (
              <div className="p-8 text-center text-red-500">
                <p>{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
                >
                  Retry
                </button>
              </div>
            ) : sortedOrders.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p>No orders found matching your criteria.</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('_id')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Order ID</span>
                        {sortField === '_id' && (
                          sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('customerName')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Customer</span>
                        {sortField === 'customerName' && (
                          sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('orderDate')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Date</span>
                        {sortField === 'orderDate' && (
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
                        <div className="text-sm font-medium text-pink-600">{order._id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.customerName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{formatDate(order.orderDate)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{calculateTotalItems(order.items)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">${order.total ? order.total.toFixed(2) : '0.00'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          <span className="mr-1">{getStatusIcon(order.status)}</span>
                          {order.status && order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="relative flex items-center justify-end space-x-2 actions-dropdown">
                          {!isMobileView ? (
                            <>
                              <button 
                                onClick={() => handleViewOrder(order._id)}
                                className="p-1.5 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
                                title="View Order"
                              >
                                <Eye className="w-5 h-5" />
                              </button>
                              <button 
                                onClick={() => handleEditOrder(order._id)}
                                className="p-1.5 rounded-full text-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"
                                title="Edit Order"
                              >
                                <Edit className="w-5 h-5" />
                              </button>
                              <button 
                                onClick={() => handleDeleteOrder(order._id)}
                                className="p-1.5 rounded-full text-red-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                title="Delete Order"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                              <div className="relative">
                                <button 
                                  onClick={(e) => handleMoreOptions(order._id, e)}
                                  className="p-1.5 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
                                  title="More Options"
                                >
                                  <MoreHorizontal className="w-5 h-5" />
                                </button>
                                {activeDropdown === order._id && (
                                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                    <div className="py-1" role="menu">
                                      <button
                                        className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                                        onClick={() => {
                                          // Add change status logic
                                          setActiveDropdown(null);
                                        }}
                                      >
                                        Change Status
                                      </button>
                                      <button
                                        className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                                        onClick={() => {
                                          // Add print logic
                                          setActiveDropdown(null);
                                        }}
                                      >
                                        Print Order
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </>
                          ) : (
                            // Mobile view: Show only more options button
                            <div className="relative">
                              <button 
                                onClick={(e) => handleMoreOptions(order._id, e)}
                                className="p-1.5 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
                              >
                                <MoreHorizontal className="w-5 h-5" />
                              </button>
                              {activeDropdown === order._id && (
                                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                  <div className="py-1" role="menu">
                                    <button
                                      className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                                      onClick={() => handleViewOrder(order._id)}
                                    >
                                      View Order
                                    </button>
                                    <button
                                      className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                                      onClick={() => handleEditOrder(order._id)}
                                    >
                                      Edit Order
                                    </button>
                                    <button
                                      className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                                      onClick={() => handleDeleteOrder(order._id)}
                                    >
                                      Delete Order
                                    </button>
                                    <button
                                      className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                                      onClick={() => {
                                        // Add change status logic
                                        setActiveDropdown(null);
                                      }}
                                    >
                                      Change Status
                                    </button>
                                    <button
                                      className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                                      onClick={() => {
                                        // Add print logic
                                        setActiveDropdown(null);
                                      }}
                                    >
                                      Print Order
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          <div className="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{sortedOrders.length}</span> of{" "}
                  <span className="font-medium">{orders.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Previous</span>
                    <ChevronUp className="h-5 w-5 transform rotate-90" />
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-pink-500 bg-pink-500 text-sm font-medium text-white">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    2
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    3
                  </button>
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    ...
                  </span>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    8
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Next</span>
                    <ChevronDown className="h-5 w-5 transform rotate-90" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-sm text-gray-400">© 2025 Admin Dashboard. All rights reserved.</p>
            </div>
            <div className="flex justify-center md:justify-end space-x-4">
              <button className="text-sm text-gray-400 hover:text-white">Terms</button>
              <button className="text-sm text-gray-400 hover:text-white">Privacy</button>
              <button className="text-sm text-gray-400 hover:text-white">Support</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}