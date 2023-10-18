import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpUE9Bb1AsOEWDoJnBsEZW9D7BIScBNc8",
  authDomain: "appaconselhei.firebaseapp.com",
  projectId: "appaconselhei",
  storageBucket: "appaconselhei.appspot.com",
  messagingSenderId: "534492449577",
  appId: "1:534492449577:web:c3530bcaeae0c3246ec538"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);