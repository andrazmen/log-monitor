import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const user_token = JSON.parse(localStorage.getItem("token")) || null;
  const token = user_token?.token || null;
  if (token) {
    const decoded_token = jwtDecode(JSON.stringify(token));
    if (decoded_token.role === "admin" || decoded_token.role === "user") {
      return children;
    }
  }
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
