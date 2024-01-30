// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAEO4iav9tpFcUFuhTCV9xYETEncBD9dQ",
  authDomain: "lidija-erasmus.firebaseapp.com",
  projectId: "lidija-erasmus",
  storageBucket: "lidija-erasmus.appspot.com",
  messagingSenderId: "211007030070",
  appId: "1:211007030070:web:0100f823b1883874dd2997",
  measurementId: "G-6511EQK42S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth, analytics };
