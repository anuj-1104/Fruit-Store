import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/" replace />;      
};

export default ProtectedRoute;

// used a matching routes child render
// gloabally access a protected route in user