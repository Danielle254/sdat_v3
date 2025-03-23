"use client";

import DisplayMap from "../../components/map/DisplayMap";
import { useContext } from "react";
import { MapContext } from "./context";
import NavBar from "../../components/nav/NavBar";

export default function Home() {
  const { isLoggedIn, userId, googleLogin, handleLogout } =
    useContext(MapContext);

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
