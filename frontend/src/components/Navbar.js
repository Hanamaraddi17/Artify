import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Get the current path
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="px-4 py-1 flex justify-between items-center">
        <a
          href="/"
          className="flex items-center text-2xl font-bold text-gray-800 "
        >
          <img src="/images/logo.png" alt="Artify Logo" className="h-16 w-20" />
          Artify
        </a>
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } md:flex space-x-6`}
        >
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
          <div className="relative group">
            <a
              href="#"
              className={`${
                currentPath.startsWith("/category")
                  ? "text-blue-500"
                  : "text-gray-600"
              } hover:text-blue-500 flex items-center`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Categories <ChevronDown className="ml-1 w-4 h-4" />
            </a>
            {isDropdownOpen && (
              <div className="absolute mt-2 py-2 w-48 bg-white border rounded-md shadow-lg">
                <a
                  href="/category/painting"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Paintings
                </a>
                <a
                  href="/category/sculpture"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Sculptures
                </a>
                <a
                  href="/category/photography"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Photography
                </a>
              </div>
            )}
          </div>
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
        <div className="space-x-4">
          <a
            href="/login"
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
          >
            Login
          </a>
          <a
            href="/signup"
            className="bg-blue-100 text-blue-500 px-6 py-2 rounded-full hover:bg-blue-200 transition-colors duration-300"
          >
            Signup
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
