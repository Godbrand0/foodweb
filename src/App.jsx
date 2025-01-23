import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProfileSection from "./components/ProfileSection";
import CheckoutSection from "./components/CheckoutSection";
import MobileNavigation from "./components/MobileNavigation";
import routes from "../src/routes";

function App() {
  const [activeMobileSection, setActiveMobileSection] = useState(null);
  const [cart, setCart] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false); // Authentication state

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

      {/* Middle Section (Dynamic Routes) */}
      <div className="col-span-1 md:col-span-2 bg-white p-4">
        <Routes>
          {routes(userLoggedIn, cart, setCart).map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>

      {/* Checkout Section */}
      <div
        className={`${
          activeMobileSection === "checkout" ? "block" : "hidden"
        } md:block col-span-1 bg-gray-100 p-4`}
      >
        <CheckoutSection closeSection={closeSection} cart={cart} />
      </div>

      {/* Mobile Navigation */}
      {userLoggedIn && (
        <MobileNavigation setActiveSection={setActiveMobileSection} />
      )}
    </div>
  );
}

export default App;
