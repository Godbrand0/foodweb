import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/Firebase";
import Inputs from "../Reuse/Inputs";
import { toast } from "react-toastify";

export default function UserInformation() {
  const { currentUser, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const userId = currentUser?.uid;

  const [loading, setLoading] = useState(false);

  // react-hook-form for cleaner validation
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (!authLoading && !currentUser) {
      navigate("/login");
    }
  }, [authLoading, currentUser, navigate]);

  const onSubmit = async (data) => {
    if (!userId) {
      alert("User not authenticated");
      return;
    }

    setLoading(true);
    try {
      await setDoc(doc(db, "users", userId), {
        ...data,
        email: currentUser.email,
      });

      toast.success("information saved");
      navigate("/profile");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      setError("root", {
        message: "Error saving user information. Try again.",
      });
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return <p className="text-center">Loading authentication...</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-full max-w-md p-6 bg-white shadow-xl border rounded-lg">
        <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">
          User Information
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Inputs
            type="text"
            placeholder="Username"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}

          <Inputs
            type="text"
            placeholder="Address"
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}

          <Inputs
            type="tel"
            placeholder="Phone Number"
            {...register("phone", {
              required: "Phone number is required",
              pattern: { value: /^[0-9]+$/, message: "Invalid phone number" },
            })}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting || loading}
            className={`w-full py-2 text-white rounded-lg transition duration-300 ${
              loading || isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading || isSubmitting ? "Saving..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
