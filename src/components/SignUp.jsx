import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithGoogle,
} from "../firebase/Auth";
import Inputs from "../Reuse/Inputs";
import spagetti_1 from "../assets/delicious-epic-food-presentation.jpg";
import { toast } from "react-toastify";

export default function SignUp() {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    if (userLoggedIn) {
      navigate("/home", { replace: true });
    }
  }, [userLoggedIn, navigate]);

  const onSubmit = async (data) => {
    setSuccessMessage("");
    const { email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      setError("confirmPassword", { message: "Passwords do not match" });
      return;
    }

    try {
      await doCreateUserWithEmailAndPassword(email, password);
      toast.success("Verification email sent! Please check your inbox.");
      setSuccessMessage("Verification email sent! Please check your inbox.");
      setTimeout(() => navigate("/login"), 4000);
    } catch (error) {
      setError("root", { message: error.message });
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await doSignInWithGoogle();
      navigate("/home");
    } catch (error) {
      setError("root", { message: error.message });
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="lg:flex h-screen overflow-hidden justify-center bg-black items-center min-h-screen">
      <div className="lg:w-1/3 p-6 shadow-xl border-none rounded-lg">
        <h3 className="text-xl font-semibold text-center mb-4">Sign Up</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Inputs
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
          <div className="relative">
            <Inputs
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-2 text-[10px] text-gray-600"
            >
              {showPassword ? "HIDE" : "SHOW"}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <Inputs
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Confirm your password",
            })}
          />

          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 text-white rounded-lg ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isSubmitting ? "Registering..." : "Sign Up"}
          </button>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isSubmitting}
            className="w-full py-2 mt-2 text-white rounded-lg bg-red-500 hover:bg-red-600 transition duration-300"
          >
            {isSubmitting ? "Signing in..." : "Sign in with Google"}
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-orange-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log In
          </Link>
        </p>
      </div>

      <img
        src={spagetti_1}
        sizes={20}
        className="lg:w-2/3 h-screen object-cover"
        alt="Food"
      />
    </div>
  );
}
