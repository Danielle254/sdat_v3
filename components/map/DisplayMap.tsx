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
import ListView from "../display/ListView";
import { MapContext } from "../../src/app/context";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { IconButton, Button, FormControl, Box, MenuItem } from "@mui/material";
import { FilterAltOutlined, FormatListBulleted } from "@mui/icons-material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import type { Filter } from "../../types/otherTypes";

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
  const { places, userId } = useContext(MapContext);
  const [listViewOpen, setListViewOpen] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");

  function handleFilter(event: SelectChangeEvent) {
    setFilter(event.target.value as Filter);
  }

  function handleActiveMarker(id: string) {
    setActiveMarker(places[places.findIndex((each) => each.id === id)]);
  }

  function centerMapUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setZoom(12);
        },
        () => alert("Unable to retrieve your location")
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              position: "absolute",
              top: "56px",
              right: "12px",
              width: "294px",
            }}
          >
            <FormControl
              variant="standard"
              size="small"
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                gap: 1,
                mr: 2,
                bgcolor: "lightgray",
                borderRadius: "15px",
                borderColor: "gray",
                border: 1,
                px: 1,
              }}
            >
              <FilterAltOutlined fontSize="small" sx={{ mt: "2px" }} />
              <Select
                id="filter"
                value={filter}
                onChange={handleFilter}
                labelId="filter-label"
                sx={{ width: "110px" }}
                disableUnderline
              >
                <MenuItem value={"all"}>All</MenuItem>
                <MenuItem value={"myPlaces"}>My Places</MenuItem>
                <MenuItem value={"favorites"}>Favorites</MenuItem>
              </Select>
            </FormControl>
            <Button
              component="button"
              size="small"
              startIcon={<FormatListBulleted />}
              sx={{
                borderRadius: "15px",
                bgcolor: "lightgray",
                color: "#000",
                fontSize: "12px",
                borderColor: "gray",
                border: 1,
                px: 1,
              }}
              onClick={() => setListViewOpen(!listViewOpen)}
            >
              List View
            </Button>
          </Box>
          <IconButton
            onClick={centerMapUserLocation}
            component="button"
            size="large"
            sx={{
              position: "absolute",
              bottom: "30px",
              left: "70px",
              zIndex: 4,
              bgcolor: "#FFF",
              borderRadius: "0",
              "&:hover": {
                bgcolor: "#FFF",
                borderColor: "gray",
                border: 1,
                color: "#000",
              },
            }}
          >
            <MyLocationIcon />
          </IconButton>
          {listViewOpen && (
            <ListView
              setModalOpen={setModalOpen}
              resolvePlace={setSelectedPlace}
              setMarker={handleActiveMarker}
              filter={filter}
            />
          )}
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
          {filter === "all" &&
            places.map((place) => (
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
          {filter === "myPlaces" &&
            places
              .filter((place) => userId === place.author)
              .map((place) => (
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
          {filter === "favorites" &&
            places
              .filter((place) => userId === place.author && place.isFavorite)
              .map((place) => (
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
