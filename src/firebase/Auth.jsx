import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { auth } from "./Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  //   result.user
  return result;
};

export const doSignOut = () => {
  return auth.signOut();
};

// export const doPasswordReset =(email) =>{
//     return sendPasswordResetEmail(auth, email)
// }

// export const doPasswordChange =(password) =>{
//     return updatePassword(auth.currentUser, password)
// }
