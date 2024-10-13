import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, Search, Eye } from "lucide-react";

const ArtistsTablePage = () => {
  const [artists, setArtists] = useState([]);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch artists data from the backend
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch("http://localhost:5000/artist/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Map backend data to frontend structure
        const mappedArtists = data.map((artist) => ({
          id: artist.artist_id,
          fullName: artist.fullname,
          email: artist.email || "N/A",
          phoneNo: artist.phone,
          artworksCount: artist.total_artworks || 0, // Assuming artworks_count is provided
          photo: artist.photo,
        }));
        setArtists(mappedArtists);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch artists:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedArtists = [...artists].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const filteredArtists = sortedArtists.filter(
    (artist) =>
      artist.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="bg-blue-100 min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-700">Loading artists...</p>
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

  return (
    <div className="bg-blue-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-400 mb-8 text-center">
          Artify <span className="text-blue-900">Artists</span>
        </h1>
        {/* Small paragraph about Available Artists */}
        <p className="text-md text-gray-700 mb-10 mx-4 text-center">
          Explore our talented artists at Artify, each contributing their unique
          creations to the world of digital art. With a diverse range of styles,
          from abstract to urban landscapes, you'll find an array of
          masterpieces that reflect the vision of artists from across the globe.
          Browse their profiles and discover the stunning artworks they have
          brought to life.
        </p>
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search artists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-full border-2 border-indigo-300 focus:outline-none focus:border-indigo-500 transition-all duration-300"
            />
            <Search
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-500"
              size={20}
            />
          </div>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-indigo-500 to-purple-500">
              <tr>
                {["Full Name", "Email", "Phone No", "Artworks"].map(
                  (header) => (
                    <th
                      key={header}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer hover:bg-indigo-600 transition-all duration-200"
                      onClick={() =>
                        handleSort(header.toLowerCase().replace(" ", ""))
                      }
                    >
                      <div className="flex items-center">
                        {header}
                        {sortColumn === header.toLowerCase().replace(" ", "") &&
                          (sortDirection === "asc" ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          ))}
                      </div>
                    </th>
                  )
                )}
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider hover:bg-indigo-600"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredArtists.map((artist) => (
                <tr
                  key={artist.id}
                  className="hover:bg-indigo-50 transition-all duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {artist.fullName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{artist.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {artist.phoneNo}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {artist.artworksCount}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      to={`/artist/${artist.id}`}
                      className="text-indigo-600 hover:text-indigo-900 transition-all duration-200 flex items-center"
                    >
                      <Eye size={18} className="mr-1" />
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredArtists.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              No artists found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistsTablePage;
