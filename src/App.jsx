import {} from "react";

import ProfileSection from "./components/ProfileSection";
import HomeSection from "./components/HomeSection";
import CheckoutSection from "./components/CheckoutSection";

function App() {
  return (
    <>
      <div className="flex justify-between gap-8 items-start m-7">
        <ProfileSection />
        <HomeSection />
        <CheckoutSection />
      </div>
    </>
  );
}

export default App;
