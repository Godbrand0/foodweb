import React from "react";
import NavIcons from "../Reuse/NavIcons";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function MobileNavigation({ setActiveSection }) {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-3 flex justify-around md:hidden">
      {/* Profile Button */}
      <button onClick={() => setActiveSection("ProfileSection")}>
        <NavIcons icon={faUser} />
      </button>

      {/* Home Button */}
      <button className="text-lg font-semibold">
        <Link to="/home">Home</Link>
      </button>

      {/* Cart Button */}
      <button onClick={() => setActiveSection("CheckoutSection")}>
        <NavIcons icon={faCartShopping} />
      </button>
    </div>
  );
}
