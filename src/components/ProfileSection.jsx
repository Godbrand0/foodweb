import React, { useState } from "react";
import Header from "../Reuse/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavIcons from "../Reuse/NavIcons";
import { faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import useSidebar from "../Hooks/useSidebar";
import Logout from "./Logout";

export default function ProfileSection({ closeSection }) {
  // Simulating the user data
  // const { currentUser } = useAuth();
  // const [userData, setUserData] = useState(currentUser);

  return (
    <div>
      {/* Mobile Close Button */}
      <div className="lg:hidden flex justify-end">
        <button onClick={closeSection}>
          <NavIcons icon={faXmark} classname="text-gray-500 text-2xl" />
        </button>
      </div>

      <div className="lg:block hidden">
        <h2>Profile Section</h2>
      </div>

      <ul>
        <li>
          <span>Username:</span>
          <p>{}</p>
        </li>
        <li>
          <span>Phone:</span>
          <p>{}</p>
        </li>
        <li>
          <span>Address:</span>
          <p>{}</p>
        </li>
        <li>
          <span>Name:</span>
          <p>{}</p>
        </li>
      </ul>

      <Logout />
    </div>
  );
}
