import React from "react";
import { useSelector } from "react-redux";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../firebase/Firebase";
import { sendEmailVerification } from "firebase/auth";
import { History } from "lucide-react";
import NavIcons from "../Reuse/NavIcons";

export default function CheckoutSection({ closeSection }) {
  const cart = useSelector((state) => state.cart.cart);
  const user = auth.currentUser;

  const handlePlaceOrder = () => {
    if (!user) {
      alert("You must be logged in to pace an order");
      return;
    }

    if (!user.emailVerified) {
      alert("Please verify your email to place an order");
      sendEmailVerification(user)
        .then(() => alert("A new verification email has been sent!"))
        .catch((err) => alert(err.message));
      return;
    }

    alert("Order placed succesfully");
  };
  return (
    <div className="">
      {/* Mobile Close Button */}
      <div className="lg:hidden flex justify-between m-3">
        <button onClick={closeSection}>
          <NavIcons icon={faXmark} classname="text-white text-2xl" />
        </button>
        <button>
          <History className="text-white " />
        </button>
      </div>

      <div className=" w-2/3 mx-auto">
        <div className="col-span-1 p-4 rounded-lg shadow">
          <h2 className="text-xl lg:text-black text-white font-bold mb-4">
            Checkout
          </h2>
          {cart.length > 0 ? (
            <ul>
              {cart.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between mb-2 lg:text-black text-white"
                >
                  <span>
                    {item.name} (x{item.quantity})
                  </span>
                  <span>${item.totalPrice.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="lg:text-black text-white">Your cart is empty.</p>
          )}
          {cart.length > 0 && (
            <div>
              <div className="mt-4 font-bold lg:text-black text-white">
                Total: $
                {cart
                  .reduce((total, item) => total + item.totalPrice, 0)
                  .toFixed(2)}
              </div>
              <button
                className="bg-orange-500 py-2 px-4 my-4 rounded-xl text-white font-bold flex items-center hover:opacity-75 transition-opacity"
                onClick={handlePlaceOrder}
              >
                <span className="ml-2">Place Order</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
