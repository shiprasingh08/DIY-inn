
import Link from 'next/link'
import React from 'react'

const Signup = () => {
  return (
    <>
          <div div className="h-[100vh] flex space-evenly items-center w-full bg-cover bg-center"
        style={{ backgroundImage: `url('https://i.pinimg.com/736x/86/de/ae/86deaee680e942b739f293c0718cad9f.jpg')` }}  >
      <div className="flex max-w-2xl w-full  gap-4 custom-shadow justify-center items-center mx-auto">
        <div className="w-1/2 bg-[#fceee6] p-8 flex flex-col items-center rounded-xl justify-center text-center">
          <h1 className="text-3xl font-semibold mb-4">Welcome to DIY.</h1>
          <img
            src="https://i.pinimg.com/236x/8b/b5/f4/8bb5f492daee404e4ee2e9fc8524702a.jpg"
            alt="Image"
            className="max-w-full mb-6"
          />
          <p className="text-gray-600 mb-6 flex justify-center items-center ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, officia?
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Get Started
          </button>
        </div>
        <div className="w-1/2 bg-white p-8 flex flex-col justify-center rounded-xl ">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReifEhDM2UVScP0KDPs5y9r2zI6M2inQm0Og&s"
            alt="Hanging Plants"
            className="max-w-full mb-6"
          />
          <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded p-2 mb-4 w-full"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded p-2 mb-4 w-full"
          />
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full">
            Next
          </button>
          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <a href="#" className="text-green-500">
              Sign in
            </a>
          </p>
        </div>
      </div>
      </div>
    </>
  )
}

export default Signup;
