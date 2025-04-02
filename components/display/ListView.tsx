import React, { useContext } from "react";
import { Box, List, ListItem, Typography } from "@mui/material";

import { MapContext } from "../../src/app/context";
import PlaceCard from "./PlaceCard";
import type { Filter } from "../../types/otherTypes";

type ListViewProps = {
  resolvePlace: React.Dispatch<
    React.SetStateAction<google.maps.places.PlaceResult>
  >;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMarker: (input: string) => void;
  filter: Filter;
};

export default function ListView({
  setModalOpen,
  resolvePlace,
  setMarker,
  filter,
}: ListViewProps) {
  const { userId, places, isLoggedIn } = useContext(MapContext);

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          width: "300px",
          top: "100px",
          zIndex: 10,
          right: "10px",
          bgcolor: "white",
          borderRadius: "5px",
          border: 1,
          borderColor: "lightgray",
          overflowY: "scroll",
        }}
        className="listview"
      >
        {filter !== "all" && !isLoggedIn && (
          <Typography variant="body1" sx={{ m: 2 }}>
            Please log in to capture your own entries and favorites!
          </Typography>
        )}
        <List>
          {filter === "all" &&
            places.map((place) => {
              return (
                <ListItem key={place.id}>
                  <PlaceCard
                    name={place.name}
                    address={place.address}
                    rating={place.rating}
                    recommended={place.recommended}
                    author={place.author}
                    userId={userId}
                    id={place.id}
                    isFavorite={place.isFavorite}
                    setModalOpen={setModalOpen}
                    resolvePlace={resolvePlace}
                    setMarker={setMarker}
                  />
                </ListItem>
              );
            })}
          {filter === "myPlaces" &&
            places
              .filter((place) => place.author === userId)
              .map((place) => {
                return (
                  <ListItem key={place.id}>
                    <PlaceCard
                      name={place.name}
                      address={place.address}
                      rating={place.rating}
                      recommended={place.recommended}
                      author={place.author}
                      userId={userId}
                      id={place.id}
                      isFavorite={place.isFavorite}
                      setModalOpen={setModalOpen}
                      resolvePlace={resolvePlace}
                      setMarker={setMarker}
                    />
                  </ListItem>
                );
              })}
          {filter === "favorites" &&
            places
              .filter((place) => place.author === userId && place.isFavorite)
              .map((place) => {
                return (
                  <ListItem key={place.id}>
                    <PlaceCard
                      name={place.name}
                      address={place.address}
                      rating={place.rating}
                      recommended={place.recommended}
                      author={place.author}
                      userId={userId}
                      id={place.id}
                      isFavorite={place.isFavorite}
                      setModalOpen={setModalOpen}
                      resolvePlace={resolvePlace}
                      setMarker={setMarker}
                    />
                  </ListItem>
                );
              })}
        </List>
      </Box>
    </>
  );
}
