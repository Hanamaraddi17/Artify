import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"; // Removed the unused icons

const LoginComponent = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex max-w-5xl mx-auto bg-white my-16 rounded-xl shadow-xl overflow-hidden">
      {/* Login Form */}
      <div className="w-1/2 p-12">
        <h2 className="text-3xl font-bold mb-6 text-blue-400 text-center">
          Log in to <span className="text-blue-900">Artify</span>
        </h2>

        <div className="flex justify-center space-x-4 mb-6">
          <button className="p-2 border rounded-full hover:bg-gray-50">
            <img src="/images/google.png" alt="Google" className="w-6 h-6" />
          </button>
          <button className="p-2 border rounded-full hover:bg-gray-50">
            <img
              src="/images/instagram.png"
              alt="Instagram"
              className="w-6 h-6"
            />
          </button>
          <button className="p-2 border rounded-full hover:bg-gray-50">
            <img
              src="/images/linkedin.png"
              alt="LinkedIn"
              className="w-6 h-6"
            />
          </button>
        </div>

        <p className="text-center text-gray-500 mb-6">
          or use your email account
        </p>

        {/* Rest of the LoginComponent code remains exactly the same */}
        <form className="space-y-6">
          <div className="relative">
            <Mail className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <Lock className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          <div className="text-right">
            <a href="#" className="text-sm text-blue-500 hover:text-blue-600">
              Forgot your password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-full text-white bg-blue-400 hover:bg-blue-500 transition-all duration-300"
          >
            LOG IN
          </button>
        </form>
      </div>
      {/* blue Side Panel */}
      <div className="w-1/2 bg-blue-400 p-12 text-white flex flex-col justify-center items-center">
        <h2 className="text-4xl font-bold mb-4">Hello, Friend!</h2>
        <p className="text-center mb-8">
          Enter your personal details and start journey with us
        </p>
        <button
          onClick={() => (window.location.href = "/signup")}
          className="px-12 py-3 border-2 border-white rounded-full text-white hover:bg-blue-500 transition-all duration-300"
        >
          SIGN UP
        </button>
      </div>
    </div>
  );
};

const SignupComponent = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex max-w-5xl mx-auto bg-white my-16 rounded-xl shadow-xl overflow-hidden">
      {/* blue Side Panel */}
      <div className="w-1/2 bg-blue-400 p-12 text-white flex flex-col justify-center items-center">
        <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
        <p className="text-center mb-8">
          To keep connected with us please login with your personal info
        </p>
        <button
          onClick={() => (window.location.href = "/login")}
          className="px-12 py-3 border-2 border-white rounded-full text-white hover:bg-blue-500 transition-all duration-300"
        >
          LOG IN
        </button>
      </div>

      {/* Signup Form */}
      <div className="w-1/2 p-12">
        <h2 className="text-3xl font-bold mb-6 text-blue-400 text-center">
          Create <span className="text-blue-900">Account</span>
        </h2>

        <div className="flex justify-center space-x-4 mb-6">
          <button className="p-2 border rounded-full hover:bg-gray-50">
            <img src="/images/google.png" alt="Google" className="w-6 h-6" />
          </button>
          <button className="p-2 border rounded-full hover:bg-gray-50">
            <img
              src="/images/instagram.png"
              alt="Instagram"
              className="w-6 h-6"
            />
          </button>
          <button className="p-2 border rounded-full hover:bg-gray-50">
            <img
              src="/images/linkedin.png"
              alt="LinkedIn"
              className="w-6 h-6"
            />
          </button>
        </div>

        <p className="text-center text-gray-500 mb-6">
          or use your email for registration
        </p>

        {/* Rest of the SignupComponent code remains exactly the same */}
        <form className="space-y-6">
          <div className="relative">
            <User className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Name"
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <Mail className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <Lock className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-full text-white bg-blue-400 hover:bg-blue-500 transition-all duration-300"
          >
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );
};

export { LoginComponent, SignupComponent };
