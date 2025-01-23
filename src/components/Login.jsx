import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../firebase/Auth";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  const { userLoggedIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSigningIn(true);
    try {
      await doSignInWithEmailAndPassword(email, password);
      navigate("/home");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    try {
      await doSignInWithGoogle();
      navigate("/home");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSigningIn(false);
    }
  };

  if (userLoggedIn) {
    return <navigate to="/home" replace={true} />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-96 p-6 shadow-xl border rounded-lg">
        <h3 className="text-xl font-semibold text-center mb-4">Log In</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errorMessage && (
            <p className="text-red-500 text-sm font-bold">{errorMessage}</p>
          )}
          <button
            type="submit"
            disabled={isSigningIn}
            className={`w-full py-2 text-white rounded-lg ${
              isSigningIn ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isSigningIn ? "Signing in..." : "Log In"}
          </button>
        </form>
        <button
          onClick={handleGoogleSignIn}
          disabled={isSigningIn}
          className={`w-full flex items-center justify-center gap-2 py-2 mt-4 border rounded-lg ${
            isSigningIn ? "bg-gray-100 cursor-not-allowed" : "hover:bg-gray-50"
          }`}
        >
          {isSigningIn ? "Signing in..." : "Sign in with Google"}
        </button>
        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
