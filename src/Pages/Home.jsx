import React from "react";
import { NavLink } from "react-router-dom";
import NavCard from "../Component/NavCard";
import NavBar from "../Component/NavBar";

export default function Home() {
  const cards = [
    {
      image:
        "https://preview.redd.it/attack-on-titan-hunger-games-v0-tuhpalos90hd1.jpeg?width=640&crop=smart&auto=webp&s=d1e1ef3d1d54663caa05449414a35be478ab13a2", // Eren Yeager character image
      title: "Characters",
      path: "/character",
    },
    {
      image:
        "https://wallpapercat.com/w/full/e/8/6/25770-3840x2160-desktop-4k-attack-on-titan-tv-series-wallpaper-image.jpg", // Scout Regiment logo
      title: "Organization",
      path: "/Organization",
    },
    {
      image:
        "https://www.slashfilm.com/img/gallery/the-entire-attack-on-titan-timeline-explained/intro-1731621833.jpg", // Wall Maria image
      title: "Location",
      path: "/Location",
    },
    {
      image:
        "https://static1.cbrimages.com/wordpress/wp-content/uploads/2024/05/attack-on-titan-timeline.jpg", // Colossal Titan image
      title: "Titan",
      path: "/Titan",
    },
    {
      image: "https://images.alphacoders.com/124/1244060.jpg", // Attack on Titan logo
      title: "Episode",
      path: "/Episode",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#1c1c1c] text-gray-100">
      {/* Navbar */}
      <NavBar />
      {/* Hero Section */}
      <div className="py-20 px-6">
        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-700 via-red-800 to-black mb-10 transform transition duration-300 hover:scale-105 hover:text-red-600 hover:shadow-xl hover:shadow-red-500">
          Explore the World of Titans
        </h1>

        <p className="text-lg text-center text-gray-400 mb-10">
          Uncover the mysteries of the Titans—explore legendary characters,
          iconic locations, and powerful organizations in an unforgettable
          journey.
        </p>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
          {cards.map((card, index) => (
            <NavCard
              key={index}
              image={card.image}
              title={card.title}
              path={card.path}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
