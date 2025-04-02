import React, { useContext, useState } from "react";
import {
  Box,
  List,
  ListItem,
  IconButton,
  MenuItem,
  FormControl,
  Typography,
} from "@mui/material";
import {
  ChevronRight,
  FilterAlt,
  FilterAltOutlined,
} from "@mui/icons-material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
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
  type Filter = "all" | "myPlaces" | "favorites";

  const { userId, places } = useContext(MapContext);
  const [filter, setFilter] = useState<Filter>("all");

  function handleChange(event: SelectChangeEvent) {
    setFilter(event.target.value as Filter);
  }

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          width: "300px",
          top: "50px",
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <IconButton onClick={closeListView} component="button">
            <ChevronRight />
          </IconButton>
          <FormControl
            variant="standard"
            size="small"
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
              mr: 2,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <FilterAltOutlined fontSize="small" />
              Filter:
            </Typography>
            <Select
              id="filter"
              value={filter}
              label="Filter:"
              onChange={handleChange}
              labelId="filter-label"
              sx={{ width: "110px" }}
            >
              <MenuItem value={"all"}>All</MenuItem>
              <MenuItem value={"myPlaces"}>My Places</MenuItem>
              <MenuItem value={"favorites"}>Favorites</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <List>
          {filter === "all" &&
            places.map((place) => {
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
          {filter === "myPlaces" &&
            places
              .filter((place) => place.author === userId)
              .map((place) => {
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
          {filter === "favorites" &&
            places
              .filter((place) => place.author === userId && place.isFavorite)
              .map((place) => {
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
