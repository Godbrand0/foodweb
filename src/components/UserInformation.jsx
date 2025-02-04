import React, { useState } from "react";
import Inputs from "../Reuse/Inputs";
import { useAuth } from "../contexts/authContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/Firebase";

export default function UserInformation() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    address: "",
    phone: "",
    email: "",
  });

  const { user } = useAuth();
  const userId = user?.uid;

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    // Ensure this function is async
    e.preventDefault();

    if (!userId) {
      alert("User not authenticated");
      return;
    }

    try {
      // Ensure `await` is used correctly
      await setDoc(doc(db, "users", userId), {
        username: userInfo.username,
        address: userInfo.address,
        phone: userInfo.phone,
        email: userInfo.email,
      });
      alert("User information saved");
    } catch (error) {
      console.error("Error saving user information:", error);
      alert("Error saving user information. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-96 p-6 shadow-xl border rounded-lg">
        <h3 className="text-xl font-semibold text-center mb-4">
          User Information
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Inputs
            type="text"
            placeholder="Username"
            name="username"
            value={userInfo.username}
            onChange={handleChange}
          />
          <Inputs
            type="text"
            placeholder="Address"
            name="address"
            value={userInfo.address}
            onChange={handleChange}
          />
          <Inputs
            type="tel"
            placeholder="Phone Number"
            name="phone"
            value={userInfo.phone}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
