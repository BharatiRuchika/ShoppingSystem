// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyZCYl5JdJYmH-JNL3Qs2X-6wgBwEeBxo",
  authDomain: "busybuy-725ca.firebaseapp.com",
  projectId: "busybuy-725ca",
  storageBucket: "busybuy-725ca.appspot.com",
  messagingSenderId: "617956538732",
  appId: "1:617956538732:web:264abfa7f33c5318d19b49",
  measurementId: "G-R52ZM1D401"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)