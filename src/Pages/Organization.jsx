import React, { useState, useEffect } from "react";
import NavBar from "../Component/NavBar";
import Loader from "../Component/Loader"; // Import the loader

export default function Organization() {
  const [organizations, setOrganizations] = useState([]);
  const [filteredOrganizations, setFilteredOrganizations] = useState([]);
  const [filters, setFilters] = useState({
    type: "All",
    status: "All",
  });
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      setLoading(true); // Set loading to true when fetching
      const response = await fetch(
        "https://api.attackontitanapi.com/organizations"
      );
      const data = await response.json();
      setOrganizations(data.results);
      setFilteredOrganizations(data.results);
    } catch (error) {
      console.error("Error fetching organizations:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const handleImageError = (e) => {
    e.target.src = "/placeholder.png"; // Fallback image
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#1c1c1c] text-gray-100">
      <NavBar />

      {/* Show loader if loading is true */}
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Filter dropdowns */}

          {/* Organization Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
            {filteredOrganizations.map((org) => (
              <div
                key={org.id}
                className="bg-[#1c1c1c] border-2 border-transparent hover:border-red-700 hover:shadow-red-500 hover:shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
              >
                <img
                  src={org.img || "/placeholder.png"} // Use the local placeholder image
                  alt={org.name}
                  className="w-full h-48 object-cover"
                  onError={handleImageError} // Add error handling here
                />
                <div className="p-4 text-center">
                  <h3 className="text-xl font-bold text-red-600 mb-2">
                    {org.name}
                  </h3>
                  <p className="text-sm">Affiliation: {org.affiliation}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
