import { GoogleAuthProvider, signOut } from "firebase/auth"; // Fixed import
import { auth } from "./Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

// Create a new user with email and password
export const doCreateUserWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential; // Returns user information
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Rethrow to handle it where this function is called
  }
};

// Sign in a user with email and password
export const doSignInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

// Sign in with Google
export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user; // Returns the user object
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

// Sign out the current user
export const doSignOut = async () => {
  try {
    await signOut(auth);
    console.log("Successfully signed out");
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// export const doPasswordReset =(email) =>{
//     return sendPasswordResetEmail(auth, email)
// }

// export const doPasswordChange =(password) =>{
//     return updatePassword(auth.currentUser, password)
// }
