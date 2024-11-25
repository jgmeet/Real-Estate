// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-6aff0.firebaseapp.com",
  projectId: "mern-estate-6aff0",
  storageBucket: "mern-estate-6aff0.firebasestorage.app",
  messagingSenderId: "430045321387",
  appId: "1:430045321387:web:375f81bcdd57f040cbbfee"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);