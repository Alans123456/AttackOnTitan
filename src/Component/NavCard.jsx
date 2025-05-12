import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavCard({ image, title, path }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Apply a small animation before navigating
    const card = document.querySelector(`.card-${title}`);
    card.classList.add("animate-rotateOut");

    // Wait for the animation to end before navigating
    setTimeout(() => {
      navigate(path);
    }, 300); // Match animation duration
  };

  return (
    <div
      className={`group relative bg-[#1c1c1c] rounded-xl overflow-hidden shadow-xl cursor-pointer transform transition duration-300 hover:scale-105 w-72 h-64 border-2 border-transparent hover:border-red-700 hover:shadow-2xl hover:shadow-red-500 card-${title}`}
      onClick={handleClick}
    >
      <div className="relative">
        {/* Image size remains the same */}
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover transition duration-500 transform group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-40 transition duration-300"></div>
      </div>

      {/* Title Section with Animation on Hover */}
      <div className="p-4 text-center absolute bottom-0 left-0 right-0">
        <h2 className="text-2xl font-bold font-serif text-gray-100 transform transition duration-300 rotate-[345deg] group-hover:rotate-0 group-hover:translate-y-[-10px] group-hover:text-red-500 tracking-wide">
          {title}
        </h2>
      </div>

      {/* Additional Border Effect on Hover */}
      <div className="absolute top-0 left-0 w-full h-full border-2 border-transparent group-hover:border-red-700 transition-all duration-300"></div>
    </div>
  );
}
