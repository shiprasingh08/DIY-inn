'use client';
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Wrench, Hammer, Paintbrush, Scissors } from 'lucide-react';
import Navbar from '@/app/components/navbar/Navbar';

export default function DIYContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter subscription submitted');
    // Handle newsletter subscription here
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-50 to-pink-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center space-x-4 mb-8 opacity-20">
            <Wrench className="h-12 w-12 text-pink-300" />
            <Hammer className="h-12 w-12 text-pink-300" />
            <Paintbrush className="h-12 w-12 text-pink-300" />
            <Scissors className="h-12 w-12 text-pink-300" />
          </div>
          <h1 className="text-5xl font-bold text-black mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to start your next DIY project? Get in touch with our creative team for inspiration, guidance, and all your crafting needs.
          </p>
          
          {/* Partner Logos */}
          <div className="flex justify-center items-center space-x-8 mt-12 opacity-40">
            <div className="flex items-center space-x-2">
              <Hammer className="h-6 w-6 text-gray-400" />
              <span className="text-gray-400 font-medium">CRAFTMASTER</span>
            </div>
            <div className="flex items-center space-x-2">
              <Paintbrush className="h-6 w-6 text-gray-400" />
              <span className="text-gray-400 font-medium">ARTISAN</span>
            </div>
            <div className="flex items-center space-x-2">
              <Wrench className="h-6 w-6 text-gray-400" />
              <span className="text-gray-400 font-medium">MAKERS</span>
            </div>
            <div className="flex items-center space-x-2">
              <Scissors className="h-6 w-6 text-gray-400" />
              <span className="text-gray-400 font-medium">CREATIVE</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-pink-50 p-8 rounded-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="mb-6">
                  <textarea
                    name="message"
                    placeholder="Tell us about your DIY project ideas..."
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="6"
                    className="w-full px-4 py-3 bg-white border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-pink-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>            {/* Newsletter Signup */}
            <div className="bg-black text-white p-8 rounded-2xl h-fit">
              <h3 className="text-2xl font-bold mb-4">DIY Newsletter</h3>
              <p className="text-gray-300 mb-6">
                Subscribe to get weekly DIY project ideas, crafting tips, and exclusive tutorials delivered to your inbox.
              </p>
              <form onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent mb-4"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-pink-500 text-white py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors"
                >
                  Subscribe Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Phone */}
            <div className="bg-white p-8 rounded-2xl text-center shadow-lg">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">(+123) 456-789</h3>
              <p className="text-gray-600">
                Call us for immediate DIY help and project consultation. Available Mon-Fri 9AM-6PM.
              </p>
            </div>

            {/* Email */}
            <div className="bg-white p-8 rounded-2xl text-center shadow-lg">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">hello@diystudio.co</h3>
              <p className="text-gray-600">
                Send us your project ideas, questions, or collaboration proposals. We'd love to hear from you!
              </p>
            </div>

            {/* Location */}
            <div className="bg-white p-8 rounded-2xl text-center shadow-lg">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Creative Hub | Craftville</h3>
              <p className="text-gray-600">
                Visit our workshop and showroom to see projects in person and get hands-on guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-pink-200 to-pink-300 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-pink-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-black mb-2">Find Our DIY Studio</h3>
              <p className="text-gray-700 mb-4">123 Creative Street, Craftville, CV 12345</p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>Mon-Fri: 9AM-6PM</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>Sat: 10AM-4PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
  
}