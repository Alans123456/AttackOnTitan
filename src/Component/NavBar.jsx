import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NavBar() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const usersData = localStorage.getItem("users");

    if (usersData) {
      try {
        const users = JSON.parse(usersData);
        if (users.length > 0) {
          setUsername(users[0].username);
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

  const handleLogout = () => {
    toast.success("Logout successful!", {
      position: "top-right",
      autoClose: 2000,
      style: {
        background: "#1a1a1a",
        color: "#fff",
      },
      iconTheme: {
        primary: "#f87171",
        secondary: "#fff",
      },
    });

    // Clear localStorage or any auth tokens if needed
    // localStorage.removeItem("users");

    setTimeout(() => {
      navigate("/"); // Adjust path to your actual login page
    }, 1000);
  };

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
      <div className="flex space-x-6 items-center">
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

        <button
          onClick={handleLogout}
          className="w-24 h-10 bg-red-600 text-white rounded-xl shadow-md transition-all duration-300 hover:bg-red-700 active:scale-95"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
