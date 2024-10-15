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
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

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
    try {
      console.log("artwork id:", artworkId);
      const response = await fetch(`http://localhost:5000/artworks/delete/${artworkId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setArtworks(artworks.filter((artwork) => artwork.artwork_id !== artworkId));
      } else {
        console.error("Error deleting artwork");
      }
    } catch (error) {
      console.error("Error deleting artwork:", error);
    }
  };

  const handleShareArtwork = (title, url) => {
    const shareData = {
      title,
      text: `Check out this artwork: ${title}`,
      url: `http://localhost:5000/${url.replace(/\\/g, "/")}`,
    };

    navigator.share(shareData).catch((error) => {
      console.error("Error sharing artwork:", error);
    });
  };

  // Filter artworks based on search term
  const filteredArtworks = artworks.filter(artwork =>
    artwork.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-14 px-4 bg-blue-100">
      <h1 className="text-4xl font-bold mb-10 text-center text-blue-400">
        My <span className="text-blue-900">Artworks</span>
      </h1>

      {/* Artist Profile Information */}
      {/* {artistDetails && (
        <div className="bg-white p-4 rounded shadow mb-6">
          <img
            className="w-32 h-32 object-cover rounded-full mx-auto"
            src={`http://localhost:5000/${artistDetails.photo.replace(/\\/g, "/")}`}
            alt={artistDetails.fullname}
          />
          <h2 className="font-bold text-xl mt-2 text-center">{artistDetails.fullname}</h2>
          <p className="text-gray-600 text-center">{artistDetails.biography}</p>
          <p className="text-blue-600 font-semibold mt-2">Total Artworks: {artistDetails.total_artworks}</p>
          <p className="text-gray-600">Age: {artistDetails.age}</p>
          <p className="text-gray-600">Email: {artistDetails.email}</p>
          <p className="text-gray-600">Phone: {artistDetails.phone}</p>
          <p className="text-gray-600">Address: {artistDetails.address}</p>
        </div>
      )} */}

      {/* Search input */}
      <div className="relative max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Search my artworks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-full border-2 border-blue-300 focus:outline-none focus:border-blue-500 transition-all duration-300"
        />
        <Search
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-500"
          size={20}
        />
      </div>


      {/* Artworks Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArtworks.length > 0 ? (
          filteredArtworks.map((artwork) => (
            <div key={artwork.artwork_id} className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white transition-all duration-700 ease-in-out">
              <img
                className="w-full h-64 object-cover"
                src={`http://localhost:5000/${artwork.image_url.replace(/\\/g, "/")}`}
                alt={artwork.title}
              />
              <div className="px-6 py-4">
                <h2 className="font-bold text-xl mb-2">{artwork.title}</h2>
                <p className="text-gray-600">{artwork.description}</p>
                <p className="text-blue-600 font-semibold mt-2">₹{artwork.price}</p>
              </div>
              <div className="flex justify-between px-6 pb-6">
                <button
                 aria-label="Delete artwork"  className= "w-16 h-16 flex items-center justify-center bg-red-100 rounded-full transition-all duration-300 hover:bg-red-500 "
                  onClick={() => handleDeleteArtwork(artwork.artwork_id)}
                >
                  <Trash size={30} className="text-red-500 hover:text-white group:" />
                </button>
                <button onClick={() => handleShareArtwork(artwork.title, artwork.image_url)}
                  aria-label="Share artwork"
                  className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full transition-all duration-300 hover:bg-green-500"
                >
                  <Share2 size={30} className="text-green-500 hover:text-white group:" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No artworks found.</p>
        )}
      </div>
    </div>
  );
};

export default MyArtworksPage;
