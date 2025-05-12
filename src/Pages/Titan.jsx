import React, { useState, useEffect } from "react";
import NavBar from "../Component/NavBar";

export default function TitanCards() {
  const [titans, setTitans] = useState([]);
  const [filteredTitans, setFilteredTitans] = useState([]);
  const [filters, setFilters] = useState({
    allegiance: "All",
  });

  // Fetch titans when the component mounts
  useEffect(() => {
    fetchTitans();
  }, []);

  // Fetch titans from API
  const fetchTitans = async () => {
    try {
      const response = await fetch("https://api.attackontitanapi.com/titans");
      const data = await response.json();
      setTitans(data.results);
      setFilteredTitans(data.results);
    } catch (error) {
      console.error("Error fetching titans:", error);
    }
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  // Apply filters to the titans list
  const applyFilters = (filters) => {
    let filtered = titans;

    if (filters.allegiance !== "All") {
      filtered = filtered.filter(
        (titan) => titan.allegiance === filters.allegiance
      );
    }
    setFilteredTitans(filtered);
  };

  // Fallback image handler
  const handleImageError = (e) => {
    e.target.src = "/placeholder.png"; // Use the local placeholder image
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#1c1c1c] text-gray-100">
      <NavBar />

      {/* Filter dropdown */}
      <div className="flex flex-wrap gap-4 justify-center mb-10 p-6">
        <select
          name="allegiance"
          value={filters.allegiance}
          onChange={handleFilterChange}
          className="bg-[#1c1c1c] text-white border border-red-600 p-2 rounded hover:border-red-500"
        >
          <option value="All">All Allegiances</option>
          <option value="Eldia">Elida</option>
          <option value="Marley">Marley</option>
          <option value="None">Other</option>
          {/* Add more allegiances as necessary */}
        </select>
      </div>

      {/* Titan Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredTitans.map((titan) => {
          return (
            <div
              key={titan.id}
              className="bg-[#1c1c1c] border-2 border-transparent hover:border-red-700 hover:shadow-red-500 hover:shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <img
                src={titan.img || "/placeholder.png"} // Use the local placeholder image
                alt={titan.name}
                className="w-full h-48 object-cover"
                onError={handleImageError} // Add error handling here
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-bold text-red-600 mb-2">
                  {titan.name}
                </h3>
                <p className="text-sm">Height: {titan.height} meters</p>
                <p className="text-sm">Allegiance: {titan.allegiance}</p>
                <p className="text-sm">
                  Abilities: {titan.abilities.join(", ")}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
