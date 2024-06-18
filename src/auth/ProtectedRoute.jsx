import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const user = useSelector((state) => state);
  console.log("user redux", user.user);
  if (!user.user.user) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoute;
