"use client";

import React, { useState, useCallback, useContext } from "react";
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
import NewPlace from "../form/NewPlace";
import type { PlaceType } from "../../types/place";
import InfoWindowContent from "./InfoWindowContent";
import DetailView from "../display/DetailView";
import { MapContext } from "../../src/app/context";

export default function DisplayMap() {
  const [zoom, setZoom] = useState(4);
  const [position, setPosition] = useState({ lat: 40, lng: -97 });
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [activeMarker, setActiveMarker] = useState<PlaceType | null>(null);
  const [infoWindowShown, setInfoWindowShown] = useState(true);
  const handleClose = useCallback(() => setInfoWindowShown(false), []);
  const [modalOpen, setModalOpen] = useState(false);
  const { places } = useContext(MapContext);

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
          {infoWindowShown && selectedPlace && (
            <InfoWindow
              anchor={marker}
              onClose={handleClose}
              shouldFocus={true}
            >
              <InfoWindowContent
                type="newPlace"
                name={selectedPlace.name}
                address={selectedPlace.formatted_address}
                setModalOpen={setModalOpen}
                setInfoWindowShown={setInfoWindowShown}
                resolveMarker={setActiveMarker}
              />
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
              <InfoWindowContent
                type="existingPlace"
                name={activeMarker.name}
                address={activeMarker.address}
                rating={activeMarker.rating}
                recommended={activeMarker.recommended}
                setModalOpen={setModalOpen}
                resolvePlace={setSelectedPlace}
              />
            </InfoWindow>
          )}
        </Map>
        {selectedPlace && <MapHandler place={selectedPlace} marker={marker} />}
      </div>
      {selectedPlace && (
        <NewPlace
          modalOpen={modalOpen}
          handleCloseModal={() => setModalOpen(false)}
          name={selectedPlace.name}
          address={selectedPlace.formatted_address}
          coords={selectedPlace.geometry?.location}
        />
      )}
      {activeMarker && (
        <DetailView
          modalOpen={modalOpen}
          handleCloseModal={() => setModalOpen(false)}
          placeId={activeMarker.id}
          closeInfoWindow={() => setActiveMarker(null)}
        />
      )}
    </APIProvider>
  );
}
