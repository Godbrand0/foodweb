import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    const interval = setInterval(checkVerification, 3000);

    return () => clearInterval(interval);
  }, [auth, navigate]);
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
      <p className="mb-4">We sent a verification link to your email.</p>
      <p className="text-sm text-gray-500">Waiting for verification...</p>
    </div>
  );
}
