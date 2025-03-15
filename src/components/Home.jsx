import React, { useState } from "react";
import HomeSection from "./HomeSection";
import ProfileSection from "./ProfileSection";
import CheckoutSection from "./CheckoutSection";
import MobileNavigation from "./MobileNavigation";

export default function Home({ cart, setCart }) {
  const [activeSection, setActiveSection] = useState(""); // Track active section

  // Function to update the active section
  const handleSetActiveSection = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="relative min-h-screen flex justify-center">
      {/* Profile Section - Overlay */}

      <div className="">
        {activeSection === "ProfileSection" && (
          <div className="fixed top-0 left-0 w-full h-screen bg-[url('src/assets/top-view-sketchbook-fresh-vegetables-colorful-bell-peppers-green-chili-peppers-tomatoes-black-peppercorns-rustic-wood.jpg')] bg-contain bg-center z-50">
            <ProfileSection closeSection={() => setActiveSection("")} />
          </div>
        )}
      </div>

      {/* Checkout Section - Overlay */}

      <div className="">
        {activeSection === "CheckoutSection" && (
          <div className="fixed top-0 left-0 w-full h-full  bg-[url('src/assets/yellow-cherries-wooden-bowl-bottom-corner.jpg')] bg-contain bg-center  z-50">
            <CheckoutSection
              cart={cart}
              setCart={setCart}
              closeSection={() => setActiveSection("")}
            />
          </div>
        )}
      </div>

      {/* Home Section is always visible */}
      <div className="w-screen bg-[url('src/assets/halloween-party.jpg')] bg-cover bg-center">
        <div className="h-screen container mx-auto ">
          <HomeSection cart={cart} setCart={setCart} />
        </div>
      </div>

      {/* Mobile Navigation: Visible only on small screens */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full">
        <MobileNavigation setActiveSection={handleSetActiveSection} />
      </div>
    </div>
  );
}
