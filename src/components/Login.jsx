import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../firebase/Auth";

export default function Login() {
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      await doSignInWithEmailAndPassword(email, password);
      //doSendEmailVerification()
    }
  };
  const onGoogleSignIn = (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle().catch((err) => {
        setIsSigningIn(false);
      });
    }
  };
  return (
    <div>
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}

      <main className="w-full h-screen flex self-center place-content-center place-items-center">
        <div className="w-96 h-96 bg-white rounded-lg p-8 shadow-md">
          <div className="text-center">
            <div className="text-center">
              <div className="mt-2">
                <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">
                  Welcome Back
                </h3>
              </div>
            </div>
            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label className="text-sm text-gray-600 font-bold">Email</label>
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="w-full mt-2 px-2 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 font-bold">
                  Password
                </label>
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                />
              </div>

              {errorMessage && (
                <span className="text-red-600 font-bold">{errorMessage}</span>
              )}

              <button
                type="submit"
                disabled={isSigningIn}
                className={`w-full px-4 py-2 text-white
                font-medium rounded-lg ${
                  isSigningIn
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300"
                }`}
              >
                {isSigningIn ? "Signing In..." : "Sign In"}
              </button>
            </form>
            <p className="text-center text-sm">
              Don't have an account?
              <link to={"/SignUp"} className="hover:underline font-bold">
                Sign up
              </link>
            </p>
            <div className="flex flex-row text-center w-full">
              <div className="border-b-2 mb-2.5 mr-2 w-full"></div>{" "}
              <div className="text-sm font-bold w-fit">OR</div>{" "}
              <div
                className="boder-b-2 mb-2.5 ml-2 w-full
              "
              ></div>
              <button
                disabled={isSigningIn}
                onClick={(e) => {
                  onGoogleSignIn;
                }}
                className={`w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium ${
                  isSigningIn
                    ? "cursor-not-allowed"
                    : "hover:bg-gray-100 transition duration-300 active:bg-gray-100"
                }`}
              >
                {isSigningIn ? "signing in..." : "Sign in with Google"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
