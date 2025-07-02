// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const ProtectedRouteDoaa = ({ children }) => {
  const token = localStorage.getItem("ICMPTokenDoaa");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;

    if (decoded.exp < now) {
      localStorage.removeItem("ICMPTokenDoaa");
      return <Navigate to="/login" replace />;
    }

    return children;
  } catch (err) {
    localStorage.removeItem("ICMPTokenDoaa");
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRouteDoaa;