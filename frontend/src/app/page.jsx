'use client';
import React from 'react';
import { Heart, Package, Tool, Users } from 'lucide-react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-black to-gray-900 text-white py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-pink-500">Nest&Needle</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl">
              Discover unique DIY kits and join a community of creative makers. Start your crafting journey today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/browse-kits" 
                className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition duration-300"
              >
                Browse Kits
              </Link>
              <Link 
                href="/signup" 
                className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-black transition duration-300"
              >
                Join Community
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <Package className="h-12 w-12 text-pink-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality Kits</h3>
              <p className="text-gray-600">Carefully curated DIY kits for all skill levels</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <Users className="h-12 w-12 text-pink-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600">Join fellow crafters and share your creations</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <Tool className="h-12 w-12 text-pink-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-600">Get help from our community of experts</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <Heart className="h-12 w-12 text-pink-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Made with Love</h3>
              <p className="text-gray-600">Create beautiful things with your own hands</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-pink-50 py-16">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Creating?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join our community today and start your DIY journey
          </p>
          <Link 
            href="/signup" 
            className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition duration-300 inline-block"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;