import React, { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

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
              activeLink === "/" ? "text-blue-500" : "text-gray-600"
            } hover:text-blue-500`}
            onClick={() => handleLinkClick("/")}
          >
            Home
          </a>
          <a
            href="/gallery"
            className={`${
              activeLink === "/gallery" ? "text-blue-500" : "text-gray-600"
            } hover:text-blue-500`}
            onClick={() => handleLinkClick("/gallery")}
          >
            Gallery
          </a>
          <a
            href="/artists"
            className={`${
              activeLink === "/artists" ? "text-blue-500" : "text-gray-600"
            } hover:text-blue-500`}
            onClick={() => handleLinkClick("/artists")}
          >
            Artists
          </a>
          <div className="relative group">
            <a
              href="#"
              className={`${
                activeLink === "categories" ? "text-blue-500" : "text-gray-600"
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
                  onClick={() => handleLinkClick("categories")}
                >
                  Paintings
                </a>
                <a
                  href="/category/sculpture"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={() => handleLinkClick("categories")}
                >
                  Sculptures
                </a>
                <a
                  href="/category/photography"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={() => handleLinkClick("categories")}
                >
                  Photography
                </a>
              </div>
            )}
          </div>
          <a
            href="/about"
            className={`${
              activeLink === "/about" ? "text-blue-500" : "text-gray-600"
            } hover:text-blue-500`}
            onClick={() => handleLinkClick("/about")}
          >
            About Us
          </a>
          <a
            href="/contact"
            className={`${
              activeLink === "/contact" ? "text-blue-500" : "text-gray-600"
            } hover:text-blue-500`}
            onClick={() => handleLinkClick("/contact")}
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
