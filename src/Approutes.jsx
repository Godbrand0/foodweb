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

export default function Approutes() {
  const { currentUser } = useAuth();
  return (
    <div className="h-screen overflow-hidden">
      {currentUser ? (
        <Navbar className="block" />
      ) : (
        <Navigate to="/login" replace />
      )}
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route
          path="/home"
          element={currentUser ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/profile"
          element={
            currentUser ? <ProfileSection /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/cart"
          element={
            currentUser ? <CheckoutSection /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/restaurant/:name"
          element={
            currentUser ? (
              <ResturantDetails />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/userinfo"
          element={
            currentUser ? <UserInformation /> : <Navigate to="/login" replace />
          }
        />
        {/* Add a catch-all route for undefined paths */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </div>
  );
}
