import React from "react";
import HomeSection from "./HomeSection";
import ProfileSection from "./ProfileSection";
import CheckoutSection from "./CheckoutSection";
import ResturantDetails from "./ResturantDetails";

export default function Home({ cart, setCart }) {
  return (
    <div>
      <div>
        <ProfileSection />
        <CheckoutSection cart={cart} setCart={setCart} />
      </div>
      <HomeSection />
    </div>
  );
}
