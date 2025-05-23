import React, { useState, useEffect } from "react";
import NavBar from "../Component/NavBar";
import Loader from "../Component/Loader"; // Import the loader component

export default function Location() {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [filters, setFilters] = useState({
    region: "All",
  });
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch locations when the component mounts
  useEffect(() => {
    fetchLocations();
  }, []);

  // Fetch locations from API
  const fetchLocations = async () => {
    try {
      setLoading(true); // Set loading to true when fetching data
      const response = await fetch(
        "https://api.attackontitanapi.com/locations"
      );
      const data = await response.json();
      setLocations(data.results);
      setFilteredLocations(data.results);
    } catch (error) {
      console.error("Error fetching locations:", error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  // Handle filter changes

  // Apply filters to the locations list

  // Fallback image handler
  const handleImageError = (e) => {
    e.target.src = "/placeholder.png"; // Use the local placeholder image
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#1c1c1c] text-gray-100">
      <NavBar />

      {loading ? (
        <Loader /> // Show loader if data is being fetched
      ) : (
        <>
          {/* Filter dropdown */}

          {/* Location Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-10">
            {filteredLocations.map((loc) => {
              return (
                <div
                  key={loc.id}
                  className="bg-[#1c1c1c] border-2 border-transparent hover:border-red-700 hover:shadow-red-500 hover:shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
                >
                  <img
                    src={loc.img || "/placeholder.png"} // Use the local placeholder image
                    alt={loc.name}
                    className="w-full h-48 object-cover"
                    onError={handleImageError} // Add error handling here
                  />
                  <div className="p-4 text-center">
                    <h3 className="text-xl font-bold text-red-600 mb-2">
                      {loc.name}
                    </h3>
                    <p className="text-sm">Region: {loc.region}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
