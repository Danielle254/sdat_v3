"use client";

import { useState, useCallback } from "react";
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

export default function DisplayMap() {
  const [zoom, setZoom] = useState(4);
  const [position, setPosition] = useState({ lat: 40, lng: -97 });
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [infoWindowShown, setInfoWindowShown] = useState(true);
  const handleClose = useCallback(() => setInfoWindowShown(false), []);

  function handleMarkerClick() {
    setInfoWindowShown((isShown) => !isShown);
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
            onClick={() => handleMarkerClick()}
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
                  /* onClick={handleFormVisible} */
                >
                  Review
                </Button>
              </Box>
            </InfoWindow>
          )}
          <AdvancedMarker
            position={{
              lat: 46.8360851,
              lng: -114.0154287,
            }}
          >
            <Pin
              background={"#0E1B41"}
              borderColor={"#0E1B41"}
              glyphColor={"#53cbe2"}
              scale={1.2}
            />
          </AdvancedMarker>
        </Map>
        <MapHandler place={selectedPlace} marker={marker} />
      </div>
    </APIProvider>
  );
}
