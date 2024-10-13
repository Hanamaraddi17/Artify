import React, { useState, useEffect } from "react";
import ArtworkCards from "../components/ArtworkCards";
import { Search, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GalleryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
  });
  const [token, setToken] = useState(""); // Initialize token as an empty string
  const [isArtist, setIsArtist] = useState(false); // State to track if user is an artist
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the token from local storage
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
    }

    fetchArtworks(); // Fetch artworks after setting the token
    checkArtistStatus(); // Check if the user is an artist
  }, [token]);

  useEffect(() => {
    const results = artworks.filter(
      (artwork) =>
        artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artwork.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArtworks(results);
  }, [searchTerm, artworks]);

  const fetchArtworks = async () => {
    try {
      const response = await fetch("http://localhost:5000/artworks/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setArtworks(data);
    } catch (error) {
      console.error("Error fetching artworks:", error);
    }
  };

  const checkArtistStatus = async () => {
    if (!token) return;
    try {
      const response = await fetch(
        "http://localhost:5000/artist/check/artist",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setIsArtist(data.isArtist); // Assuming API returns { isArtist: true/false }
    } catch (error) {
      console.error("Error checking artist status:", error);
    }
  };

  const handleUploadClick = () => {
    if (isArtist) {
      navigate("/uploadArtwork");
    } else {
      setShowModal(true); // Show modal if not an artist
    }
  };

  const handleLikeArtwork = async (artworkId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/artworks/${artworkId}/like`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        alert("Artwork liked successfully!");
        fetchArtworks(); // Refresh artworks list to update likes
      } else {
        alert("Failed to like artwork.");
      }
    } catch (error) {
      console.error("Error liking artwork:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="py-14 px-4 bg-blue-100">
      <h1 className="text-4xl font-bold mb-10 text-center text-blue-400">
        Artify <span className="text-blue-900">Gallery</span>
      </h1>
      <p className="text-md text-gray-700 mb-10 mx-4 text-center">
        Welcome to the Artify Gallery, a vibrant space where creativity knows no
        bounds. Here, you can explore a curated collection of stunning artworks
        from talented artists, each piece telling its own unique story. Whether
        you're looking to add to your collection or simply appreciate the beauty
        of art, our gallery offers a diverse range of styles and themes to
        captivate your imagination. Discover the perfect piece that resonates
        with you, and celebrate the power of artistic expression.
      </p>

      {/* Flex container for Search and Upload Button */}
      <div className="flex justify-between items-center max-w-4xl mx-auto mb-8">
        {/* Search input */}
        <div className="relative w-3/4">
          <input
            type="text"
            placeholder="Search by title or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-full border-2 border-blue-300 focus:outline-none focus:border-blue-500 transition-all duration-300"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
        </div>

        {/* Upload Button for Artists */}
        <button
          onClick={handleUploadClick}
          className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-700 transition-all duration-300"
        >
          <Upload size={20} className="mr-2" />
          Upload Artwork
        </button>
      </div>

      {/* Artwork Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArtworks.map((artwork) => (
          <ArtworkCards
            key={artwork.artwork_id}
            imageUrl={artwork.image_url}
            title={artwork.title}
            artist={artwork.artist_name}
            price={artwork.price}
            category={artwork.category}
            onLike={() => handleLikeArtwork(artwork.artwork_id)}
          />
        ))}
      </div>

      {/* Modal for Non-Artists */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg text-center">
              Join as an artist to upload your artworks!
            </p>
            <div className="flex justify-center mt-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                onClick={closeModal}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
