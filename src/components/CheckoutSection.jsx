import React from "react";
import { useSelector } from "react-redux";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import NavIcons from "../Reuse/NavIcons";

export default function CheckoutSection({ closeSection }) {
  const cart = useSelector((state) => state.cart.cart);
  return (
    <div>
      {/* Mobile Close Button */}
      <div className="lg:hidden flex justify-end">
        <button onClick={closeSection}>
          <NavIcons icon={faXmark} classname="text-gray-500 text-2xl" />
        </button>
      </div>

      <div className="lg:block -mt-[500px]">
        <h2>Checkout Section</h2>
        <div className="col-span-1 bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Checkout</h2>
          {cart.length > 0 ? (
            <ul>
              {cart.map((item, index) => (
                <li key={index} className="flex justify-between mb-2">
                  <span>
                    {item.name} (x{item.quantity})
                  </span>
                  <span>${item.totalPrice.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Your cart is empty.</p>
          )}
          {cart.length > 0 && (
            <div className="mt-4 font-bold">
              Total: $
              {cart
                .reduce((total, item) => total + item.totalPrice, 0)
                .toFixed(2)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
