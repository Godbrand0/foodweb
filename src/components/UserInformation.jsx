import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import Inputs from "../Reuse/Inputs";
import { useAuth } from "../contexts/authContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/Firebase";

export default function UserInformation() {
  // Separate state for each input field
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentUser, loading: authLoading } = useAuth(); // Corrected destructuring
  const userId = currentUser?.uid; // Use currentUser instead of user
  const navigate = useNavigate(); // Initialize navigate for redirection

  // Redirect to login if user is not authenticated
  useEffect(() => {
    console.log("Auth Loading:", authLoading);
    console.log("Current User:", currentUser);
    if (!authLoading && !currentUser) {
      navigate("/login"); // Redirect to login if user is not authenticated
    }
  }, [authLoading, currentUser, navigate]);

  // Handle change for each input field
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("User not authenticated");
      return;
    }

    setLoading(true);

    try {
      await setDoc(doc(db, "users", userId), {
        username,
        address,
        phone,
        email: currentUser.email, // Use currentUser for email
      });

      alert("User information saved");
      setUsername(""); // Clear form fields
      setAddress("");
      setPhone("");
      navigate("/profile"); // Redirect to Home page after successful submission
    } catch (error) {
      console.error("Error saving user information:", error);
      alert("Error saving user information. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return <p className="text-center">Loading authentication...</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen sm:bg-[url('src/assets/top-view-delicious-round-pie-with-fruits-cream-dark-desk-tea-sugar-cookie-biscuit-cake-pie-sweet.jpg')] bg-contain bg-center">
      <div className="w-96 p-6 shadow-xl border rounded-lg">
        <h3 className="text-xl font-semibold text-center mb-4">
          User Information
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Inputs
            type="text"
            placeholder="Username"
            name="username"
            value={username} // Use username state
            onChange={handleUsernameChange}
          />
          <Inputs
            type="text"
            placeholder="Address"
            name="address"
            value={address} // Use address state
            onChange={handleAddressChange}
          />

          <Inputs
            type="number"
            placeholder="Phone Number"
            name="phone"
            value={phone} // Use phone state
            onChange={handlePhoneChange}
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 ${
              loading ? "bg-gray-400" : "bg-blue-500"
            } text-white rounded-lg hover:bg-blue-600 transition duration-300`}
          >
            {loading ? "Saving..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
