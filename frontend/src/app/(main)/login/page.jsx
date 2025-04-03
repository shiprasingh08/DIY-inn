import React from "react";


const Page = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-bl">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden flex">
        {/* Left Side (Image) */}
        <div className="w-1/2 bg-pink-300 relative h-full">
          <img
            src="https://i.pinimg.com/474x/1d/4f/3a/1d4f3a19d39ab2a2d14d8d2e26e38ea1.jpg"
            alt="Signup Illustration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-pink-50 to-transparent" />
        </div>

        {/* Right Side (Form) */}
        <div className="w-1/2 bg-pink-300 p-8 text-white flex flex-col justify-center">
          <h2 className="text-xl font-semibold">
            Hello! <br /> We are glad to see you :)
          </h2>

          {/* Google Signup Button */}
          <button className="mt-4 w-full bg-white text-green-800 py-2 rounded-lg flex items-center justify-center gap-2 font-medium">
            <img
              src="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
              alt="Google Logo"
              className="w-5 h-5"
            />
            Sign up with Google
          </button>

          <div className="text-center my-4 text-sm">Or</div>

          <form>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="p-2 rounded-lg w-full text-gray-800"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="p-2 rounded-lg w-full text-gray-800"
              />
              <input
                type="password"
                placeholder="Password"
                className="p-2 rounded-lg w-full text-gray-800"
              />
              <input
                type="password"
                placeholder="Repeat Password"
                className="p-2 rounded-lg w-full text-gray-800"
              />
            </div>

            <div className="mt-4 flex items-center">
              <input type="checkbox" className="mr-2" />
              <label className="text-sm">
                I agree{" "}
                <a href="#" className="underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button className="mt-4 w-full bg-green-400 py-2 rounded-lg text-green-900 font-semibold">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
