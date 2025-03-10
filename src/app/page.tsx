"use client";

import { useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import NavBar from "../../components/NavBar";

export default function Home() {
  const [zoom, setZoom] = useState(4);
  const [position, setPosition] = useState({ lat: 40, lng: -97 });

  return (
    <div className="maps-page">
      <NavBar />
      <APIProvider apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY as string}>
        <div className="map-container">
          <Map
            zoom={zoom}
            center={position}
            mapId={process.env.NEXT_PUBLIC_MAPS_ID as string}
            reuseMaps={true}
            onCenterChanged={(map) => setPosition(map.detail.center)}
            onZoomChanged={(map) => setZoom(map.detail.zoom)}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            zoomControl={true}
            fullscreenControl={true}
            clickableIcons={false}
            zoomControlOptions={{
              position: 6,
            }}
            fullscreenControlOptions={{ position: 6 }}
          ></Map>
        </div>
      </APIProvider>
    </div>
  );
}
