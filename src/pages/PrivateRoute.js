import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      return <Navigate to="/" replace />;
    }
  } catch (error) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;