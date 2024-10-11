import React from "react";
import {
  User,
  Mail,
  MapPin,
  Calendar,
  Image,
  FileText,
  Phone,
} from "lucide-react";

const ArtistInfoPage = ({ artist }) => {
  // Dummy data for the artist (replace with actual data in your implementation)
  const artistData = {
    userId: "art123",
    fullName: "Akshay Kumar S",
    email: "akshaykumars9108@gmail.com",
    age: 21,
    address: "Yadadi-Mathyadi Village, Kundapura Taluk, Udupi - 576222",
    phoneNo: "9108083054",
    photo: "/images/Akshay.jpeg",
    biography:
      "Akshay Kumar is a contemporary artist celebrated for his innovative approach to abstract painting, where he masterfully blends vibrant colors and dynamic forms to create visually arresting compositions. His work often draws inspiration from the natural world, human emotions, and the subtle interplay of light and shadow, resulting in pieces that evoke a sense of movement and energy. Kumar’s distinctive style combines both spontaneity and precision, as he employs bold brushstrokes, intricate layering, and textural techniques to give his paintings a unique depth.",
  };

  return (
    <div className="bg-blue-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-all duration-500 ease-in-out">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-indigo-200 to-purple-200 h-40 rounded-lg animate-pulse transition-all duration-300 ease-in-out hover:shadow-md hover:scale-105"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistInfoPage;
