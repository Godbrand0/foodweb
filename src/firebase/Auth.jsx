import {
  GoogleAuthProvider,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "./Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

// Function to clean up Firebase error messages
const cleanErrorMessage = (error) => {
  return error.message.replace(/^Firebase:\s*/, ""); // Removes "Firebase: " from the error
};

// Create a new user with email and password
export const doCreateUserWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await sendEmailVerification(user);
    return userCredential;
  } catch (error) {
    console.error("Error creating user:", cleanErrorMessage(error));
    throw new Error(cleanErrorMessage(error));
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
    const user = userCredential.user;

    if (!user.emailVerified) {
      throw new Error("Email not verified. Please check your inbox");
    }

    return userCredential;
  } catch (error) {
    console.error("Error signing in:", cleanErrorMessage(error));
    throw new Error(cleanErrorMessage(error));
  }
};

// Sign in with Google
export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", cleanErrorMessage(error));
    throw new Error(cleanErrorMessage(error));
  }
};

// Sign out the current user
export const doSignOut = async () => {
  try {
    await signOut(auth);
    console.log("Successfully signed out");
  } catch (error) {
    console.error("Error signing out:", cleanErrorMessage(error));
    throw new Error(cleanErrorMessage(error));
  }
};
