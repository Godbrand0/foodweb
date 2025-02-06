import React from "react";
import { Navigate, BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth } from "./contexts/authContext";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import ResturantDetails from "./components/ResturantDetails";
import UserInformation from "./components/UserInformation";

export default function Approutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/restaurant/:name" element={<ResturantDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userinfo" element={<UserInformation />} />
        {/* Add a catch-all route for undefined paths */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </div>
  );
}
