import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavIcons from "../Reuse/NavIcons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../contexts/authContext"; // Make sure useAuth is imported
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/Firebase"; // Make sure Firebase is properly set up
import { useNavigate } from "react-router-dom"; // Import useNavigate

import Logout from "./Logout";

export default function ProfileSection({ closeSection }) {
  const { user } = useAuth(); // Get the authenticated user from context
  const navigate = useNavigate(); // Initialize navigate
  const [userData, setUserData] = useState({
    username: "",
    phone: "",
    address: "",
    email: user?.email || "", // Get email from auth
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.uid) {
      const fetchUserData = async () => {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data()); // Set the fetched data to state
          } else {
            console.log("No user data found");
            setUserData((prevState) => ({ ...prevState, username: "N/A" })); // Default if no data found
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false); // Set loading to false once data is fetched
        }
      };

      fetchUserData();
    }
  }, [user]);

  const handleEditProfile = () => {
    navigate("/userinfo"); // Navigate to the user info page
  };

  if (loading) {
    return <div>Loading...</div>; // Optional: Display loading indicator while fetching data
  }

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
          <p>{userData.username || "N/A"}</p>
        </li>
        <li>
          <span>Phone:</span>
          <p>{userData.phone || "N/A"}</p>
        </li>
        <li>
          <span>Address:</span>
          <p>{userData.address || "N/A"}</p>
        </li>
        <li>
          <span>Email:</span>
          <p>{userData.email}</p>
        </li>
      </ul>
      <button
        onClick={handleEditProfile}
        className="w-full py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Edit Profile
      </button>

      <Logout />
    </div>
  );
}
