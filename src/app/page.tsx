"use client";

import DisplayMap from "../../components/DisplayMap";
import NavBar from "../../components/NavBar";
import { useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../api/firebase";

export default function Home() {
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
    <div className="maps-page">
      <NavBar
        isLoggedIn={isLoggedIn}
        googleLogin={googleLogin}
        handleLogout={handleLogout}
      />
      <DisplayMap isLoggedIn={isLoggedIn} author={userId} />
    </div>
  );
}
