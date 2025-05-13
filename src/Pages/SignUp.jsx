import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("All fields are required!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setPasswordMismatch(true);
      toast.error("Passwords do not match");
      return;
    }

    if (!formData.termsAccepted) {
      toast.error("You must accept the terms to continue.");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    existingUsers.push({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });
    localStorage.setItem("users", JSON.stringify(existingUsers));

    toast.success("Sign up successful! Redirecting to Login...");

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b hover:scale-105 hover:shadow-red-500 hover:shadow-lg from-[#0f0f0f] to-[#1c1c1c] text-gray-100">
      <div
        className={`relative w-[85%] sm:w-[400px] max-w-full ${
          isFormVisible ? "min-h-[90vh]" : "h-[10vh]"
        } bg-[#1c1c1c] rounded-xl cursor-pointer transition-all duration-300 transform ${
          isFormVisible
            ? "hover:scale-100 hover:shadow-xl hover:border-red-700"
            : "hover:scale-105 hover:shadow-xl hover:border-red-700"
        } border-2 border-transparent hover:ring-4 hover:ring-red-600 overflow-hidden`}
        onClick={() => setIsFormVisible(true)}
      >
        {/* Top Heading */}
        <div
          className={`absolute top-0 left-0 w-full text-center text-white text-2xl font-semibold py-4 transition-all duration-300 transform ${
            isFormVisible ? "opacity-0" : "opacity-100"
          }`}
        >
          {!isFormVisible && "Sign Up"}
        </div>

        {/* Form Section */}
        {isFormVisible && (
          <div
            className="absolute top-0 left-0 w-full bg-[#1c1c1c] p-6 rounded-xl transition-all duration-500 overflow-y-auto"
            style={{
              zIndex: 999,
              transform: "translateY(-20px)",
            }}
          >
            {/* Back Button */}
            <button
              onClick={() => navigate("/")}
              className="text-sm text-red-500 hover:text-red-400 mb-4 flex items-center"
            >
              ← Back to Login
            </button>

            <form onSubmit={handleSubmit}>
              <h2 className="text-3xl text-white font-bold text-center mb-6">
                Create Account
              </h2>

              <div className="mb-4">
                <label className="block text-white mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[#2d2d2d] text-white rounded-md border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-white mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[#2d2d2d] text-white rounded-md border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-white mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[#2d2d2d] text-white rounded-md border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-white mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[#2d2d2d] text-white rounded-md border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              {passwordMismatch && (
                <div className="text-red-600 text-sm mb-4">
                  Passwords do not match
                </div>
              )}

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label className="text-white text-sm">
                  I accept all{" "}
                  <span className="text-red-600">terms and conditions</span>
                </label>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-500 transition duration-300 w-full"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
