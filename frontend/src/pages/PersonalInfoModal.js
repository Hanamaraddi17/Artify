import React, { useState, useEffect } from "react";
import { User, Mail, Info, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const PersonalInfoModal = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isArtist, setIsArtist] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitStatus, setSubmitStatus] = useState(""); // To track submit status
  const [errorMessage, setErrorMessage] = useState(""); // For detailed error message
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      // Fetch username and email from local storage
      const storedUsername = sessionStorage.getItem("username");
      const storedEmail = sessionStorage.getItem("email");
      if (storedUsername && storedEmail) {
        setUsername(storedUsername);
        setEmail(storedEmail);
      } else {
        setError("No user information found in local storage.");
      }

      // Fetch isArtist status from API
      try {
        const response = await fetch(
          "https://artifybackend.vercel.app/artist/check/artist",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
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

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("username");
    setTimeout(() => {
      navigate("/signup"); // Redirect to the Signup page after logout
      window.location.reload();
    }, 2000);
  };

  const handleDeleteAccount = async () => {
    const token = sessionStorage.getItem("authToken"); // Fetch token from local storage
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this account?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`https://artifybackend.vercel.app/auth/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setSubmitStatus("success"); // Set submit status to success
        handleLogout(); // Call the logout function on successful deletion
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Failed to delete account.");
        setSubmitStatus("error"); // Set submit status to error
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      setErrorMessage("An error occurred while deleting the account.");
      setSubmitStatus("error"); // Set submit status to error
    }
  };

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
      <div className="flex justify-center">
        <button
          className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors duration-300"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </button>
      </div>

      {/* Success Message */}
      {submitStatus === "success" && (
        <div className="mt-6 bg-green-50 border-green-200 p-4 rounded">
          <p className="text-green-800">Account deleted successfully!</p>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === "error" && (
        <div className="mt-6 bg-red-50 border-red-200 p-4 rounded">
          <p className="text-red-800">{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default PersonalInfoModal;
