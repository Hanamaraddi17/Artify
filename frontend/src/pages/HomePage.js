// pages/HomePage.js
import React from "react";
import ArtworkCard from "../components/ArtworkCards";

function HomePage() {
  const featuredArtworks = [
    {
      id: 1,
      title: "Sunset Dreams",
      artist: "Jane Doe",
      imageUrl: "/images/sunset.jpg",
      price: 1200,
    },
    {
      id: 2,
      title: "Abstract Thoughts",
      artist: "John Smith",
      imageUrl: "/images/sunset1.jpg",
      price: 950,
    },
    {
      id: 3,
      title: "King and Hitman",
      artist: "Akshay Kumar S",
      imageUrl: "/images/virat.jpg",
      price: 1500,
    },
  ];

  return (
    <div>
      <div className="bg-blue-100 py-16">
        <div className="pl-36 flex flex-col md:flex-row items-center min-h-[420px] max-h-[520px]">
          <div className="text-content md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-blue-400 drop-shadow-[2px_2px_var(--tw-shadow-color)] shadow-blue-950">
              Discover, Collect, and
            </h1>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-blue-400 drop-shadow-[2px_2px_var(--tw-shadow-color)] shadow-blue-950">
              Celebrate Art
            </h1>
            <p className="text-lg md:text-lg mb-6">
              Explore our curated collection of unique artworks
            </p>
            <div className="flex space-x-4">
              <button className="bg-blue-500 text-white px-6 py-2 rounded transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Explore Gallery
              </button>
              <button className="bg-white text-blue-500 px-6 py-2 rounded border border-blue-500  transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50">
                Join as an Artist
              </button>
            </div>
          </div>

          <div className="image-content md:w-1/2">
            {/* Adjusted the image size */}
            <img
              src="/images/HomePage.png"
              alt="Artist painting"
              className="w-full h-auto max-h-[400px] object-contain animate-float"
            />
          </div>
        </div>
      </div>

      <section className="py-16 bg-gray-50">
        <div>
          <h2 className="text-4xl font-bold mb-14 text-center text-blue-400">
            Featured <span className="text-blue-900">Artworks</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            {featuredArtworks.map((artwork) => (
              <ArtworkCard key={artwork.id} {...artwork} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="mb-8">
            Stay updated with the latest artworks and events
          </p>
          <form className="max-w-md mx-auto flex shadow-lg">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-4 py-2 rounded-l-md"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-r-md hover:bg-blue-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
