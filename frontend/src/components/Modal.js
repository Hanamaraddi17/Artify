import React from "react";
import { X } from "lucide-react";

const Modal = ({ content, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{content}</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="mt-4">
          {/* This is where the specific content (personal info, orders, cart, wishlist) would be displayed */}
          <p>This is the {content} modal.</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
