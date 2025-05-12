import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  if (!isAuthenticated) {
    return <Navigate to="/" />; // Redirect to login if not authenticated
  }

  return children; // Render the children (protected components) if authenticated
};

export default PrivateRoute;
