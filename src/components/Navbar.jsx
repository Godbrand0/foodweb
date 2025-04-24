import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import { useSelector } from "react-redux";

export default function Navbar() {
  const cart = useSelector((state) => state.cart.cart);
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <div>
      <div className="py-4 shadow-md hidden lg:block">
        <ul className="container mx-auto flex justify-end flex-wrap md:flex-row px-4  md:px-2 items-center">
          <div className="flex gap-4">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Logout logo="log Out" />
            </li>
            <li>
              <Link to="/">History</Link>
            </li>
            <li>
              <Link to="/cart">
                Cart
                <span className="ml-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                  {totalCartItems}
                </span>
              </Link>
            </li>
            <li>
              <Link to="/profile">My Account</Link>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
}
