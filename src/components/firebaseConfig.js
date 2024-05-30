// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCiqhzZ7RZ8bUtGObDkMk5LtRIuW1T94Ks",
  authDomain: "votre-logo.firebaseapp.com",
  projectId: "votre-logo",
  storageBucket: "votre-logo.appspot.com",
  messagingSenderId: "375451020864",
  appId: "1:375451020864:web:e7ace346210e6a166d39a5",
  measurementId: "G-T5WF5KQ0BX"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
