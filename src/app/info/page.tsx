"use client";

import React from "react";
import { useContext } from "react";
import { MapContext } from "../../app/context";
import NavBar from "../../../components/NavBar";

export default function Info() {
  const { isLoggedIn, userId, googleLogin, handleLogout } =
    useContext(MapContext);
  return (
    <div>
      <NavBar
        isLoggedIn={isLoggedIn}
        googleLogin={googleLogin}
        handleLogout={handleLogout}
      />
    </div>
  );
}
