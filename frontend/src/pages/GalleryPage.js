import React from "react";
import ArtworkCards from "../components/ArtworkCards"; // Import the ArtworkCards component

// Simulated artwork data
const artworks = [
  {
    id: 1,
    title: "Abstract Harmony",
    artist: "Jane Doe",
    price: 500,
    image: "/images/nature.jpg",
  },
  {
    id: 2,
    title: "Urban Dreams",
    artist: "John Smith",
    price: 750,
    image: "/images/tajmahal.jpg",
  },
  {
    id: 3,
    title: "Serenity",
    artist: "Emma Wilson",
    price: 600,
    image: "/images/art.jpg",
  },
  {
    id: 4,
    title: "Abstract Harmony",
    artist: "Jane Doe",
    price: 500,
    image: "/images/nature.jpg",
  },
  {
    id: 5,
    title: "Urban Dreams",
    artist: "John Smith",
    price: 750,
    image: "/images/tajmahal.jpg",
  },
  {
    id: 6,
    title: "Serenity",
    artist: "Emma Wilson",
    price: 600,
    image: "/images/artwork3.jpg",
  },
  // Add more artwork entries as needed
];

const GalleryPage = () => {
  return (
    <div className="py-14 px-4 bg-blue-100">
      <h1 className="text-4xl font-bold mb-10 text-center text-blue-400">
        Artify <span className="text-blue-900">Gallery</span>
      </h1>
      <p className="text-md text-gray-700 mb-10 mx-4 text-center">
        Welcome to the Artify Gallery, a vibrant space where creativity knows no
        bounds. Here, you can explore a curated collection of stunning artworks
        from talented artists, each piece telling its unique story. Whether
        you're looking to add to your collection or simply appreciate the beauty
        of art, our gallery offers a diverse range of styles and themes to
        captivate your imagination. Discover the perfect piece that resonates
        with you, and celebrate the power of artistic expression.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {artworks.map((artwork) => (
          <ArtworkCards // Use ArtworkCards component directly
            key={artwork.id}
            imageUrl={artwork.image}
            title={artwork.title}
            artist={artwork.artist}
            price={artwork.price}
          />
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
