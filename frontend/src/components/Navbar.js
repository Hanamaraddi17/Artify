import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import UserProfileDropdown from "./UserProfileDropdown";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State for logout modal
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  // Check if user is logged in by checking auth token in local storage
  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken");
    setIsLoggedIn(!!authToken);
  }, []);

  // Handle logout
  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("username");
    setIsLoggedIn(false);
    setShowLogoutModal(true); // Show logout modal
    setTimeout(() => {
      setShowLogoutModal(false); // Hide modal after 2 seconds
      navigate("/login"); // Redirect to the Login page after logout
      window.location.reload();
    }, 2000);
  };

  // Function to close mobile menu when a link is clicked
  const handleLinkClick = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand name */}
          <div className="flex items-center">
            <a
              href="/"
              className="flex items-center text-2xl font-bold text-blue-900"
            >
              <img
                src="/images/logo.png"
                alt="Artify Logo"
                className="h-14 w-16 mr-2"
              />
              Artify
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-6 items-center">
            <a
              href="/"
              onClick={handleLinkClick}
              className={`${
                currentPath === "/" ? "text-blue-500" : "text-gray-600"
              } hover:text-blue-500`}
            >
              Home
            </a>
            <a
              href="/gallery"
              onClick={handleLinkClick}
              className={`${
                currentPath === "/gallery" ? "text-blue-500" : "text-gray-600"
              } hover:text-blue-500`}
            >
              Gallery
            </a>
            <a
              href="/artists"
              onClick={handleLinkClick}
              className={`${
                currentPath === "/artists" ? "text-blue-500" : "text-gray-600"
              } hover:text-blue-500`}
            >
              Artists
            </a>
            <a
              href="/about"
              onClick={handleLinkClick}
              className={`${
                currentPath === "/about" ? "text-blue-500" : "text-gray-600"
              } hover:text-blue-500`}
            >
              About Us
            </a>
            <a
              href="/contact"
              onClick={handleLinkClick}
              className={`${
                currentPath === "/contact" ? "text-blue-500" : "text-gray-600"
              } hover:text-blue-500`}
            >
              Contact
            </a>
          </div>

          {/* Sign up/Logout and Profile buttons */}
          <div className="hidden md:flex space-x-4 items-center">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-100 text-red-500 px-4 py-2 rounded-full hover:bg-red-200 transition-colors duration-300"
              >
                Log out
              </button>
            ) : (
              <a
                href="/login"
                className="bg-blue-100 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-200 transition-colors duration-300"
              >
                Log in
              </a>
            )}
            {isLoggedIn && <UserProfileDropdown />}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="/"
              onClick={handleLinkClick}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                currentPath === "/" ? "text-blue-500" : "text-gray-600"
              } hover:text-blue-500 hover:bg-gray-50`}
            >
              Home
            </a>
            <a
              href="/gallery"
              onClick={handleLinkClick}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                currentPath === "/gallery" ? "text-blue-500" : "text-gray-600"
              } hover:text-blue-500 hover:bg-gray-50`}
            >
              Gallery
            </a>
            <a
              href="/artists"
              onClick={handleLinkClick}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                currentPath === "/artists" ? "text-blue-500" : "text-gray-600"
              } hover:text-blue-500 hover:bg-gray-50`}
            >
              Artists
            </a>
            <a
              href="/about"
              onClick={handleLinkClick}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                currentPath === "/about" ? "text-blue-500" : "text-gray-600"
              } hover:text-blue-500 hover:bg-gray-50`}
            >
              About Us
            </a>
            <a
              href="/contact"
              onClick={handleLinkClick}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                currentPath === "/contact" ? "text-blue-500" : "text-gray-600"
              } hover:text-blue-500 hover:bg-gray-50`}
            >
              Contact
            </a>

            {/* Sign up/Logout and Profile buttons in mobile menu */}
            <div className="mt-3 border-t border-gray-200 pt-4">
              <div className="flex items-center px-5">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-100 text-red-500 px-4 py-2 rounded-full hover:bg-red-200 transition-colors duration-300"
                  >
                    Log out
                  </button>
                ) : (
                  <a
                    href="/login"
                    onClick={handleLinkClick}
                    className="w-full bg-blue-100 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-200 transition-colors duration-300 text-center"
                  >
                    Log in
                  </a>
                )}
              </div>
              {isLoggedIn && (
                <div className="mt-3 px-5">
                  <UserProfileDropdown />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-blue-900 font-bold">Logged out successfully!</p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
