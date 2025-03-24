"use client";

import { createContext } from "react";
import { useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDocs, deleteDoc } from "firebase/firestore";
import { auth, entriesCollection } from "../../api/firebase";
import type { PlaceType } from "../../types/place";

type MapContextType = {
  isLoggedIn: boolean;
  userId: string;
  googleLogin: () => void;
  handleLogout: () => void;
  places: PlaceType[];
  addPlace: (
    e: React.FormEvent<HTMLFormElement>,
    place: PlaceType
  ) => Promise<void>;
  deletePlace: (id: string) => Promise<void>;
};

export const MapContext = createContext<MapContextType>({
  isLoggedIn: false,
  userId: "",
  googleLogin: () => {},
  handleLogout: () => {},
  places: [],
  addPlace: () => new Promise(() => {}),
  deletePlace: () => new Promise(() => {}),
});

export function MapContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [places, setPlaces] = useState<PlaceType[]>([]);

  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      if (result.user) {
        setIsLoggedIn(true);
        setUserId(result.user.uid);
      }
    });
  }

  async function checkIsLoggedIn() {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserId(user.uid);
      }
    });
  }

  async function handleLogout() {
    await auth.signOut();
    setIsLoggedIn(false);
  }

  async function getData() {
    const querySnapshot = await getDocs(entriesCollection);
    const entriesArr: any = [];
    querySnapshot.forEach((doc) => {
      entriesArr.push(doc.data());
    });
    const convertedData: PlaceType[] = entriesArr;
    setPlaces(convertedData);
  }

  async function addPlace(
    e: React.FormEvent<HTMLFormElement>,
    place: PlaceType
  ) {
    e.preventDefault();
    const docRef = await setDoc(doc(entriesCollection, place.id), place);
    setPlaces([...places, place]);
  }

  async function deletePlace(id: string) {
    const docRef = doc(entriesCollection, id);
    await deleteDoc(docRef);
    const newPlaces = places.filter((place) => place.id !== id);
    setPlaces(newPlaces);
  }

  useEffect(() => {
    checkIsLoggedIn();
    getData();
  }, []);

  return (
    <MapContext.Provider
      value={{
        isLoggedIn,
        userId,
        googleLogin,
        handleLogout,
        places,
        addPlace,
        deletePlace,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}
