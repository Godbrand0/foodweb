import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithGoogle,
} from "../firebase/Auth";
import Inputs from "../Reuse/Inputs";
import spagetti_1 from "../assets/delicious-epic-food-presentation.jpg";
export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const { userLoggedIn } = useAuth();

  useEffect(() => {
    if (userLoggedIn) {
      navigate("/home", { replace: true });
    }
  }, [userLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage(""); // Clear previous errors

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setIsRegistering(true);
    try {
      await doCreateUserWithEmailAndPassword(email, password);
      setSuccessMessage("verification email sent! Please check your inbox");
      setTimeout(() => navigate("/login"), 4000);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsRegistering(false);
    }
  };
  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    setErrorMessage(""); // Clear previous errors

    try {
      await doSignInWithGoogle();
      navigate("/home");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="lg:flex h-screen overflow-hidden justify-center bg-black items-center min-h-screen">
      <div className="lg:w-1/3 p-6 shadow-xl border-none rounded-lg">
        <h3 className="text-xl font-semibold text-center mb-4">Sign Up</h3>
        {errorMessage && (
          <p className="text-red-500 text-sm font-bold my-2">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-green-500 text-sm font-bold">{successMessage}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Inputs
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Inputs
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Inputs
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={isRegistering}
            className={`w-full py-2 text-white rounded-lg ${
              isRegistering
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isRegistering ? "Registering..." : "Sign Up"}
          </button>
          <button
            onClick={handleGoogleSignIn}
            disabled={isRegistering}
            className="w-full py-2 mt-2 text-white rounded-lg bg-red-500 hover:bg-red-600 transition duration-300"
          >
            {isRegistering ? "Signing in..." : "Sign in with Google"}
          </button>
        </form>
        <p className="text-center text-sm mt-4 text-orange-500">
          Already have an account?
          <Link to="/login" className="text-blue-500 hover:underline">
            Log In
          </Link>
        </p>
      </div>
      <img
        src={spagetti_1}
        sizes={20}
        className="lg:w-2/3 h-screen object-cover"
        alt=""
      />
    </div>
  );
}
