// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "homepage-61ce9.firebaseapp.com",
  projectId: "homepage-61ce9",
  storageBucket: "homepage-61ce9.firebasestorage.app",
  messagingSenderId: "969420022231",
  appId: "1:969420022231:web:68e1ccbe53b1258440ab92",
  measurementId: "G-WPGV0HVDK5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
//const analytics = getAnalytics(app);