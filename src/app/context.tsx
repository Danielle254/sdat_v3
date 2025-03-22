"use client";

import { createContext } from "react";
import { useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../api/firebase";

type MapContextType = {
  isLoggedIn: boolean;
  userId: string;
  googleLogin: () => void;
  handleLogout: () => void;
};

export const MapContext = createContext<MapContextType>({
  isLoggedIn: false,
  userId: "",
  googleLogin: () => {},
  handleLogout: () => {},
});

export function MapContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      if (result.user) {
        setIsLoggedIn(true);
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

  useEffect(() => {
    checkIsLoggedIn();
  }, []);

  return (
    <MapContext.Provider
      value={{ isLoggedIn, userId, googleLogin, handleLogout }}
    >
      {children}
    </MapContext.Provider>
  );
}
