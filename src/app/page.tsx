"use client";

import DisplayMap from "../../components/map/DisplayMap";
import NavBar from "../../components/nav/NavBar";

export default function Home() {
  return (
    <div className="maps-page">
      <NavBar />
      <DisplayMap />
    </div>
  );
}
