import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <div className="py-4 shadow-md">
        <ul className="container mx-auto flex flex-wrap md:flex-row px-4 md:px-2 items-center">
          <div className="flex gap-4">
            <li>
              <Link to="/">Log Out</Link>
            </li>
            <li>
              <Link to="/">History</Link>
            </li>
            <li>
              <Link to="/">Cart</Link>
            </li>
            <li>
              <Link to="/">My Account</Link>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
}
