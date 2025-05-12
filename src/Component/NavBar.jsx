import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export default function NavBar() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const usersData = localStorage.getItem("users");

    if (usersData) {
      try {
        const users = JSON.parse(usersData);
        console.log("Users:", users); // Debugging log

        if (users.length > 0) {
          setUsername(users[0].username); // Set the first user's username
        }
      } catch (error) {
        console.error("Failed to parse users from localStorage:", error);
      }
    }
  }, []);

  const navItems = [
    { name: "Home", path: "/Home" },
    { name: "Characters", path: "/Character" },
    { name: "Organization", path: "/Organization" },
    { name: "Location", path: "/Location" },
    { name: "Titan", path: "/Titan" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-[#1c1c1c] shadow-md sticky top-0 z-10">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <img src="Logo.png" alt="logo" className="w-10 h-10" />
        <h2 className="font-serif font-bold text-2xl text-red-700 tracking-wider hover:text-red-600">
          Attack on Titan
        </h2>
      </div>

      {/* Nav Links */}
      <div className="flex space-x-6">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "text-red-600 font-bold border-b-2 border-red-700 pb-1"
                : "text-gray-300 hover:text-red-600 transition duration-200 transform hover:scale-110"
            }
          >
            {item.name}
          </NavLink>
        ))}
        {username && (
          <div className="flex items-center space-x-2 text-gray-300 ml-4 bg-[#2c2c2c] px-3 py-1 rounded-full">
            <FaUserCircle className="text-white text-2xl" />
            <span className="font-medium">{username}</span>
          </div>
        )}
      </div>

      {/* User Info */}
    </div>
  );
}
