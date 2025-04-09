"use client";

import DisplayMap from "./_components/map/DisplayMap";
import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <div className="maps-page">
      <NavBar />
      <DisplayMap />
    </div>
  );
}
