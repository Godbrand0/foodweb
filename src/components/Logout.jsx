import React from "react";
import { doSignOut } from "../firebase/Auth"; // Import sign-out function
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { toast } from "react-toastify";

export default function Logout({ logo }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await doSignOut(); // Calls the sign-out function
      navigate("/login"); // Redirect to login page after successful logout
      toast.success("Log out successful");
    } catch (error) {
      toast.error("Logout failed:", error);
    }
  };

  return (
    <div className="cursor-pointer" onClick={handleLogout}>
      <button className="">{logo}</button>
    </div>
  );
}
