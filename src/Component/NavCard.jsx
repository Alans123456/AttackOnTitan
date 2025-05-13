import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function NavCard({ image, title, path }) {
  const navigate = useNavigate();
  const cardRef = useRef();

  const handleClick = () => {
    // Add animation class to the card
    if (cardRef.current) {
      cardRef.current.classList.add("animate-rotateOut");
    }

    // Navigate after animation
    setTimeout(() => {
      navigate(path);
    }, 300);
  };

  return (
    <div
      ref={cardRef}
      className={`group relative bg-[#1c1c1c] rounded-xl overflow-hidden shadow-xl cursor-pointer transform transition duration-300 hover:scale-105 w-72 h-64 border-2 border-transparent hover:border-red-700 hover:shadow-2xl hover:shadow-red-500`}
      onClick={handleClick}
    >
      <div className="relative">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-48 object-cover transition duration-500 transform group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-40 transition duration-300"></div>
      </div>

      <div className="p-4 text-center absolute bottom-0 left-0 right-0">
        <h2 className="text-2xl font-bold font-serif text-gray-100 transform transition duration-300 rotate-[345deg] group-hover:rotate-0 group-hover:translate-y-[-10px] group-hover:text-red-500 tracking-wide">
          {title}
        </h2>
      </div>

      <div className="absolute top-0 left-0 w-full h-full border-2 border-transparent group-hover:border-red-700 transition-all duration-300"></div>
    </div>
  );
}
