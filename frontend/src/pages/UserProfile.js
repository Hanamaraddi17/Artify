import React, { useState } from "react";
import { User, ShoppingCart, Heart, Clock, ChevronDown, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const UserProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const openModal = (content) => {
    setModalContent(content);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200"
      >
        <User size={20} />
        <span>Profile</span>
        <ChevronDown
          size={16}
          className={`transform transition-transform duration-200 ${
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
        </div>
      )}

      <Dialog open={modalContent !== null} onOpenChange={closeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{getModalTitle(modalContent)}</DialogTitle>
            <DialogDescription>
              {getModalContent(modalContent)}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
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
