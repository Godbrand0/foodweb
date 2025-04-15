import React, { useEffect, useState } from "react";

import { faXmark, faTrash } from "@fortawesome/free-solid-svg-icons";

import { History } from "lucide-react";
import NavIcons from "../Reuse/NavIcons";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";
import { useAuth } from "../contexts/authContext"; // Make sure useAuth is imported
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/Firebase";
export default function CheckoutSection({ closeSection }) {
  const { currentUser } = useAuth();
  const cart = useSelector((state) => state.cart.cart);
  const [showConfirm, setShowConfirm] = useState(false);
  const [userData, setUserData] = useState({
    phone: "",
    address: "",
    email: currentUser?.email || "",
  });

  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));

    toast.success("Removed", {
      position: "bottom-center",
    });
  };
  const handlePlaceOrder = () => {
    setShowConfirm(true);
  };

  useEffect(() => {
    if (currentUser?.uid) {
      const fetchUserData = async () => {
        try {
          const docRef = doc(db, "users", currentUser.uid); // Use currentUser.uid here
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data()); // Set the fetched data to state
          } else {
            setUserData((prevState) => ({ ...prevState, username: "N/A" })); // Default if no data found
          }
        } catch (error) {
        } finally {
          setLoading(false); // Set loading to false once data is fetched
        }
      };

      fetchUserData();
    }
  }, [currentUser]);

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
                  <span className="flex  gap-1 w-2/3">
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
                  <span className="w-14">${item.totalPrice.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="lg:text-black text-white">Your cart is empty.</p>
          )}
          {cart.length > 0 && (
            <div>
              <div className="mt-4 font-bold lg:text-black text-white right-8 fixed">
                Total: $
                {cart
                  .reduce((total, item) => total + item.totalPrice, 0)
                  .toFixed(2)}
              </div>
              {!showConfirm && (
                <button
                  className="bg-orange-500 py-2 px-4 mt-16 rounded-xl text-white font-bold text-center lg:w-36 w-full"
                  onClick={handlePlaceOrder}
                >
                  <span className="">Place Order</span>
                </button>
              )}
            </div>
          )}
          {showConfirm && (
            <div>
              <ul className="space-y-2 mt-16">
                <li className="flex items-center">
                  <span className="w-24 font-bold text-xl">Phone:</span>
                  <p className="text-sm">{userData.phone || "N/A"}</p>
                </li>
                <li className="flex items-center">
                  <span className="w-24 font-bold text-xl">Address:</span>
                  <p className="text-sm">{userData.address || "N/A"}</p>
                </li>
                <li className="flex items-center">
                  <span className="w-24 font-bold text-xl">Email:</span>
                  <p className="text-sm">{userData.email}</p>
                </li>
              </ul>
              <div>
                <button
                  className="bg-orange-500 py-2 px-4 my-4 rounded-xl text-white font-bold text-center lg:w-36 w-full"
                  //onClick={}
                >
                  <span className="">Confirm Details</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <div></div>
      </div>
    </div>
  );
}
