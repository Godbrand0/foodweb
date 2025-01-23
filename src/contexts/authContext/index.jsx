import React, { useContext, useEffect, useState } from "react";
import { auth } from "../../firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up Firebase Authentication listener
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange);

    // Clean up the listener on unmount
    return unsubscribe;
  }, []);

  function handleAuthStateChange(user) {
    if (user) {
      setUser({ ...user });
      setUserLoggedIn(true);
    } else {
      setUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }

  const value = {
    currentUser: user, // Corrected reference
    userLoggedIn,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
