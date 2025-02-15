// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCY-rGWOUJ6mm9Zrbxh7_qyK11yvIUh9WU",
  authDomain: "burgerbuilder-744cf.firebaseapp.com",
  projectId: "burgerbuilder-744cf",
  storageBucket: "burgerbuilder-744cf.firebasestorage.app",
  messagingSenderId: "1055723428995",
  appId: "1:1055723428995:web:099138b09350dcbbdacfb6",
  measurementId: "G-LYCX8FEQ7N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);