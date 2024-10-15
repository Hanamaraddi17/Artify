// src/components/modals/PersonalInfoModal.js
import React, { useState, useEffect } from "react";
import { User, Mail, Info, Trash } from "lucide-react";

const PersonalInfoModal = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isArtist, setIsArtist] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      // Fetch username and email from local storage
      const storedUsername = localStorage.getItem("username");
      const storedEmail = localStorage.getItem("email");
      if (storedUsername && storedEmail) {
        setUsername(storedUsername);
        setEmail(storedEmail);
      } else {
        setError("No user information found in local storage.");
      }

      // Fetch isArtist status from API
      try {
        const response = await fetch(
          "http://localhost:5000/artist/check/artist",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setIsArtist(data.isArtist); // Assuming the API response has a property named `isArtist`
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch artist status.");
        }
      } catch (err) {
        setError("An error occurred while fetching artist status.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalInfo();
  }, []);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <User size={20} className="text-blue-500 mr-2" />
        <h3 className="text-md font-semibold">Username:</h3>
        <p className="ml-2">{username}</p>
      </div>
      <div className="flex items-center">
        <Mail size={20} className="text-green-500 mr-2" />
        <h3 className="text-md font-semibold">Email:</h3>
        <p className="ml-2">{email}</p>
      </div>
      <div className="flex items-center">
        <Info size={20} className="text-purple-500 mr-2" />
        <h3 className="text-md font-semibold">User Type:</h3>
        <p className="ml-2">{isArtist ? "Artist" : "Regular User"}</p>
      </div>
      {/* bg-red-100 text-red-500 px-6 py-2 rounded-full hover:bg-red-200 transition-colors duration-300 */}
      <button className="flex items-center bg-red-500 text-white hover:bg-red-700  px-2 transition-colors duration-300 ml-20 p-1 rounded-sm">
        <span className="text-sm">Delete Account</span>
        <Trash size={18} className="ml-2" />
      </button>
    </div>
  );
};

export default PersonalInfoModal;
