import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) =>
        u.username === formData.username && u.password === formData.password
    );

    if (!user) {
      toast.error("Invalid username or password!");
      return;
    }

    toast.success("Login successful!");

    // Set the authentication flag in localStorage
    localStorage.setItem("isAuthenticated", "true");

    // Navigate to Home after successful login
    navigate("/Home");
  };

  const goToSignUp = () => {
    navigate("/SignUp");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#0f0f0f] hover:scale-105 hover:shadow-red-500 hover:shadow-lg to-[#1c1c1c] text-gray-100">
      <div
        className={`relative w-[85%] sm:w-[400px] max-w-full ${
          isFormVisible ? "h-[60vh]" : "h-[10vh]"
        } bg-[#1c1c1c] rounded-xl cursor-pointer transition-all duration-300 transform ${
          isFormVisible
            ? "hover:scale-100 hover:shadow-xl hover:border-red-700"
            : "hover:scale-105 hover:shadow-xl hover:border-red-700"
        } border-2 border-transparent hover:ring-4 hover:ring-red-600 overflow-hidden`}
        onClick={() => setIsFormVisible(true)}
      >
        {/* Heading */}
        <div
          className={`absolute top-0 left-0 w-full text-center text-white text-2xl font-semibold py-4 transition-all duration-300 transform ${
            isFormVisible ? "opacity-0" : "opacity-100"
          }`}
        >
          {!isFormVisible && "Login"}
        </div>

        {/* Login Form */}
        {isFormVisible && (
          <div
            className="absolute top-0 left-0 w-full bg-[#1c1c1c] p-6 rounded-xl transition-all duration-500 overflow-y-auto"
            style={{ zIndex: 999 }}
          >
            <form onSubmit={handleLogin}>
              <h2 className="text-3xl text-white font-bold text-center mb-6">
                Login
              </h2>

              <div className="mb-4">
                <label className="block text-white mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[#2d2d2d] text-white rounded-md border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
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
                  className="w-full p-3 bg-[#2d2d2d] text-white rounded-md border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                  required
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-500 transition duration-300 w-full"
                >
                  Log In
                </button>
              </div>
            </form>

            {/* Sign-Up Link */}
            <div className="mt-4 text-center">
              <p className="text-white">
                Don't have an account?{" "}
                <button
                  onClick={goToSignUp}
                  className="text-red-600 hover:text-red-400 transition duration-300"
                >
                  Create an Account
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
