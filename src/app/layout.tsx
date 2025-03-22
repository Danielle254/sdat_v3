"use client";

import type { Metadata } from "next";
import ThemeRegistry from "../../theme/ThemeRegistry";
import "./globals.css";
import { useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../api/firebase";
import NavBar from "../../components/NavBar";
import MapContext from "./context";

export const metadata: Metadata = {
  title: "Service Dogs Around Town",
  description: "project by Danielle Lindblom",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    <html lang="en">
      <ThemeRegistry>
        <body>
          <NavBar
            isLoggedIn={isLoggedIn}
            googleLogin={googleLogin}
            handleLogout={handleLogout}
          />
          <MapContext.Provider value={{ isLoggedIn, userId }}>
            {children}
          </MapContext.Provider>
        </body>
      </ThemeRegistry>
    </html>
  );
}
