import React from "react";
import { doSignOut } from "../firebase/Auth"; // Import sign-out function
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await doSignOut(); // Calls the sign-out function
      navigate("/login"); // Redirect to login page after successful logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex py-10 h-screen">
      <button
        onClick={handleLogout}
        className="px-4 py-2 h-12 w-24 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
      >
        Logout
      </button>
    </div>
  );
}
