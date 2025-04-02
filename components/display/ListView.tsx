import React, { useContext } from "react";
import { Box, List, ListItem, IconButton } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { MapContext } from "../../src/app/context";
import PlaceCard from "./PlaceCard";

type ListViewProps = {
  resolvePlace: React.Dispatch<
    React.SetStateAction<google.maps.places.PlaceResult>
  >;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  closeListView: () => void;
  setMarker: (input: string) => void;
};

export default function ListView({
  setModalOpen,
  resolvePlace,
  closeListView,
  setMarker,
}: ListViewProps) {
  const { userId, places } = useContext(MapContext);

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          width: "300px",
          top: "100px",
          right: "10px",
          bgcolor: "white",
          borderRadius: "5px",
          border: 1,
          borderColor: "lightgray",
          overflowY: "scroll",
          maxHeight: "500px",
        }}
      >
        <IconButton onClick={closeListView}>
          <ChevronRight />
        </IconButton>
        <List>
          {places.map((place) => {
            return (
              <ListItem>
                <PlaceCard
                  key={place.id}
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
