import React, { useState, useEffect } from "react";
import ArtworkCards from "../components/ArtworkCards";
import { Search, Upload } from "lucide-react";

// Simulated artwork data (expanded with categories)
const artworks = [
  {
    id: 1,
    title: "Abstract Harmony",
    artist: "Jane Doe",
    price: 500,
    image: "/images/nature.jpg",
    category: "Abstract",
  },
  {
    id: 2,
    title: "Urban Dreams",
    artist: "John Smith",
    price: 750,
    image: "/images/tajmahal.jpg",
    category: "Urban",
  },
  {
    id: 3,
    title: "Serenity",
    artist: "Emma Wilson",
    price: 600,
    image: "/images/art.jpg",
    category: "Landscape",
  },
  // ... (other artwork entries)
];

const GalleryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArtworks, setFilteredArtworks] = useState(artworks);

  useEffect(() => {
    const results = artworks.filter(
      (artwork) =>
        artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artwork.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArtworks(results);
  }, [searchTerm]);

  // Placeholder function for handling artwork upload
  const handleUploadClick = () => {
    console.log("Artwork upload functionality coming soon!");
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
            key={artwork.id}
            imageUrl={artwork.image}
            title={artwork.title}
            artist={artwork.artist}
            price={artwork.price}
            category={artwork.category}
          />
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
