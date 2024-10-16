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
      navigate("/login"); // Redirect to the Home page after logout
      window.location.reload();
    }, 2000);
  };

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

        {/* Sign up/Logout and Profile buttons */}
        <div className="space-x-4 flex items-center">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-100 text-red-500 px-6 py-2 rounded-full hover:bg-red-200 transition-colors duration-300"
            >
              Log out
            </button>
          ) : (
            <a
              href="/login"
              className="bg-blue-100 text-blue-500 px-6 py-2 rounded-full hover:bg-blue-200 transition-colors duration-300"
            >
              Log in
            </a>
          )}
          {isLoggedIn && <UserProfileDropdown />}
        </div>
      </div>

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
