import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBOoYHBDanGsKV5PeIj4M18yxu-9KTF3Gs",
  authDomain: "service-dogs-around-town-v3.firebaseapp.com",
  projectId: "service-dogs-around-town-v3",
  storageBucket: "service-dogs-around-town-v3.firebasestorage.app",
  messagingSenderId: "1043396959111",
  appId: "1:1043396959111:web:e95dcaf460e5a5ce595122",
  measurementId: "G-SMBZG9Q7T5",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const database = getFirestore(app);
export const entriesCollection = collection(database, "entries");
