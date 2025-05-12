import React, { useState } from "react";
import NavBar from "../Component/NavBar";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation (could be expanded)
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("Please fill out all fields.");
      return;
    }

    // Simulate form submission
    setStatus("Submitting...");

    // Here, you can integrate actual form submission (e.g., to a backend API)

    setTimeout(() => {
      setStatus("Thank you for contacting us!");
      setFormData({ name: "", email: "", message: "" }); // Clear form after submission
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#1c1c1c] text-gray-100">
      <NavBar />

      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-[#1c1c1c] p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl text-center font-bold text-red-600 mb-6">
            Contact Us
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full bg-[#2a2a2a] text-white border border-red-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full bg-[#2a2a2a] text-white border border-red-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-300"
              >
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="mt-1 block w-full bg-[#2a2a2a] text-white border border-red-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white font-semibold p-2 rounded hover:bg-red-500 transition duration-300"
              >
                Submit
              </button>
            </div>

            {status && (
              <div className="text-center text-sm text-gray-300 mt-4">
                {status}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
