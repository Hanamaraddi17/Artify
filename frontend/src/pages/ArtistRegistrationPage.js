import React, { useState, useEffect } from "react"; // Added useEffect
import {
  Upload,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
} from "lucide-react";
import { Alert, AlertDescription } from "../components/Alert"; // Ensure the path is correct

export default function ArtistRegistrationPage() {
  const [formData, setFormData] = useState({
    fullname: "", // Changed from fullName to fullname
    email: "",
    phone: "",
    age: "",
    address: "",
    biography: "",
    photo: null, // Changed from profilePhoto to photo
  });
  const [submitStatus, setSubmitStatus] = useState(""); // Possible values: "", "success", "error"
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState(""); // New State for File Name

  // useEffect to handle timeout for success and error messages
  useEffect(() => {
    if (submitStatus === "success" || submitStatus === "error") {
      const timer = setTimeout(() => {
        setSubmitStatus("");
        if (submitStatus === "error") {
          setErrorMessage("");
        }
      }, 3000); // 3 seconds

      // Cleanup the timer if the component unmounts or if submitStatus changes
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous messages
    setSubmitStatus("");
    setErrorMessage("");

    // Validate form data
    const { fullname, email, phone, age, address, biography, photo } = formData;
    if (
      !fullname ||
      !email ||
      !phone ||
      !age ||
      !address ||
      !biography ||
      !photo
    ) {
      setErrorMessage(
        "Please fill in all the fields and upload a profile photo."
      );
      setSubmitStatus("error");
      return;
    }

    // Create FormData object
    const data = new FormData();
    data.append("fullname", formData.fullname); // Changed from fullName to fullname
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("age", formData.age);
    data.append("address", formData.address);
    data.append("biography", formData.biography);
    data.append("photo", formData.photo); // Changed from profilePhoto to photo

    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch("http://localhost:5000/artist/join", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Correctly set the Authorization header
        },
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        // Optionally, reset the form
        setFormData({
          fullname: "",
          email: "",
          phone: "",
          age: "",
          address: "",
          biography: "",
          photo: null,
        });
        setUploadedFileName(""); // Clear the uploaded file name after success
      } else {
        // Handle server errors
        setErrorMessage(result.error || "Registration failed.");
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
      setSubmitStatus("error");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file }); // Changed from profilePhoto to photo
      setUploadedFileName(file.name); // Set the uploaded file name
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-400 mb-2">
            Artist <span className="text-blue-900">Registration</span>
          </h2>
          <p className="text-gray-600">
            Join our creative community and showcase your artwork
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                required
                className="pl-10 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Enter your full name"
                value={formData.fullname} // Changed to fullname
                onChange={
                  (e) => setFormData({ ...formData, fullname: e.target.value }) // Changed to fullname
                }
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  required
                  className="pl-10 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  required
                  className="pl-10 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="(000) 000-0000"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Age and Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  required
                  className="pl-10 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  min="0"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  required
                  className="pl-10 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Biography */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Biography
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <textarea
                required
                className="pl-10 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition h-32"
                placeholder="Tell us about yourself and your artistic journey..."
                value={formData.biography}
                onChange={(e) =>
                  setFormData({ ...formData, biography: e.target.value })
                }
              />
            </div>
          </div>

          {/* Profile Photo Upload */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Photo
            </label>
            <div className="relative">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-20 border-2 border-dashed border-blue-400 hover:border-blue-600 rounded-lg cursor-pointer transition-all">
                  <div className="flex flex-col items-center justify-center pt-2">
                    <Upload className="w-8 h-8 text-gray-400 group-hover:text-gray-600" />
                    <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                      Upload your profile photo
                    </p>
                  </div>
                  <input
                    type="file"
                    className="opacity-0"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Uploaded File Name Display */}
          {uploadedFileName && (
            <div className="mt-2 text-center">
              <p className="text-sm text-gray-700">
                <strong>Selected File:</strong> {uploadedFileName}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-400 text-white px-8 py-3 rounded-md hover:bg-green-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Register as Artist
            </button>
          </div>
        </form>

        {/* Success Message */}
        {submitStatus === "success" && (
          <Alert className="mt-6 bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">
              Registration successful! Welcome to the Artify community.
            </AlertDescription>
          </Alert>
        )}

        {/* Error Message */}
        {submitStatus === "error" && (
          <Alert className="mt-6 bg-red-50 border-red-200">
            <AlertDescription className="text-red-800">
              {errorMessage}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}