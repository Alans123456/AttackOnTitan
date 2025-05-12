import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Characters", path: "/Character" },
    { name: "Organization", path: "/Organization" },
    { name: "Location", path: "/Location" },
    { name: "Titan", path: "/Titan" },
    { name: "Contact", path: "/contact" },
  ];
  return (
    <>
      <div className="flex justify-between items-center pl-10 px-6 py-4 bg-[#1c1c1c] shadow-md sticky top-0 z-10 transition duration-300 ease-in-out transform hover:scale-104">
        <div className="flex items-center space-x-3">
          <img src="Logo.png" alt="logo" className="w-10 h-10" />
          <h2 className="font-serif font-bold text-2xl text-red-700 tracking-wider transition duration-300 ease-in-out hover:text-red-600">
            Attack on Titan
          </h2>
        </div>

        {/* Navbar items */}
        <div className="flex space-x-6 mr-5 min-w-fit overflow-hidden">
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
        </div>
      </div>
    </>
  );
}
