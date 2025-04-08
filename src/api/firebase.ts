import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "service-dogs-around-town-3f7b4.firebaseapp.com",
  projectId: "service-dogs-around-town-3f7b4",
  storageBucket: "service-dogs-around-town-3f7b4.firebasestorage.app",
  messagingSenderId: "568576320730",
  appId: "1:568576320730:web:fa98e8abee80ab0ad771e3",
  measurementId: "G-CXB4GT673F",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const database = getFirestore(app);
export const entriesCollection = collection(database, "entries");
