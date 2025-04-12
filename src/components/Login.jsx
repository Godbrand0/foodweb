import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../firebase/Auth";
import Inputs from "../Reuse/Inputs";
import spagetti_1 from "../assets/seafood-sushi-dish-with-details-simple-black-background.jpg";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isGoggleSigningIn, setIsGoggleSigningIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (userLoggedIn) {
      navigate("/home", { replace: true });
    }
  }, [userLoggedIn, navigate]);

  const onSubmit = async (data) => {
    setIsSigningIn(true);

    try {
      await doSignInWithEmailAndPassword(data.email, data.password);
      navigate("/home");
      toast.success("Login successful");
    } catch (error) {
      console.error(error);

      toast.error(error.message || "Oops. Check details.");
    } finally {
      setIsSigningIn(false);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleGoogleSignIn = async () => {
    setIsGoggleSigningIn(true);
    setErrorMessage("");

    try {
      await doSignInWithGoogle();
      navigate("/home");
      toast.success("Google Sign in successful");
    } catch (error) {
      setErrorMessage(error);
      toast.error(error.message || "Login failed. Please try again.");
    } finally {
      setIsGoggleSigningIn(false);
    }
  };

  return (
    <div className="lg:flex h-screen overflow-hidden justify-center bg-black items-center min-h-screen">
      <div className="lg:w-1/3 p-6 shadow-xl border-none rounded-lg">
        <h3 className="text-xl font-semibold text-center mb-4 text-orange-600">
          Welcome Back!
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Inputs
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
          <div className="relative">
            <Inputs
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
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

          {errorMessage && (
            <p className="text-red-500 text-sm font-bold">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={isSigningIn}
            className={`w-full py-2 text-white rounded-lg ${
              isSigningIn
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isSigningIn ? "Signing in..." : "Log In"}
          </button>
        </form>

        <button
          onClick={handleGoogleSignIn}
          disabled={isGoggleSigningIn}
          className="w-full py-2 mt-2 text-white rounded-lg bg-red-500 hover:bg-red-600 transition duration-300"
        >
          {isGoggleSigningIn ? "GoggleSigning in..." : "Sign in with Google"}
        </button>

        <p className="text-center text-sm mt-4 text-orange-500">
          Don't have an account?
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>

      <img
        src={spagetti_1}
        sizes={20}
        className="lg:w-2/3 object-cover"
        alt="Background"
      />
    </div>
  );
}
