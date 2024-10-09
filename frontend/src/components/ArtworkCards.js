import React from "react";
import { Heart, Share2 } from "lucide-react";

const ArtworkCards = ({ imageUrl, title, artist, price }) => {
  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white transition-all duration-700 ease-in-out hover:-translate-y-4 hover:shadow-2xl relative group">
      <img className="w-full h-64 object-cover" src={imageUrl} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base mb-2">by {artist}</p>
        <p className="text-blue-600 font-semibold">₹{price}</p>
      </div>
      <div className="px-6 pt-4 pb-2 flex justify-between items-center">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #artwork
        </span>
        <div className="flex space-x-2">
          <button className="w-8 h-8 flex items-center justify-center bg-red-100 rounded-full transition-all duration-300 hover:bg-red-500 group">
            <Heart size={20} className="text-red-500 group-hover:text-white" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center bg-green-100 rounded-full transition-all duration-300 hover:bg-green-500 group">
            <Share2
              size={20}
              className="text-green-500 group-hover:text-white"
            />
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out" />
    </div>
  );
};

export default ArtworkCards;
