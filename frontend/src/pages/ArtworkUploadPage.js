import React, { useState } from "react";
import { Upload, FileText } from "lucide-react";
import { Alert, AlertDescription } from "../components/Alert"; // Adjust path

export default function ArtworkUploadPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    artworkFile: null,
  });
  const [fileName, setFileName] = useState(""); // State for file name
  const [submitStatus, setSubmitStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("artworks", formData.artworkFile);

    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch("http://localhost:5000/artworks/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      if (response.ok) {
        setSubmitStatus("success");
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus("error");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, artworkFile: file });
      setFileName(file.name); // Set the file name
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-400 mb-2">
            Artwork <span className="text-blue-900">Upload</span>
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          {/* Title */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              required
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter artwork title"
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          {/* Description */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <textarea
                required
                className="pl-10 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                placeholder="Describe your artwork..."
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          {/* Price */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="number"
              required
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter artwork price"
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </div>

          {/* Category */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter artwork category"
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
          </div>

          {/* Artwork File Upload */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Artwork File</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col w-full h-20 border-2 border-dashed border-blue-400 hover:border-blue-600 rounded-lg cursor-pointer transition-all">
                <div className="flex flex-col items-center justify-center pt-2">
                  {fileName ? (
                    <p className="text-gray-700">{fileName}</p> // Show file name
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-gray-400" />
                      <p className="pt-1 text-sm tracking-wider text-gray-400">Upload your artwork</p>
                    </>
                  )}
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

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-400 text-white px-8 py-3 rounded-md hover:bg-green-500 transition-colors duration-300"
            >
              Upload
            </button>
          </div>

          {/* Display Success or Error Messages */}
          {submitStatus === "success" && (
            <Alert>
              <AlertDescription>Artwork uploaded successfully!</AlertDescription>
            </Alert>
          )}
          {submitStatus === "error" && (
            <Alert variant="danger">
              <AlertDescription>An error occurred. Please try again.</AlertDescription>
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
}
