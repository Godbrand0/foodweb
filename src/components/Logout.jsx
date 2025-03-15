import React from "react";
import { doSignOut } from "../firebase/Auth"; // Import sign-out function
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

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
    <div className="cursor-pointer" onClick={handleLogout}>
      <button className="hidden lg:block">Logout</button>
      <button className="lg:hidden">
        <LogOut className="text-white" />
      </button>
    </div>
  );
}
