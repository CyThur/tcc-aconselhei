import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0sRaSWFooWghu5wXDDk4nwuL1Uj_IjxQ",
  authDomain: "aconselheiapp.firebaseapp.com",
  projectId: "aconselheiapp",
  storageBucket: "aconselheiapp.appspot.com",
  messagingSenderId: "607328249240",
  appId: "1:607328249240:web:510211a30118eb7391f7ed"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

