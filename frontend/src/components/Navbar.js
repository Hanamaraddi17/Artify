import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import UserProfileDropdown from "./UserProfileDropdown"; // Import the new component

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get the current path
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="px-4 py-1 flex justify-between items-center">
        {/* Logo and brand name */}
        <a
          href="/"
          className="flex items-center text-2xl font-bold text-blue-900"
        >
          <img
            src="/images/logo.png"
            alt="Artify Logo"
            className="h-16 w-20 mr-2"
          />
          Artify
        </a>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Navigation links */}
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } md:flex space-x-6`}
        >
          {/* ... (rest of the navigation links remain unchanged) ... */}
          <a
            href="/"
            className={`${
              currentPath === "/" ? "text-blue-500" : "text-gray-600"
            } hover:text-blue-500`}
          >
            Home
          </a>
          <a
            href="/gallery"
            className={`${
              currentPath === "/gallery" ? "text-blue-500" : "text-gray-600"
            } hover:text-blue-500`}
          >
            Gallery
          </a>
          <a
            href="/artists"
            className={`${
              currentPath === "/artists" ? "text-blue-500" : "text-gray-600"
            } hover:text-blue-500`}
          >
            Artists
          </a>

          <a
            href="/about"
            className={`${
              currentPath === "/about" ? "text-blue-500" : "text-gray-600"
            } hover:text-blue-500`}
          >
            About Us
          </a>
          <a
            href="/contact"
            className={`${
              currentPath === "/contact" ? "text-blue-500" : "text-gray-600"
            } hover:text-blue-500`}
          >
            Contact
          </a>
        </div>

        {/* Sign up and Profile buttons */}
        <div className="space-x-4 flex items-center">
          <a
            href="/signup"
            className="bg-blue-100 text-blue-500 px-6 py-2 rounded-full hover:bg-blue-200 transition-colors duration-300"
          >
            Sign Up
          </a>
          <UserProfileDropdown />{" "}
          {/* Replace the Profile button with UserProfileDropdown */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
