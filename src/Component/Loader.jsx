import React from "react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0f0f0f]">
      <img
        src="/Logo.png"
        alt="Loading..."
        className="w-24 h-24"
        style={{
          animation: "spin 3s linear infinite",
        }}
      />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
