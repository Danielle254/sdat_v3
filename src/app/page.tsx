"use client";

import DisplayMap from "../../components/DisplayMap";
import { useContext } from "react";
import MapContext from "./context";

export default function Home() {
  const { isLoggedIn, userId } = useContext(MapContext);

  return (
    <div className="maps-page">
      <DisplayMap isLoggedIn={isLoggedIn} author={userId} />
    </div>
  );
}
