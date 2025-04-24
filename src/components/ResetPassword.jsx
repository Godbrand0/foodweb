import { sendPasswordResetEmail } from "firebase/auth";
import React from "react";
import { useForm } from "react-hook-form";
import { auth } from "../firebase/Firebase";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const handleForgotPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Check you inbox");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ email }) => {
    handleForgotPassword(email);
  };
  return (
    <div>
      <form
        className="space-y-4 max-w-md  mx-auto mt-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Forgot Password</h2>
        <input
          type="text "
          {...register("email", { required: "Email is required" })}
          placeholder="Enter your email"
          className="w-full p-2 border rounded"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 hover:bg-blue-600 rounded-xl"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
}
