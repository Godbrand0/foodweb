import { getAuth, sendEmailVerification } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";
import { toast } from "react-toastify";

export default function Verifypage() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const checkVerification = () => {
      auth.currentUser.reload().then(() => {
        if (auth.currentUser.emailVerified) {
          setIsVerified(true);
          navigate("/home");
        }
      });
    };

    checkVerification();
  }, [auth, navigate]);

  const handleResendEmail = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      toast.success("Verification email sent!", { position: "top-center" });
    } catch (error) {
      console.error("Error sending verification email:", error);
      toast.error("Failed to send email. Please try again.", {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 5000);
    return () => clearInterval(interval);
  });
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
      <p className="mb-4">We sent a verification link to your email.</p>
      <p className="text-sm text-gray-500">Waiting for verification...</p>
      <button
        onClick={handleResendEmail}
        className="bg-orange-500 text-white px-4 py-2 rounded-md mt-3"
      >
        Resend Verification Email
      </button>
      <Logout logo="logout" />
    </div>
  );
}
