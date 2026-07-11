// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAO7tXt3tMbWW_gHytfSHgUfjx8wyQdJ9o",
  authDomain: "visionlab-a3a7e.firebaseapp.com",
  projectId: "visionlab-a3a7e",
  storageBucket: "visionlab-a3a7e.firebasestorage.app",
  messagingSenderId: "361570602040",
  appId: "1:361570602040:web:4a46819ffb1bf786fdaacd"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);