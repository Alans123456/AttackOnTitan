import React, { useState, useEffect } from "react";
import NavBar from "../Component/NavBar";
import Loader from "../Component/Loader"; // Loader component

export default function CharacterCards() {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [filters, setFilters] = useState({
    gender: "All",
    species: "All",
    status: "All",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.attackontitanapi.com/characters"
      );
      const data = await response.json();
      setCharacters(data.results);
      setFilteredCharacters(data.results);
    } catch (error) {
      console.error("Error fetching characters:", error);
    } finally {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#1c1c1c] text-gray-100">
      <NavBar />

      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Filter dropdowns */}
          <div className="flex flex-wrap gap-4 justify-center mb-10 p-6">
            <select
              name="gender"
              value={filters.gender}
              onChange={handleFilterChange}
              className="bg-[#1c1c1c] text-white border border-red-600 p-2 rounded hover:border-red-500"
            >
              <option value="All">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <select
              name="species"
              value={filters.species}
              onChange={handleFilterChange}
              className="bg-[#1c1c1c] text-white border border-red-600 p-2 rounded hover:border-red-500"
            >
              <option value="All">All Species</option>
              <option value="Human">Human</option>
              <option value="Titan">Titan</option>
            </select>

            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="bg-[#1c1c1c] text-white border border-red-600 p-2 rounded hover:border-red-500"
            >
              <option value="All">All Status</option>
              <option value="Alive">Alive</option>
              <option value="Deceased">Deceased</option>
            </select>
          </div>

          {/* Character Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
            {filteredCharacters.map((char) => (
              <div
                key={char.id}
                className="bg-[#1c1c1c] border-2 border-transparent hover:border-red-700 hover:shadow-red-500 hover:shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
              >
                <img
                  src={char.img}
                  alt={char.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/300x200?text=No+Image";
                  }}
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
        </>
      )}
    </div>
  );
}
