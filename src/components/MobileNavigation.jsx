import React from "react";
import NavIcons from "../Reuse/NavIcons";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function MobileNavigation({ setActiveSection }) {
  return (
    <div>
      <div className="fixed bottom-0 left-0 w-full flex justify-around bg-gray-800 text-white p-2 md:hidden">
        <button onClick={() => setActiveSection("profile")}>
          <NavIcons icon={faUser} />
        </button>
        <button onClick={() => setActiveSection("home")}>Home</button>
        <button onClick={() => setActiveSection("checkout")}>
          <NavIcons icon={faCartShopping} />
        </button>
      </div>
    </div>
  );
}
