import React from "react";
import { Heart, Share2, ShoppingCart, CreditCard } from "lucide-react";

const ArtworkCards = ({ imageUrl, title, artist, price, category, onLike }) => {
  // Correct the image URL format
  const formattedImageUrl = imageUrl
    ? `http://localhost:5000/${imageUrl.replace(/\\/g, "/")}` // Replace backslashes with forward slashes
    : "/images/default.jpeg"; // Provide a default image if photo is null

  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white transition-all duration-700 ease-in-out hover:-translate-y-4 hover:shadow-2xl relative group">
      <img className="w-full h-64 object-cover" src={formattedImageUrl} alt={title} /> 
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2">{title}</h2>
        <p className="text-gray-700 text-base mb-2">by {artist}</p>
        <p className="text-blue-600 font-semibold">₹{price.toLocaleString()}</p>
      </div>
      <div className="px-6 pt-4 pb-2 flex justify-between items-center">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 mr-2 mb-2 transition-all duration-300 hover:bg-gray-300">
          #{category}
        </span>
        <div className="flex space-x-2">
          <button
            aria-label="Like artwork"
            onClick={onLike}
            className="w-10 h-10 flex items-center justify-center bg-red-100 rounded-full transition-all duration-300 hover:bg-red-500 group"
          >
            <Heart size={25} className="text-red-500 group-hover:text-white" />
          </button>
          <button
            aria-label="Share artwork"
            className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-full transition-all duration-300 hover:bg-green-500 group"
          >
            <Share2 size={25} className="text-green-500 group-hover:text-white" />
          </button>
        </div>
      </div>
      <div className="px-6 pb-6 flex justify-between space-x-2">
        <button
          aria-label="Add to cart"
          className="flex-1 py-2 bg-blue-500 text-white rounded-md transition-all duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 flex items-center justify-center space-x-2 group"
        >
          <ShoppingCart
            size={18}
            className="transition-transform duration-300 group-hover:rotate-12"
          />
          <span>Add to Cart</span>
        </button>
        <button
          aria-label="Buy now"
          className="flex-1 py-2 bg-purple-500 text-white rounded-md transition-all duration-300 ease-in-out transform hover:bg-purple-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 flex items-center justify-center space-x-2 group"
        >
          <CreditCard
            size={18}
            className="transition-transform duration-300 group-hover:rotate-12"
          />
          <span>Buy Now</span>
        </button>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out" />
    </div>
  );
};

export default ArtworkCards;
