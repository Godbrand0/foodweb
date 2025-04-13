import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/authContext";
export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!currentUser.emailVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
}
