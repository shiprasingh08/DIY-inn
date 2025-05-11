'use client';
import { useState } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, Edit, Trash2, Eye, MoreHorizontal, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function AdminOrderManagement() {
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample data for orders
  const orders = [
    { id: 'ORD-9385', customer: 'Varsha Singh', date: '2025-05-10', total: 129.99, status: 'completed', items: 3 },
    { id: 'ORD-9384', customer: 'Vaishnavi', date: '2025-05-10', total: 85.50, status: 'processing', items: 2 },
    { id: 'ORD-9383', customer: 'Arpita singh', date: '2025-05-09', total: 210.75, status: 'completed', items: 4 },
    { id: 'ORD-9382', customer: 'Sanjana', date: '2025-05-09', total: 45.99, status: 'cancelled', items: 1 },
    { id: 'ORD-9381', customer: 'Princy', date: '2025-05-08', total: 167.25, status: 'processing', items: 3 },
    { id: 'ORD-9380', customer: 'Riya', date: '2025-05-08', total: 312.00, status: 'completed', items: 6 },
  ];

  // Filter orders based on selected tab and search term
  const filteredOrders = orders.filter(order => {
    const matchesTab = selectedTab === 'all' || order.status === selectedTab;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Sort orders based on sort field and direction
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    let comparison = 0;
    if (sortField === 'date') {
      comparison = new Date(a.date) - new Date(b.date);
    } else if (sortField === 'total') {
      comparison = a.total - b.total;
    } else if (sortField === 'customer') {
      comparison = a.customer.localeCompare(b.customer);
    } else if (sortField === 'id') {
      comparison = a.id.localeCompare(b.id);
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
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'processing':
        return <Clock className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
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
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-pink-600">{order.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.customer}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{order.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{order.items}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">${order.total.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        <span className="mr-1">{getStatusIcon(order.status)}</span>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-gray-400 hover:text-gray-500">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="text-blue-400 hover:text-blue-500">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button className="text-red-400 hover:text-red-500">
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-500">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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