// src/components/modals/MyArtworksModal.js

import React, { useState, useEffect } from "react";
import { Image, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MyArtworksModal = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyArtworks = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("No authentication token found.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/artworks/my", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setArtworks(data);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch your artworks.");
        }
      } catch (err) {
        setError("An error occurred while fetching your artworks.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyArtworks();
  }, []);

  const handleAddArtwork = () => {
    navigate("/uploadArtwork");
  };

  if (loading) {
    return <p className="text-center">Loading your artworks...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Image size={20} className="text-blue-500 mr-2" /> My Artworks
        </h3>
        <button
          onClick={handleAddArtwork}
          className="flex items-center px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300"
        >
          <Plus size={16} className="mr-1" /> Add Artwork
        </button>
      </div>
      {artworks.length === 0 ? (
        <p className="text-center">You have not uploaded any artworks yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {artworks.map((artwork) => (
            <div
              key={artwork.artwork_id}
              className="flex items-center space-x-4"
            >
              <img
                src={`http://localhost:5000/${artwork.image_url.replace(
                  /\\/g,
                  "/"
                )}`}
                alt={artwork.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h4 className="text-md font-semibold">{artwork.title}</h4>
                <p className="text-sm text-gray-600">
                  ₹{artwork.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyArtworksModal;
