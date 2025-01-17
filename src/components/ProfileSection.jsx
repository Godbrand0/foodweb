import React, { useState } from "react";
import Header from "../Reuse/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavIcons from "../Reuse/NavIcons";
import { faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import useSidebar from "../Hooks/useSidebar";

export default function ProfileSection({ closeSection }) {
  // Simulating the user data
  const [userInfo] = useState({
    username: "thomspn",
    phone: "07064836051",
    address: "phase 3 avenue 1 harmony estate",
    name: "eregha thompson",
  });
  console.log(userInfo);

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
          <p>{userInfo.username}</p>
        </li>
        <li>
          <span>Phone:</span>
          <p>{userInfo.phone}</p>
        </li>
        <li>
          <span>Address:</span>
          <p>{userInfo.address}</p>
        </li>
        <li>
          <span>Name:</span>
          <p>{userInfo.name}</p>
        </li>
      </ul>
    </div>
  );
}
