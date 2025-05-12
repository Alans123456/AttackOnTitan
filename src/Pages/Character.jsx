import React, { useState, useEffect } from "react";
import NavBar from "../Component/NavBar";
import Loader from "../Component/Loader"; // Import loader

export default function CharacterCards() {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [filters, setFilters] = useState({
    gender: "All",
    species: "All",
    status: "All",
  });
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const response = await fetch(
        "https://api.attackontitanapi.com/characters"
      );
      const data = await response.json();
      setCharacters(data.results);
      setFilteredCharacters(data.results);
      setLoading(false); // Turn off loader after data is fetched
    } catch (error) {
      console.error("Error fetching characters:", error);
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (filters) => {
    let filtered = characters;
    if (filters.gender !== "All") {
      filtered = filtered.filter((char) => char.gender === filters.gender);
    }
    if (filters.species !== "All") {
      filtered = filtered.filter((char) => char.species === filters.species);
    }
    if (filters.status !== "All") {
      filtered = filtered.filter((char) => char.status === filters.status);
    }
    setFilteredCharacters(filtered);
  };

  const handleImageError = (e) => {
    e.target.src = "/placeholder.png";
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#1c1c1c] text-gray-100">
      <NavBar />

      {/* Filter dropdowns */}
      <div className="flex flex-wrap gap-4 justify-center mb-10 p-6">
        {/* ... (filters unchanged) */}
      </div>

      {/* Character Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredCharacters.map((char) => (
          <div
            key={char.id}
            className="bg-[#1c1c1c] border-2 border-transparent hover:border-red-700 hover:shadow-red-500 hover:shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <img
              src={char.img || "/placeholder.png"}
              alt={char.name}
              className="w-full h-48 object-cover"
              onError={handleImageError}
            />
            <div className="p-4 text-center">
              <h3 className="text-xl font-bold text-red-600 mb-2">
                {char.name}
              </h3>
              <p className="text-sm">Gender: {char.gender}</p>
              <p className="text-sm">Species: {char.species}</p>
              <p className="text-sm">Status: {char.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
