import React, { useState, useEffect } from "react";
import { Trash, Share2, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MyArtworksPage = () => {
  const [artworks, setArtworks] = useState([]);
  const [artistDetails, setArtistDetails] = useState(null);
  const [token, setToken] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
    } else {
      // Redirect to login if no token found
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (token) {
      fetchArtistArtworks();
    }
  }, [token]);

  const fetchArtistArtworks = async () => {
    try {
      const response = await fetch(`http://localhost:5000/artist/myartworks`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Error fetching artworks");
        return;
      }

      const data = await response.json();
      setArtistDetails(data);
      setArtworks(data.artworks);
    } catch (error) {
      console.error("Error fetching artworks:", error);
    }
  };

  const handleDeleteArtwork = async (artworkId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this artwork?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/artworks/delete/${artworkId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setArtworks(
          artworks.filter((artwork) => artwork.artwork_id !== artworkId)
        );
      } else {
        console.error("Error deleting artwork");
        alert("Failed to delete artwork. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting artwork:", error);
      alert("An error occurred while deleting the artwork.");
    }
  };

  const handleShareArtwork = (title, url) => {
    const shareData = {
      title,
      text: `Check out this artwork: ${title}`,
      url: `http://localhost:5000/${url.replace(/\\/g, "/")}`,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log("Artwork shared successfully"))
        .catch((error) => console.error("Error sharing artwork:", error));
    } else {
      // Fallback for browsers that do not support the Web Share API
      alert("Share functionality is not supported in your browser.");
    }
  };

  // Filter artworks based on search term
  const filteredArtworks = artworks.filter((artwork) =>
    artwork.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-14 px-4 bg-gradient-to-r from-blue-100 to-indigo-100 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-blue-400 ">
        My <span className="text-indigo-900">Artworks</span>
      </h1>
      <p className="text-md text-gray-700 mb-10 mx-4 text-center">
        Explore the vibrant world of creativity on my Artworks page, where each
        piece tells a unique story. Discover a diverse collection of original
        artworks, showcasing my artistic journey and passion for expression.
        From intricate details to bold colors, immerse yourself in the beauty of
        art and find inspiration in every creation.
      </p>
      {/* Artist Profile Information */}
      {/* {artistDetails && (
        <div className="flex justify-center items-center">
          <div className="bg-white p-6 rounded-3xl shadow-2xl mb-8 w-3/4 transform hover:scale-105 transition-transform duration-500 ">
            <img
              className="w-40 h-40 object-cover rounded-full mx-auto border-4 border-indigo-500"
              src={`http://localhost:5000/${artistDetails.photo.replace(
                /\\/g,
                "/"
              )}`}
              alt={artistDetails.fullname}
              loading="lazy"
            />
            <h2 className="font-bold text-2xl mt-4 text-center text-indigo-700">
              {artistDetails.fullname}
            </h2>
            <p className="text-gray-700 text-center mt-2">
              {artistDetails.biography}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4 text-center">
              <p className="text-blue-600 font-semibold">
                Total Artworks: {artistDetails.total_artworks}
              </p>
              <p className="text-gray-600">Age: {artistDetails.age}</p>
              <p className="text-gray-600">Email: {artistDetails.email}</p>
              <p className="text-gray-600">Phone: {artistDetails.phone}</p>
              <p className="text-gray-600 col-span-2">
                Address: {artistDetails.address}
              </p>
            </div>
          </div>
        </div>
      )} */}

      {/* Search input */}
      <div className="max-w-md mx-auto mb-10">
        <div className="relative">
          <input
            type="text"
            placeholder="Search my artworks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-full border-2 border-indigo-300 focus:outline-none focus:border-indigo-500 transition-all duration-300 shadow-lg"
          />
          <Search
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-indigo-500"
            size={24}
          />
        </div>
      </div>

      {/* Artworks Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArtworks.length > 0 ? (
          filteredArtworks.map((artwork) => (
            <div
              key={artwork.artwork_id}
              className="max-w-sm rounded-3xl overflow-hidden shadow-lg bg-white transition-transform duration-700 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl relative group"
            >
              {/* Artwork Image */}
              <img
                className="w-full h-64 object-cover"
                src={`http://localhost:5000/${artwork.image_url.replace(
                  /\\/g,
                  "/"
                )}`}
                alt={artwork.title}
                loading="lazy"
              />

              {/* Artwork Details */}
              <div className="px-6 py-4">
                <h2 className="font-bold text-2xl mb-2 text-blue-950">
                  {artwork.title}
                </h2>
                <p className="text-gray-700 mb-2">{artwork.description}</p>
                <p className="text-orange-400 font-semibold text-xl">
                  ₹{Number(artwork.price).toLocaleString()}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="px-6 pb-6 flex justify-between space-x-2">
                {/* Delete Button */}
                <button
                  className="flex-1 py-2 bg-red-500 text-white rounded-md transition-all duration-300 ease-in-out transform hover:bg-red-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 flex items-center justify-center space-x-2 group"
                  onClick={() => handleDeleteArtwork(artwork.artwork_id)}
                  aria-label="Delete Artwork"
                >
                  <Trash size={18} />
                  <span>Delete</span>
                </button>
                {/* Share Button */}
                <button
                  className="flex-1 py-2 bg-green-500 text-white rounded-md transition-all duration-300 ease-in-out transform hover:bg-green-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 flex items-center justify-center space-x-2 group"
                  onClick={() =>
                    handleShareArtwork(artwork.title, artwork.image_url)
                  }
                  aria-label="Share Artwork"
                >
                  <Share2 size={18} />
                  <span>Share</span>
                </button>
              </div>

              {/* Blue Line Transition */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform scale-x-0 origin-center transition-transform duration-700 group-hover:scale-x-100"></div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No artworks found.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyArtworksPage;
