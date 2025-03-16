import React, { useContext, useEffect, useState } from "react";
import { auth } from "../../firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import Loader from "../../Reuse/Loader";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser: user,
    isLoggedIn: !!user, // Boolean flag for convenience
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      <Loader loading={loading} />
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
