import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  MapPin,
  Calendar,
  Image,
  FileText,
  Phone,
} from "lucide-react";
import { useParams } from "react-router-dom";

const ArtistInfoPage = () => {
  const { id } = useParams(); // Get artist ID from route parameters
  const [artistData, setArtistData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch artist data from the backend
  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(`http://localhost:5000/artist/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const artist = {
          userId: data.user_id || "N/A",
          fullName: data.fullname,
          email: data.email || "N/A",
          age: data.age,
          address: data.address,
          phoneNo: data.phone,
          photo: data.photo
            ? `http://localhost:5000/${data.photo.replace(/\\/g, "/")}`
            : "/images/default.jpeg", // Provide a default image if photo is null
          biography: data.biography || "No biography available.",
          artworks: data.artworks || [], // Assuming artworks are provided
        };
        setArtistData(artist);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch artist:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchArtist();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-blue-100 min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-700">Loading artist information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-blue-100 min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!artistData) {
    return (
      <div className="bg-blue-100 min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-700">Artist not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-blue-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-all duration-500 ease-in-out">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            {console.log("artist image :", artistData.photo)}
            <img
              className="h-56 w-full object-cover md:w-48 transition-transform duration-300 ease-in-out hover:scale-105"
              src={artistData.photo}
              alt={artistData.fullName}
            />
          </div>
          <div className="p-8 w-full">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">
              Artist Profile
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <User className="mr-2 text-indigo-500" size={24} />
              {artistData.fullName}
            </h1>
            <p className="mt-2 text-gray-600 flex items-center transition-all duration-300 ease-in-out hover:text-indigo-500">
              <Mail className="mr-2" size={18} />
              {artistData.email}
            </p>
            <p className="mt-2 text-gray-600 flex items-center transition-all duration-300 ease-in-out hover:text-indigo-500">
              <MapPin className="mr-2" size={18} />
              {artistData.address}
            </p>
            <p className="mt-2 text-gray-600 flex items-center transition-all duration-300 ease-in-out hover:text-indigo-500">
              <Phone className="mr-2" size={18} />
              {artistData.phoneNo}
            </p>
            <p className="mt-2 text-gray-600 flex items-center transition-all duration-300 ease-in-out hover:text-indigo-500">
              <Calendar className="mr-2" size={18} />
              Age: {artistData.age}
            </p>
          </div>
        </div>
        <div className="px-8 py-6 bg-gradient-to-r from-indigo-50 to-purple-50">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <FileText className="mr-2 text-indigo-500" size={24} />
            Biography
          </h2>
          <p className="text-gray-700 transition-all duration-300 ease-in-out hover:text-indigo-700">
            {artistData.biography}
          </p>
        </div>
        <div className="px-8 py-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Image className="mr-2 text-indigo-500" size={24} />
            Latest Artworks
          </h2>
          {artistData.artworks && artistData.artworks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {artistData.artworks.map((artwork) => (
                <div
                  key={artwork.artwork_id} // Changed to artwork.artwork_id
                  className="bg-gradient-to-br from-indigo-200 to-purple-200 h-40 rounded-lg transition-all duration-300 ease-in-out hover:shadow-md hover:scale-105"
                  style={{
                    backgroundImage: `url(http://localhost:5000/${artwork.image_url.replace(
                      /\\/g,
                      "/"
                    )})`, // Changed to artwork.image_url
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  title={artwork.title || "Untitled"}
                ></div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No artworks available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistInfoPage;
