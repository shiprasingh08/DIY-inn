'use client';
import { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Mail, Lock, ArrowRight, Heart, Star } from 'lucide-react';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [mounted, setMounted] = useState(false);
  const [floatingElements, setFloatingElements] = useState([]);
  
  useEffect(() => {
    setMounted(true);
    
    // Create floating elements
    const elements = [];
    for (let i = 0; i < 15; i++) {
      elements.push({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 10 + 5,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
        type: Math.random() > 0.5 ? 'star' : 'heart'
      });
    }
    setFloatingElements(elements);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden relative">
      {/* Floating elements */}
      {floatingElements.map((el) => (
        <div 
          key={el.id}
          className={`absolute opacity-20 text-pink-400 animate-pulse`}
          style={{
            top: `${el.top}%`,
            left: `${el.left}%`,
            animation: `float ${el.duration}s ease-in-out ${el.delay}s infinite alternate`
          }}
        >
          {el.type === 'star' ? 
            <Star size={el.size} className="text-pink-300" /> : 
            <Heart size={el.size} className="text-pink-300" />
          }
        </div>
      ))}

      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-pink-950 to-black bg-opacity-50 animate-gradient-shift"></div>
      
      {/* Main container */}
      <div className={`w-full max-w-md transition-all duration-1000 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} z-10 flex flex-col md:flex-row rounded-2xl shadow-2xl overflow-hidden`}>
        {/* Left column with image (visible on medium screens and larger) */}
        <div className="hidden md:block md:w-1/2 bg-pink-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-pink-900 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('/api/placeholder/600/600')] bg-cover bg-center mix-blend-overlay"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-white">
            <div className={`transition-all duration-1000 delay-300 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h2 className="text-2xl font-bold mb-4">Welcome Back</h2>
              <p className="text-sm mb-4">Create an account and join our amazing community today!</p>
              <div className="flex space-x-2 mt-8">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <div className="w-2 h-2 bg-white bg-opacity-70 rounded-full"></div>
                <div className="w-2 h-2 bg-white bg-opacity-40 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column with form */}
        <div className={`w-full md:w-1/2 bg-white p-8`}>
          <div className={`transition-all duration-700 delay-100 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Sign Up</h1>
            <p className="text-gray-600 mb-6">Join our community today</p>
          </div>

          <div className="space-y-5">
            <div className={`space-y-2 transition-all duration-700 delay-200 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400 group-hover:text-pink-500 transition-colors" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="pl-10 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all hover:border-pink-300"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className={`space-y-2 transition-all duration-700 delay-300 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400 group-hover:text-pink-500 transition-colors" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all hover:border-pink-300"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className={`space-y-2 transition-all duration-700 delay-400 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400 group-hover:text-pink-500 transition-colors" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all hover:border-pink-300"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff size={18} className="text-gray-400 hover:text-pink-500 transition-colors" />
                  ) : (
                    <Eye size={18} className="text-gray-400 hover:text-pink-500 transition-colors" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
            </div>

            <div className={`pt-2 transition-all duration-700 delay-500 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <button
                onClick={handleSubmit}
                className="group relative w-full flex justify-center py-3 px-4 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 to-pink-600"></span>
                <span className="absolute inset-0 w-0 bg-gradient-to-r from-pink-600 to-pink-800 transition-all duration-300 ease-out group-hover:w-full"></span>
                <span className="relative flex items-center">
                  <ArrowRight size={18} className="mr-2 group-hover:translate-x-1 transition-transform" />
                  Create account
                </span>
              </button>
            </div>
          </div>

          <div className={`mt-6 text-center transition-all duration-700 delay-600 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <a href="#" className="font-medium text-pink-600 hover:text-pink-700 transition relative group">
                Sign in
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Animated decoration at bottom */}
      <div className={`mt-8 flex items-center space-x-4 transition-all duration-1000 delay-700 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="w-2 h-2 bg-pink-300 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
        <div className="w-2 h-2 bg-pink-700 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}