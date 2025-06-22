// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC5XM-R_79MvdNm11Lmnh2IZ0lZsasgeiM",
  authDomain: "helperregistraion.firebaseapp.com",
  projectId: "helperregistraion",
  storageBucket: "helperregistraion.appspot.com", // ✅ FIXED
  messagingSenderId: "153502140597",
  appId: "1:153502140597:web:e2f1bd24a849d4288296fc",
  measurementId: "G-N2EMB1NKLC",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
