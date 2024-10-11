import React, { useState } from "react";
import {
  Upload,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
} from "lucide-react";
import { Alert, AlertDescription } from "../components/Alert"; // Update the import path based on your file structure

export default function ArtistRegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    address: "",
    biography: "",
    profilePhoto: null,
  });
  const [submitStatus, setSubmitStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus("success");
    // Handle form submission logic here
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePhoto: file });
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
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
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
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
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
                  />
                </label>
              </div>
            </div>
          </div>

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
      </div>
    </div>
  );
}
