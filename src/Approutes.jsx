import React from "react";
import { Navigate, BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth } from "./contexts/authContext";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import ResturantDetails from "./components/ResturantDetails";
import UserInformation from "./components/UserInformation";
import Navbar from "./components/Navbar";
import ProfileSection from "./components/ProfileSection";
import CheckoutSection from "./components/CheckoutSection";
import Verifypage from "./components/Verifypage";
import ProtectedRoute from "./ProtectedRoute";
import HomeSection from "./components/HomeSection";
import AdminPage from "./components/AdminPage";

export default function Approutes() {
  const { currentUser } = useAuth();
  return (
    <div className="h-screen overflow-hidden">
      {currentUser?.emailVerified && <Navbar className="block" />}
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/verify-email" element={<Verifypage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfileSection />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CheckoutSection />
            </ProtectedRoute>
          }
        />
        <Route
          path="/restaurant/:name"
          element={
            <ProtectedRoute>
              <ResturantDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/userinfo"
          element={
            <ProtectedRoute>
              <UserInformation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={currentUser ? <Navigate to="/home" replace /> : <Login />}
        />
        <Route
          path="/signup"
          element={currentUser ? <Navigate to="/home" replace /> : <SignUp />}
        />
        {/* Add a catch-all route for undefined paths */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </div>
  );
}
