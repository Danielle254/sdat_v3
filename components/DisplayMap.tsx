"use client";

import { useState, useCallback, useEffect } from "react";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
  useAdvancedMarkerRef,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import PlacesAutocomplete from "./PlacesAutocomplete";
import MapHandler from "./MapHandler";
import React from "react";
import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import NewPlace from "./NewPlace";
import { entriesCollection } from "../api/firebase";
import { collection, doc, getDocs } from "firebase/firestore";
import type { NewPlaceType, ExistingPlaceType } from "../types/place";

export default function DisplayMap() {
  const [zoom, setZoom] = useState(5);
  const [position, setPosition] = useState({ lat: 40, lng: -97 });
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult>();
  const [activeMarker, setActiveMarker] = useState<ExistingPlaceType | null>(
    null
  );
  const [infoWindowShown, setInfoWindowShown] = useState(true);
  const handleClose = useCallback(() => setInfoWindowShown(false), []);
  const [modalOpen, setModalOpen] = useState(false);
  const [places, setPlaces] = useState<ExistingPlaceType[]>([]);

  async function getData() {
    const querySnapshot = await getDocs(entriesCollection);
    const entriesArr: any = [];
    querySnapshot.forEach((doc) => {
      entriesArr.push({ ...doc.data(), id: doc.id });
    });
    setPlaces(entriesArr);
  }

  useEffect(() => {
    getData();
  }, []);

  function handleActiveMarker(id: string) {
    setActiveMarker(places[places.findIndex((each) => each.id === id)]);
  }

  return (
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
        >
          <PlacesAutocomplete onPlaceSelect={setSelectedPlace} />
          <AdvancedMarker
            ref={markerRef}
            position={null}
            clickable={true}
            onClick={() => setInfoWindowShown((isShown) => !isShown)}
          >
            <Pin
              background={"#53cbe2"}
              glyphColor={"#0E1B41"}
              borderColor={"#0E1B41"}
              scale={1.2}
            />
          </AdvancedMarker>
          {infoWindowShown && (
            <InfoWindow
              anchor={marker}
              onClose={handleClose}
              shouldFocus={true}
            >
              <Box>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold" }}
                  gutterBottom={true}
                >
                  {selectedPlace?.name}
                </Typography>
                <Typography variant="body2" gutterBottom={true}>
                  {selectedPlace?.formatted_address}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => {
                    setModalOpen(true);
                    setInfoWindowShown(false);
                  }}
                >
                  Review
                </Button>
              </Box>
            </InfoWindow>
          )}
          {places.map((place) => (
            <AdvancedMarker
              position={place.coords}
              key={place.id}
              clickable={true}
              onClick={() => handleActiveMarker(place.id)}
            >
              <Pin
                background={"#0E1B41"}
                borderColor={"#0E1B41"}
                glyphColor={"#53cbe2"}
                scale={1.2}
              />
            </AdvancedMarker>
          ))}
          {activeMarker && (
            <InfoWindow
              position={activeMarker.coords}
              onCloseClick={() => setActiveMarker(null)}
            >
              <div>
                <p>{activeMarker.name}</p>
                <p>{/* {cityState(activeMarker.address)} */}</p>
                <button
                /* onClick={() => openModal(activeMarker.id)} */
                >
                  View Details
                </button>
              </div>
            </InfoWindow>
          )}
        </Map>
        <MapHandler place={selectedPlace} marker={marker} />
      </div>
      <NewPlace
        modalOpen={modalOpen}
        handleCloseModal={() => setModalOpen(false)}
        name={selectedPlace?.name}
        address={selectedPlace?.formatted_address}
        coords={selectedPlace?.geometry?.location}
      />
    </APIProvider>
  );
}
