// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBQGHCfclRP1G43Qml3BnWobN0hMPTyVqQ",
  authDomain: "foodweb-e4457.firebaseapp.com",
  projectId: "foodweb-e4457",
  storageBucket: "foodweb-e4457.firebasestorage.app",
  messagingSenderId: "1051054137639",
  appId: "1:1051054137639:web:309b67837c10f1eda90902",
  measurementId: "G-JL71QJT2MC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, app };
