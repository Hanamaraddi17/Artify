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
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Effect to set the token from sessionStorage once on component mount
  useEffect(() => {
    const storedToken = sessionStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []); // Empty dependency array ensures this runs only once

  // Effect to fetch artworks when token is available
  useEffect(() => {
    if (token) {
      fetchArtworks();
      checkArtistStatus();
    }
  }, [token]);

  // Effect to filter artworks based on searchTerm
  useEffect(() => {
    if (Array.isArray(artworks)) {
      const results = artworks.filter(
        (artwork) =>
          artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          artwork.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredArtworks(results);
    } else {
      console.warn("artworks is not an array:", artworks);
      setFilteredArtworks([]); // Reset to empty array to avoid errors
    }
  }, [searchTerm, artworks]);

  const fetchArtworks = async () => {
    try {
      const response = await fetch("https://artifybackend.vercel.app/artworks/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Ensure correct headers
        },
      });

      if (!response.ok) {
        // Handle HTTP errors
        const errorData = await response.json();
        console.error("Error fetching artworks:", errorData);
        // Optionally, set an error state here to display to the user
        setArtworks([]); // Ensure artworks is an array
        return;
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setArtworks(data);
      } else {
        console.error("Unexpected data format:", data);
        setArtworks([]); // Ensure artworks is an array
      }
    } catch (error) {
      console.error("Error fetching artworks:", error);
      setArtworks([]); // Ensure artworks is an array
    }
  };

  const checkArtistStatus = async () => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://artifybackend.vercel.app/artist/check/artist",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error checking artist status:", errorData);
        setIsArtist(false); // Default to false on error
        return;
      }

      const data = await response.json();
      setIsArtist(data.isArtist); // Assuming API returns { isArtist: true/false }
    } catch (error) {
      console.error("Error checking artist status:", error);
      setIsArtist(false); // Default to false on error
    }
  };

  const handleUploadClick = () => {
    if (isArtist) {
      navigate("/uploadArtwork");
    } else {
      setShowModal(true); // Show modal if not an artist
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
        {Array.isArray(filteredArtworks) && filteredArtworks.length > 0 ? (
          filteredArtworks.map((artwork) => (
            <ArtworkCards
              key={artwork.artwork_id}
              artworkId={artwork.artwork_id}
              imageUrl={artwork.image_url}
              title={artwork.title}
              artist={artwork.artist_name}
              price={artwork.price}
              category={artwork.category}
              initialIsLiked={artwork.isLiked} // Ensure backend provides isLiked
              likes={artwork.likes}
              fetchArt={fetchArtworks} // Pass the fetchArtworks function directly
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No artworks found.
          </p>
        )}
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
