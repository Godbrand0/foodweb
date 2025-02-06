import React from "react";
import HomeSection from "./HomeSection";
import ProfileSection from "./ProfileSection";
import CheckoutSection from "./CheckoutSection";
import ResturantDetails from "./ResturantDetails";

export default function Home({ cart, setCart }) {
  return (
    <div className="flex justify-center ">
      <div>
        <ProfileSection />
        <CheckoutSection cart={cart} setCart={setCart} />
      </div>
      <HomeSection cart={cart} setCart={setCart} />
    </div>
  );
}
