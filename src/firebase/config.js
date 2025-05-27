// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCt3JLJePQfzVTik5M8dVcWWJdVse5HyNE",
  authDomain: "busia-d27ad.firebaseapp.com",
  projectId: "busia-d27ad",
  storageBucket: "busia-d27ad.firebasestorage.app",
  messagingSenderId: "262747029639",
  appId: "1:262747029639:web:d60bfa3185c4a6b4f7f822"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
export default app;
