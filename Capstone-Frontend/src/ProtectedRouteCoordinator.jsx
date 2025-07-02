// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const ProtectedRouteCoordinator = ({ children }) => {
  const token = localStorage.getItem("ICMPTokenCoordinator");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;

    if (decoded.exp < now) {
      localStorage.removeItem("ICMPTokenCoordinator");
      return <Navigate to="/login" replace />;
    }

    return children;
  } catch (err) {
    localStorage.removeItem("ICMPTokenCoordinator");
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRouteCoordinator;