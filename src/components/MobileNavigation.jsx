import React from "react";
import NavIcons from "../Reuse/NavIcons";
import {
  faUser,
  faCartShopping,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import ProfileSection from "./ProfileSection";
import CheckoutSection from "./CheckoutSection";
export default function MobileNavigation() {
  const cart = useSelector((state) => state.cart.cart);
  const [activeSection, setActiveSection] = useState("");
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="fixed top-0 left-0 w-full bg-gray-800 text-white p-3 flex justify-around  md:hidden">
      {activeSection === "ProfileSection" && (
        <div className="fixed top-0 left-0 w-full h-full bg-white z-50">
          <ProfileSection closeSection={() => setActiveSection("")} />
        </div>
      )}

      {activeSection === "CheckoutSection" && (
        <div className="fixed top-0 left-0 w-full h-full bg-white z-50">
          <CheckoutSection closeSection={() => setActiveSection("")} />
        </div>
      )}

      {/* Profile Button */}
      <button onClick={() => setActiveSection("ProfileSection")}>
        <NavIcons icon={faUser} />
      </button>

      {/* Home Button */}
      <button className="text-lg font-semibold">
        <Link to="/home">Home</Link>
      </button>

      {/* Cart Button */}
      <div onClick={() => setActiveSection("CheckoutSection")}>
        <button>
          <NavIcons icon={faCartShopping} />
        </button>

        <span className="ml-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
          {totalCartItems}
        </span>
      </div>
    </div>
  );
}
