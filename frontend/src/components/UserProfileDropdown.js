import React, { useState } from "react";
import {
  User,
  ShoppingCart,
  Heart,
  Clock,
  ChevronDown,
  X,
  LogOut,
} from "lucide-react";

const UserProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const openModal = (content) => {
    setModalContent(content);
    setIsOpen(false); // Close the dropdown when an item is clicked
  };

  const closeModal = () => {
    setModalContent(null);
  };

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
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 animate-fadeIn">
          <button
            onClick={() => openModal("personal")}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            <User size={16} className="inline-block mr-2" /> Personal Info
          </button>
          <button
            onClick={() => openModal("orders")}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            <Clock size={16} className="inline-block mr-2" /> Order History
          </button>
          <button
            onClick={() => openModal("cart")}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            <ShoppingCart size={16} className="inline-block mr-2" /> Cart Items
          </button>
          <button
            onClick={() => openModal("wishlist")}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            <Heart size={16} className="inline-block mr-2" /> Wishlist
          </button>
          <button
            onClick={toggleDropdown}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            <LogOut size={16} className="inline-block mr-2" /> Logout
          </button>
        </div>
      )}

      {modalContent && (
        <div className="fixed inset-0 flex place-items-start justify-end z-50 mt-20">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
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
            <p>{getModalContent(modalContent)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

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
    default:
      return "";
  }
};

const getModalContent = (content) => {
  // This function would return the appropriate content for each modal type
  // For now, we'll just return placeholder text
  return `This is the ${content} information. In a real application, this would be populated with user data.`;
};

export default UserProfileDropdown;
