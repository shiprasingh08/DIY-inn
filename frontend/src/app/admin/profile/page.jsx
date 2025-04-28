'use client';
import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const AdminProfile = () => {
  const [admin, setAdmin] = useState({
    name: 'Admin User',
    email: 'admin@diyinn.com',
    phone: '+1 234 567 8900',
    address: 'New Delhi, India',
    role: 'Administrator',
    joinDate: 'January 2024'
  });

  const [stats, setStats] = useState({
    totalKits: 45,
    activeOrders: 12,
    completedOrders: 156,
    customerRating: 4.8
  });

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center space-x-6">
            <div className="h-24 w-24 bg-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-3xl text-white font-bold">
                {admin.name.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{admin.name}</h1>
              <p className="text-sm text-gray-500">{admin.role}</p>
              <p className="text-sm text-gray-500">Member since {admin.joinDate}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-500">Total Kits</p>
            <p className="text-2xl font-semibold">{stats.totalKits}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-500">Active Orders</p>
            <p className="text-2xl font-semibold">{stats.activeOrders}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-500">Completed Orders</p>
            <p className="text-2xl font-semibold">{stats.completedOrders}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-500">Customer Rating</p>
            <p className="text-2xl font-semibold">{stats.customerRating}/5.0</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-gray-400" />
              <span>{admin.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaPhone className="text-gray-400" />
              <span>{admin.phone}</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-gray-400" />
              <span>{admin.address}</span>
            </div>
          </div>

          <div className="mt-6">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;