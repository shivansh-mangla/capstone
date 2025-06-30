// components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("ICMPtoken");

  if (!token) {
    return <Navigate to="/student/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;

    if (decoded.exp < now) {
      localStorage.removeItem("ICMPtoken");
      return <Navigate to="/student/login" replace />;
    }

    return children;
  } catch (err) {
    localStorage.removeItem("ICMPtoken");
    return <Navigate to="/student/login" replace />;
  }
};

export default ProtectedRoute;