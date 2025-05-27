'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const Login = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Please fill in all fields', {
        style: {
          border: '1px solid #ff4b4b',
          padding: '16px',
          color: '#ff4b4b',
        },
        iconTheme: {
          primary: '#ff4b4b',
          secondary: '#FFFAEE',
        },
      });
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:5000/user/authenticate', {
        email,
        password
      });
      
      if (response.data.token) {        // Call the login function from AuthContext
        login({
          token: response.data.token,
          email: response.data.email,
          username: response.data.username || response.data.email.split('@')[0]
        });

        toast.success('Successfully logged in!', {
          style: {
            border: '1px solid #10B981',
            padding: '16px',
            color: '#10B981',
          },
          iconTheme: {
            primary: '#10B981',
            secondary: '#FFFAEE',
          },
        });
        
        // Redirect to home page after successful login
        router.push('/browse-kits');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please try again.', {
        style: {
          border: '1px solid #ff4b4b',
          padding: '16px',
          color: '#ff4b4b',
        },
        iconTheme: {
          primary: '#ff4b4b',
          secondary: '#FFFAEE',
        },
      });
    }
  };
  return (
    <>
      <div className="h-[100vh] flex space-evenly items-center w-full bg-cover bg-center"
        style={{ backgroundImage: `url('https://i.pinimg.com/736x/86/de/ae/86deaee680e942b739f293c0718cad9f.jpg')` }}  >
        <div className="flex max-w-2xl w-full gap-4 custom-shadow justify-center items-center mx-auto">
          <div className="w-1/2 bg-[#fceee6] p-8 flex flex-col items-center rounded-xl justify-center text-center">
            <h1 className="text-3xl font-semibold mb-4">Welcome to DIY Haven</h1>
            <img
              src="https://i.pinimg.com/236x/8b/b5/f4/8bb5f492daee404e4ee2e9fc8524702a.jpg"
              alt="DIY Haven"
              className="max-w-full mb-6"
            />
            <p className="text-gray-600 mb-6 flex justify-center items-center">
              Create, share, and explore amazing DIY projects with our community
            </p>
            <Link href="/browse-kits" className="w-full">
              <button className="bg-pink-500 hover:bg-pink-600 active:bg-pink-700 text-white font-bold py-2 px-4 rounded transition-all transform hover:scale-105 active:scale-100">
                Browse DIY Kits
              </button>
            </Link>
          </div>
          <div className="w-1/2 bg-white p-8 flex flex-col justify-center rounded-xl">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReifEhDM2UVScP0KDPs5y9r2zI6M2inQm0Og&s"
              alt="Crafting Tools"
              className="max-w-full mb-6"
            />
            <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button 
              onClick={handleLogin}
              className="bg-pink-500 hover:bg-pink-600 active:bg-pink-700 text-white font-bold py-2 px-4 rounded w-full transition-all transform hover:scale-105 active:scale-100"
            >
              Sign In
            </button>
            <p className="text-sm text-center mt-4">
              Don't have an account?{" "}
              <Link href="/signup" className="text-pink-500 hover:text-pink-600 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
