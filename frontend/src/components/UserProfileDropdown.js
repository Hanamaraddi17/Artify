import React, { useState, useEffect } from "react";
import {
  User,
  ShoppingCart,
  Heart,
  Clock,
  ChevronDown,
  X,
  LogOut,
  Image, // Importing Image icon for "My Artworks"
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Importing Modal Components
import PersonalInfoModal from "../pages/PersonalInfoModal";
import MyArtworksModal from "../pages/MyArtworksModal";
import OrderHistoryModal from "../pages/OrderHistoryModal";
import CartItemsModal from "../pages/CartItemsModal";
import WishlistModal from "../pages/WishlistModal";

const UserProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isArtist, setIsArtist] = useState(false); // State to track if user is an artist
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const openModal = (content) => {
    setModalContent(content);
    setIsOpen(false); // Close the dropdown when an item is clicked
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    setShowLogoutModal(true); // Show logout modal
    setTimeout(() => {
      setShowLogoutModal(false); // Hide modal after 2 seconds
      navigate("/login"); // Redirect to the Login page after logout
      window.location.reload();
    }, 2000);
  };

  // useEffect to check if the user is an artist
  useEffect(() => {
    const checkIfArtist = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const response = await fetch(
          "http://localhost:5000/artist/check/artist",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setIsArtist(data.isArtist); // Assuming API returns { isArtist: true/false }
        } else {
          console.error("Failed to fetch artist status.");
          setIsArtist(false); // Default to false on error
        }
      } catch (error) {
        console.error("Error fetching artist status:", error);
        setIsArtist(false); // Default to false on error
      }
    };

    checkIfArtist();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-1 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
      >
        <User size={20} />
        <span>Profile</span>
        <ChevronDown
          size={16}
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 animate-fadeIn">
          <button
            onClick={() => openModal("personal")}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            <User size={16} className="inline-block mr-2" /> Personal Info
          </button>

          {/* Conditionally render "My Artworks" if the user is an artist */}
          {isArtist && (
            <button
              onClick={() => openModal("myArtworks")}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              <Image size={16} className="inline-block mr-2" /> My Artworks
            </button>
          )}

          <button
            onClick={() => openModal("orders")}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            <Clock size={16} className="inline-block mr-2" /> Order History
          </button>
          <button
            onClick={() => openModal("cart")}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            <ShoppingCart size={16} className="inline-block mr-2" /> Cart Items
          </button>
          <button
            onClick={() => openModal("wishlist")}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            <Heart size={16} className="inline-block mr-2" /> Wishlist
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            <LogOut size={16} className="inline-block mr-2" /> Logout
          </button>
        </div>
      )}

      {modalContent && (
        <div className="fixed right-0 top-16 mt-2 w-96 bg-white rounded-lg shadow-xl z-50 animate-fadeIn overflow-y-auto max-h-96">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {getModalTitle(modalContent)}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div>{getModalComponent(modalContent)}</div>
          </div>
        </div>
      )}

      {modalContent && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeModal}
        />
      )}

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-blue-900 font-bold">Logged out successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Function to get modal titles based on content
const getModalTitle = (content) => {
  switch (content) {
    case "personal":
      return "Personal Information";
    case "orders":
      return "Order History";
    case "cart":
      return "Cart Items";
    case "wishlist":
      return "Wishlist";
    case "myArtworks":
      return "My Artworks";
    default:
      return "";
  }
};

// Function to get modal components based on content type
const getModalComponent = (content) => {
  switch (content) {
    case "personal":
      return <PersonalInfoModal />;
    case "orders":
      return <OrderHistoryModal />;
    case "cart":
      return <CartItemsModal />;
    case "wishlist":
      return <WishlistModal />;
    case "myArtworks":
      return <MyArtworksModal />;
    default:
      return null;
  }
};

export default UserProfileDropdown;
