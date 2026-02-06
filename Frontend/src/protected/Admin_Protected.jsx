import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Admin_Protected = () => {
  const admin = localStorage.getItem("admin-token");

  return admin ? <Outlet /> : <Navigate to="/" replace />;
};

export default Admin_Protected;
