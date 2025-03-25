"use client";

import { createContext } from "react";
import { useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { onSnapshot, doc, setDoc, deleteDoc } from "firebase/firestore";
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
  updatePlace: (updatedPlace: PlaceType) => Promise<void>;
};

export const MapContext = createContext<MapContextType>({
  isLoggedIn: false,
  userId: "",
  googleLogin: () => {},
  handleLogout: () => {},
  places: [],
  addPlace: () => new Promise(() => {}),
  deletePlace: () => new Promise(() => {}),
  updatePlace: () => new Promise(() => {}),
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

  async function addPlace(
    e: React.FormEvent<HTMLFormElement>,
    place: PlaceType
  ) {
    e.preventDefault();
    const docRef = await setDoc(doc(entriesCollection, place.id), place);
  }

  async function deletePlace(id: string) {
    const docRef = doc(entriesCollection, id);
    await deleteDoc(docRef);
  }

  async function updatePlace(editedPlace: PlaceType) {
    let cleanPlace = editedPlace;
    const docRef = doc(entriesCollection, cleanPlace.id);
    await setDoc(docRef, cleanPlace);
  }

  useEffect(() => {
    checkIsLoggedIn();
    const unsubscribe = onSnapshot(entriesCollection, function (snapshot) {
      const entriesArr = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          name: data.name,
          address: data.address,
          coords: data.coords,
          author: data.author,
          isFavorite: data.isFavorite,
          dateVisited: data.dateVisited,
          accessIssues: data.accessIssues,
          safetyIssues: data.safetyIssues,
          staffIssues: data.staffIssues,
          floorIssues: data.floorIssues,
          spaceIssues: data.spaceIssues,
          privateNote: data.privateNote,
          rating: data.rating,
          recommended: data.recommended,
          review: data.review,
          id: data.id,
        };
      });
      setPlaces(entriesArr);
    });
    return unsubscribe;
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
        updatePlace,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}
