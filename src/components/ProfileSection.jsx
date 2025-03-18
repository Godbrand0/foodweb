import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavIcons from "../Reuse/NavIcons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../contexts/authContext"; // Make sure useAuth is imported
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/Firebase"; // Make sure Firebase is properly set up
import { useNavigate } from "react-router-dom"; // Import useNavigate
import user from "../assets/user_17740832.png";

import Logout from "./Logout";

export default function ProfileSection({ closeSection }) {
  const { currentUser } = useAuth(); // Get the authenticated user from context
  const navigate = useNavigate(); // Initialize navigate
  const [userData, setUserData] = useState({
    username: "",
    phone: "",
    address: "",
    email: currentUser?.email || "", // Get email from auth
  });
  const [loading, setLoading] = useState(false);

  // Log userData to check if it's being updated correctly
  console.log(userData);

  const addFoodToRestaurant = async (restaurantId, foodData) => {
    try {
      const foodsRef = collection(db, `restaurants/${restaurantId}/foods`);
      await addDoc(foodsRef, foodData);
      console.log("food added");
    } catch (e) {
      console.error("Error adding food document: ", e);
    }
  };
  useEffect(() => {
    addFoodToRestaurant("WEgA4SUfWi1TVan1KLD9", {
      name: "Pizza Roll",
      price: 12.99,
    });
  }, []);

  useEffect(() => {
    if (currentUser?.uid) {
      const fetchUserData = async () => {
        try {
          const docRef = doc(db, "users", currentUser.uid); // Use currentUser.uid here
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
  }, [currentUser]); // Add currentUser as a dependency

  const handleEditProfile = () => {
    navigate("/userinfo"); // Navigate to the user info page
  };

  if (loading) {
    return <div>Loading...</div>; // Optional: Display loading indicator while fetching data
  }

  return (
    <div className="w-screen h-screen fixed z-50 bg-slate-200 lg:bg-white">
      {/* Mobile Close Button */}
      <div className=" lg:hidden flex justify-between m-3">
        <button onClick={closeSection}>
          <NavIcons
            icon={faXmark}
            classname="text-white text-2xl  bg-orange-500 p-2 rounded-lg"
          />
        </button>
        <button className="text-white text-2xl  bg-orange-500 p-2 rounded-lg">
          <Logout className="text-white text-2xl  bg-orange-500 p-2 rounded-lg" />
        </button>
      </div>
      <div className="flex flex-col gap-5 mt-24">
        <div className="mx-auto lg:w-24 lg:h-24 w-11 h-11">
          <img src={user} alt="" className="" />
        </div>
        <ul className="lg:grid grid-cols-2 space-y-6 text-center font-bold text-xl">
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
          className="w-28 py-2 mt-8 mx-auto bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}
