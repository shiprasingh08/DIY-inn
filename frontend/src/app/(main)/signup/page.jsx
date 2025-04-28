'use client';
import React, { useState } from "react";
import { FcGoogle } from 'react-icons/fc';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { FiUser } from 'react-icons/fi';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const signupValidation = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[0-9]/, "Password requires at least one number")
    .matches(/[a-z]/, "Password requires at least one lowercase letter")
    .matches(/[A-Z]/, "Password requires at least one uppercase letter")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const Page = () => {
  const router = useRouter();

  const signupForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      axios.post('http://localhost:5000/user/add', values)
      .then((result) => {
        console.log(result.data);
        toast.success("Account created successfully!");
        router.push("/login");
      }).catch((err) => {
        console.log(err);
        toast.error("Error creating account. Please try again.");
      });
    },
    validationSchema: signupValidation
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8 flex shadow-2xl rounded-2xl overflow-hidden">
        {/* Left side - Image */}
        <div className="hidden md:block w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1615028456268-02eb9815a776?ixlib=rb-4.0.3"
            alt="DIY Crafts"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/40 to-pink-500/40 backdrop-blur-sm">
            <div className="flex flex-col justify-center h-full px-8 text-white">
              <h2 className="text-4xl font-bold mb-4">Welcome to DIY Inn</h2>
              <p className="text-lg">Join our creative community and start your DIY journey today!</p>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-1/2 bg-white px-8 py-12">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Create Account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="font-medium text-purple-600 hover:text-purple-500">
                Sign in
              </a>
            </p>
          </div>

          <button className="group relative w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200">
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <FcGoogle className="h-5 w-5" />
            </span>
            Continue with Google
          </button>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <form onSubmit={signupForm.handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div className="relative">
                <label htmlFor="name" className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </label>
                <input
                  type="text"
                  required
                  id="name"
                  value={signupForm.values.name}
                  onChange={signupForm.handleChange}
                  className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Full Name"
                />
                {signupForm.errors.name && signupForm.touched.name && (
                  <div className="text-red-500 text-sm mt-1">{signupForm.errors.name}</div>
                )}
              </div>

              <div className="relative">
                <label htmlFor="email" className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiOutlineMail className="h-5 w-5 text-gray-400" />
                </label>
                <input
                  type="email"
                  id="email"
                  value={signupForm.values.email}
                  onChange={signupForm.handleChange}
                  required
                  className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
                {signupForm.errors.email && signupForm.touched.email && (
                  <div className="text-red-500 text-sm mt-1">{signupForm.errors.email}</div>
                )}
              </div>

              <div className="relative">
                <label htmlFor="password" className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <RiLockPasswordLine className="h-5 w-5 text-gray-400" />
                </label>
                <input
                  type="password"
                  id="password"
                  value={signupForm.values.password}
                  onChange={signupForm.handleChange}
                  required
                  className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                {signupForm.errors.password && signupForm.touched.password && (
                  <div className="text-red-500 text-sm mt-1">{signupForm.errors.password}</div>
                )}
              </div>

              <div className="relative">
                <label htmlFor="confirmPassword" className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <RiLockPasswordLine className="h-5 w-5 text-gray-400" />
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={signupForm.values.confirmPassword}
                  onChange={signupForm.handleChange}
                  required
                  className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                />
                {signupForm.errors.confirmPassword && signupForm.touched.confirmPassword && (
                  <div className="text-red-500 text-sm mt-1">{signupForm.errors.confirmPassword}</div>
                )}
              </div>
              
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                I agree to the{" "}
                <a href="#" className="text-purple-600 hover:text-purple-500">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-purple-600 hover:text-purple-500">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
