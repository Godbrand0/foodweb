import React from "react";

import { faXmark, faTrash } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../firebase/Firebase";
import { sendEmailVerification } from "firebase/auth";
import { History } from "lucide-react";
import NavIcons from "../Reuse/NavIcons";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";

export default function CheckoutSection({ closeSection }) {
  const cart = useSelector((state) => state.cart.cart);
  const user = auth.currentUser;

  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));

    toast.success("Removed", {
      position: "bottom-center",
    });
  };
  const handlePlaceOrder = () => {
    if (!user) {
      toast.error("You must be logged in to pace an order");
      return;
    }

    if (!user.emailVerified) {
      toast.error("Please verify your email to place an order");
      sendEmailVerification(user)
        .then(() => toast.success("A new verification email has been sent!"))
        .catch((err) => toast.error(err.message));
      return;
    }

    toast.success("Order placed succesfully");
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full  z-50 lg:bg-white bg-yellow-600">
      {/* Mobile Close Button */}
      <div className="lg:hidden flex justify-between m-3">
        <button onClick={closeSection}>
          <NavIcons
            icon={faXmark}
            classname="text-white text-2xl bg-orange-500 p-2 rounded-lg"
          />
        </button>
        <button>
          <History
            size={45}
            className="text-white   bg-orange-500 p-2 rounded-lg"
          />
        </button>
      </div>

      <div className=" lg:w-2/3 mx-auto">
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
                  <span className="flex  gap-1">
                    {item.name} (x{item.quantity})
                  </span>
                  <span
                    className=""
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    <NavIcons
                      icon={faTrash}
                      classname="cursor-pointer hover:scale-150 transition-transform ease-in-out duration-300"
                    />
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
                className="bg-orange-500 py-2 px-4 my-4 rounded-xl text-white font-bold text-center lg:w-36 w-full"
                onClick={handlePlaceOrder}
              >
                <span className="">Place Order</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
