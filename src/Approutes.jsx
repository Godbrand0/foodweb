import React from "react";
import { Navigate, BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth } from "./contexts/authContext";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import ResturantDetails from "./components/ResturantDetails";
import UserInformation from "./components/UserInformation";
import Navbar from "./components/Navbar";

export default function Approutes() {
  const { currentUser } = useAuth();
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route
          path="/home"
          element={currentUser ? <Home /> : <Navigate to="/login" replace />}
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
