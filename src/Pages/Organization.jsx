import React, { useState, useEffect } from "react";
import NavBar from "../Component/NavBar";

export default function Organization() {
  const [organizations, setOrganizations] = useState([]);
  const [filteredOrganizations, setFilteredOrganizations] = useState([]);
  const [filters, setFilters] = useState({
    type: "All",
    status: "All",
  });

  // Fetch organizations when the component mounts
  useEffect(() => {
    fetchOrganizations();
  }, []);

  // Fetch organizations from API
  const fetchOrganizations = async () => {
    try {
      const response = await fetch(
        "https://api.attackontitanapi.com/organizations"
      );
      const data = await response.json();
      setOrganizations(data.results);
      setFilteredOrganizations(data.results);
    } catch (error) {
      console.error("Error fetching organizations:", error);
    }
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  // Apply filters to the organizations list
  const applyFilters = (filters) => {
    let filtered = organizations;

    if (filters.type !== "All") {
      filtered = filtered.filter((org) => org.type === filters.type);
    }
    if (filters.status !== "All") {
      filtered = filtered.filter((org) => org.status === filters.status);
    }
    setFilteredOrganizations(filtered);
  };

  // Fallback image handler
  const handleImageError = (e) => {
    e.target.src = "/placeholder.png"; // Use the local placeholder image
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#1c1c1c] text-gray-100">
      <NavBar />

      {/* Filter dropdowns */}
      <div className="flex flex-wrap gap-4 justify-center mb-10 p-6">
        <select
          name="type"
          value={filters.type}
          onChange={handleFilterChange}
          className="bg-[#1c1c1c] text-white border border-red-600 p-2 rounded hover:border-red-500"
        >
          <option value="All">All Types</option>
          <option value="Military">Military</option>
          <option value="Civilian">Civilian</option>
          <option value="Other">Other</option>
        </select>

        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="bg-[#1c1c1c] text-white border border-red-600 p-2 rounded hover:border-red-500"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Organization Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredOrganizations.map((org) => {
          return (
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
