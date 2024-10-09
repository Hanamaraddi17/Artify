import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";

const LoginComponent = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="max-w-md mx-auto bg-white mt-32 p-8 rounded-xl shadow-xl transition-all duration-700 ease-in-out hover:-translate-y-1 hover:shadow-2xl relative group">
      <h2 className="text-3xl font-bold mb-6 text-blue-400 text-center">
        Log in to <span className="text-blue-900">Artify</span>
      </h2>
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
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Forgot password?
            </a>
          </div>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Log in
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </form>
    </div>
  );
};

const SignupComponent = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="max-w-md mx-auto bg-white p-8 mt-24 rounded-xl shadow-xl transition-all duration-700 ease-in-out hover:-translate-y-1 hover:shadow-2xl relative group">
      <h2 className="text-3xl font-bold mb-6 text-blue-400 text-center">
        Sign up for <span className="text-blue-900">Artify</span>
      </h2>
      <form className="space-y-6">
        <div className="relative">
          <User className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Full Name"
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
        <div className="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
            I agree to the{" "}
            <a href="#" className="text-blue-600 hover:text-blue-500">
              Terms and Conditions
            </a>
          </label>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sign up
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </form>
    </div>
  );
};

export { LoginComponent, SignupComponent };
