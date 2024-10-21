import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";

const WishlistModal = () => {
  const [likedArtworks, setLikedArtworks] = useState([]);

  const fetchLikedArtworks = async () => {
    try {
      const token = sessionStorage.getItem("authToken"); // Retrieve the token from local storage
      const response = await fetch(
        "https://artifybackend.vercel.app/artworks/liked-items",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache",
            Accept: "*/*",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Fetched liked artworks:", data);

      // Set the fetched data to the state with liked state as true
      const artworksWithLikeState = data.map((artwork) => ({
        ...artwork,
        isLiked: true, // Set isLiked to true initially
      }));

      setLikedArtworks(artworksWithLikeState); // Set the state
    } catch (error) {
      console.error("Error fetching liked artworks:", error);
    }
  };

  const handleUnlikeArtwork = async (artworkId) => {
    try {
      const token = sessionStorage.getItem("authToken"); // Retrieve the token from local storage
      const response = await fetch(
        `https://artifybackend.vercel.app/artworks/${artworkId}/like`, // Assuming the same endpoint can handle unliking
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isLiked: false }), // Send unlike request
        }
      );

      if (response.ok) {
        // Remove the artwork from the state
        setLikedArtworks(
          likedArtworks.filter((artwork) => artwork.artwork_id !== artworkId)
        );
        alert("Artwork removed from wishlist successfully!");
      } else {
        alert("Failed to remove artwork from wishlist.");
      }
    } catch (error) {
      console.error("Error unliking artwork:", error);
    }
  };

  useEffect(() => {
    fetchLikedArtworks(); // Call the fetch function on component mount
  }, []);

  // Function to format the image URL
  const getFormattedImageUrl = (imageUrl) => {
    return imageUrl
      ? `https://artifybackend.vercel.app/${imageUrl.replace(/\\/g, "/")}` // Replace backslashes with forward slashes
      : "/images/default.jpeg"; // Provide a default image if photo is null
  };
  // fixed right-0 top-1/2 transform -translate-y-1/2 w-96 max-h-96 bg-white shadow-lg p-4 overflow-y-auto z-50 rounded-lg
  return (
    <div>
      <div className="flex flex-col space-y-4 ">
        {likedArtworks.length > 0 ? (
          likedArtworks.map((artwork) => (
            <div
              key={artwork.artwork_id}
              className="flex items-start border border-gray-300 rounded-lg p-3 bg-gray-100"
            >
              <img
                src={getFormattedImageUrl(artwork.image_url)} // Format the image URL here
                alt={artwork.title}
                className="w-20 h-20 object-cover rounded-l-lg mr-4" // Set a smaller size for the image
              />
              <div className="flex flex-col flex-1">
                <h3 className="text-md font-semibold">{artwork.title}</h3>

                <p className="text-md">Price: ₹{artwork.price}</p>
              </div>
              <button
                aria-label="Remove from wishlist"
                onClick={() => handleUnlikeArtwork(artwork.artwork_id)} // Call unlike function
                className="w-8 h-8 flex items-center justify-center bg-red-500 rounded-full transition-all duration-300 hover:bg-red-600"
              >
                <Heart
                  size={18}
                  className="text-white hover:text-gray-200" // Set heart color to white
                />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No artworks in your wishlist.</p>
        )}
      </div>
    </div>
  );
};

export default WishlistModal;
