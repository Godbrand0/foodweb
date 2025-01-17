import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProfileSection from "../src/components/ProfileSection";
import CheckoutSection from "../src/components/CheckoutSection";
import HomeSection from "../src/components/HomeSection";
import ResturantDetails from "../src/components/ResturantDetails";
import NavIcons from "../src/Reuse/NavIcons";
import {
  faUser,
  faCartShopping,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [activeMobileSection, setActiveMobileSection] = useState(null);

  const closeSection = () => setActiveMobileSection(null);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Profile Section */}
      <div
        className={`${
          activeMobileSection === "profile" ? "block" : "hidden"
        } md:block col-span-1 bg-gray-100 p-4`}
      >
        <ProfileSection closeSection={closeSection} />
      </div>

      {/* Middle Section (Home or Restaurant Details) */}
      <div className="col-span-1 md:col-span-2 bg-white p-4">
        <Routes>
          <Route path="/" element={<HomeSection />} />
          <Route path="/restaurant/:name" element={<ResturantDetails />} />
        </Routes>
      </div>

      {/* Checkout Section */}
      <div
        className={`${
          activeMobileSection === "checkout" ? "block" : "hidden"
        } md:block col-span-1 bg-gray-100 p-4`}
      >
        <CheckoutSection closeSection={closeSection} />
      </div>

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 w-full flex justify-around bg-gray-800 text-white p-2 md:hidden">
        <button onClick={() => setActiveMobileSection("profile")}>
          <NavIcons icon={faUser} />
        </button>
        <button onClick={() => setActiveMobileSection("home")}>Home</button>
        <button onClick={() => setActiveMobileSection("checkout")}>
          <NavIcons icon={faCartShopping} />
        </button>
      </div>
    </div>
  );
}

export default App;
